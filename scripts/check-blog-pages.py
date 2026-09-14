"""Validate published blog HTML, navigation, schema, charts and discovery feeds.

Run against a local production server: python3 scripts/check-blog-pages.py
Optional first argument overrides http://localhost:3100.
"""
import json
import sys
from html.parser import HTMLParser
from urllib.parse import unquote, urlsplit
from urllib.request import urlopen

SLUGS = [
    'web-sitesi-yenileme-seo-gecis-plani',
    'b2b-landing-page-teklif-toplama',
    'erisilebilir-web-tasarimi-form-rehberi',
]
BASE = sys.argv[1].rstrip('/') if len(sys.argv) > 1 else 'http://localhost:3100'


class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = []
        self.links = []
        self.schemas = []
        self.in_schema = False
        self.buffer = ''
        self.h1 = 0
        self.alternates = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if 'id' in attrs:
            self.ids.append(attrs['id'])
        if tag == 'a':
            self.links.append(attrs.get('href', ''))
        if tag == 'h1':
            self.h1 += 1
        if tag == 'link' and attrs.get('hreflang'):
            self.alternates.append(attrs['hreflang'])
        if tag == 'script' and attrs.get('type') == 'application/ld+json':
            self.in_schema = True
            self.buffer = ''

    def handle_data(self, data):
        if self.in_schema:
            self.buffer += data

    def handle_endtag(self, tag):
        if tag == 'script' and self.in_schema:
            self.schemas.append(json.loads(self.buffer))
            self.in_schema = False


def read(route):
    with urlopen(BASE + route, timeout=30) as response:
        assert response.status == 200, route
        return response.read().decode()


links = set()
for slug in SLUGS:
    html = read('/tr/blog/' + slug)
    page = Page()
    page.feed(html)
    assert page.h1 == 1, slug
    assert len(page.ids) == len(set(page.ids)), (slug, 'Duplicate IDs')
    anchors = [href for href in page.links if href.startswith('#')]
    assert all(unquote(href[1:]) in page.ids for href in anchors), (slug, 'Broken anchor')
    assert sorted(page.alternates) == ['tr', 'x-default'], (slug, 'Nonexistent translation')
    article = next(item for item in page.schemas if item.get('@type') == 'BlogPosting')
    faq = next(item for item in page.schemas if item.get('@type') == 'FAQPage')
    assert article['author']['@type'] == 'Organization'
    assert len(article['citation']) >= 3
    assert len(faq['mainEntity']) >= 5
    assert html.count('<details class="mdx-chart-data"') == 2
    assert article['timeRequired'].startswith('PT')
    for citation in article['citation']:
        assert citation['url'] in page.links, (slug, 'Invisible citation')
    links.update(href for href in page.links if href.startswith('/tr/'))
    with urlopen(BASE + urlsplit(article['image']).path, timeout=30) as response:
        assert response.headers['Content-Type'].startswith('image/')
    print(slug, 'PASS:', len(anchors), 'anchors,', len(faq['mainEntity']), 'FAQ items')

for link in sorted(links):
    read(link)
print('Internal URLs:', len(links), 'all HTTP 200')
for route in ['/sitemap.xml', '/tr/rss.xml', '/tr/blog']:
    html = read(route)
    assert all(slug in html for slug in SLUGS), route
    print(route, 'all three posts present')
