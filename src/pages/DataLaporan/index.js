import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
  TouchableNativeFeedback,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MyHeader } from '../../components';
import { fonts, colors } from '../../utils';
import { Icon } from 'react-native-elements';
import moment from 'moment';
import 'moment/locale/id';
import NetInfo from '@react-native-community/netinfo';
import XLSX from 'xlsx';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';

export default function DataLaporan({ navigation }) {
  const [data, setData] = useState([]);
  const [editVisible, setEditVisible] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState({
    tanggal: '',
    namaPetani: '',
    kasAwal: '',
    timbangan: '',
    inventory: '',
    pemasukan: '',
    pengeluaran: '',
    kasModal: '',
  });

  const labelText = {
    tanggal: 'Tanggal',
    namaPetani: 'Nama Petani',
    kasAwal: 'Kas/Modal Awal',
    timbangan: 'Timbangan (Kg)',
    inventory: 'Inventory',
    pemasukan: 'Pemasukan',
    pengeluaran: 'Pengeluaran',
    kasModal: 'Kas/Modal',
  };

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

  const getData = async () => {
    const json = await AsyncStorage.getItem('DATA_TRANSAKSI');
    if (json) {
      setData(JSON.parse(json));
    }
  };

  const simpanEdit = async () => {
    const baru = [...data];
    baru[editIndex] = form;
    await AsyncStorage.setItem('DATA_TRANSAKSI', JSON.stringify(baru));
    setData(baru);
    setEditVisible(false);
  };

  const downloadExcel = async () => {
    NetInfo.fetch().then(async state => {
      if (!state.isConnected) {
        Alert.alert(
          'Koneksi Tidak Aktif',
          'Aktifkan koneksi internet untuk mengunduh laporan Excel.'
        );
      } else {
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Data');

        const wbout = XLSX.write(wb, { type: 'binary', bookType: 'xlsx' });
        const path = `${RNFS.DownloadDirectoryPath}/data_laporan.xlsx`;

        RNFS.writeFile(path, wbout, 'ascii')
          .then(() => {
            Share.open({
              url: `file://${path}`,
              type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
              failOnCancel: false,
            });
          })
          .catch(err => {
            Alert.alert('Gagal Simpan File', err.message);
          });
      }
    });
  };

  useEffect(() => {
    const focus = navigation.addListener('focus', getData);
    return focus;
  }, [navigation]);

  // Filter hasil berdasarkan nama petani
  const filteredData = data.filter(item =>
    item.namaPetani?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <MyHeader title="Data Laporan" />

      {/* Search & Scan Placeholder */}
      <View style={{ flexDirection: 'row', padding: 10, gap: 20, marginTop: 10 }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#f0f0f0',
            borderRadius: 30,
            paddingHorizontal: 16,
          }}>
          <Icon name="search" type="ionicon" size={18} />
          <TextInput
            placeholder="Cari Nama Petani"
            placeholderTextColor="#999"
            style={{
              flex: 1,
              marginLeft: 10,
              fontFamily: fonts.primary[400],
              color: colors.black,
            
            }}
            value={search}
            onChangeText={setSearch}
          />
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: '#f0f0f0',
            padding: 10,
            borderRadius: 50,
          }}>
          <Icon name="barcode-outline" type="ionicon" />
        </TouchableOpacity>
      </View>

      <ScrollView>
        <View style={{ padding: 20 }}>
          {filteredData.length === 0 && (
            <Text style={{ fontStyle: 'italic', textAlign: 'center' }}>
              Tidak ada data sesuai pencarian
            </Text>
          )}

          {filteredData.map((item, index) => (
            <View
              key={index}
              style={{
                borderRadius: 16,
                backgroundColor: '#FAFAFA',
                borderColor: '#ddd',
                borderWidth: 1,
                padding: 16,
                marginBottom: 16,
              }}>
              {Object.entries(labelText).map(([key, label]) => (
                <View key={key} style={{ flexDirection: 'row', marginBottom: 6 }}>
                  <Text style={{ flex: 1, fontFamily: fonts.primary[400], color: colors.black }}>
                    {label}
                  </Text>
                  <Text style={{ flex: 1, fontFamily: fonts.primary[600], color: colors.primary }}>
                    :{' '}
                    {(() => {
                      const val = item[key] || '-';
                      if (key === 'tanggal') {
                        return moment(val).locale('id').format('D MMMM YYYY');
                      }
                      if (key === 'timbangan') {
                        return val.includes('Kg') ? val : `${val} Kg`;
                      }
                      if (['kasAwal', 'pemasukan', 'pengeluaran', 'kasModal'].includes(key)) {
                        return val.toString().startsWith('Rp') ? val : `Rp${val}`;
                      }
                      return val;
                    })()}
                  </Text>
                </View>
              ))}

              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10 }}>
                <TouchableOpacity
                  style={{ marginRight: 10 }}
                  onPress={() => {
                    setEditIndex(index);
                    setForm(item);
                    setEditVisible(true);
                  }}>
                  <Icon name="pencil" type="ionicon" size={20} color="#F5A623" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert(
                      'Konfirmasi',
                      'Hapus data ini?',
                      [
                        { text: 'Batal' },
                        {
                          text: 'Hapus',
                          style: 'destructive',
                          onPress: async () => {
                            const baru = [...data];
                            baru.splice(index, 1);
                            await AsyncStorage.setItem('DATA_TRANSAKSI', JSON.stringify(baru));
                            setData(baru);
                          },
                        },
                      ],
                      { cancelable: true }
                    );
                  }}>
                  <Icon name="trash" type="ionicon" size={20} color="#FF3B30" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Tombol Download Excel */}
      <View style={{ padding: 20, backgroundColor: 'white' }}>
        <TouchableNativeFeedback onPress={downloadExcel}>
          <View
            style={{
              backgroundColor: 'green',
              padding: 16,
              borderRadius: 30,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <Icon type="ionicon" name="download" color={colors.white} size={20} />
            <Text
              style={{
                fontFamily: fonts.primary[600],
                color: colors.white,
                fontSize: 15,
                marginLeft: 10,
              }}>
              Download Excel
            </Text>
          </View>
        </TouchableNativeFeedback>
      </View>

      {/* Modal Edit */}
      <Modal visible={editVisible} transparent animationType="slide">
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
              borderRadius: 16,
              width: '90%',
            }}>
            <Text style={{ fontFamily: fonts.primary[600], fontSize: 16, marginBottom: 10 }}>
              Edit Transaksi
            </Text>

            {Object.keys(labelText).map((key) => (
              <TextInput
                key={key}
                placeholder={labelText[key]}
                keyboardType={
                  ['kasAwal', 'pemasukan', 'pengeluaran', 'kasModal', 'timbangan'].includes(key)
                    ? 'numeric'
                    : 'default'
                }
                value={form[key]}
                onChangeText={(val) =>
                  setForm({
                    ...form,
                    [key]:
                      ['kasAwal', 'pemasukan', 'pengeluaran', 'kasModal'].includes(key)
                        ? formatRupiah(val)
                        : val,
                  })
                }
                style={{
                  borderWidth: 1,
                  borderColor: '#ccc',
                  borderRadius: 10,
                  padding: 10,
                  marginBottom: 10,
                  fontFamily: fonts.primary[400],
                }}
              />
            ))}

            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
              <TouchableOpacity onPress={() => setEditVisible(false)} style={{ marginRight: 10 }}>
                <Text style={{ color: '#666' }}>Batal</Text>
              </TouchableOpacity>
              <TouchableNativeFeedback onPress={simpanEdit}>
                <View
                  style={{
                    backgroundColor: colors.primary,
                    paddingHorizontal: 20,
                    paddingVertical: 8,
                    borderRadius: 10,
                  }}>
                  <Text style={{ color: colors.white, fontFamily: fonts.primary[600] }}>
                    Simpan
                  </Text>
                </View>
              </TouchableNativeFeedback>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
