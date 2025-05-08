import {
    View,
    Text,
    ScrollView,
    TouchableNativeFeedback,
    Modal,
    Image,
  } from 'react-native';
  import React, { useState } from 'react';
  import { MyCalendar, MyHeader, MyInput } from '../../components';
  import { colors, fonts } from '../../utils';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  const formatRupiah = (angka) => {
    let number_string = angka.replace(/[^,\d]/g, '').toString();
    let split = number_string.split(',');
    let sisa = split[0].length % 3;
    let rupiah = split[0].substr(0, sisa);
    let ribuan = split[0].substr(sisa).match(/\d{3}/g);
  
    if (ribuan) {
      rupiah += (sisa ? '.' : '') + ribuan.join('.');
    }
  
    return split[1] !== undefined ? rupiah + ',' + split[1] : rupiah;
  };
  
  export default function TambahTransaksi({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
  
    // input state
    const [tanggal, setTanggal] = useState('');
    const [namaPetani, setNamaPetani] = useState('');
    const [kasAwal, setKasAwal] = useState('');
    const [timbangan, setTimbangan] = useState('');
    const [inventory, setInventory] = useState('');
    const [pemasukan, setPemasukan] = useState('');
    const [pengeluaran, setPengeluaran] = useState('');
    const [kasModal, setKasModal] = useState('Rp0');
  
    const simpanTransaksi = async () => {
      const data = {
        tanggal,
        namaPetani,
        kasAwal,
        timbangan,
        inventory,
        pemasukan,
        pengeluaran,
        kasModal,
      };
  
      try {
        const lama = JSON.parse(await AsyncStorage.getItem('DATA_TRANSAKSI')) || [];
        const baru = [...lama, data];
        await AsyncStorage.setItem('DATA_TRANSAKSI', JSON.stringify(baru));
  
        setModalVisible(true);
        setTimeout(() => {
          setModalVisible(false);
          navigation.replace('MainApp');
        }, 1500);
      } catch (e) {
        alert('Gagal menyimpan transaksi');
      }
    };
  
    return (
      <View style={{ flex: 1, backgroundColor: colors.white }}>
        <MyHeader title="Tambah Transaksi" />
  
        <ScrollView>
          <View style={{ padding: 20 }}>
            <MyCalendar
              label="Tanggal :"
              placeholder="Pilih Tanggal"
              iconname="calendar"
              value={tanggal}
              onDateChange={(date) => setTanggal(date)} // ini yang bener
            />
  
            <MyInput
              label="Nama Petani :"
              placeholder="Isi Nama Petani"
              value={namaPetani}
              onChangeText={setNamaPetani}
            />
  
  <MyInput
  label="Kas/Modal Awal :"
  placeholder="Isi Kas/Modal Awal"
  value={kasAwal}
  keyboardType="numeric"
  onChangeText={(val) => setKasAwal(formatRupiah(val))}
/>

  
<MyInput
  label="Timbangan (Kg) :"
  placeholder="Isi Timbangan (Kg)"
  value={timbangan}
  keyboardType="numeric"
  onChangeText={setTimbangan}
/>

            <MyInput
              label="Inventory :"
              placeholder="Isi Inventory"
              value={inventory}
              onChangeText={setInventory}
            />
  <MyInput
  label="Pemasukan :"
  placeholder="Isi Jumlah Pemasukan"
  value={pemasukan}
  keyboardType="numeric"
  onChangeText={(val) => setPemasukan(formatRupiah(val))}
/>

  
<MyInput
  label="Pengeluaran :"
  placeholder="Isi Jumlah Pengeluaran"
  value={pengeluaran}
  keyboardType="numeric"
  onChangeText={(val) => setPengeluaran(formatRupiah(val))}
/>

  
<MyInput
  label="Kas/Modal :"
  value={kasModal}
  keyboardType="numeric"
  onChangeText={(val) => setKasModal(formatRupiah(val))}
/>

  
            <TouchableNativeFeedback onPress={simpanTransaksi}>
              <View
                style={{
                  padding: 10,
                  backgroundColor: colors.primary,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 20,
                  marginTop: 20,
                }}>
                <Text
                  style={{
                    color: colors.white,
                    textAlign: 'center',
                    fontFamily: fonts.primary[600],
                    fontSize: 15,
                  }}>
                  Simpan
                </Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </ScrollView>
  
        {/* Modal Sukses */}
        <Modal visible={modalVisible} transparent animationType="fade">
          <View
            style={{
              flex: 1,
              backgroundColor: '#00000066',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                backgroundColor: 'white',
                padding: 30,
                borderRadius: 20,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: fonts.primary[600],
                  fontSize: 16,
                  color: colors.primary,
                  marginBottom: 20,
                }}>
                Data Berhasil Tersimpan
              </Text>
              <Image
                source={require('../../assets/success.png')} // ganti sesuai path gambar
                style={{ width: 100, height: 100 }}
                resizeMode="contain"
              />
            </View>
          </View>
        </Modal>
      </View>
    );
  }
  