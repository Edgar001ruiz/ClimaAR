import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const WeatherData = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiKey = 'f7d689e8d836580162297e4ceff2de80';  // Sustituye con tu clave de API de OpenWeatherMap
  const city = 'San Salvador';  // Puedes cambiar la ciudad o hacerla dinámica

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      setWeather(response.data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching data');
      setLoading(false);
    }
  };

  useEffect(() => {
    // Llamar la API la primera vez al montar el componente
    fetchWeatherData();

    // Establecer un intervalo para actualizar los datos cada 60 segundos
    const intervalId = setInterval(() => {
      fetchWeatherData();
    }, 60000); // 60000 ms = 60 segundos

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{weather.name}</Text>
      <Text style={styles.text}>Temperature: {weather.main.temp}°C</Text>
      <Text style={styles.text}>Humidity: {weather.main.humidity}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 18,
  },
});

export default WeatherData;
