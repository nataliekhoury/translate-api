import { StyleSheet, View } from 'react-native';
import TranslatorApp from './src';
export default function App() {
  return (
    <View style={styles.container}>
      <TranslatorApp/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
