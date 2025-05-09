import {
  View,
  Text,
  ScrollView,
  TouchableNativeFeedback,
  Modal,
  Image,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { MyCalendar, MyHeader, MyInput } from '../../components';
import { colors, fonts } from '../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

const formatRupiah = (angka) => {
  if (!angka) return '0';
  const num = angka.toString().replace(/[^,\d]/g, '');
  const split = num.split(',');
  const sisa = split[0].length % 3;
  let rupiah = split[0].substr(0, sisa);
  const ribuan = split[0].substr(sisa).match(/\d{3}/g);
  if (ribuan) {
    rupiah += (sisa ? '.' : '') + ribuan.join('.');
  }
  return 'Rp' + (split[1] !== undefined ? rupiah + ',' + split[1] : rupiah);
};


const parseNumber = (str) => {
  return parseInt(str.replace(/[^0-9]/g, '')) || 0;
};

export default function TambahTransaksi({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);

  const [tanggal, setTanggal] = useState('');
  const [namaPetani, setNamaPetani] = useState('');
  const [kasAwal, setKasAwal] = useState('');
  const [timbangan, setTimbangan] = useState('');
  const [inventory, setInventory] = useState('');
  const [pemasukan, setPemasukan] = useState('');
  const [pengeluaran, setPengeluaran] = useState('');
  const [kasModal, setKasModal] = useState('Rp0');

  // Perhitungan otomatis kasModal
  useEffect(() => {
    const total =
      parseNumber(kasAwal) + parseNumber(pemasukan) - parseNumber(pengeluaran);
    setKasModal(formatRupiah(total.toString())); // tanpa "Rp" lagi
  }, [kasAwal, pemasukan, pengeluaran]);
  
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

  useEffect(() => {
    if (!tanggal) {
      const today = moment().format('YYYY-MM-DD');
      setTanggal(today);
    }
  }, []);

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
            onDateChange={(date) => setTanggal(date)}
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
            editable={false}
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
              source={require('../../assets/success.png')}
              style={{ width: 100, height: 100 }}
              resizeMode="contain"
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}
