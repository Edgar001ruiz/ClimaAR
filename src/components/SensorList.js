import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import SensorCard from './SensorCard';

const SensorList = ({ data }) => {
  return (
    <ScrollView style={styles.list}>
      {data.map((sensor, index) => (
        <SensorCard key={index} sensor={sensor} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  list: {
    width: '100%',
    padding: 10,
  },
});

export default SensorList;
