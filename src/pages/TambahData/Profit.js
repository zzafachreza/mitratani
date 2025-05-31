import {
    View,
    Text,
    ScrollView,
    TouchableNativeFeedback,
    Modal,
    Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors, fonts } from '../../utils';
import { MyHeader, MyInput } from '../../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getData, storeData } from '../../utils/localStorage';
import moment from 'moment';

export default function Profit({ navigation }) {
    const [nama, setNama] = useState('');
    const [ID, setID] = useState('PT' + moment().format('YYMMDDHHmmss'))
    const [modalVisible, setModalVisible] = useState(false);
    const [poin, setPoin] = useState('');


    const [kirim, setKirim] = useState({
        inv: 0,
        avg: 0,
        new: 0,
        bfr: 0,
        total: 0,

    });

    useEffect(() => {
        getData('profit').then(res => {
            if (!res) {
                setKirim({
                    inv: 0,
                    avg: 0,
                    new: 0,
                    bfr: 0,

                })
            } else {
                setKirim(res)
            }
        })
    }, [])

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


    const simpanData = async () => {

        console.log({
            inv: parseFloat(kirim.inv),
            avg: parseFloat(kirim.avg),
            new: parseFloat(kirim.new),
            bfr: parseFloat(kirim.bfr),
            total: parseFloat(kirim.inv) * parseFloat(kirim.avg) + parseFloat(kirim.new) - parseFloat(kirim.bfr)

        });

        setKirim({
            inv: parseFloat(kirim.inv),
            avg: parseFloat(kirim.avg),
            new: parseFloat(kirim.new),
            bfr: parseFloat(kirim.bfr),
            total: parseFloat(kirim.inv) * parseFloat(kirim.avg) + parseFloat(kirim.new) - parseFloat(kirim.bfr)

        })

        storeData('profit', {
            inv: parseFloat(kirim.inv),
            avg: parseFloat(kirim.avg),
            new: parseFloat(kirim.new),
            bfr: parseFloat(kirim.bfr),
            total: parseFloat(kirim.inv) * parseFloat(kirim.avg) + parseFloat(kirim.new) - parseFloat(kirim.bfr)

        })









    };

    const lst = 'Pakai ini saja Inventory yang tersisa x harga rata2 inventory + kas setelah penjualan yang baru - kas penjualan sebelumnya';

    return (
        <View style={{ flex: 1, backgroundColor: colors.white }}>
            <MyHeader title="Informasi Profit" />
            <ScrollView>
                <View style={{ padding: 20 }}>
                    <MyInput
                        label="Inventory yang Tersisa"
                        keyboardType="number-pad"
                        value={kirim.inv.toString()}
                        onChangeText={x => setKirim({ ...kirim, inv: x })}
                    />

                    <MyInput
                        label="Harga Rata-rata Inventory"
                        keyboardType="number-pad"
                        value={kirim.avg.toString()}
                        onChangeText={x => setKirim({ ...kirim, avg: x })}
                    />

                    <MyInput
                        label="Kas Setelah Penjualan yang Baru"
                        keyboardType="number-pad"
                        value={kirim.new.toString()}
                        onChangeText={x => setKirim({ ...kirim, new: x })}
                    />

                    <MyInput
                        label="Kas Penjualan Sebelumnya"
                        keyboardType="number-pad"
                        value={kirim.bfr.toString()}
                        onChangeText={x => setKirim({ ...kirim, bfr: x })}
                    />

                    <Text style={{
                        textAlign: 'center',
                        marginTop: 10,
                        fontFamily: fonts.secondary[600],
                        fontSize: 30,
                    }}>
                        {formatRupiah(kirim.total)}
                    </Text>

                </View>



            </ScrollView>

            <View style={{ padding: 20 }}>
                <TouchableNativeFeedback onPress={simpanData}>
                    <View
                        style={{
                            padding: 10,
                            backgroundColor: colors.primary,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 20,
                        }}>
                        <Text
                            style={{
                                fontFamily: fonts.primary[600],
                                color: colors.white,
                                fontSize: 15,
                            }}>
                            Simpan
                        </Text>
                    </View>
                </TouchableNativeFeedback>
            </View>

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
                            source={require('../../assets/success.png')} // sesuaikan dengan lokasi file PNG kamu
                            style={{ width: 100, height: 100 }}
                            resizeMode="contain"
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
}
