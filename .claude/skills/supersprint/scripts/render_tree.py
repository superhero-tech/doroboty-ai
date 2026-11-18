#!/usr/bin/env python3
"""Eksport częściowego lub pełnego drzewa Supersprintu bez zależności sieciowych."""
import argparse,copy,hashlib,html,json,os,re
from pathlib import Path
from urllib.parse import urlsplit

TYPES=['goal','opportunity','idea','experiment','result','decision','signal']
UI={
 'en':dict(zoom_controls='Tree scale',zoom_out='Zoom out',zoom_in='Zoom in',zoom_scale='Scale',zoom_reset='100%',zoom_fit='Fit entire tree',title='Supersprint',stage='Stage',opportunities='Opportunities',ideas='Ideas',experiments='Experiments',results='Results',signals='Supporting signals',empty='No tree nodes yet. Define the direction first.',source='Full description and sources',close='Close',selected='Selected path',recommended='Recommendation',details='Details',goal='Goal',opportunity='Opportunities',idea='Ideas',experiment='Experiments',result='Observed results',decision='Decision',signal='Signals',hypothesis='Hypothesis',method='How we test',measure='What we measure',draft='Proposed',proposed='Proposed',provisional='Working goal',selected_status='Selected',alternative='Alternative',pending='Pending review',accepted='Accepted',conditional='Conditional test',hint='Scroll to explore the tree. Click a card for a brief preview.'),
 'pl':dict(zoom_controls='Skala drzewa',zoom_out='Oddal drzewo',zoom_in='Powiększ drzewo',zoom_scale='Skala',zoom_reset='100%',zoom_fit='Dopasuj całe drzewo',title='Supersprint',stage='Etap',opportunities='Szanse',ideas='Pomysły',experiments='Eksperymenty',results='Wyniki',signals='Sygnały wspierające',empty='Nie ma jeszcze węzłów drzewa. Najpierw ustalmy kierunek.',source='Pełny opis i źródła',close='Zamknij',selected='Wybrana ścieżka',recommended='Rekomendacja',details='Podgląd',goal='Cel',opportunity='Szanse',idea='Pomysły',experiment='Eksperymenty',result='Zaobserwowane wyniki',decision='Decyzja',signal='Sygnały',hypothesis='Hipoteza',method='Jak sprawdzimy',measure='Co mierzymy',draft='Propozycja',proposed='Propozycja',provisional='Cel roboczy',selected_status='Wybrane',alternative='Alternatywa',pending='Do przeglądu',accepted='Przyjęte',conditional='Test warunkowy',hint='Przewiń, aby obejrzeć drzewo. Kliknij kartę, aby zobaczyć krótki podgląd.')}

UI['en'].update(product_context='Product and outcome',product='Product',description='What it does',audience='For whom',outcome='Outcome',requested_outcome='Human input; goal still to review',unknown_product='Waiting for the product context',unknown_outcome='Outcome not defined yet',unknown_context='Not specified yet',context_source='Product context and sources',checkpoint_awaiting_product='Waiting for your product context',checkpoint_awaiting_outcome='Waiting for your outcome input',checkpoint_awaiting_input='Waiting for your stage input',checkpoint_drafting='Preparing this stage for review',checkpoint_awaiting_review='Waiting for your review',checkpoint_accepted='Stage accepted',checkpoint_not_started='Stage not started')
UI['pl'].update(product_context='Produkt i cel',product='Produkt',description='Co robi',audience='Dla kogo',outcome='Outcome',requested_outcome='Wsad człowieka; cel czeka na przegląd',unknown_product='Czekamy na kontekst produktu',unknown_outcome='Outcome nie został jeszcze określony',unknown_context='Jeszcze nie określono',context_source='Kontekst produktu i źródła',checkpoint_awaiting_product='Czekamy na Twój opis produktu',checkpoint_awaiting_outcome='Czekamy na Twój outcome',checkpoint_awaiting_input='Czekamy na Twój wsad do etapu',checkpoint_drafting='Przygotowujemy etap do przeglądu',checkpoint_awaiting_review='Czekamy na Twoje sprawdzenie',checkpoint_accepted='Etap zaakceptowany',checkpoint_not_started='Etap nierozpoczęty')

