#!/usr/bin/env python3
"""Render an offline experiment portfolio from a localized JSON view model."""
import argparse
import html
import json
import re
from pathlib import Path
from urllib.parse import urlsplit


def esc(value):
    return html.escape(str(value), quote=True)


def safe_url(value):
    value = str(value).strip()
    if any(ord(c) < 32 for c in value) or '\\' in value:
        return None
    if urlsplit(value).scheme.lower() not in ('', 'http', 'https') or value.startswith('//'):
        return None
    return value


def inline(value):
    pattern = re.compile(r'\[([^\]]+)\]\(([^)]+)\)|\*\*(.+?)\*\*|`([^`]+)`')
    chunks, pos = [], 0
    for m in pattern.finditer(str(value)):
        chunks.append(esc(str(value)[pos:m.start()]))
        if m.group(1) is not None:
            href = safe_url(m.group(2))
            chunks.append(f'<a href="{esc(href)}">{esc(m.group(1))}</a>' if href is not None else esc(m.group(1)))
        elif m.group(3) is not None:
            chunks.append(f'<strong>{esc(m.group(3))}</strong>')
        else:
            chunks.append(f'<code>{esc(m.group(4))}</code>')
        pos = m.end()
    return ''.join(chunks) + esc(str(value)[pos:])


def body(value):
    chunks = []
    for paragraph in re.split(r'\n\s*\n', value.strip()):
        lines = paragraph.splitlines()
        if lines and all(line.startswith('- ') for line in lines):
            chunks.append('<ul>' + ''.join(f'<li>{inline(line[2:])}</li>' for line in lines) + '</ul>')
        else:
            chunks.append('<p>' + inline(' '.join(lines)) + '</p>')
    return ''.join(chunks)


ASSETS = Path(__file__).resolve().parents[1] / 'assets'
CSS = (ASSETS / 'html-style.css').read_text(encoding='utf-8') + '\n' + (ASSETS / 'recommendations-layout.css').read_text(encoding='utf-8')


def icon(size):
    cls = 'nav-icon' if size == 14 else 'card-icon'
    return f'<svg class="{cls}" width="{size}" height="{size}" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 2h7l4 4v12H5ZM12 2v5h4M8 11h5M8 14h5"/></svg>'


JS = '''
const entries=[...document.querySelectorAll('details.experiment')];
document.querySelectorAll('[data-expand]').forEach(button=>button.addEventListener('click',()=>{entries.forEach(entry=>{entry.open=button.dataset.expand==='true';});}));
function revealAnchor(){const id=decodeURIComponent(location.hash.slice(1));const target=document.getElementById(id);if(target&&target.matches('details.experiment'))target.open=true;}
document.addEventListener('click',event=>{const anchor=event.target.closest('a[href^="#"]');if(anchor){const target=document.getElementById(anchor.getAttribute('href').slice(1));if(target&&target.matches('details.experiment'))target.open=true;}});
addEventListener('hashchange',revealAnchor);revealAnchor();
let printState=[];addEventListener('beforeprint',()=>{printState=entries.map(entry=>entry.open);entries.forEach(entry=>{entry.open=true;});});
addEventListener('afterprint',()=>{entries.forEach((entry,index)=>{entry.open=printState[index]??entry.open;});});
'''


def render(data):
    labels = data['labels']
    for key in ('overview', 'comparison', 'recommendations', 'expand_all', 'collapse_all', 'source', 'recommended', 'plan_status', 'table_caption', 'footer'):
        if not labels.get(key):
            raise ValueError(f'Missing localized label: {key}')
    items = data['recommendations']
    ids = [item['id'] for item in items]
    if not ids or len(ids) != len(set(ids)) or any(not re.fullmatch(r'[A-Za-z][A-Za-z0-9_-]*', x) for x in ids):
        raise ValueError('Recommendation IDs must be unique safe anchor IDs')
    if data['recommended_id'] not in ids or len(data['columns']) != 4:
        raise ValueError('Invalid recommended_id or comparison columns')
    rows, cards = [], []
    for item in items:
        first = item['id'] == data['recommended_id']
        rows.append(f'<tr class="{"recommended-row" if first else ""}"><td>{inline(item["priority"])}</td><td><a class="row-name" href="#{esc(item["id"])}">{esc(item["title"])}</a><span class="row-meta">{esc(item["method"])}</span></td><td>{inline(item["decision"])}</td><td>{inline(item["dependencies"])}</td></tr>')
        blocks = ''.join(f'<section class="block"><h3>{esc(block["label"])}</h3><div class="copy">{body(block["body"])}</div></section>' for block in item['blocks'])
        source = safe_url(item['source'])
        if source is None:
            raise ValueError('Unsafe recommendation source URL')
        badge = f'<span class="first">{esc(labels["recommended"])}</span>' if first else ''
        cards.append(f'<details class="experiment" id="{esc(item["id"])}"{" open" if first else ""}><summary><span class="meta">{icon(20)}<span>{esc(item["id"])}</span><span>{esc(item["method"])}</span>{badge}</span><span class="item-title">{esc(item["title"])}</span></summary><div class="blocks">{blocks}<p class="source"><a href="{esc(source)}">{esc(labels["source"])}</a></p></div></details>')
    notes = ''.join(f'<section class="note"><h2>{esc(note["title"])}</h2>{body(note["body"])}</section>' for note in data.get('notes', []))
    return f'''<!doctype html>
<html lang="{esc(data['lang'])}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{esc(data['title'])}</title><style>{CSS}</style></head>
<body><header><div class="wrap top"><div class="brand">{esc(data['eyebrow'])}</div><nav aria-label="{esc(data['title'])}"><a href="#overview">{icon(14)}{esc(labels['overview'])}</a><a href="#comparison">{icon(14)}{esc(labels['comparison'])}</a><a href="#recommendations">{icon(14)}{esc(labels['recommendations'])}</a></nav></div></header>
<main class="wrap"><section class="hero" id="overview"><div class="eyebrow">{esc(data['kicker'])}</div><h1>{esc(data['title'])}</h1><p class="subtitle">{esc(data['subtitle'])}</p><span class="status">{esc(labels['plan_status'])}</span></section>
<div class="intro">{body(data['summary'])}</div>
<section id="comparison"><h2>{esc(labels['comparison'])}</h2><div class="table-box"><table><caption>{esc(labels['table_caption'])}</caption><thead><tr>{''.join('<th scope="col">'+esc(c)+'</th>' for c in data['columns'])}</tr></thead><tbody>{''.join(rows)}</tbody></table></div></section>
<section id="recommendations"><div class="section-head"><h2>{esc(labels['recommendations'])}</h2><div class="tools"><button type="button" data-expand="true" aria-controls="experiment-list">{esc(labels['expand_all'])}</button><button type="button" data-expand="false" aria-controls="experiment-list">{esc(labels['collapse_all'])}</button></div></div><div id="experiment-list">{''.join(cards)}</div></section>
<div class="notes">{notes}</div></main><footer><div class="wrap">{inline(labels['footer'])}</div></footer><script>{JS}</script></body></html>'''


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('input', type=Path)
    parser.add_argument('output', type=Path)
    args = parser.parse_args()
    data = json.loads(args.input.read_text(encoding='utf-8'))
    document = render(data)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(document, encoding='utf-8')
    print(f'Rendered {len(data["recommendations"])} recommendations: {args.output}')


if __name__ == '__main__':
    main()
