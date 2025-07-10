import React, {useEffect, useState, useRef} from 'react';
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
import {getData} from '../../utils/localStorage';
import {colors, fonts, windowWidth} from '../../utils';
import {MyInput} from '../../components';
import {TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import {showMessage} from 'react-native-flash-message';

const windowHeight = Dimensions.get('window').height;

export default function Home({navigation, route}) {
  const [user, setUser] = useState({});
  const scrollX = useRef(new Animated.Value(0)).current; // Untuk animasi scroll
  const scrollViewRef = useRef(null); // Untuk mengontrol scroll view
  const [currentIndex, setCurrentIndex] = useState(0);
  const [key, setKey] = useState('');
  const __getUser = () => {
    getData('user').then(u => {
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
      }}>
      <ScrollView>
        <View style={{padding: 20}}>
          <TouchableOpacity onPress={() => navigation.navigate('Petunjuk')}>
            <Text
              style={{
                fontFamily: fonts.primary[500],
                color: colors.primary,
                fontSize: 18,
              }}>
              Selamat Datang
            </Text>
          </TouchableOpacity>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <Image
              style={{
                height: 24,
                width: 200,
              }}
              source={require('../../assets/tekslogo.png')}
            />
            <Image
              style={{
                width: 94,
                height: 42,
              }}
              source={require('../../assets/logo.png')}
            />
          </View>

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <Image
              style={{
                width: windowWidth - 40,
                height: 200,
                borderRadius: 20,
              }}
              source={require('../../assets/slider1.png')}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <TouchableNativeFeedback
              onPress={() => navigation.navigate('TambahData')}>
              <View
                style={{
                  padding: 10,
                  backgroundColor: colors.primary,
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 150,
                  height: 133,
                }}>
                <Image
                  style={{
                    width: 81,
                    height: 67,
                    alignSelf: 'center',
                  }}
                  source={require('../../assets/tambahdata.png')}
                />
                <Text
                  style={{
                    fontSize: 12,
                    textAlign: 'center',
                    fontFamily: fonts.primary[500],
                    color: colors.white,
                    marginTop: 10,
                  }}>
                  Tambah Data
                </Text>
              </View>
            </TouchableNativeFeedback>

            <TouchableNativeFeedback
              onPress={() => navigation.navigate('DataLaporan')}>
              <View
                style={{
                  padding: 10,
                  backgroundColor: colors.primary,
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 150,
                  height: 133,
                }}>
                <Image
                  style={{
                    width: 54,
                    height: 67,
                    alignSelf: 'center',
                  }}
                  source={require('../../assets/datalaporan.png')}
                />
                <Text
                  style={{
                    fontSize: 12,
                    textAlign: 'center',
                    fontFamily: fonts.primary[500],
                    color: colors.white,
                    marginTop: 10,
                  }}>
                  Data Laporan
                </Text>
              </View>
            </TouchableNativeFeedback>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <TouchableNativeFeedback
              onPress={() => navigation.navigate('BackupRestore')}>
              <View
                style={{
                  padding: 10,
                  backgroundColor: colors.primary,
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 150,
                  height: 133,
                }}>
                <Image
                  style={{
                    width: 54,
                    height: 67,
                    alignSelf: 'center',
                  }}
                  source={require('../../assets/backup2.png')}
                />
                <Text
                  style={{
                    fontSize: 12,
                    textAlign: 'center',
                    fontFamily: fonts.primary[500],
                    color: colors.white,
                    marginTop: 10,
                  }}>
                  Back Up &{'\n'}
                  Restore Data
                </Text>
              </View>
            </TouchableNativeFeedback>

            <TouchableNativeFeedback
              onPress={() =>
                navigation.navigate('Royalti', {
                  key: '',
                })
              }>
              <View
                style={{
                  padding: 10,
                  backgroundColor: colors.primary,
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 150,
                  height: 133,
                }}>
                <Image
                  style={{
                    width: 91,
                    height: 67,
                    alignSelf: 'center',
                  }}
                  source={require('../../assets/rangkin.png')}
                />
                <Text
                  style={{
                    fontSize: 12,
                    textAlign: 'center',
                    fontFamily: fonts.primary[500],
                    color: colors.white,
                    marginTop: 10,
                  }}>
                  Ranking Loyalty
                </Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          padding: 20,
          backgroundColor: colors.primary,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View
          style={{
            flex: 1,
            paddingRight: 5,
          }}>
          <MyInput
            nolabel
            onChangeText={x => setKey(x)}
            placeholder="Pencarian petani / member"
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            if (key.length > 0) {
              navigation.navigate('DataPetani', {
                key: key,
              });
            } else {
              showMessage({message: 'Pencarian tidak boleh kosong !'});
            }
          }}
          style={{
            width: 50,
            marginTop: 10,

            backgroundColor: colors.white,
            height: 40,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon type="ionicon" name="search" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
