"""One-off migration: collect the original site's inline SVGs into one sprite.

Usage: python3 -I scripts/migration/build-sprite.py <original-site-dir> <out-sprite> <out-names-ts>
Kept for provenance; the sprite is now edited directly (see README, Icons).
"""
import re, sys, hashlib, glob, os

src, out, names_out = sys.argv[1:4]
NAMES = {
  '63dc61': 'chat', '4943e0': 'user', '681784': 'translate', 'bad5d1': 'calendar', '031b24': 'book-open',
  'a877b2': 'speech-bubbles', '7e16e6': 'flow-before', '301db5': 'flow-during', 'd4c156': 'flow-after',
  'db32b2': 'templates', 'c27226': 'download', '3d5ec6': 'arrow-link', '74f10f': 'people-doodle',
  '81a21b': 'calendar-check', 'ccb107': 'arrow-up', 'eb5463': 'sign-research', '4d7868': 'sign-manifest',
  '35694a': 'sign-shield', '36a9dd': 'thread-mid', 'c625d7': 'thread-branch', 'b0d035': 'thread-short',
  'a11a0b': 'thread', 'fefe26': 'thread-long', '3775ff': 'thread-long-alt', 'd6c759': 'thread-loop',
  'b8d586': 'thread-alt', '1fcb21': 'thread-out', '020a1a': 'paper-download', 'fe34d0': 'download-pill',
  '0e0603': 'linkedin', '03dd48': 'pencils', 'e9f608': 'mail', 'd37f97': 'price-pay-per-use',
  'd60a2d': 'price-standard', '546775': 'price-plus', '780c3f': 'price-organisation', 'd6b4a2': 'fact-fast',
  '95d0fc': 'fact-no-training', 'b0d59d': 'fact-home', 'fc4c72': 'fact-language', 'e04a37': 'plus',
  '5dde74': 'tag-medendo', 'e2abcf': 'tag-vertic', 'c7d2fc': 'tag-ontzorgd', 'd4eb7d': 'tag-medicore',
  'b4d663': 'shield', 'f6aa96': 'badge-check', 'e96e1b': 'step-input', 'a6ce38': 'step-pseudonymise',
  '36ec14': 'step-ai', '6f0027': 'step-delete', '61dbf5': 'step-store', 'f20d03': 'scribble',
}
# presentation that the original applied through CSS, per family
STROKE = 'fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"'
FAMILY = {
  'price-icon': STROKE + ' stroke-width="2"', 'm-thread': STROKE + ' stroke-width="3.2"',
  'scribble': STROKE + ' stroke-width="1.3"',
}
symbols = {}
for f in sorted(glob.glob(os.path.join(src, '*.html'))):
    s = open(f, encoding='utf-8').read()
    for m in re.finditer(r'<svg[^>]*>.*?</svg>', s, re.S):
        svg = m.group(0)
        h = hashlib.md5(re.sub(r'\s+', ' ', svg).encode()).hexdigest()[:6]
        if h not in NAMES or NAMES[h] in symbols:
            continue
        open_tag = re.match(r'<svg([^>]*)>', svg).group(1)
        cls = (re.search(r'class="([^"]*)"', open_tag) or [None, ''])[1]
        vb = re.search(r'viewBox="([^"]*)"', open_tag).group(1)
        attrs = ' '.join(re.findall(r'\b(?:fill|stroke|stroke-width|stroke-linecap|stroke-linejoin)="[^"]*"', open_tag))
        for k, v in FAMILY.items():
            if k in cls.split():
                attrs = v
        inner = svg[len(re.match(r'<svg[^>]*>', svg).group(0)):-len('</svg>')]
        if NAMES[h].startswith('sign-'):
            # the pencil signs: the drawn lines are stroked, the pencil itself is filled
            inner = inner.replace('class="sign-line"', 'pathLength="1" fill="none" stroke="currentColor" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"')
            inner = inner.replace('fill="black"', 'fill="currentColor"')
            attrs = 'fill="currentColor"'
        inner = re.sub(r'\s(?:data-[a-z-]+|class)="[^"]*"', '', inner)
        symbols[NAMES[h]] = f'<symbol id="{NAMES[h]}" viewBox="{vb}"><g {attrs}>{inner.strip()}</g></symbol>'

