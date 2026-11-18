#!/usr/bin/env python3
"""Policz wzmianki w CSV, deduplikując identyfikatory doświadczeń."""

import argparse
import csv
import json
import sys
from collections import defaultdict
from pathlib import Path


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('csv_file', type=Path)
    parser.add_argument('--id-column', required=True)
    parser.add_argument('--theme-column', required=True)
    parser.add_argument('--evidence-column')
    parser.add_argument('--exclude-evidence', action='append', default=[])
    parser.add_argument('--scope-column')
    parser.add_argument('--scope', action='append', default=[])
    args = parser.parse_args()
    if args.exclude_evidence and not args.evidence_column:
        parser.error('--exclude-evidence requires --evidence-column')
    if args.scope and not args.scope_column:
        parser.error('--scope requires --scope-column')

    required = {args.id_column, args.theme_column}
    required.update(c for c in (args.evidence_column, args.scope_column) if c)
    experiences = set()
    mentions = defaultdict(set)
    quote_count = 0
    with args.csv_file.open(encoding='utf-8-sig', newline='') as handle:
        reader = csv.DictReader(handle)
        missing = required - set(reader.fieldnames or [])
        if missing:
            raise ValueError('Missing columns: ' + ', '.join(sorted(missing)))
        for line, row in enumerate(reader, start=2):
            if None in row or any(row.get(c) is None for c in required):
                raise ValueError(f'Malformed CSV record near line {line}')
            eid = row[args.id_column].strip()
            if not eid:
                raise ValueError(f'Empty experience ID near line {line}')
            if args.exclude_evidence and row[args.evidence_column].strip() in args.exclude_evidence:
                continue
            if args.scope and row[args.scope_column].strip() not in args.scope:
                continue
            experiences.add(eid)
            quote_count += 1
            for tag in row[args.theme_column].split(';'):
                tag = tag.strip()
                if tag:
                    mentions[tag].add(eid)
    summary = {
        'experience_count': len(experiences),
        'quote_count': quote_count,
        'excluded_evidence': args.exclude_evidence,
        'included_scopes': args.scope,
        'mentions': {
            tag: {'count': len(ids), 'experience_ids': sorted(ids)}
            for tag, ids in sorted(mentions.items(), key=lambda item: (-len(item[1]), item[0]))
        },
    }
    print(json.dumps(summary, ensure_ascii=False, indent=2))


if __name__ == '__main__':
    try:
        main()
    except (OSError, ValueError) as exc:
        print(str(exc), file=sys.stderr)
        sys.exit(1)
