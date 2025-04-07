import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Button } from 'react-native';
import WeatherDisplay from './src/screens/WeatherDisplay';
import { fetchWeatherData } from './src/services/WeatherService';
import * as Location from 'expo-location';

export default function App() {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [locationError, setLocationError] = useState(null);

  const updateWeather = async () => {
    try {
      setLoading(true);
      const data = await fetchWeatherData();
      setWeather(data);
      setLocation(data.coord); // Para mostrar ubicación de forma más precisa
    } catch (error) {
      setLocationError('Error al obtener clima');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const load = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setLocationError('Permiso de ubicación denegado');
          setLoading(false);
          return;
        }

        await updateWeather(); // Primera carga
      } catch (error) {
        setLocationError('Error al obtener ubicación');
      }
    };

    load();

    // Actualizar cada 5 segundos
    const interval = setInterval(() => {
      updateWeather();
    }, 5000);

    return () => clearInterval(interval); // Limpiar intervalo al desmontar
  }, []);

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#333" />
          <Text>Cargando...</Text>
        </View>
      )}

      {!loading && weather && <WeatherDisplay weather={weather} />}

      {location && (
        <Text style={styles.locationText}>
          Ubicación: {location.lat?.toFixed(4)}, {location.lon?.toFixed(4)}
        </Text>
      )}
      {locationError && <Text style={styles.error}>{locationError}</Text>}

      <View style={styles.buttonContainer}>
        <Button title="Actualizar Datos" onPress={updateWeather} />
      </View>
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
  loading: {
    alignItems: 'center',
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
  buttonContainer: {
    marginTop: 30,
  },
});