# the wordmark and the four app icons used by the hero animation
logo = open(os.path.join(src, 'assets', 'logo.svg'), encoding='utf-8').read()
vb = re.search(r'viewBox="([^"]*)"', logo).group(1)
inner = re.sub(r'^.*?<svg[^>]*>|</svg>\s*$', '', logo, flags=re.S).replace('fill="black"', 'fill="currentColor"').replace('fill="#141210"', 'fill="currentColor"').replace('fill="#292E31"', 'fill="currentColor"')
symbols['logo'] = f'<symbol id="logo" viewBox="{vb}">{inner.strip()}</symbol>'
symbols['document'] = '<symbol id="document" viewBox="0 0 20 20"><path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M16.5 15.5V7.414C16.4999 7.14881 16.3945 6.89449 16.207 6.707L11.793 2.293C11.6055 2.10545 11.3512 2.00006 11.086 2H3.5V15.5C3.5 16.163 3.76339 16.7989 4.23223 17.2678C4.70107 17.7366 5.33696 18 6 18H14C14.663 18 15.2989 17.7366 15.7678 17.2678C16.2366 16.7989 16.5 16.163 16.5 15.5ZM15 15.5V8.5H10V3.5H5V15.5C5 15.7652 5.10536 16.0196 5.29289 16.2071C5.48043 16.3946 5.73478 16.5 6 16.5H14C14.2652 16.5 14.5196 16.3946 14.7071 16.2071C14.8946 16.0196 15 15.7652 15 15.5ZM11.5 7V4.121L14.379 7H11.5ZM7.13 7H6.505V8.25H8.625V7H7.13ZM6.505 10H13.625V11.25H6.505V10ZM7.13 13H6.505V14.25H13.625V13H7.13Z"/></symbol>'
symbols['print'] = '<symbol id="print" viewBox="0 0 20 20"><g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"><path d="M5 7V2H15V7M5 15H3C2.448 15 2 14.552 2 14V9C2 7.895 2.895 7 4 7H16C17.105 7 18 7.895 18 9V14C18 14.552 17.552 15 17 15H15M5 12H15V18H5V12Z"/><path d="M14.5 9.5H15.5"/></g></symbol>'
symbols['send'] = '<symbol id="send" viewBox="0 0 20 20"><path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M16.7485 2.29395L2.74847 7.29395L2.73047 8.69994L8.81547 11.0399C8.84805 11.0526 8.87761 11.072 8.90224 11.0968C8.92687 11.1216 8.94602 11.1513 8.95847 11.1839L11.3005 17.2699L12.7075 17.2529L17.7075 3.25295L16.7495 2.29495L16.7485 2.29395ZM9.31447 9.62495L5.15747 8.02595L14.1115 4.82795L9.31447 9.62495ZM10.3745 10.6849L11.9745 14.8429L15.1725 5.88895L10.3755 10.6859L10.3745 10.6849Z"/></symbol>'
symbols['upload'] = '<symbol id="upload" viewBox="0 0 20 20"><path fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M10 13V3M10 3L6 7M10 3L14 7M4 12V16H16V12"/></symbol>'

missing = sorted(set(NAMES.values()) - set(symbols))
if missing:
    sys.exit(f'missing symbols: {missing}')
names = sorted(symbols)
with open(out, 'w', encoding='utf-8') as fh:
    fh.write('<svg xmlns="http://www.w3.org/2000/svg">\n' + '\n'.join(symbols[n] for n in names) + '\n</svg>\n')
with open(names_out, 'w', encoding='utf-8') as fh:
    fh.write('/** Every symbol in public/icons/sprite.svg. Kept in sync by tests/icons.test.ts. */\n')
    fh.write('export const iconNames = [\n' + ''.join(f'  "{n}",\n' for n in names) + '] as const;\n\n')
    fh.write('export type IconName = (typeof iconNames)[number];\n\n')
    fh.write('/** Each symbol\'s viewBox, so an icon keeps its own proportions. */\n')
    fh.write('export const iconViewBoxes: Record<IconName, string> = {\n' + ''.join(f'  "{n}": "{re.search(chr(118)+"iewBox=\"([^\"]*)", symbols[n]).group(1)}",\n' for n in names) + '};\n')
print(len(names), 'symbols')
