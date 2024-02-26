/* eslint-disable prettier/prettier */
import {Dimensions, ImageBackground, ImageProps, StyleSheet, Text, Touchable, TouchableOpacity, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import CustomIcon from './CustomIcon';
import BGIcon from './BGIcon';
const CARD_WIDTH = Dimensions.get('window').width * 0.32;

interface CoffeeCardProps {
    id: string;
    index: number;
    type: string;
    roasted: string;
    imagelink_square: ImageProps;
    name: string;
    special_ingredient:string;
    average_rating: number;
    price: any;
    buttonPressHandler: any;
}

const CoffeeCard:React.FC<CoffeeCardProps>  = ({
    id,
    index,
    type,
    roasted,
    imagelink_square,
    name,
    special_ingredient,
    average_rating,
    price,
    buttonPressHandler,
}) => {
  return (
    <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.CardLinerGradientContainer}
        colors = {[COLORS.primaryDarkGreyHex,COLORS.primaryBlackHex]}>
     <ImageBackground
     source={imagelink_square}
     style={styles.CardImageBG}
     resizeMode="cover"
     >
        <View style={styles.CardRatingContainer}>
            <CustomIcon
            name={'star'}
            color={COLORS.primaryOrangeHex}
            size={FONTSIZE.size_16}
            />
            <Text style={styles.CardRatingText}>{average_rating}</Text>
        </View>
     </ImageBackground>
        <Text style = {styles.CardTitle}>{name}</Text>
        <Text style = {styles.CardSubtitle}>{special_ingredient}</Text>
        <View style = {styles.CardFooterRow}>
            <Text style={styles.CardPriceCurrency}>
                $ <Text style={styles.CardPrice}>{price.price}</Text>
            </Text>
            <TouchableOpacity onPress={() => {buttonPressHandler({
                 id,
                 index,
                 name,
                 roasted,
                 imagelink_square,
                 special_ingredient,
                 type,
                 prices : [{...price, quantity : 1}],
            });}}>
                <BGIcon
                color={COLORS.primaryWhiteHex}
                name={'add'}
                BGColor={COLORS.primaryOrangeHex}
                size={FONTSIZE.size_10}/>
            </TouchableOpacity>
        </View>
     </LinearGradient>

  );
};
const styles = StyleSheet.create({
    CardLinerGradientContainer: {
        padding: SPACING.space_15,
        borderRadius: BORDERRADIUS.radius_25,
    },
    CardImageBG : {
      width: CARD_WIDTH,
      height: CARD_WIDTH,
      borderRadius: BORDERRADIUS.radius_20,
      marginTop: SPACING.space_15,
      overflow: 'hidden',
    },
    CardRatingContainer : {
        flexDirection: 'row',
        backgroundColor: COLORS.primaryBlackRGBA,
        alignItems: 'center',
        justifyContent: 'center',
        gap: SPACING.space_10,
        paddingHorizontal: SPACING.space_15,
        position: 'absolute',
        borderBottomLeftRadius: BORDERRADIUS.radius_20,
        borderTopRightRadius: BORDERRADIUS.radius_20,
        top: 0,
        right: 0,
    },
    CardRatingText: {
        fontFamily: FONTFAMILY.poppins_medium,
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_14,
        lineHeight: 22,
    },

    CardFooterRow : {
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: SPACING.space_15,
    },
    CardTitle : {
        fontFamily: FONTFAMILY.poppins_medium,
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_16,
    },
    CardSubtitle:{
        fontFamily: FONTFAMILY.poppins_light,
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_12,
    },
    CardPriceCurrency:{
        fontFamily: FONTFAMILY.poppins_bold,
        color: COLORS.primaryOrangeHex,
        fontSize: FONTSIZE.size_18,
    },
    CardPrice:{
        color: COLORS.primaryWhiteHex,

    },
});

export default CoffeeCard;

