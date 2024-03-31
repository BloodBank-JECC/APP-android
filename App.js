import { StyleSheet, View, StatusBar } from 'react-native';
import Home from './src/screens/Home';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#fff'}  barStyle="dark-content" />
      <Home/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
