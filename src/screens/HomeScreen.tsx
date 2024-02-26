/* eslint-disable react/self-closing-comp */
/* eslint-disable eqeqeq */
/* eslint-disable prettier/prettier */
import {Dimensions, FlatList, ScrollView, StatusBar, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View} from 'react-native';
import React, { useRef, useState } from 'react';
import { useStore } from '../store/store';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import HeaderBar from '../components/HeaderBar';
import CustomIcon from '../components/CustomIcon';
import CoffeeCard from '../components/CoffeeCard';


const getCategoriesFromData = (data:any) => {
  let temp : any = {};
  for (let i = 0; i < data.length; i++)
    {
      if (temp[data[i].name] == undefined)
      {
        temp[data[i].name] = 1;
      } else
      {
        temp[data[i].name]++;
      }
    }
    let categories = Object.keys(temp);
    categories.unshift('All');
    return categories;
};

const getCoffeeList = (category : string, data: any) => {
  if (category == 'All')
  {
    return data;
  } else
  {
    let coffeelist = data.filter((item:any) => item.name == category);
      return coffeelist;
  }
};

const HomeScreen = ({navigation}:any) => {
  const CoffeeList = useStore((state: any) => state.CoffeeList);
  const BeanList = useStore((state: any) => state.BeanList);
  const addToCart = useStore((state:any) => state.addToCart);
  const calculateCartPrice = useStore((state:any) => state.calculateCartPrice);

  const [categories,setCategories] = useState(getCategoriesFromData(CoffeeList));
  const [searchText,setSearchText] = useState('');
  const [categoryIndex,setCategoryIndex] = useState({
    index: 0,
    category: categories[0],
  });
  const [sortedCoffee,setSortedCoffee] = useState(
    getCoffeeList(categoryIndex.category, CoffeeList),
    );

    const ListRef:any = useRef<FlatList>();
    const tabBarHeight = useBottomTabBarHeight();

     const searchCoffee = (search:string) => {
      if (search != '') {
        ListRef?.current?.scrollToOffset({
          animated: true,
          offset: 0,
        });
        setCategoryIndex({index : 0 , category: categories[0]});
        setSortedCoffee([
          ...CoffeeList.filter((item:any) =>
            item.name.toLowerCase().includes(search.toLowerCase()),
          ),
        ]);
      }
     };

     const resetSearchCoffee = () => {
      ListRef?.current?.scrollToOffset({
        animated: true,
        offset: 0,
      });
      setCategoryIndex({index : 0 , category: categories[0]});
      setSortedCoffee([...CoffeeList ]);
      setSearchText('');
     };

     const CoffeeCardAddToCart = (
      { id,
        index,
        name,
        roasted,
        imagelink_square,
        special_ingredient,
        type,
        prices
      } : any)  => {
          addToCart({
            id,
            index,
            name,
            roasted,
            imagelink_square,
            special_ingredient,
            type,
            prices,
          });
          calculateCartPrice();
          ToastAndroid.showWithGravity(
            `${name} is Added to Cart`
            , ToastAndroid.SHORT,
            ToastAndroid.CENTER);
    };

  return (
    <View style={styles.ScreenContainer}>
     <StatusBar backgroundColor={COLORS.primaryBlackHex} />
     <ScrollView
     showsVerticalScrollIndicator = {false}
     contentContainerStyle = {styles.ScrollWiewFlex}>
      {/* App Header */}
      <HeaderBar/>
      <Text style={styles.ScreenTitle}>Find the best{'\n'}coffee for you</Text>
      <Text>
        {/* Search Input */}

      </Text>
      <View style={styles.InputContainerComponents}>
        <TouchableOpacity onPress={() => {
          searchCoffee(searchText);
        }}>
          <CustomIcon
          style={styles.InputIcon}
          name="search"
          size={FONTSIZE.size_18}
          color={
            searchText.length > 0
            ? COLORS.primaryOrangeHex
            : COLORS.primaryLightGreyHex
          }
          />
        </TouchableOpacity>
        <TextInput
        placeholder="Find your coffee..."
        value={searchText}
        onChangeText={text => {
          setSearchText(text);
          searchCoffee(text);
        }
      }
        placeholderTextColor={COLORS.primaryLightGreyHex}
        style={styles.TextInputContainer}
        ></TextInput>
         {searchText.length > 0 ? (
          <TouchableOpacity onPress={() => (resetSearchCoffee())}>
            <CustomIcon
              name="close"
              size={FONTSIZE.size_16}
              color={COLORS.primaryLightGreyHex}
              style={styles.InputIcon}
            />
          </TouchableOpacity>
         ) : (<></>)}
      </View>

      {/* Category Sroller */}

    <ScrollView
     horizontal
     showsHorizontalScrollIndicator = {false}
     contentContainerStyle={styles.CategoryScrollStyle}>

    {categories.map((data,index) => (
      <View
      key={index.toString()}
      style={styles.CategoryScrollWiewContainer}
      >
        <TouchableOpacity
         style = {styles.CategoryScrollViewItem}
         onPress = {() => {
          ListRef?.current?.scrollToOffset({
            animated: true,
            offset: 0,
          });
          setCategoryIndex({index: index,
             category: categories[index]});
          setSortedCoffee(
            [...getCoffeeList(categories[index],CoffeeList)]);
         }}>
          <Text
          style={[
            styles.CategoryText,
            categoryIndex.index == index
            ? {color: COLORS.primaryOrangeHex}
            : {},
          ]}
          >{data}</Text>
          {categoryIndex.index == index
          ? (<View style={styles.ActiveCategoty} />)
          : (<></>)}
        </TouchableOpacity>
      </View>
     ))}
     </ScrollView>
      {/* Coffee FlatList */}

    <FlatList
    ref={ListRef}
    horizontal
    showsHorizontalScrollIndicator = {false}
    ListEmptyComponent={
      <View style={styles.EmptyListContainer}>
        <Text style={styles.CategoryText}>No Coffee Available</Text>
      </View>
      }
    data={sortedCoffee}
    contentContainerStyle = {styles.FlatListContainer}
    keyExtractor={item => item.id}
    renderItem={({item}) => {
      return <TouchableOpacity onPress={() => {
        navigation.push('Details' ,{
          index: item.index,
          id: item.id,
          type: item.type,
        });
      }}>
        <CoffeeCard
            id={item.id}
            index={item.index}
            type={item.type}
            roasted={item.rosted}
            imagelink_square={item.imagelink_square}
            name={item.name}
            special_ingredient={item.special_ingredient}
            average_rating={item.average_rating}
            price={item.prices[2]}
            buttonPressHandler={CoffeeCardAddToCart}
        />
      </TouchableOpacity>;
    }}
    />

    <Text style={styles.CoffeeBeansTitle}>Coffee Beans</Text>
      {/* BeansFlatList */}

      <FlatList
    horizontal
    showsHorizontalScrollIndicator = {false}
    data={BeanList}
    contentContainerStyle = {[styles.FlatListContainer, {marginBottom: tabBarHeight}]}
    keyExtractor={item => item.id}
    renderItem={({item}) => {
      return <TouchableOpacity
        onPress={() => {
          navigation.push('Details' ,{
            index: item.index,
            id: item.id,
            type: item.type,
          }
          );
        }}>
        <CoffeeCard
            id={item.id}
            index={item.index}
            type={item.type}
            roasted={item.rosted}
            imagelink_square={item.imagelink_square}
            name={item.name}
            special_ingredient={item.special_ingredient}
            average_rating={item.average_rating}
            price={item.prices[2]}
            buttonPressHandler={CoffeeCardAddToCart}
        />
      </TouchableOpacity>;
    }}
    />
     </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  ScrollWiewFlex : {
    flexGrow: 1,
  },
  ScreenTitle : {
    fontSize: FONTSIZE.size_28,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryWhiteHex,
    paddingLeft: SPACING.space_30,
  },
  InputContainerComponents : {
    margin: SPACING.space_30,
    borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: COLORS.primaryDarkGreyHex,
    flexDirection: 'row',
    alignItems:'center',
  },
  InputIcon:{
    marginHorizontal:SPACING.space_20,
  },
  TextInputContainer: {
    flex: 1,
    height: SPACING.space_20 * 3,
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryWhiteHex,
  },
  CategoryScrollStyle : {
    paddingHorizontal: SPACING.space_20,
    marginBottom: SPACING.space_20,

  },
  CategoryScrollWiewContainer : {
    paddingHorizontal: SPACING.space_15,
  },
  CategoryScrollViewItem: {
    alignItems: 'center',
  },

  CategoryText: {
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryLightGreyHex,
    marginBottom: SPACING.space_4,
  },
  ActiveCategoty : {
    height: SPACING.space_10,
    width: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: COLORS.primaryOrangeHex,
  },
  FlatListContainer : {
    gap: SPACING.space_20,
    paddingVertical: SPACING.space_20,
    paddingHorizontal: SPACING.space_20,
  },
  EmptyListContainer : {
    width: Dimensions.get('window').width - SPACING.space_30 * 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.space_36 ,
  },
  CoffeeBeansTitle: {
    fontSize: FONTSIZE.size_18,
    marginLeft: SPACING.space_30,
    marginRight: SPACING.space_30,
    color: COLORS.secondaryLightGreyHex,
    fontFamily:FONTFAMILY.poppins_medium,
  },
});

export default HomeScreen;

