import { View, Text, StyleSheet } from 'react-native'
import React, { useMemo } from 'react'
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { BlurView } from 'expo-blur';
import Animated, { Extrapolation, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { hp } from '../helpers/common';
import { theme } from '../constants/theme';




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
          {
            Object.keys(sections).map((sectionName, index)=> {
                let sectionView = sections[sectionName];
                return (
                  <View>
                    <SectionView
                          title={sectionName}
                          content={sectionView({})}
                    />
                  </View>
                )
            })
          }

        </View>
    </BottomSheetView>
  </BottomSheetModal>
  )
}

const sections = {
  "order": (props)=> <OrderView {...props} />,
  "orientation": (props)=> <OrderView {...props} />,
  "type": (props)=> <OrderView {...props} />,
  "colors": (props)=> <OrderView {...props} />
}

const OrderView = ()=> {
  return(
    <View>
      <Text>
        Order View
      </Text>
    </View>
  )
}

const SectionView = ()=> {
    return(
      <View>
        <Text>
          Section View
        </Text>
      </View>
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
    // container: {
    //   flex: 1,
    //   padding: 24,
    //   justifyContent: 'center',
    //   backgroundColor: 'grey',
    // },
    contentContainer: {
      flex: 1,
      alignItems: 'center',
    },
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    content: {
      // flex: 1,
      // backgroundColor: 'red',
      width:'100%',
      gap: 15,
      paddingVertical: 10,
      paddingHorizontal: 20
    },
    filterText: {
      fontSize: hp(4),
      fontWeight: theme.fontWeights.semibold,
      color: theme.colors.neutral(0.8),
      marginBottom: 5
    }
  });

export default FilterModal