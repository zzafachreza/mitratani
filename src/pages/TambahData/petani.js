import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TouchableNativeFeedback,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { MyHeader } from '../../components';
import { Icon } from 'react-native-elements';
import QRCode from 'react-native-qrcode-svg';
import { fonts, colors } from '../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DataPetani({ navigation }) {
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editNama, setEditNama] = useState('');

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('DATA_PETANI');
      if (jsonValue !== null) {
        setData(JSON.parse(jsonValue));
      }
    } catch (e) {
      console.log('Gagal ambil data petani', e);
    }
  };

  const simpanEdit = async () => {
    if (editNama.length === 0) {
      Alert.alert('Validasi', 'Nama petani tidak boleh kosong');
      return;
    }

    const dataBaru = [...data];
    dataBaru[editIndex] = {
      nama: editNama,
      value: `petani_${editNama.toLowerCase().replace(/\s/g, '')}`,
    };

    try {
      await AsyncStorage.setItem('DATA_PETANI', JSON.stringify(dataBaru));
      setData(dataBaru);
      setModalVisible(false);
    } catch (error) {
      Alert.alert('Gagal', 'Tidak bisa menyimpan perubahan');
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', getData);
    return unsubscribe;
  }, [navigation]);


  const hapusData = (index) => {
    Alert.alert(
      'Konfirmasi',
      'Yakin ingin menghapus data petani ini?',
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Hapus',
          style: 'destructive',
          onPress: async () => {
            const dataBaru = [...data];
            dataBaru.splice(index, 1);
            try {
              await AsyncStorage.setItem('DATA_PETANI', JSON.stringify(dataBaru));
              setData(dataBaru);
            } catch (e) {
              Alert.alert('Gagal', 'Tidak bisa menghapus data');
            }
          },
        },
      ]
    );
  };
  

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <MyHeader title="Data Petani" />

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {data.length === 0 && (
          <Text style={{ textAlign: 'center', fontStyle: 'italic', marginTop: 40 }}>
            Belum ada data petani
          </Text>
        )}

        {data.map((item, index) => (
          <View
            key={index}
            style={{
              backgroundColor: '#fafafa',
              borderRadius: 12,
              marginBottom: 16,
              padding: 10,
              borderWidth: 1,
              borderColor: colors.primary,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.05,
              shadowRadius: 2,
              elevation: 2,
            }}>
            <Text
              style={{
                fontSize: 13,
                marginBottom: 8,
                fontFamily: fonts.primary[400],
              }}>
              Nama Petani:{' '}
              <Text style={{ fontWeight: '800', color: colors.primary }}>
                {item.nama}
              </Text>
            </Text>

            <View style={{ alignItems: 'center', marginVertical: 8 }}>
              <QRCode value={item.value} size={120} />
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                marginTop: 8,
              }}>
              <TouchableOpacity
                style={{ marginRight: 12 }}
                onPress={() => {
                  setEditIndex(index);
                  setEditNama(item.nama);
                  setModalVisible(true);
                }}>
                <Icon type="ionicon" name="pencil" size={20} color="#F5A623" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => hapusData(index)}>
                <Icon type="ionicon" name="trash" size={20} color="#FF3B30" />
              </TouchableOpacity>
            </View>
          </View>
        ))}

       
      </ScrollView>
 {/* Tombol tambah di bawah */}
 <View
          style={{
            alignItems: 'flex-end',
            marginTop: 10,
            marginBottom: 0,
            padding:0,
            position: 'absolute',
            bottom:50,
            right:30
          }}>
          <TouchableNativeFeedback onPress={() => navigation.navigate('TambahPetani')}>
            <View
              style={{
                padding: 10,
                backgroundColor: colors.primary,
                borderRadius: 50,
                width: 50, 
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon type="ionicon" name="add" color={colors.white} size={25} />
            </View>
          </TouchableNativeFeedback>
        </View>
      {/* Modal edit */}
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View
          style={{
            flex: 1,
            backgroundColor: '#00000088',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: 'white',
              padding: 20,
              borderRadius: 10,
              width: '85%',
            }}>
            <Text
              style={{
                fontFamily: fonts.primary[600],
                fontSize: 16,
                marginBottom: 10,
              }}>
              Edit Nama Petani
            </Text>
            <TextInput
              value={editNama}
              onChangeText={setEditNama}
              placeholder="Masukkan nama baru"
              style={{
                borderWidth: 1,
                borderColor: '#ccc',
                padding: 10,
                borderRadius: 8,
                marginBottom: 20,
              }}
            />

            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={{
                  marginRight: 10,
                  paddingVertical: 8,
                  paddingHorizontal: 16,
                }}>
                <Text style={{ color: '#666' }}>Batal</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={simpanEdit}
                style={{
                  backgroundColor: colors.primary,
                  paddingVertical: 8,
                  paddingHorizontal: 16,
                  borderRadius: 6,
                }}>
                <Text style={{ color: 'white' }}>Simpan</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