def esc(value):return html.escape(str(value),quote=True)
def dump(value):return json.dumps(value,ensure_ascii=False,indent=2)+'\n'
def json_safe(value):return json.dumps(value,ensure_ascii=False).replace('&','\\u0026').replace('<','\\u003c').replace('>','\\u003e')
def source_link(raw,cycle,output):
 if not raw:return None
 raw=str(raw)
 if any(ord(c)<32 for c in raw) or '\\' in raw:return None
 scheme=urlsplit(raw).scheme.lower()
 if scheme in ['http','https']:return raw
 if scheme or raw.startswith('//'):return None
 return os.path.relpath((cycle/raw).resolve(),output.parent.resolve())

STAGES=['goal','signals','opportunities','ideas','experiments','results','decision']

def validate_gates(state):
 gates=state.get('human_gates')
 if gates is None:return
 if not isinstance(gates,dict) or gates.get('mode')!='interactive':raise ValueError('Invalid human_gates mode')
 records=gates.get('stages',{});current=state.get('current_stage')
 if current not in STAGES or any(name not in records for name in STAGES):raise ValueError('Missing human stage checkpoint')
 statuses={'not_started','awaiting_input','drafting','awaiting_review','accepted'}
 def has_response(record):
  refs=record.get('source_refs')
  return isinstance(record.get('response'),str) and bool(record['response'].strip()) and isinstance(refs,list) and bool(refs) and all(isinstance(r,str) and r.strip() for r in refs)
 for i,name in enumerate(STAGES):
  record=records[name];status=record.get('status')
  if status not in statuses:raise ValueError('Invalid checkpoint status: '+name)
  if name==current and status=='not_started':raise ValueError('Current stage must name its waiting point')
  if status in {'drafting','awaiting_review','accepted'}:
   if any(records[earlier].get('status')!='accepted' for earlier in STAGES[:i]):raise ValueError('Accept the previous stage review before proceeding: '+name)
   if not has_response(record.get('input',{})):raise ValueError('Record the human stage input and its source before drafting: '+name)
   intake=state.get('intake',{})
   context=state.get('product_context',{})
   if not state.get('product') or not intake.get('product_confirmed') or not context.get('description') or not isinstance(intake.get('outcome_response'),str) or not intake['outcome_response'].strip():raise ValueError('Ask about the product context and outcome before drafting')
  if status in {'awaiting_review','accepted'}:
   draft=record.get('draft',{});revision=draft.get('revision')
   if not isinstance(revision,int) or isinstance(revision,bool) or revision<1 or not draft.get('artifact_path'):raise ValueError('Record the displayed stage draft revision and artifact: '+name)
  if status=='accepted':
   review=record.get('review',{})
   if not has_response(review) or review.get('reviewed_revision')!=record['draft']['revision']:raise ValueError('Human review must match the displayed draft revision: '+name)
   if review.get('decision')=='delegated':
    delegation=next((d for d in gates.get('delegations',[]) if d.get('id')==review.get('delegation_id')),None)
    if not delegation or name not in delegation.get('stages',[]) or not delegation.get('review_gate') or not has_response(delegation):raise ValueError('Record explicit scoped delegation instead of inventing approval: '+name)
   elif review.get('decision')!='approved':raise ValueError('An accepted stage needs explicit approval: '+name)
 active=STAGES.index(current)
 if any(records[name].get('status')!='accepted' for name in STAGES[:active]):raise ValueError('Cannot advance past an unresolved human review')

def project_context(state,nodes,ui,cycle,output):
 context=state.get('product_context') or {}
 raw=state.get('product');product=raw.get('name') if isinstance(raw,dict) else raw
 product=product if isinstance(product,str) and product.strip() else ui['unknown_product']
 goals=[n for n in nodes if n['type']=='goal']
 requested=(state.get('intake') or {}).get('outcome_response')
 outcome='; '.join(n['title']+' ('+n['status_label']+')' for n in goals) if goals else (ui['requested_outcome']+': '+requested if isinstance(requested,str) and requested.strip() else ui['unknown_outcome'])
 status=(state.get('human_gates') or {}).get('stages',{}).get(state.get('current_stage'),{}).get('status')
 intake=state.get('intake')
 if intake is not None:
  if not intake.get('product_confirmed'):status='awaiting_product'
  elif not intake.get('outcome_response'):status='awaiting_outcome'
 return dict(product=product,description=context.get('description') or ui['unknown_context'],audience=context.get('audience') or ui['unknown_context'],outcome=outcome,review=ui.get(context.get('review_status','pending'),context.get('review_status','pending')),link=source_link(context.get('artifact_path'),cycle,output) if state.get('product') else None,checkpoint=ui.get('checkpoint_'+str(status),'') if status else '')

