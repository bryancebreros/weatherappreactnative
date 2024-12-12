import { SafeAreaView, Image, StyleSheet, Dimensions, Platform, View, Text, ActivityIndicator } from 'react-native';
import React, {useState, useEffect} from 'react';
import * as Location from 'expo-location';
import {API_KEY} from '@env';

import axios from 'axios';

import "../../global.css"


const weatherImages = {
  cold: require('../../assets/images/chaewon_cold.webp'),
  chilly: require('../../assets/images/chaewon_chilly.webp'),
  cool: require('../../assets/images/chaewon_cool.webp'),
  warm: require('../../assets/images/chaewon_warm.webp'),
  hot: require('../../assets/images/chaewon_hot.webp'),
  scorching: require('../../assets/images/chaewon_scorching.webp'),
};
function getWeatherImage(temp: number) {
  if (temp < 0) return [weatherImages.cold, '❄️'];
  if (temp >= 0 && temp <= 10) return [weatherImages.chilly,'🌨️' ];
  if (temp > 10 && temp <= 20) return [weatherImages.cool, '☁️'];
  if (temp > 20 && temp <= 30) return [weatherImages.warm, '🌥️'];
  if (temp > 30 && temp <= 40) return [weatherImages.hot, '🌤️'];
  return [weatherImages.scorching, '☀️'];
}

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {

  
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchWeather = async() => {
      try {
        setLoading(true);

        // Request user permission for location
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setError('Permission to access location was denied');
          return;
        }

        // Get user location
        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;

        // Fetch weather data with user location
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
        );
        setWeatherData(response.data);
      } catch (err) {
        setError('Failed to fetch weather data');
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }
  let temp = Math.round(weatherData.main.temp);
  const weatherImage = getWeatherImage(temp);

  return (
    <SafeAreaView style={styles.container}>
      <Image source={weatherImage[0]} style={styles.image} resizeMode="cover" />
      <View style={styles.card}>
        <Text style={styles.text}>{weatherData.name}</Text>
        <Text style={styles.text}>{weatherImage[1]}</Text>
        <Text style={styles.text}>{Math.round(weatherData.main.temp)}°C</Text>

      </View>

    </SafeAreaView>
  );

};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  text: {
    fontSize: 52,
    color: '#333',
    textAlign: 'center'
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    fontSize: 18,
    color: 'red',
  },
  image: {
    width: width, 
    height: height, 
    position: 'absolute', 
    top: 0,
    left: 0,
    opacity: 0.85,
  },
  card:{
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 5,
    opacity: 0.89,
  },
});

