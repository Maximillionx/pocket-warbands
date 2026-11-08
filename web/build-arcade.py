import json, pathlib
src = (pathlib.Path(__file__).resolve().parent.parent/'game'/'pocket-warbands.html').read_text()
cut = src.index('</style>') + len('</style>')
head_part, body_part = src[:cut], src[cut:]
head_part = head_part.replace('<title>Pocket Warbands</title>', '<title>Pocket Warbands · Max Skuse Arcade</title>', 1)
meta = '''<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="description" content="Pocket Warbands: a sci-fi strategy roguelite. Raise a warband of named soldiers, liberate the galaxy and face the Architect. Free, in your browser.">
<meta name="theme-color" content="#0b1020">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="Warbands">
<meta property="og:title" content="Pocket Warbands">
<meta property="og:description" content="Raise a warband of named soldiers, liberate the galaxy and face the Architect. Free, in your browser.">
<meta property="og:url" content="https://maxskuse.com/arcade/pocket-warbands/">
<meta property="og:image" content="https://maxskuse.com/arcade/pocket-warbands/img/og.jpg">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="img/favicon-32.png">
<link rel="apple-touch-icon" href="img/apple-touch-icon.png">
<link rel="manifest" href="manifest.webmanifest">
'''
page = '<!doctype html>\n<html lang="en">\n<head>\n' + meta + head_part + '\n</head>\n<body>\n' + body_part + '\n</body>\n</html>\n'
out = pathlib.Path(__file__).resolve().parent/'arcade'/'pocket-warbands'
(out/'index.html').write_text(page)
(out/'manifest.webmanifest').write_text(json.dumps({
  "name":"Pocket Warbands","short_name":"Warbands","start_url":"/arcade/pocket-warbands/","scope":"/arcade/pocket-warbands/",
  "display":"standalone","orientation":"portrait","background_color":"#0b1020","theme_color":"#0b1020",
  "description":"A sci-fi strategy roguelite. Raise a warband, liberate the galaxy.",
  "icons":[{"src":"img/icon-192.png","sizes":"192x192","type":"image/png"},{"src":"img/icon-512.png","sizes":"512x512","type":"image/png","purpose":"any"}]}, indent=2))
print(len(page))
