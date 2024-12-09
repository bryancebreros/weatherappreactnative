import { SafeAreaView, Image, StyleSheet, Dimensions, Platform, View, Text } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import "../../global.css"

let temp = 12;
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
  const weatherImage = getWeatherImage(temp);
  return (
    <SafeAreaView style={styles.container}>
      <Image source={weatherImage[0]} style={styles.image} resizeMode="cover" />
      <View style={styles.card}>
        <Text style={styles.text}>{weatherImage[1]}</Text>
        <Text style={styles.text}>{temp}°C</Text>

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

