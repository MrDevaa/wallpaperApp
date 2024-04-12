import { View, Text, StyleSheet, Image} from 'react-native'
import React from 'react'
import {StatusBar} from 'expo-status-bar'

const welcomeScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="light"/>
      <Image 
      source={require('../assets/images/welcome.jpg')}
      style={styles.bgImage}
      resizeMode='cover'
      />
    </View>
  )
}


const styles = StyleSheet.create({

})

export default welcomeScreen