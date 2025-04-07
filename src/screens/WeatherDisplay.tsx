import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function WeatherDisplay({ weather }: any) {
  if (!weather) return null;

  const {
    name,
    weather: weatherDetails,
    main: { temp, humidity, feels_like },
    wind: { speed }
  } = weather;

  const { icon, description } = weatherDetails[0];
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      <Image source={{ uri: iconUrl }} style={styles.icon} />
      <Text style={styles.temp}>{temp}°C</Text>
      <Text style={styles.desc}>{description}</Text>
      <Text>Humedad: {humidity}%</Text>
      <Text>Sensación térmica: {feels_like}°C</Text>
      <Text>Viento: {speed} m/s</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    margin: 10,
    elevation: 3
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  temp: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#ff8c00',
  },
  desc: {
    fontSize: 18,
    fontStyle: 'italic',
    marginBottom: 8,
  },
  icon: {
    width: 100,
    height: 100,
  },
});
