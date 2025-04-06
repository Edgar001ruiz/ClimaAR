import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import WeatherDisplay from './src/components/WeatherDisplay';
import { fetchWeatherData } from './src/services/WeatherService';
import * as Location from 'expo-location';

export default function App() {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [locationError, setLocationError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        // Solicitar permisos
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setLocationError('Permiso de ubicación denegado');
          setLoading(false);
          return;
        }

        // Obtener ubicación
        let locationData = await Location.getCurrentPositionAsync({});
        setLocation(locationData.coords);

        // Obtener clima
        const data = await fetchWeatherData();
        setWeather(data);
      } catch (error) {
        setLocationError('Error al obtener ubicación');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#333" />
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {weather && <WeatherDisplay weather={weather} />}
      {location && (
        <Text style={styles.locationText}>
          Ubicación: {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
        </Text>
      )}
      {locationError && <Text style={styles.error}>{locationError}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  locationText: {
    fontSize: 16,
    marginTop: 20,
    color: '#444',
  },
  error: {
    color: 'red',
    marginTop: 20,
  },
});
