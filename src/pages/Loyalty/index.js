import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    TextInput,
  } from 'react-native';
  import React, { useEffect, useState } from 'react';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import { MyHeader } from '../../components';
  import { colors, fonts } from '../../utils';
  import { Icon } from 'react-native-elements';
  
  const formatRupiah = (angka) => {
    if (!angka) return '0';
    const number = angka.toString().replace(/[^,\d]/g, '');
    const split = number.split(',');
    const sisa = split[0].length % 3;
    let rupiah = split[0].substr(0, sisa);
    const ribuan = split[0].substr(sisa).match(/\d{3}/g);
    if (ribuan) {
      rupiah += (sisa ? '.' : '') + ribuan.join('.');
    }
    return split[1] !== undefined ? rupiah + ',' + split[1] : rupiah;
  };
  
  export default function Royalti({ navigation }) {
    const [ranking, setRanking] = useState([]);
    const [editItem, setEditItem] = useState(null);
  
    const getData = async () => {
      const json = await AsyncStorage.getItem('DATA_TRANSAKSI');
      const data = json ? JSON.parse(json) : [];
  
      const grouped = {};
  
      data.forEach(item => {
        const nama = item.namaPetani;
        const berat = parseFloat(item.timbangan.replace(/[^\d]/g, '')) || 0;
        const uang = parseFloat((item.pemasukan || '0').replace(/[^\d]/g, '')) || 0;
        const poin = item.poin ? parseInt(item.poin) : berat;
  
        if (!grouped[nama]) {
          grouped[nama] = {
            nama,
            totalTimbangan: 0,
            totalUang: 0,
            poin: 0,
          };
        }
  
        grouped[nama].totalTimbangan += berat;
        grouped[nama].totalUang += uang;
        grouped[nama].poin = poin; // override terakhir yang muncul
      });
  
      const result = Object.values(grouped);
      result.sort((a, b) => b.totalTimbangan - a.totalTimbangan);
      setRanking(result);
    };
  
    useEffect(() => {
      const unsubscribe = navigation.addListener('focus', getData);
      return unsubscribe;
    }, [navigation]);
  
    const simpanPoinEdit = async () => {
      const json = await AsyncStorage.getItem('DATA_TRANSAKSI');
      const data = json ? JSON.parse(json) : [];
  
      const dataBaru = data.map(item => {
        if (item.namaPetani === editItem.nama) {
          return { ...item, poin: editItem.poin };
        }
        return item;
      });
  
      await AsyncStorage.setItem('DATA_TRANSAKSI', JSON.stringify(dataBaru));
      setEditItem(null);
      getData(); // refresh tampilan ranking
    };
  
    const TableCell = ({ text, width, isHeader }) => (
      <View style={{ width, paddingHorizontal: 6 }}>
        <Text
          style={{
            fontFamily: isHeader ? fonts.primary[600] : fonts.primary[400],
            fontSize: 13,
            color: colors.black,
          }}>
          {text}
        </Text>
      </View>
    );
  
    if (editItem) {
      return (
        <View style={{ flex: 1, backgroundColor: colors.white }}>
          <MyHeader title="Edit Poin" />
          <ScrollView>
            <View style={{ padding: 20 }}>
              <Text style={{ fontFamily: fonts.primary[600], marginBottom: 6 }}>Nama Petani :</Text>
              <TextInput
                editable={false}
                value={editItem.nama}
                style={{ backgroundColor: '#f4f4f4', padding: 12, borderRadius: 12, marginBottom: 10 }}
              />
              <Text style={{ fontFamily: fonts.primary[600], marginBottom: 6 }}>Timbangan :</Text>
              <TextInput
                editable={false}
                value={`${editItem.totalTimbangan} Kg`}
                style={{ backgroundColor: '#f4f4f4', padding: 12, borderRadius: 12, marginBottom: 10 }}
              />
              <Text style={{ fontFamily: fonts.primary[600], marginBottom: 6 }}>Total Keuangan :</Text>
              <TextInput
                editable={false}
                value={`Rp${formatRupiah(editItem.totalUang.toString())}`}
                style={{ backgroundColor: '#f4f4f4', padding: 12, borderRadius: 12, marginBottom: 10 }}
              />
              <Text style={{ fontFamily: fonts.primary[600], marginBottom: 6 }}>Poin :</Text>
              <TextInput
                value={editItem.poin.toString()}
                keyboardType="numeric"
                onChangeText={(val) =>
                  setEditItem({ ...editItem, poin: parseInt(val) || 0 })
                }
                style={{
                  backgroundColor: '#f4f4f4',
                  padding: 12,
                  borderRadius: 12,
                  marginBottom: 20,
                }}
              />
              <TouchableOpacity
                onPress={simpanPoinEdit}
                style={{
                  backgroundColor: colors.primary,
                  padding: 14,
                  borderRadius: 20,
                }}>
                <Text style={{
                  color: 'white',
                  fontFamily: fonts.primary[600],
                  textAlign: 'center'
                }}>
                  Simpan
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      );
    }
  
    return (
      <View style={{ flex: 1, backgroundColor: colors.white }}>
        <MyHeader title="Ranking Loyalty" />
        <ScrollView horizontal>
          <View style={{ padding: 10, minWidth: 600 }}>
            {/* Header Table */}
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: '#f5f5f5',
                paddingVertical: 10,
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
                borderBottomWidth: 1,
                borderColor: '#ccc',
                alignItems: 'center',
              }}>
              <TableCell text="Nama Petani" width={150} isHeader />
              <TableCell text="Timbangan" width={100} isHeader />
              <TableCell text="Total Keuangan" width={150} isHeader />
              <TableCell text="Poin" width={60} isHeader />
              <TableCell text="Aksi" width={50} isHeader />
            </View>
  
            {/* Data Rows */}
            {ranking.map((item, index) => (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  paddingVertical: 12,
                  borderBottomWidth: 1,
                  borderColor: '#eee',
                  backgroundColor: index % 2 === 0 ? '#fff' : '#f9f9f9',
                  alignItems: 'center',
                }}>
                <TableCell text={item.nama} width={150} />
                <TableCell text={`${item.totalTimbangan} Kg`} width={100} />
                <TableCell text={`Rp${formatRupiah(item.totalUang.toString())}`} width={150} />
                <TableCell text={item.poin.toString()} width={60} />
                <View style={{ width: 50, alignItems: 'center' }}>
                  <TouchableOpacity onPress={() => setEditItem(item)}>
                    <Icon name="pencil" type="ionicon" size={18} color={colors.primary} />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }
  