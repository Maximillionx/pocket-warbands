# Pocket Warbands for iPhone

Runs the game full-screen as an iPhone app through Expo Go. No Apple developer account needed.

## Run it on your iPhone (about 5 minutes)

1. On your iPhone, install **Expo Go** from the App Store.
2. On your Mac (Node 20 or newer), in this folder:

   ```
   npm install
   npx expo start
   ```

3. Scan the QR code in the terminal with the iPhone Camera app. It opens in Expo Go.

Your phone and Mac need to be on the same Wi-Fi network. If they can't see each other, run `npx expo start --tunnel` instead.

If Expo prints a version mismatch warning, run `npx expo install --fix` once, then start again.

## Updating the game

The app embeds the game page. After a new version of the game, save the page's HTML as `scripts/pocket-warbands.html` and run:

```
npm run build-game
```

## Notes

- Progress saves on the phone.
- The Arena uses AI rivals in this build. Real rival commanders only appear in the claude.ai version, which has the shared database.
- Fonts load from Google Fonts when the phone is online. Offline, it falls back to system fonts.

## Later: TestFlight

To share with testers through TestFlight, you need an Apple Developer account. Then:

```
npm install -g eas-cli
eas build --platform ios
eas submit --platform ios
```
