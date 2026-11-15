"""One-off migration: collect the English translations the original site kept in
data-en* attributes into content/translations/en.ts (NL markup -> EN markup)."""
import re, sys, glob, os, html, json
sys.path.insert(0, os.path.dirname(__file__))
from markup import to_markup

src, out = sys.argv[1:3]
pairs = {}
for f in sorted(glob.glob(os.path.join(src, '*.html'))):
    s = open(f, encoding='utf-8').read()
    # element text
    for m in re.finditer(r'<([a-z0-9]+)\b([^>]*?)\sdata-en="([^"]*)"([^>]*)>(.*?)</\1>', s, re.S):
        nl = to_markup(m.group(5)); en = to_markup(html.unescape(m.group(3)))
        if nl and en: pairs.setdefault(nl, en)
    for attr, nlattr in (('alt', 'alt'), ('aria', 'aria-label'), ('placeholder', 'placeholder')):
        for m in re.finditer(r'<[a-z]+\b[^>]*>', s):
            tag = m.group(0)
            e = re.search(r'data-en-' + attr + r'="([^"]*)"', tag); n = re.search(r'\s' + nlattr + r'="([^"]*)"', tag)
            if e and n and n.group(1):
                pairs.setdefault(html.unescape(n.group(1)), html.unescape(e.group(1)))
    t = re.search(r'<title[^>]*data-en="([^"]*)"[^>]*>(.*?)</title>', s)
    if t: pairs.setdefault(html.unescape(t.group(2)), html.unescape(t.group(1)))
    d = re.search(r'<meta name="description" content="([^"]*)" data-en="([^"]*)"', s)
    if d: pairs.setdefault(html.unescape(d.group(1)), html.unescape(d.group(2)))

with open(out, 'w', encoding='utf-8') as fh:
    fh.write('/**\n * English translations captured from the original site (its hidden EN toggle).\n'
             ' * Keyed by the Dutch source string, in the same mini-markup as the content files.\n'
             ' * Not routed yet: this is the dictionary a future /en locale will use.\n */\n')
    fh.write('export const en: Readonly<Record<string, string>> = ' + json.dumps(pairs, ensure_ascii=False, indent=2) + ';\n')
print(len(pairs), 'pairs')