def normalize(state,graph,cycle,output):
 validate_gates(state)
 data=copy.deepcopy(graph);lang=str(state.get('language',graph.get('language','en'))).split('-')[0]
 ui={**UI.get(lang,UI['en']),**state.get('tree_ui',{}),**graph.get('tree_ui',{})}
 raw_nodes=data.get('nodes',[]);raw_edges=data.get('edges',[])
 if not isinstance(raw_nodes,list) or not isinstance(raw_edges,list):raise ValueError('nodes and edges must be lists')
 if any(n.get('type')=='assumption' for n in raw_nodes):raise ValueError('Put hypotheses inside experiment nodes, not a separate assumption layer')
 ids=[n.get('id') for n in raw_nodes]
 if any(not isinstance(i,str) or not i.strip() for i in ids) or len(set(ids))!=len(ids):raise ValueError('Node IDs must be unique nonempty strings')
 if any(n.get('type') not in TYPES for n in raw_nodes):raise ValueError('Unknown node type')
 for edge in raw_edges:
  if edge.get('source') not in ids or edge.get('target') not in ids:raise ValueError('Dangling edge')
 selected=set(state.get('selected_idea_ids',[])+state.get('selected_experiment_ids',[]))
 if state.get('selected_opportunity_id'):selected.add(state['selected_opportunity_id'])
 if not selected.issubset(ids):raise ValueError('Selected IDs are missing from the tree')
 recommended=set(state.get('recommended_next_experiment_ids',[]))
 if state.get('recommended_next_experiment_id'):recommended.add(state['recommended_next_experiment_id'])
 nodes=[]
 for raw in raw_nodes:
  n=copy.deepcopy(raw);card=n.get('card',{});title=card.get('title') or n.get('title') or n.get('display_label') or n.get('label')
  if not isinstance(title,str) or not title.strip():raise ValueError('Every node needs a title/label')
  n['title']=title;n['summary']=n.get('summary','')
  selection_key={'opportunity':'selected_opportunity_id','idea':'selected_idea_ids','experiment':'selected_experiment_ids'}.get(n['type'])
  n['selected']=n['id'] in selected if selection_key in state else bool(n.get('selected')) or n.get('status')=='selected'
  n['on_path']=n['selected'] or n['type']=='goal'
  n['recommended']=n['id'] in recommended if 'recommended_next_experiment_ids' in state or 'recommended_next_experiment_id' in state else bool(n.get('recommended'))
  status=n.get('status','draft');status_key='selected_status' if status=='selected' else status
  n['status_label']=n.get('status_label') or ui.get(status_key,status)
  n['link']=source_link(n.get('artifact_path') or n.get('source_path'),cycle,output)
  if n.get('preview_blocks') is not None:preview=n['preview_blocks']
  elif n['type']=='experiment' and card:preview=[dict(label=ui[caption],body=card.get(key,'')) for caption,key in [('hypothesis','hypothesis'),('method','experiment'),('measure','observable')]]
  else:preview=[dict(label='',body=n.get('description') or n['summary'] or title)]
  if not isinstance(preview,list) or any(not isinstance(b,dict) or not isinstance(b.get('body'),str) for b in preview):raise ValueError('Invalid preview_blocks')
  n['preview_blocks']=preview;nodes.append(n)
 by_id={n['id']:n for n in nodes}
 edges=[]
 for e in raw_edges:
  e=copy.deepcopy(e);e['evidence']='evidence' in e.get('type','') or 'reference' in e.get('type','') or by_id[e['source']]['type']=='signal' or e.get('type')=='baseline_source'
  e['on_path']=not e['evidence'] and by_id[e['source']]['on_path'] and by_id[e['target']]['on_path'];edges.append(e)
 return dict(language=lang,ui=ui,nodes=nodes,edges=edges,stage=state.get('current_stage',''),question=state.get('working_question') or state.get('context',{}).get('working_question') or '',revision=state.get('tree',{}).get('revision',1),project_context=project_context(state,nodes,ui,cycle,output))

