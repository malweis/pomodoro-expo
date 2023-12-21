import { StatusBar } from 'expo-status-bar';
import { Button, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from './src/components/Header';
import Timex from './src/components/Timex';
import { useEffect, useState } from 'react';
import { Audio } from 'expo-av';

const colors = [
  '#f7dc6f',
  '#a2d9ce',
  '#d7bde2',

]

export default function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(25 * 60);
  const [timeType, setTimeType] = useState('POMO');





  const resetTime = () => {
    switch(timeType) {
      case 0:
        setTime(25 * 60);
        break;
      case 1:
        setTime(5 * 60); // replace with your short break time
        break;
      case 2:
        setTime(15 * 60); // replace with your long break time
        break;
      default:
        setTime(25 * 60);
    }
  }

  useEffect(() => {
    setTimeType(0);
  }, [])
  useEffect(() => {
    let interval = null;
    if (isRunning) {
        interval = setInterval(() => {
            setTime(prevTime => {
                if (prevTime === 1) {
                    // Time has reached 0, play a sound
                    (async () => {
                        const { sound } = await Audio.Sound.createAsync(require('./assets/notification.mp3'));
                        await sound.playAsync();
                    })();
                    setIsRunning(false);
                    resetTime();
                }
                return prevTime - 1;
            });
        }, 1000)
    } else if (!isRunning && time !== 0) {
        clearInterval(interval);
    }
    return () => clearInterval(interval);
}, [isRunning, time])

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors[timeType], }]}>
      <View style={styles.View}>
        <Text style={styles.texto}>Pomodoro</Text>

        <Header setTime={setTime} timeType={timeType} setTimeType={setTimeType} />

        <Timex time={time} />
        <TouchableOpacity onPress={async () => {
          const { sound } = await Audio.Sound.createAsync(require('./assets/click.wav'));
          await sound.playAsync();
          setIsRunning(!isRunning);
        }} style={styles.boton}>
          <Text style={styles.textoBoton} >{isRunning ? 'Pausar' : 'Iniciar'}</Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    width: '100%',
    height: '100%',


  },

  texto: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  View: {
    width: '100%',
    height: '100%',
    paddingTop: Platform.OS === 'android' ? 30 : 0,
    paddingHorizontal: 15,
    display: 'flex',
    gap: 20,
    flexDirection: 'column',

  },
  textoBoton: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  boton: {
    display: 'flex',
    width: "100%",
    height: 100,

    backgroundColor: 'black',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },

});
