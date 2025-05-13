import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Splash,
  Home,
  Login,
  Register,
  Account,
  AccountEdit,
  StatusGizi,
  Imt,
  Take,
  StatusGiziHasil,
  DataIbuHamil,
  DataPemeriksaanIbuHami,
  SubDataPemeriksaanIbuHami,
  IbuHamil,
  TrisemesterI,
  TrisemesterII1,
  TrisemesterIII1,
  TrisemesterIII2,
  TrisemesterIII3,
  IbuBersalin,
  IbuNifas,
  IbuNifasKF,
  VideoMateri,
  TanyaJawab,
  Artikel,
  Kuesioner,
  TrisemesterII2,
  InfoLayananKesehatan,
  InfoEdukasiPenyakit,
  InfoEdukasiPenyakitKanker,
  InfoEdukasiPenyakitStroke,
  InfoEdukasiPenyakitJantung,
  InfoEdukasiPenyakitGinjal,
  InfoEdukasiPenyakitDiabetes,
  InteraksiBersamaTim,
  TentangAplikasi,
  InfoEdukasiPenyakitStunting,
  PrintKainRoll,
  PrintJersey,
  CetakSample,
  CetakSampleKainRoll,
  CetakSampleHijab,
  CetakSampleJersey,
  PrintHijab,
  Riwayat,
  MulaiPage,
  Indentitas,
  HasilTekananDarah,
  SubRiwayatPemeriksaanLaboratorium,
  Gula,
  ProfilLipid,
  LainLain,
  RiwayatPemeriksaanRadiologis,
  RiwayatObat,
  EKG,
  PenilaianNyeri,
  Rekomendasi,
  KalkulatorKompos,
  Petunjuk,
  CheckHargaStock,
  BuatPenawaran,
  TambahPenawaran,
  DonwnloadBrosur,
  BuktiPengeluaran,
  TambahBuktiPengeluaran,
  HasilBuatPenawaran,
  TambahData,
  DataPetani,
  TambahPetani,
  TambahTransaksi,
  DataLaporan,
  BackupRestore,
  Royalti,
  EditTransaksi,
  PetaniDetail,



} from '../pages';
import { colors } from '../utils';
import { Icon } from 'react-native-elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigator } from '../components';



const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

const MainApp = () => {
  return (
    <Tab.Navigator initialRouteName='Produk' tabBar={props => <BottomNavigator {...props} />}>
      <Tab.Screen name="Home" component={Home} />


    </Tab.Navigator>
  );
};

export default function Router() {
  return (
    <Stack.Navigator initialRouteName=''>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{
          headerShown: false,
        }}
      />





      <Stack.Screen
        name="Account"
        component={Account}
        options={{
          headerShown: false,

        }}
      />

      <Stack.Screen
        name="EditTransaksi"
        component={EditTransaksi}
        options={{
          headerShown: false,

        }}
      />


      <Stack.Screen
        name="PetaniDetail"
        component={PetaniDetail}
        options={{
          headerShown: false,

        }}
      />


      <Stack.Screen
        name="BuatPenawaran"
        component={BuatPenawaran}
        options={{
          headerShown: false,

        }}
      />


      <Stack.Screen
        name="DataPetani"
        component={DataPetani}
        options={{
          headerShown: false,

        }}
      />

      <Stack.Screen
        name="TambahTransaksi"
        component={TambahTransaksi}
        options={{
          headerShown: false,

        }}
      />

      <Stack.Screen
        name="TambahData"
        component={TambahData}
        options={{
          headerShown: false,

        }}
      />

      <Stack.Screen
        name="TambahPetani"
        component={TambahPetani}
        options={{
          headerShown: false,

        }}
      />


      <Stack.Screen
        name="DataLaporan"
        component={DataLaporan}
        options={{
          headerShown: false,

        }}
      />

      <Stack.Screen
        name="BackupRestore"
        component={BackupRestore}
        options={{
          headerShown: false,

        }}
      />


      <Stack.Screen
        name="Royalti"
        component={Royalti}
        options={{
          headerShown: false,

        }}
      />

      <Stack.Screen
        name="HasilBuatPenawaran"
        component={HasilBuatPenawaran}
        options={{
          headerShown: false,

        }}
      />

      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,

        }}
      />

      <Stack.Screen
        name="CheckHargaStock"
        component={CheckHargaStock}
        options={{
          headerShown: false,

        }}
      />

      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: false,

        }}
      />


      <Stack.Screen
        name="KalkulatorKompos"
        component={KalkulatorKompos}
        options={{
          headerShown: false,

        }}
      />


      <Stack.Screen
        name="Petunjuk"
        component={Petunjuk}
        options={{
          headerShown: false,

        }}
      />





      <Stack.Screen
        name="AccountEdit"
        component={AccountEdit}
        options={{
          headerShown: false,
          headerTitle: 'Edit Profile',
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerTintColor: '#000',
        }}
      />


      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{
          headerShown: false,
        }}
      />
















    </Stack.Navigator>
  );
}
