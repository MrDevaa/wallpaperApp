import { View, Text, StyleSheet } from 'react-native'
import React, { useMemo } from 'react'
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { BlurView } from 'expo-blur';
import Animated, { Extrapolation, interpolate, useAnimatedStyle } from 'react-native-reanimated';


const FilterModal = ({modalRef}) => {

      // variables
        const snapPoints = useMemo(() => ['75%'], []);


  return (
    <BottomSheetModal
    ref={modalRef}
    index={0}
    snapPoints={snapPoints}
    enablePanDownToClose={true}
    backdropComponent={customBackdrop}
    // onChange={handleSheetChanges}
  >
    <BottomSheetView style={styles.contentContainer}>
        <View style={styles.content}>
          <Text style={styles.filterText}> Filters </Text>
        </View>
>    </BottomSheetView>
  </BottomSheetModal>
  )
}

const customBackdrop = ({animatedIndex, style}) => {


  const containerAnimatedStyle = useAnimatedStyle(()=> {

    let opacity = interpolate(
      animatedIndex.value,
      [-1, 0],
      [0,1],
      Extrapolation.CLAMP
    )
      return {
        opacity
      }
  })

    const containerStyle = [
        StyleSheet.absoluteFill,
        style,
        styles.overlay,
        containerAnimatedStyle
    ]

        return(
            <Animated.View style={containerStyle}>
                {/* blur View */}
                  <BlurView
                    style={StyleSheet.absoluteFill}
                    tint='dark'
                    intensity={25}
                  />
            </Animated.View>
            )
}

//styleSheet // css
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      justifyContent: 'center',
      backgroundColor: 'grey',
    },
    contentContainer: {
      flex: 1,
      alignItems: 'center',
    },
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.5)'
    }
  });

export default FilterModal