LAYOUT='''
.project-context{padding:20px 24px;margin-bottom:20px;border:1px solid var(--line);border-radius:16px;background:white}.project-context h2{font-size:24px;margin:0 0 12px}.project-context .context-header{display:flex;justify-content:space-between;align-items:center;gap:16px}.project-context dl{display:grid;grid-template-columns:1fr 1fr 2fr;gap:20px;margin:16px 0}.project-context dt{font-size:12px;color:var(--quiet);margin-bottom:6px}.project-context dd{font-size:14px;color:var(--muted);margin:0;white-space:pre-line}.checkpoint{font-size:13px;color:var(--ink);margin:12px 0 0}.project-context a{font-size:13px}@media(max-width:700px){.project-context dl{grid-template-columns:1fr}.project-context .context-header{align-items:flex-start;flex-direction:column}}
.shell{max-width:1800px;margin:auto;padding:24px}.heading{display:flex;justify-content:space-between;align-items:center;gap:24px;margin-bottom:20px}.heading p{color:var(--muted);max-width:850px}.board{position:relative;border:1px solid var(--line);border-radius:16px;background:var(--surface);overflow:auto;padding:40px;height:72vh;min-height:360px}.canvas{position:relative}.view-controls{display:flex;align-items:center;flex-wrap:wrap;gap:10px;margin:0 0 14px}.view-controls button{min-width:40px;min-height:36px;padding:6px 14px;border-radius:8px}.view-controls label{font-size:12px;color:var(--muted);margin-left:8px}.view-controls input{width:150px;accent-color:var(--ink)}.view-controls output{font-variant-numeric:tabular-nums;font-size:12px;min-width:42px;text-align:center}.view-controls button:disabled{opacity:.35;cursor:default}.world{position:absolute;left:0;top:0;width:max-content;min-width:0;transform-origin:0 0}.axis{position:relative;z-index:1}.lane{position:absolute;top:0;width:280px}.lane h2{position:absolute;top:0;left:0;width:280px;margin:0;font-size:12px;line-height:18px;color:var(--muted)}.stack{display:block}.stack .node{position:absolute;left:0}.node{display:block;width:280px;min-height:155px;padding:18px;border-radius:16px;text-align:left;font-size:13px;background:white}.node.selected-path{padding:16px;border:3px solid var(--ink)}.node.recommended{padding:17px;border:2px dashed var(--muted)}.node.selected-path.recommended{border:3px solid var(--ink);padding:16px}.node:focus-visible{outline-offset:5px}.node h3{font-size:14px;font-weight:500;margin:12px 0 8px}.node p{font-size:13px;color:var(--muted);margin-bottom:0}.node .meta{display:flex;align-items:center;justify-content:space-between;color:var(--quiet);font-size:12px}.node .status-line{display:block;margin-top:14px;color:var(--muted);font-size:12px}.signals{position:relative;z-index:1;margin-top:96px;padding-top:32px;border-top:1px solid var(--line)}.signal-list{display:flex;flex-wrap:wrap;gap:36px}.connections{position:absolute;left:0;top:0;pointer-events:none;overflow:visible}.edge{fill:none;stroke:#C9C9C9;stroke-width:1.2}.edge.evidence{stroke-dasharray:4 5}.edge.on-path{stroke:var(--ink);stroke-width:3}.edge.inspected-edge{stroke:#2563EB;stroke-width:3.5;vector-effect:non-scaling-stroke}.inspected{box-shadow:0 0 0 4px #2563EB24}.legend{display:flex;gap:18px;flex-wrap:wrap;font-size:12px;color:var(--muted);margin:16px 0}.legend span{display:inline-flex;gap:8px;align-items:center}.swatch{width:12px;height:12px;border:2px solid var(--ink);border-radius:3px}.swatch.recommendation{border:1px dashed var(--muted)}.detail{position:fixed;right:24px;top:24px;width:420px;max-width:calc(100vw - 48px);max-height:calc(100vh - 48px);overflow:auto;padding:24px;background:white;border:1px solid var(--line);border-radius:16px;box-shadow:var(--shadow);z-index:5}.detail[hidden]{display:none}.detail-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:18px;color:var(--quiet);font-size:12px}.detail h2{font-size:24px}.detail p{font-size:14px;color:var(--muted)}.detail h3{font-size:13px;margin-top:18px}.empty{padding:24px;color:var(--muted)}.hint{font-size:12px;color:var(--quiet)}@media(max-width:700px){.shell{padding:16px}.heading{align-items:flex-start;flex-direction:column;gap:8px}.board{padding:20px}.detail{top:auto;bottom:12px;left:12px;right:12px;max-width:none;width:auto;max-height:65vh}}@media print{.view-controls{display:none}.board{height:auto;min-height:0;max-height:none;overflow:visible}.canvas{width:auto!important;height:auto!important}.world{position:relative;transform:none!important}.detail{display:none}.world{min-width:0}.node{break-inside:avoid}.hint{display:none}}
'''
JS='''
const DATA=JSON.parse(document.getElementById('tree-data').textContent);const buttons=[...document.querySelectorAll('[data-node]')],world=document.getElementById('world'),svg=document.getElementById('connections'),detail=document.getElementById('detail');
const nodes=new Map(DATA.nodes.map(n=>[n.id,n]));
let inspectedNodeId=null;
function isInspectedEdge(edge){return inspectedNodeId!==null&&(edge.source===inspectedNodeId||edge.target===inspectedNodeId);}
function isVisibleEdge(edge){const signalLink=edge.evidence&&nodes.get(edge.source)?.type==='signal';return !signalLink||(inspectedNodeId!==null&&edge.target===inspectedNodeId);}

const board=document.getElementById('board'),canvas=document.getElementById('canvas'),zoomRange=document.getElementById('view-scale'),zoomValue=document.getElementById('view-scale-value'),zoomOut=document.getElementById('view-out'),zoomIn=document.getElementById('view-in');
const MIN_SCALE=.2,MAX_SCALE=1.5;let viewScale=1;
function clampScale(value){return Math.min(MAX_SCALE,Math.max(MIN_SCALE,value));}
function unscaledPoint(x,y,box,scale){return {x:(x-box.left)/scale,y:(y-box.top)/scale};}

function layoutBranches(rows,edges,siblingGap=36,rootGap=72){
 const order=new Map(rows.map((row,index)=>[row.id,index])),rowById=new Map(rows.map(row=>[row.id,row])),children=new Map(rows.map(row=>[row.id,[]])),parent=new Map();
 for(const edge of edges){const from=rowById.get(edge.source),to=rowById.get(edge.target);if(edge.evidence||!from||!to||from.column>=to.column||parent.has(to.id))continue;children.get(from.id).push(to.id);parent.set(to.id,from.id);}
 for(const list of children.values())list.sort((a,b)=>order.get(a)-order.get(b));
 function branch(id){const row=rowById.get(id),list=children.get(id);if(!list.length)return {positions:new Map([[id,0]]),min:-row.height/2,max:row.height/2};
  const placed=[];let cursor=0;for(const child of list){const tree=branch(child),shift=cursor-tree.min;placed.push({tree,shift,center:shift});cursor=tree.max+shift+siblingGap;}
  const center=(placed[0].center+placed[placed.length-1].center)/2,positions=new Map([[id,0]]);let min=-row.height/2,max=row.height/2;
  for(const item of placed){const shift=item.shift-center;for(const [key,y] of item.tree.positions)positions.set(key,y+shift);min=Math.min(min,item.tree.min+shift);max=Math.max(max,item.tree.max+shift);}
  return {positions,min,max};
 }
 const roots=rows.filter(row=>!parent.has(row.id)),positions=new Map();let cursor=0;
 for(const root of roots){const tree=branch(root.id),shift=cursor-tree.min;for(const [id,y] of tree.positions)positions.set(id,y+shift);cursor=tree.max+shift+rootGap;}
 return {positions,height:roots.length?cursor-rootGap:0,children};
}
function layoutTree(){const axis=document.getElementById('axis'),lanes=[...axis.querySelectorAll('.lane')];if(!lanes.length)return;const rows=[];
 lanes.forEach((lane,column)=>{lane.style.left=column*360+'px';for(const button of lane.querySelectorAll('[data-node]'))rows.push({id:button.dataset.node,height:button.offsetHeight,column});});
 const layout=layoutBranches(rows,DATA.edges),headingSpace=Math.max(...lanes.map(lane=>lane.querySelector('h2').offsetHeight))+28,width=lanes.length*280+(lanes.length-1)*80,height=headingSpace+layout.height;
 axis.style.width=width+'px';axis.style.height=height+'px';world.style.width=width+'px';
 for(const lane of lanes){lane.style.height=height+'px';for(const button of lane.querySelectorAll('[data-node]'))button.style.top=(headingSpace+layout.positions.get(button.dataset.node)-button.offsetHeight/2)+'px';}
}

function updateCanvas(){canvas.style.width=Math.ceil(world.offsetWidth*viewScale)+'px';canvas.style.height=Math.ceil(world.offsetHeight*viewScale)+'px';}
function setViewScale(value,preserveCenter=true){const next=clampScale(value);const inset=parseFloat(getComputedStyle(board).paddingLeft)||0;const cx=board.clientWidth/2,cy=board.clientHeight/2;const anchorX=(board.scrollLeft+cx-inset)/viewScale,anchorY=(board.scrollTop+cy-inset)/viewScale;viewScale=next;world.style.transform='scale('+viewScale+')';zoomRange.value=String(Math.round(viewScale*100));zoomValue.value=Math.round(viewScale*100)+'%';zoomValue.textContent=zoomValue.value;zoomOut.disabled=viewScale<=MIN_SCALE;zoomIn.disabled=viewScale>=MAX_SCALE;updateCanvas();connect();if(preserveCenter){board.scrollLeft=anchorX*viewScale+inset-cx;board.scrollTop=anchorY*viewScale+inset-cy;}else{board.scrollLeft=0;board.scrollTop=0;}}
zoomOut.addEventListener('click',()=>setViewScale(viewScale-.1));zoomIn.addEventListener('click',()=>setViewScale(viewScale+.1));zoomRange.addEventListener('input',()=>setViewScale(Number(zoomRange.value)/100));document.getElementById('view-reset').addEventListener('click',()=>setViewScale(1));document.getElementById('view-fit').addEventListener('click',()=>{const inset=parseFloat(getComputedStyle(board).paddingLeft)||0;setViewScale(Math.min((board.clientWidth-2*inset)/world.offsetWidth,(board.clientHeight-2*inset)/world.offsetHeight),false);});

function connect(){const box=world.getBoundingClientRect();svg.replaceChildren();svg.setAttribute('width',world.offsetWidth);svg.setAttribute('height',world.offsetHeight);for(const e of DATA.edges){if(!isVisibleEdge(e))continue;const a=buttons.find(b=>b.dataset.node===e.source),b=buttons.find(b=>b.dataset.node===e.target);if(!a||!b)continue;const ar=a.getBoundingClientRect(),br=b.getBoundingClientRect();let from=unscaledPoint(ar.right,ar.top+ar.height/2,box,viewScale),to=unscaledPoint(br.left,br.top+br.height/2,box,viewScale);if(e.evidence&&nodes.get(e.source).type==='signal'){from=unscaledPoint(ar.left+ar.width/2,ar.top,box,viewScale);to=unscaledPoint(br.left+br.width/2,br.bottom,box,viewScale);}const p=document.createElementNS('http://www.w3.org/2000/svg','path');p.setAttribute('d',`M ${from.x} ${from.y} C ${(from.x+to.x)/2} ${from.y}, ${(from.x+to.x)/2} ${to.y}, ${to.x} ${to.y}`);p.setAttribute('class','edge'+(e.evidence?' evidence':'')+(e.on_path?' on-path':'')+(isInspectedEdge(e)?' inspected-edge':''));p.dataset.source=e.source;p.dataset.target=e.target;svg.append(p);}for(const path of [...svg.querySelectorAll('.inspected-edge')])svg.append(path);}

function close(redraw=true){inspectedNodeId=null;detail.hidden=true;buttons.forEach(b=>{b.classList.remove('inspected');b.setAttribute('aria-expanded','false');});if(redraw)connect();}
buttons.forEach(button=>button.addEventListener('click',()=>{close(false);const n=nodes.get(button.dataset.node);inspectedNodeId=n.id;detail.hidden=false;button.classList.add('inspected');button.setAttribute('aria-expanded','true');document.getElementById('detail-kind').textContent=n.id+' · '+n.status_label;document.getElementById('detail-title').textContent=n.title;const content=document.getElementById('detail-copy');content.replaceChildren();for(const block of n.preview_blocks){if(block.label){const h=document.createElement('h3');h.textContent=block.label;content.append(h);}const p=document.createElement('p');p.textContent=block.body;content.append(p);}const source=document.getElementById('detail-source');source.hidden=!n.link;if(n.link)source.setAttribute('href',n.link);connect();}));
document.getElementById('close').addEventListener('click',close);addEventListener('keydown',e=>{if(e.key==='Escape')close();});const layoutObserver=new ResizeObserver(()=>{layoutTree();updateCanvas();connect();});for(const button of document.getElementById('axis').querySelectorAll('[data-node]'))layoutObserver.observe(button);if(document.fonts)document.fonts.ready.then(()=>{layoutTree();updateCanvas();connect();});layoutTree();setViewScale(1,false);
'''

