import {
  View,
  Text,
  TouchableWithoutFeedback,
  Alert,
  Modal,
  ActivityIndicator,
} from 'react-native';
import React, { useState } from 'react';
import { colors, fonts } from '../../utils';
import { MyHeader } from '../../components';
import { Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFS from 'react-native-fs';
import moment from 'moment';

export default function BackupRestore({ navigation }) {
  const [loading, setLoading] = useState(false);

  const handleBackup = async () => {
    setLoading(true);
    try {
      const transaksi = await AsyncStorage.getItem('DATA_TRANSAKSI');
      const petani = await AsyncStorage.getItem('DATA_PETANI');

      const allData = {
        transaksi: transaksi ? JSON.parse(transaksi) : [],
        petani: petani ? JSON.parse(petani) : [],
      };

      const timestamp = moment().format('YYYY-MM-DD_HH-mm');
      const path = `${RNFS.DownloadDirectoryPath}/backup_${timestamp}.json`;

      await RNFS.writeFile(path, JSON.stringify(allData), 'utf8');

      setTimeout(() => {
        setLoading(false);
        Alert.alert('Sukses', 'Data berhasil di-backup ke folder Download.');
      }, 1000);
    } catch (error) {
      setLoading(false);
      Alert.alert('Gagal', 'Terjadi kesalahan saat backup.');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <MyHeader title="Back Up & Restore Data" />
      <View
        style={{
          padding: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>

        <TouchableWithoutFeedback onPress={handleBackup}>
          <View
            style={{
              padding: 10,
              borderRadius: 10,
              backgroundColor: '#EE8B00',
              justifyContent: 'center',
              alignItems: 'center',
              width: 150,
              height: 150,
            }}>
            <Image
              style={{
                width: 92,
                height: 67,
                alignSelf: 'center',
                marginVertical: 20,
              }}
              source={require('../../assets/backup.png')}
            />
            <Text
              style={{
                fontFamily: fonts.primary[600],
                color: colors.white,
                textAlign: 'center',
              }}>
              Back Up Data
            </Text>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback>
          <View
            style={{
              padding: 10,
              borderRadius: 10,
              backgroundColor: '#189F00',
              justifyContent: 'center',
              alignItems: 'center',
              width: 150,
              height: 150,
            }}>
            <Image
              style={{
                width: 60,
                height: 75,
                alignSelf: 'center',
                marginVertical: 20,
              }}
              source={require('../../assets/restoredata.png')}
            />
            <Text
              style={{
                fontFamily: fonts.primary[600],
                color: colors.white,
                textAlign: 'center',
                top: -5,
              }}>
              Restore Data
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>

      {/* Modal Loading */}
      <Modal visible={loading} transparent animationType="fade">
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.3)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text
            style={{
              marginTop: 12,
              fontFamily: fonts.primary[600],
              color: colors.primary,
            }}>
            Sedang melakukan backup...
          </Text>
        </View>
      </Modal>
    </View>
  );
}
