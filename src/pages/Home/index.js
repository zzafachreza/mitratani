import React, { useEffect, useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  ImageBackground,
  ScrollView,
  Dimensions,
  TouchableNativeFeedback,
} from 'react-native';
import { getData } from '../../utils/localStorage';
import { colors, fonts, windowWidth } from '../../utils';

const images = [
  { id: 1, src: require('../../assets/korosel-1.png'), label: 'Gambar 1' },
  { id: 2, src: require('../../assets/koresel-2.png'), label: 'Gambar 2' },
  { id: 3, src: require('../../assets/koresel-3.png'), label: 'Gambar 3' },
];

const windowHeight = Dimensions.get('window').height;

export default function Home({ navigation, route }) {
  const [user, setUser] = useState({});
  const scrollX = useRef(new Animated.Value(0)).current; // Untuk animasi scroll
  const scrollViewRef = useRef(null); // Untuk mengontrol scroll view
  const [currentIndex, setCurrentIndex] = useState(0);

  const __getUser = () => {
    getData('user').then((u) => {
      setUser(u);
    });
  };

  useEffect(() => {
    __getUser();
  }, []);


  return (
    <View

      style={{
        flex: 1,
        backgroundColor: colors.white,
        width: '100%',
        height: '100%',
      }}
    >
      <ScrollView>
        <View style={{ padding: 20 }}>
         
          <Text style={{
            fontFamily:fonts.primary[500],
            color:colors.primary,
            fontSize:18
          }}>Selamat Datang</Text>

          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 10,
          }}>
            <Image style={{
              height:24,
              width:200,
            }} source={require('../../assets/tekslogo.png')}/>
            <Image style={{
              width:94,
              height:42,
            }} source={require('../../assets/logo.png')}/>
          </View>

          <View style={{
            justifyContent:"center",
            alignItems:"center",
            marginTop:20
          }}>
          <Image style={{
            width:330,
            height:265
          }} source={require('../../assets/slider1.png')}/>
          </View>

          <View style={{
            flexDirection:"row",
            justifyContent:"space-between",
            alignItems:"center",
            marginTop:20,
          }}>

            <TouchableNativeFeedback onPress={() => navigation.navigate('TambahData')}>
              <View style={{
                padding:10,
                backgroundColor:colors.primary,
                borderRadius:10,
                alignItems:"center",
                justifyContent:"center",
                width:150,
                height:133
              }}>
                <Image style={{
                  width:81,
                  height:67,
                  alignSelf:"center",
                }} source={require('../../assets/tambahdata.png')}/>
                <Text style={{
                  fontSize:12,
                  textAlign:"center",
                  fontFamily:fonts.primary[500],
                  color:colors.white,
                  marginTop:10,
                }}>Tambah Data</Text>
              </View>
            </TouchableNativeFeedback>

            <TouchableNativeFeedback onPress={() => navigation.navigate('DataLaporan')}>
              <View style={{
                padding:10,
                backgroundColor:colors.primary,
                borderRadius:10,
                alignItems:"center",
                justifyContent:"center",
                width:150,
                height:133
              }}>
                <Image style={{
                  width:54,
                  height:67,
                  alignSelf:"center",
                }} source={require('../../assets/datalaporan.png')}/>
                <Text style={{
                  fontSize:12,
                  textAlign:"center",
                  fontFamily:fonts.primary[500],
                  color:colors.white,
                  marginTop:10,
                }}>Data Laporan</Text>
              </View>
            </TouchableNativeFeedback>


          </View>



          <View style={{
            flexDirection:"row",
            justifyContent:"space-between",
            alignItems:"center",
            marginTop:20,
          }}>

            <TouchableNativeFeedback onPress={() => navigation.navigate('BackupRestore')}>
              <View style={{
                padding:10,
                backgroundColor:colors.primary,
                borderRadius:10,
                alignItems:"center",
                justifyContent:"center",
                width:150,
                height:133
              }}>
                <Image style={{
                  width:54,
                  height:67,
                  alignSelf:"center",
                }} source={require('../../assets/backup2.png')}/>
                <Text style={{
                  fontSize:12,
                  textAlign:"center",
                  fontFamily:fonts.primary[500],
                  color:colors.white,
                  marginTop:10,
                }}>Back Up &{'\n'}
Restore Data</Text>
              </View>
            </TouchableNativeFeedback>

            <TouchableNativeFeedback onPress={() => navigation.navigate('Royalti')}>
              <View style={{
                padding:10,
                backgroundColor:colors.primary,
                borderRadius:10,
                alignItems:"center",
                justifyContent:"center",
                width:150,
                height:133
              }}>
                <Image style={{
                  width:91,
                  height:67,
                  alignSelf:"center",
                }} source={require('../../assets/rangkin.png')}/>
                <Text style={{
                  fontSize:12,
                  textAlign:"center",
                  fontFamily:fonts.primary[500],
                  color:colors.white,
                  marginTop:10,
                }}>Ranking Loyalty</Text>
              </View>
            </TouchableNativeFeedback>



          </View>

        </View>
      </ScrollView>
    </View>
  );
}
