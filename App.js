import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import WeatherData from './WeatherData';

//f7d689e8d836580162297e4ceff2de80

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <WeatherData />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
