import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SensorCard = ({ sensor }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.sensorName}>{sensor.name}</Text>
      <Text>Temperature: {sensor.temperature}°C</Text>
      <Text>Humidity: {sensor.humidity}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  sensorName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SensorCard;
