import { View, Text, StyleSheet, Button, Platform, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { BlurView } from 'expo-blur'
import { wp } from '../../helpers/common'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Image } from 'expo-image'
import { theme } from '../../constants/theme';


const ImageScreen = () => {
  const router = useRouter();
  const item = useLocalSearchParams();
  const [status, setStatus] = useState('loading');
  let uri = item?.webformatURL;
  // console.log('image:', item);


  const getSize = ()=> {

    const aspectRatio = item?.imageWidth / item?.imageHeight;

    const maxWidth = Platform.OS == 'web'? wp(50): wp(92);
    let calculatedHeight = maxWidth / aspectRatio;
    let calculatedWidth = maxWidth;

    if(aspectRatio<1) { // portrait image
      calculatedWidth = calculatedHeight * aspectRatio;
    }
    return{
      width: calculatedWidth,
      height: calculatedHeight,
    }
  }


  const onLoad = () => {
      setStatus('');
  }

  return (
    <BlurView
        style={styles.container}
        tint='dark'
        intensity={60}
    >
      <View style={getSize()}>
        <View style={styles.loading}>
          {
            status=='loading' && <ActivityIndicator size="large" color="white" />
          }
        </View>
        <Image 
              transition={100}
              style={[styles.image, getSize()]}
              source={uri}
              onLoad={onLoad}
        />
      </View>
      <Button title='Back' onPress={()=> router.back()} />
    </BlurView>
  )
}

// adding filter and TOAST with react but issue to be fixed

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: wp(4),
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    image: {
      borderRadius: theme.radius.lg,
      borderWidth: 2,
      backgroundColor: 'rgba(225,225,225,0.1)',
      borderColor: 'rgba(225,225,225,0.1)',
      },
      loading: {
        position:'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',        
      }
})

export default ImageScreen