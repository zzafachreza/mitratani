import { View, Text, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { colors } from '../../utils'
import { MyHeader } from '../../components'

export default function BackupRestore({navigation}) {
  return (
    <View style={{
        flex:1,
        backgroundColor:colors.white,
    }}>
    <MyHeader title="Back Up & Restore Data"/>
    <View style={{
        padding:20,
        flexDirection:"row",
        justifyContent:"space-between",
        justifyContent:"center",
        alignItems:"center",
    }}>

    <TouchableWithoutFeedback>
        <View style={{
            padding:10,
            borderRadius:10,
            backgroundColor:"#EE8B00",
            
        }}>

        </View>
    </TouchableWithoutFeedback>
    

    </View>

    </View>
  )
}