def render(data,css):
 ui=data['ui'];context=data['project_context']
 context_fields=''.join(f'<div><dt>{esc(ui[key])}</dt><dd>{esc(context[key])}</dd></div>' for key in ['description','audience','outcome'])
 context_link=f'<a href="{esc(context["link"])}">{esc(ui["context_source"])}</a>' if context['link'] else ''
 checkpoint=f'<p class="checkpoint" role="status">{esc(context["checkpoint"])}</p>' if context['checkpoint'] else ''
 context_html=f'<section class="project-context" id="project-context" aria-label="{esc(ui["product_context"])}"><div class="context-header"><h2>{esc(ui["product"])}: {esc(context["product"])}</h2><span class="status">{esc(context["review"])}</span></div><dl>{context_fields}</dl>{context_link}{checkpoint}</section>'
 def card(n):
  summary=n['summary'] or n.get('card',{}).get('hypothesis','')
  kind='selected-path' if n['on_path'] else ''
  if n['recommended']:kind+=' recommended'
  mark=' · '+ui['recommended'] if n['recommended'] else ''
  icon='<svg class="card-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M4 3h12v14H4ZM7 7h6M7 11h6"/></svg>'
  return f'<button class="node {kind}" type="button" data-node="{esc(n["id"])}" aria-controls="detail" aria-expanded="false"><span class="meta"><span>{esc(n["id"])}</span>{icon}</span><h3>{esc(n["title"])}</h3><p>{esc(summary)}</p><span class="status-line">{esc(n["status_label"]+mark)}</span></button>'
 columns=[]
 for kind in TYPES[:-1]:
  items=[n for n in data['nodes'] if n['type']==kind]
  if items:columns.append(f'<section class="lane"><h2>{esc(ui[kind])}</h2><div class="stack">'+''.join(card(n) for n in items)+'</div></section>')
 signals=[n for n in data['nodes'] if n['type']=='signal'];signal_html=f'<section class="signals"><h2>{esc(ui["signals"])}</h2><div class="signal-list">'+''.join(card(n) for n in signals)+'</div></section>' if signals else ''
 empty=f'<p class="empty">{esc(ui["empty"])}</p>' if not data['nodes'] else ''
 return f'''<!doctype html><html lang="{esc(data['language'])}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{esc(ui['title'])}</title><style>{css}\n{LAYOUT}</style></head><body><main class="shell"><header class="heading"><div><h1>{esc(ui['title'])}</h1><p>{esc(data['question'])}</p></div><span class="status">{esc(ui['stage'])}: {esc(ui.get(data['stage'],data['stage']))} · r{data['revision']}</span></header>{context_html}<div class="view-controls" role="group" aria-label="{esc(ui['zoom_controls'])}"><button id="view-out" type="button" aria-label="{esc(ui['zoom_out'])}">−</button><label for="view-scale">{esc(ui['zoom_scale'])}</label><input id="view-scale" type="range" min="20" max="150" step="1" value="100"><output id="view-scale-value" for="view-scale" aria-live="polite">100%</output><button id="view-in" type="button" aria-label="{esc(ui['zoom_in'])}">+</button><button id="view-reset" type="button">{esc(ui['zoom_reset'])}</button><button id="view-fit" type="button">{esc(ui['zoom_fit'])}</button></div><div class="board" id="board"><div class="canvas" id="canvas"><div class="world" id="world"><svg id="connections" class="connections" aria-hidden="true"></svg><div class="axis" id="axis">{''.join(columns)}</div>{signal_html}{empty}</div></div></div><div class="legend"><span><i class="swatch"></i>{esc(ui['selected'])}</span><span><i class="swatch recommendation"></i>{esc(ui['recommended'])}</span></div><p class="hint">{esc(ui['hint'])}</p></main><aside class="detail" id="detail" aria-labelledby="detail-title" hidden><div class="detail-head"><span id="detail-kind"></span><button id="close" type="button">{esc(ui['close'])}</button></div><h2 id="detail-title"></h2><div id="detail-copy"></div><a id="detail-source" class="cta">{esc(ui['source'])}</a></aside><script type="application/json" id="tree-data">{json_safe(data)}</script><script>{JS}</script></body></html>'''

