"""One-off migration: the drawn page-intro signs (a pencil drawing an icon) as
typed data for components/ui/pencil-sign.tsx."""
import re, sys, json
src, out = sys.argv[1:3]
signs = {}
for page, name in (('veiligheid', 'shield'), ('onderzoek', 'research'), ('over-ons', 'manifest')):
    html = open(f'{src}/{page}.html', encoding='utf-8').read()
    svg = re.search(r'<svg class="pencil-sign"[^>]*>.*?</svg>', html, re.S).group(0)
    view = re.search(r'viewBox="([^"]+)"', svg).group(1)
    write = re.search(r'data-write="(\d+)"', svg)
    lines = re.findall(r'<path class="sign-line" d="([^"]+)"', svg)
    pen = re.search(r'<g class="sign-pen">(.*)</g>\s*</svg>', svg, re.S).group(1)
    pen = re.sub(r'\s+', ' ', pen).strip()
    signs[name] = {'viewBox': view, 'write': int(write.group(1)) if write else 2600, 'lines': lines, 'pen': pen}
with open(out, 'w', encoding='utf-8') as fh:
    fh.write('/**\n * The drawn page-intro signs: each stroke a pencil draws in turn, and the pencil\n'
             ' * itself (SVG markup in its own coordinates). Extracted from the original site\n'
             ' * by scripts/migration/extract-signs.py; rendered by components/ui/pencil-sign.tsx.\n */\n')
    fh.write('export type Sign = { viewBox: string; write: number; lines: string[]; pen: string };\n\n')
    fh.write('export const signs = ' + json.dumps(signs, indent=2) + ' satisfies Record<string, Sign>;\n\n')
    fh.write('export type SignName = keyof typeof signs;\n')
for k, v in signs.items(): print(k, v['viewBox'], len(v['lines']), 'lines', len(v['pen']), 'pen chars')
