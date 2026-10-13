import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import GAME_HTML from './game-html';

export default function App() {
  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <WebView
        style={styles.web}
        originWhitelist={['*']}
        source={{ html: GAME_HTML, baseUrl: 'https://pocketwarbands.app/' }}
        javaScriptEnabled
        domStorageEnabled
        allowsInlineMediaPlayback
        mediaPlaybackRequiresUserAction={false}
        contentInsetAdjustmentBehavior="never"
        automaticallyAdjustContentInsets={false}
        bounces={false}
        overScrollMode="never"
        setSupportMultipleWindows={false}
        allowsBackForwardNavigationGestures={false}
        textInteractionEnabled={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#0b1020' },
  web: { flex: 1, backgroundColor: '#0b1020' },
});
