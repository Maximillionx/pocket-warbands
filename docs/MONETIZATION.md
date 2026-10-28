# Monetization and long-term progression

## Short answer

- **Progression first, money second.** Paying only works once players have a reason to come back, and right now a run ends at the Pale Regent with nothing larger to work towards.
- **Recommended model: free to start, one-time unlock, optional cosmetics.** The first sector is free, the full game costs around $5.99, and cosmetics sit on top. No energy timers, no paid power, no loot boxes.
- **Ultimate goal: liberate the galaxy.** Each crowned run frees a region of a galaxy map, harder Threat levels stretch mastery, and veterans from past runs become a Hall of Legends.

## Part 1: progression and the ultimate goal

Roguelites keep people with three loops running at different speeds. Pocket Warbands has the first and a thin second.

| Loop | Length | What it is now | What it should be |
|---|---|---|---|
| Run | 20 to 30 minutes | 5 sectors ending at the Pale Regent | Same, plus a run goal chosen at the start |
| Meta | Weeks | Renown levels unlocking insignia, the codex, daily orders | A galaxy campaign that unlocks new options |
| Mastery | Months | Arena rating | Threat levels, seasons, a final boss |

### The spine: a galaxy map

- **Liberate the galaxy.** A galaxy map with 6 to 8 regions sits above the run. Crowning a run liberates the region you launched from. Each region changes the rules, for example the Hive Nebula (swarms everywhere, double Market stock) or the Dead Fleet (no healing, salvage after every fight).
- **Regions unlock options, not power.** New classes, new commanders with their own rules, new boss variants and new starting choices. A strong player should never have to grind; unlocks make runs different, not easier.
- **Final goal.** Liberate every region to open the last one and its endgame boss, the thing the five bosses were serving. Beating it is the credits moment. That is the clear "I finished it" target the game lacks today.

### Mastery: Threat levels

- After the first crown, unlock **Threat 1 to 10**. Each level adds one rule (elite enemies, a smaller Market, boss enrage timers, a morale cap). This is the Slay the Spire Ascension pattern and is the main reason those games keep people for hundreds of hours.
- Track the highest Threat crowned **per commander**. That gives 3 commanders × 10 levels = 30 visible goals for very little new content.

### Attachment: the Hall of Legends

- Soldiers who survive a crowned run, or reach legendary rank, retire to a **Hall of Legends** with their name, traits and kill count.
- You can bring one legend into a future run as a starting veteran (still level 1, but they keep a signature trait). This makes the named-soldier fantasy, the game's most distinctive feature, pay off across runs instead of resetting.
- Nemeses can carry across runs too: a nemesis who wiped a run may turn up later as an elite, with a big reward for finally killing them.

### Short-term hooks that already exist

- Keep the daily orders and add a **daily seeded run** with a leaderboard: same seed for everyone, one attempt, scores compared. The arena database already handles shared data.
- Turn Arena into **seasons** (6 to 8 weeks) with a cosmetic reward track tied to rating. This is the natural place for any paid season pass later.

## Part 2: monetization options

| Model | How it earns | Fit for this game | Verdict |
|---|---|---|---|
| Premium upfront | One price to download | Proven for roguelites, but a paid download needs a reputation | Not yet, as an unknown game |
| **Free to start, one-time unlock** | First sector free, then a single purchase | Players try before paying; no live ops needed; genre players trust it | **Recommended** |
| Cosmetics | Paints, visors, banners, commander skins | The paint and visor system already exists | **Add on top** |
| Season pass | Paid cosmetic track per Arena season | Works once seasons and a player base exist | Later |
| Rewarded ads | Watch an ad for a reroll or extra reward | Cheap to add, but breaks the premium feel | Optional, free tier only |
| Free to play with energy, gacha or paid power | Repeat spending by a few players | Fights the roguelite core; needs constant content and paid marketing | Avoid |

### Why the unlock model fits

