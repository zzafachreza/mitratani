import { View, Text, TouchableNativeFeedback, Image } from 'react-native'
import React from 'react'
import { MyHeader } from '../../components'
import { colors, fonts, windowWidth } from '../../utils'

export default function TambahData({ navigation }) {
  return (
    <View style={{
      flex: 1,
      backgroundColor: 'white',

    }}>
      <MyHeader title="Tambah Data" />
      <View style={{
        padding: 10,
      }}>

        <View style={{

          marginTop: 20,
        }}>

          <TouchableNativeFeedback onPress={() => navigation.navigate('DataPetani')}>
            <View style={{
              padding: 10,
              backgroundColor: colors.primary,
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
              marginVertical: 10,

            }}>
              <Image style={{
                width: 96,
                height: 72,
                alicnSelf: "center",
              }} source={require('../../assets/datapetani.png')} />
              <Text style={{
                fontSize: 12,
                textAlign: "center",
                fontFamily: fonts.primary[500],
                color: colors.white,
                marginTop: 10,
              }}>Data Petani</Text>
            </View>
          </TouchableNativeFeedback>


          <TouchableNativeFeedback onPress={() => navigation.navigate('TambahTransaksi', {
            tipe: 'Kakao'
          })}>
            <View style={{
              padding: 10,
              backgroundColor: colors.primary,
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
              marginVertical: 10,
            }}>
              <Image style={{
                width: 71,
                height: 71,
                alicnSelf: "center",
              }} source={require('../../assets/tambahtransaksi.png')} />
              <Text style={{
                fontSize: 12,
                textAlign: "center",
                fontFamily: fonts.primary[500],
                color: colors.white,
                marginTop: 10,
              }}>Transaksi Kakao</Text>
            </View>
          </TouchableNativeFeedback>


          <TouchableNativeFeedback onPress={() => navigation.navigate('TambahTransaksi', {
            tipe: 'Alat Tani'
          })}>
            <View style={{
              padding: 10,
              backgroundColor: colors.primary,
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
              marginVertical: 10,
            }}>
              <Image style={{
                width: 71,
                height: 71,
                alicnSelf: "center",
              }} source={require('../../assets/alat.png')} />
              <Text style={{
                fontSize: 12,
                textAlign: "center",
                fontFamily: fonts.primary[500],
                color: colors.white,
                marginTop: 10,
              }}>Transaksi Alat Tani</Text>
            </View>
          </TouchableNativeFeedback>

          <TouchableNativeFeedback onPress={() => navigation.navigate('ProfitList')}>
            <View style={{
              padding: 10,
              backgroundColor: colors.primary,
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
              marginVertical: 10,
            }}>
              <Image style={{
                width: 71,
                height: 71,
                alicnSelf: "center",
              }} source={require('../../assets/profit.png')} />
              <Text style={{
                fontSize: 12,
                textAlign: "center",
                fontFamily: fonts.primary[500],
                color: colors.white,
                marginTop: 10,
              }}>Profit</Text>
            </View>
          </TouchableNativeFeedback>


        </View>

      </View>
    </View >
  )
}