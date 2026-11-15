"""Shared helpers: convert original inline HTML to the content mini-markup.

*text*        -> <em>text</em>
[text](href)  -> <a href>text</a>
"""
import re, html

def href(h):
    h = html.unescape(h)
    m = re.match(r'^([a-z-]+)\.html(#.*)?$', h)
    if m:
        page = '' if m.group(1) == 'index' else m.group(1)
        return '/' + page + (m.group(2) or '')
    return h

def to_markup(fragment):
    s = re.sub(r'<svg.*?</svg>', '', fragment, flags=re.S)
    s = re.sub(r'<(em|i)\b[^>]*>(.*?)</\1>', lambda m: '*' + m.group(2).strip() + '*' if m.group(2).strip() else '', s, flags=re.S)
    s = re.sub(r'<a\b[^>]*href="([^"]*)"[^>]*>(.*?)</a>', lambda m: '[' + re.sub(r'<[^>]+>', '', m.group(2)).strip() + '](' + href(m.group(1)) + ')', s, flags=re.S)
    s = re.sub(r'<br\s*/?>', ' ', s)
    s = re.sub(r'<[^>]+>', '', s)
    s = html.unescape(s)
    return ' '.join(s.split())
