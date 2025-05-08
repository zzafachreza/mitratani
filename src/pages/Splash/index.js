import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  Animated,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import { MyButton, MyGap } from '../../components';
import { MyDimensi, colors, fonts, windowHeight, windowWidth } from '../../utils';
import { MYAPP, getData } from '../../utils/localStorage';

export default function Splash({ navigation }) {
  const img = new Animated.Value(0.5);
  const textScale = new Animated.Value(0.5);
  const textOpacity = new Animated.Value(0);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(img, {
        toValue: 1,
        duration: 750,
        useNativeDriver: true,
      }),
      Animated.timing(textScale, {
        toValue: 1,
        duration: 750,
        useNativeDriver: true,
      }),
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 750,
        useNativeDriver: true,
      })
    ]).start();

  
    setTimeout(() => {
      navigation.replace("Login");
    }, 1200);
  }, []);

  return (
    <SafeAreaView style={{
      flex: 1,
      padding: 0,
      backgroundColor: colors.white,
      justifyContent: 'center',
      position: 'relative'
    }}>

      <ImageBackground source={require('../../assets/bgsplash.png')} style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary,
        width: '100%',
        height: '100%'
      }}>

        {/* <Animated.Image
          source={require('../../assets/logosplash.png')}
          resizeMode="contain"
          style={{
            transform: [{ scale: img }],
            width: windowWidth / 1.5,
            height: windowWidth / 1.5,  
            marginTop:'30%'

          }}
        /> */}
      
      {/* <View style={{
        marginTop:'20%',
        alignItems:"center"
      }}>
      <Animated.Text Style={{
          opacity: textOpacity,
          transform: [{ scale: textScale }],
          textAlign: 'center',
          color: colors.white,
          fontFamily: fonts.primary[600],
          fontSize: 20,
      }}>
          <Text style={{
            fontFamily:fonts.primary[600],
            fontSize: 20,
            color:colors.white,
         
          }}>PT Wali Karunia Sejahtera</Text>
        </Animated.Text>

          <Animated.Text style={{
            opacity:textOpacity,
            transform: [{ scale: textScale }],
            textAlign:"center",
            marginTop:10,
            paddingHorizontal:20,
            color:colors.white,
            fontFamily:fonts.primary[400],
            fontSize:12,
            lineHeight:20,
            textAlign:"center"
          }}>
            <Text style={{
              fontFamily:fonts.primary[500],
              color:colors.white,
              fontSize:12,
              
            }}>
            Lembah Cinere Indah, Jalan Kelapa Sawit Blok E No. 130 Cinere,
            Depok Indonesia 16514
            </Text>
          </Animated.Text>
      </View> */}
          
        <ActivityIndicator style={{marginTop:450}} color={colors.primary} size="small" />

      </ImageBackground>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
