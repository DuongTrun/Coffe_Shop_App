/* eslint-disable eqeqeq */
/* eslint-disable prettier/prettier */
import {ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import React, { useState } from 'react';
import { useStore } from '../store/store';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import ImageBackgroundInfo from '../components/ImageBackgroundInfo';
import PaymentFooter from '../components/PaymentFooter';

const DetailsScreen = ({navigation, route} : any) => {
  const ItemofIndex = useStore((state:any) =>
    route.params.type == 'Coffee' ? state.CoffeeList : state.BeanList,
    )[route.params.index];

    const addToFavoriteList = useStore((state:any) => state.addToFavoriteList);
    const deleteFromFavoriteList = useStore((state:any) => state.deleteFromFavoriteList);

    const [fullDecreption,setFullDecription] = useState(false);
    const [price,setPrice] = useState(ItemofIndex.prices[0]);
    const addToCart = useStore((state:any) => state.addToCart);
    const calculateCartPrice = useStore((state:any) => state.calculateCartPrice);


  const ToggleFavourite = (favourite: boolean, type:string,id:string) => {
    favourite ?  deleteFromFavoriteList(type,id) : addToFavoriteList(type,id);
  };

  const BackHandler = () => {
    navigation.pop();
  };

  const addToCartHandler = (
    { id,
      index,
      name,
      roasted,
      imagelink_square,
      special_ingredient,
      type,
      price
    } : any)  => {
        addToCart({
          id,
          index,
          name,
          roasted,
          imagelink_square,
          special_ingredient,
          type,
          prices : [{...price, quantity : 1}],
        });
        calculateCartPrice();
        navigation.navigate('Cart');
  };


  return (
    <View style={styles.ScreenContainer}>
        <StatusBar backgroundColor={COLORS.primaryBlackHex} />
        <ScrollView
          showsHorizontalScrollIndicator = {false}
          contentContainerStyle={styles.ScrollViewFlex}>
            <ImageBackgroundInfo
                 EnableBackHandler={true}
                 imagelink_portrait={ItemofIndex.imagelink_portrait}
                 type={ItemofIndex.type}
                 id={ItemofIndex.id}
                 favourite ={ItemofIndex.favourite}
                 name={ItemofIndex.name}
                 special_ingredient={ItemofIndex.special_ingredient}
                 ingredients={ItemofIndex.ingredients}
                 average_rating={ItemofIndex.average_rating}
                 ratings_count={ItemofIndex.ratings_count}
                 roasted={ItemofIndex.roasted}
                 BackHandler={BackHandler}
                 ToggleFavourite={ToggleFavourite}
            />
      <View style={styles.FooterInfoArena}>
        <Text style={styles.InfoTitle}>Decriptions</Text>
        {fullDecreption
        ? (
        <TouchableWithoutFeedback onPress={() => {setFullDecription(prev => !prev);}}>
          <Text style={styles.DecriptionText}>{ItemofIndex.description}</Text>
        </TouchableWithoutFeedback>
         ) : (
        <TouchableWithoutFeedback onPress={() => {setFullDecription(prev => !prev);}}>
          <Text
          numberOfLines={3}
          style={styles.DecriptionText}>{ItemofIndex.description}</Text>
        </TouchableWithoutFeedback>
        )}
        <Text style={styles.InfoTitle}>Size</Text>
          <View style={styles.SizeOuterContainer}>
            {ItemofIndex.prices.map((data:any) => (
              <TouchableOpacity
              key = {data.size}
              onPress={() => {
                setPrice(data);
              }}
              style={[styles.SizeBox,
                {borderColor:
                data.size == price.size
                ? COLORS.primaryOrangeHex
                : COLORS.primaryDarkGreyHex,
              }]}>
              <Text style={[styles.SizeText,
                {fontSize:
                  ItemofIndex.type == 'bean'
                 ? FONTSIZE.size_14
                 : FONTSIZE.size_16,
                 color:
                 data.size == price.size
                 ? COLORS.primaryOrangeHex
                 : COLORS.secondaryLightGreyHex,
                 }]}>
                  {data.size}</Text>
            </TouchableOpacity>
            ))}
          </View>
      </View>
          <PaymentFooter  price={price}
            buttonTitle='Add to Cart'
            buttonPressHandler={() => {
              addToCartHandler({
                id: ItemofIndex.id,
                index: ItemofIndex.index,
                name: ItemofIndex.name,
                roasted: ItemofIndex.roasted,
                imagelink_square: ItemofIndex.imagelink_square,
                special_ingredient: ItemofIndex.special_ingredient,
                type: ItemofIndex.type,
                price: price,
              });
            }}
          />
          </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor:COLORS.primaryBlackHex,
  },
  ScrollViewFlex: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  FooterInfoArena : {
    padding: SPACING.space_15,
  },
  InfoTitle : {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize:FONTSIZE.size_16,
    color:COLORS.primaryWhiteHex,
    marginBottom: SPACING.space_10,
  },
  DecriptionText: {
    letterSpacing: 0.4,
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize:FONTSIZE.size_12,
    color:COLORS.primaryWhiteHex,
    marginBottom: SPACING.space_20,
  },
  SizeOuterContainer:{
    flex:1 ,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.space_20,
  },
  SizeBox: {
   flex: 1,
   height: SPACING.space_24 * 2,
   alignItems:'center',
   justifyContent: 'center',
   backgroundColor: COLORS.primaryDarkGreyHex,
   borderRadius: BORDERRADIUS.radius_15,
   borderWidth: 2,
  },
  SizeText: {
    fontFamily:FONTFAMILY.poppins_medium,
  },
});

export default DetailsScreen;

