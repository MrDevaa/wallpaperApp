import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { BlurView } from 'expo-blur'
import { wp } from '../../helpers/common'

const ImageScreen = () => {
  return (
    <BlurView
        style={styles.container}
        tint='dark'
        intensity={60}

    >
    </BlurView>
  )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: wp(4),

    }
})

export default ImageScreen