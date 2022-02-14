import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import InCallManager from 'react-native-incall-manager'

export default function App() {

  InCallManager.start({media: 'audio'}); // audio/video, default: audio

  InCallManager.stop();

  DeviceEventEmitter.addListener('WiredHeadset', function (data) {
    // --- do something with events
})

      async getIsWiredHeadsetPluggedIn() {
        if (Platform.OS === 'ios') {
            return await InCallManager.getIsWiredHeadsetPluggedIn();
        } else {
            console.log("Android doesn't support getIsWiredHeadsetPluggedIn() yet.");
            return null;
        }
      }
      async getAudioUri(audioType, fileType) {
        if (typeof this.audioUriMap[audioType] === "undefined") {
            return null;
        }
        if (this.audioUriMap[audioType][fileType]) {
            return this.audioUriMap[audioType][fileType];
        } else {
            try {
                let result = await InCallManager.getAudioUriJS(audioType, fileType);
                if (typeof result === 'string' && result.length > 0) {
                    this.audioUriMap[audioType][fileType] = result;
                    return result
                } else {
                    return null;
                }
            } catch (err) {
                return null;
            }
        }
      }

    async chooseAudioRoute(route) {
      let result = await InCallManager.chooseAudioRoute(route);
      return result;
    }

  return (
    <View style={styles.container}>
      <Text>Hello world!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