def mermaid(data):
 ids={n['id']:'n'+str(i) for i,n in enumerate(data['nodes'])}
 lines=['graph LR','  %% Only existing nodes; hypotheses are inside experiments.']
 context=data['project_context']
 for key in ['product','description','audience','outcome']:
  lines.append('  %% '+key+': '+str(context[key]).replace('\r',' ').replace('\n',' '))
 for n in data['nodes']:
  text=esc(n['title']).replace('"','#quot;').replace('\n',' ')
  lines.append(f'  {ids[n["id"]]}["{esc(n["id"])}<br/>{text}<br/>{esc(n["status_label"])}"]')
 for e in data['edges']:lines.append(f'  {ids[e["source"]]} '+('-.->' if e['evidence'] else '-->')+f' {ids[e["target"]]}')
 lines+=['  classDef selected fill:#FFFFFF,stroke:#292929,stroke-width:3px;','  classDef recommended fill:#FFFFFF,stroke:#5D5D5D,stroke-width:2px,stroke-dasharray:5 4;']
 for n in data['nodes']:
  if n['on_path']:lines.append(f'  class {ids[n["id"]]} selected;')
  elif n['recommended']:lines.append(f'  class {ids[n["id"]]} recommended;')
 return '\n'.join(lines)+'\n'

