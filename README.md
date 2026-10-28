# Pocket Warbands

A sci-fi roguelite auto-battler for iPhone. Raise a warband of named soldiers, cross five sectors, beat a unique boss in each, and remember your nemeses. It also includes Outpost Defense, a base-building prototype where you fly your commander yourself.

The whole game is one self-contained HTML file, so it runs in any browser with no build step.

## Repo layout

| Folder | What's in it |
|---|---|
| `game/pocket-warbands.html` | The game. Open it in a browser to play. |
| `app/` | Expo wrapper that runs the game full-screen on iPhone through Expo Go. See `app/README.md`. |
| `tools/` | Headless balance bots and a browser smoke test. |
| `docs/ROADMAP.md` | Analysis of where to take the core gameplay next. |
| `docs/MONETIZATION.md` | Monetization model, long-term progression and the ultimate goal. |

## Play in the browser

Open `game/pocket-warbands.html`. For quick testing, the **Test Lab** (title screen, the Lab button in camp, or Settings) jumps to any boss, any Outpost wave, max levels and an animated gallery of every unit, trait effect and boss.

On desktop, the keyboard works too:

| Key | What it does |
|---|---|
| Space or Enter | Presses the main button |
| 1, 2, 3 | Commander abilities in battle |
| S | Skip the battle |
| 1, 2 and F | Outpost abilities and speed |
| Esc | Close a panel |

## Run on iPhone

```
cd app
npm install
npx expo start
```

Scan the QR code with the iPhone camera to open it in Expo Go. After changing the game, copy it into the app and rebuild the embedded copy:

```
cp game/pocket-warbands.html app/scripts/pocket-warbands.html
cd app && npm run build-game
```

## Tools

```
cd tools
npm install
N=5 node campaign-bot-abilities.js    # campaign bot that uses commander abilities
N=5 node campaign-bot.js              # same bot without abilities
S=smart,naive N=3 HERO=warden node outpost-bot.js
```

`browser-smoke-test.py` clicks through every Test Lab action, the settings and the keyboard shortcuts in Chromium using Playwright (`pip install playwright && playwright install chromium`), and writes screenshots to `tools/shots/`. Set `CHROME` to use a Chromium binary you already have.

Rough balance targets: the ability-using campaign bot wins about 30 to 40% of runs, and the smart Outpost bot clears all 8 waves about half the time.
