/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { COLORS } from '../theme/theme';
import LottieView from 'lottie-react-native';

interface PopUpAnimationProps {
    style: any;
    source: any;
}

const PopUpAnimation : React.FC<PopUpAnimationProps> = ({style, source}) => {
  return (
    <View style={styles.LottieAnimationContainer}>
        <LottieView
        style={style}
        source={source}
        autoPlay
        />
    </View>
  );
};


const styles = StyleSheet.create({

    LottieAnimationContainer :{
    flex:1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.secondaryBlackRGBA,
    justifyContent: 'center',
    zIndex: 1000,
    },
});

export default PopUpAnimation;