- **The genre is paying for quality.** Balatro, a $9.99 premium game with no in-app purchases, made $1 million in its first mobile week. Premium mobile releases rose 77% in 2025, with Balatro at $21.3m and Slay the Spire at $13.7m on mobile. Premium is still only about 4% of mobile downloads, which is why a free first sector matters for an unknown game.
- **It suits a solo developer.** No server-side economy, no weekly event treadmill, no paid marketing needed to keep a free-to-play funnel full.
- **It protects the design.** The moment power is for sale, every balance decision becomes a pricing decision. A one-time unlock keeps balance about fun.

### What to sell

| Item | Price guide | Notes |
|---|---|---|
| Full game unlock | $4.99 to $6.99 | Sectors 2 to 5, the galaxy map, Threat levels, Outpost Defense |
| Cosmetic sets | $1.99 to $3.99 | Armour paint lines, visor glows, banner emblems, death effects |
| Commander skins | $2.99 | One per commander, animated |
| Expansion regions | $2.99 each, later | A new region with a boss, a class and a commander |
| Supporter pack | $9.99 | Unlock plus a cosmetic bundle and a name in the credits |

**Never sell:** XP boosts, rings or traits, extra lives mid-run, energy refills, or random paid loot boxes. Apple requires the odds of paid random items to be published, and some EU countries restrict them, so they are a risk as well as a design problem.

### Revenue reality check (illustrative only)

These are assumptions to size the opportunity, not a forecast:

- 50,000 installs × 5% buying the unlock × $5.99 × 85% after Apple's cut ≈ **$12,700**
- Plus 1% buying cosmetics at an average of $4 ≈ **$1,700**

The levers are installs (store page, trailer, word of mouth) and the unlock rate (how good the first sector feels). Both depend on progression and polish more than on pricing.

## Part 3: practical setup

- **Apple fees.** Join Apple's Small Business Program to pay 15% instead of 30% on in-app purchases.
- **External payment links.** These are now allowed in the US after the court ruling. Apple has asked the court to approve a commission of up to 15% on them, 5% for small businesses, and that has not been decided yet. The EU has its own fee rules under the Digital Markets Act. For a small game, plain in-app purchases are simpler and worth the difference.
- **Expo Go can't do purchases.** In-app purchases need a development build made with EAS, an Apple Developer account ($99 a year) and a purchases library such as RevenueCat's `react-native-purchases`.
- **The game runs inside a web view.** The page sends a "buy" message to the native app, and the app replies with which items are owned. The game reads ownership from that, so it is never stored only on the device where it could be edited.
- **Restore purchases.** A restore purchases button is required for non-consumable unlocks.

## Build order

1. **Progression spine.** Galaxy map, region rules, Threat levels, Hall of Legends. No money involved. Success: you, and a few testers, want "one more run" a week later.
2. **Monetization plumbing.** EAS build, unlock purchase, cosmetics shop reusing the paint and visor system, restore purchases.
3. **Live layer.** Daily seeded run with a leaderboard, then Arena seasons with a cosmetic track.
4. **Expansions.** New regions sold separately once there is an audience asking for more. Roguelike expansions sell unusually well: several 2026 releases on Steam reached 8 to 21% of base-game owners, against low single digits for most genres.

## Sources

- [Balatro approaches $1 million in seven days on mobile (PocketGamer.biz)](https://www.pocketgamer.biz/balatro-approaches-1-million-in-seven-days-on-mobile)
- [Balatro nears $4.4m on mobile (PocketGamer.biz)](https://www.pocketgamer.biz/balatro-nears-44m-on-mobile-amid-a-sudden-spending-surge)
- [Premium mobile games are on the rise (Pocket Tactics, July 2026)](https://www.pockettactics.com/premium-mobile-games-increase)
- [Apple seeks court approval for 15% commission on external purchases (iClarified, August 2026)](https://www.iclarified.com/101778/apple-seeks-court-approval-for-15-commission-on-external-app-purchases)
- [Apple lets EU developers link to external purchases with lower fees (iClarified, March 2026)](https://www.iclarified.com/97724/apple-lets-eu-developers-link-to-external-purchases-with-lower-app-store-fees)
- [High DLC attach rates for roguelikes on Steam (Alinea Analytics)](https://alineaanalytics.substack.com/p/steam-dlc-data-high-attach-rates)
