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

## Progression

- **The galaxy.** Six fronts surround the Architect's Heart. Each campaign launches into one front, and each front changes the rules (swarms in the Hive Nebula, weak healing but rich salvage in the Dead Fleet, and so on). Winning a campaign liberates its front.
- **Doctrines.** Every liberated front unlocks a doctrine: a trade-off you can pick at launch, such as Glass Cannon (+20% damage, -15% health).
- **Threat 1 to 10.** Unlocked after your first win. Each level adds one rule and earns more renown.
- **Hall of Legends.** At the end of a campaign you enshrine a soldier, and you can pick their heir to join a later warband.
- **The Architect.** Liberate all six fronts to open the final front, where a new boss waits at the end of sector 5. It telegraphs a lane-wide beam with a red line and phases out at two thirds and one third health.

## Play in the browser

Open `game/pocket-warbands.html`. For quick testing, the **Test Lab** (title screen, the Lab button in camp, or Settings) jumps to any boss, any Outpost wave and max levels, liberates fronts, unlocks Threat 10, starts the Architect fight, and has an animated gallery of every unit, trait effect and boss.

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

`galaxy-test.py` walks the galaxy flow end to end (launch, win, liberate, the Architect fight). `browser-smoke-test.py` clicks through every Test Lab action, the settings and the keyboard shortcuts in Chromium using Playwright (`pip install playwright && playwright install chromium`), and writes screenshots to `tools/shots/`. Set `CHROME` to use a Chromium binary you already have.

Rough balance targets: the ability-using campaign bot wins about 30 to 40% of runs, and the smart Outpost bot clears all 8 waves about half the time.
