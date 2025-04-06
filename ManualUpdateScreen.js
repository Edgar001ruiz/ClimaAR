import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const ManualUpdateScreen = () => {
  const [temperature, setTemperature] = useState('');
  const [humidity, setHumidity] = useState('');

  const handleSubmit = () => {
    // Manejo de envío de los datos, por una API
    console.log('Temperatura:', temperature);
    console.log('Humedad:', humidity);

    
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Actualización Manual de Datos</Text>
      <TextInput
        style={styles.input}
        placeholder="Temperatura (°C)"
        keyboardType="numeric"
        value={temperature}
        onChangeText={setTemperature}
      />
      <TextInput
        style={styles.input}
        placeholder="Humedad (%)"
        keyboardType="numeric"
        value={humidity}
        onChangeText={setHumidity}
      />
      <Button title="Actualizar" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
});

export default ManualUpdateScreen;