def export(state_path,output,snapshot=False,validate_only=False):
 state=json.loads(state_path.read_text(encoding='utf-8'));cycle=state_path.parent
 projection=state.get('tree',{}).get('projection_path');graph=json.loads((cycle/projection).read_text(encoding='utf-8')) if projection else dict(nodes=state.get('nodes',[]),edges=state.get('edges',[]))
 data=normalize(state,graph,cycle,output)
 if validate_only:return data
 css=(Path(__file__).resolve().parents[1]/'assets/html-style.css').read_text(encoding='utf-8');document=render(data,css);mmd=mermaid(data)
 revision=data['revision']
 if not isinstance(revision,int) or isinstance(revision,bool) or revision<1:raise ValueError('tree.revision must be a positive integer')
 files={'state.json':state_path.read_bytes(),'graph.json':dump(data).encode(),'tree.mmd':mmd.encode()}
 snap=output.parent/'snapshots'/f'r{revision:04d}'
 manifest=dict(revision=revision,sha256={name:hashlib.sha256(content).hexdigest() for name,content in files.items()})
 # Nigdy nie nadpisujemy innej migawki pod tym samym numerem.
 if snapshot and snap.exists():
  if not (snap/'manifest.json').exists() or json.loads((snap/'manifest.json').read_text())!=manifest:raise ValueError('Snapshot already exists with different contents; increment tree.revision')
  if any(not (snap/name).exists() or (snap/name).read_bytes()!=content for name,content in files.items()):raise ValueError('Existing snapshot is incomplete or changed; do not overwrite it')
 output.parent.mkdir(parents=True,exist_ok=True)
 if snapshot and not snap.exists():
  snap.mkdir(parents=True)
  for name,content in files.items():(snap/name).write_bytes(content)
  (snap/'manifest.json').write_text(dump(manifest),encoding='utf-8')
 output.write_text(document,encoding='utf-8');output.with_suffix('.mmd').write_text(mmd,encoding='utf-8');return data

def main():
 p=argparse.ArgumentParser(description=__doc__);p.add_argument('state',type=Path);p.add_argument('--output',type=Path);p.add_argument('--snapshot',action='store_true');p.add_argument('--validate-only',action='store_true');a=p.parse_args()
 output=a.output or a.state.parent/'tree/tree.html'
 try:
  data=export(a.state,output,a.snapshot,a.validate_only);print(f'{len(data["nodes"])} nodes, {len(data["edges"])} edges; '+('validated' if a.validate_only else str(output)))
 except (ValueError,OSError,KeyError,TypeError) as e:p.exit(1,f'Error: {e}\n')
if __name__=='__main__':main()
