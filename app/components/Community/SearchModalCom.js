import React, { useState } from 'react';
import {
  Text, View, Image, Platform, Dimensions,
  StyleSheet,
  Pressable
} from 'react-native';
import { FONTFAMILY } from '../../config/font-config';
import { scale, verticalScale } from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { WellnessRender } from '../Home/Wellness';
import Timer from '../../assets/images/timer.svg'
import FastImage from 'react-native-fast-image';
import styles from '../Plugins/Textfield/src/components/affix/styles';
import CancerPost from '../../components/Community/CancerPost';

export const peopleView = (item, index, section, props) => {
  const extraStyles = extraStyle(props.theme);
  return <View style={extraStyles.itemView}>
    <FastImage
      style={extraStyles.itemImage}
      source={item.image ? { uri: item.image } : require('../../assets/images/profileImage.png')}
      resizeMode={FastImage.resizeMode.cover}
    />
    <View style={{ marginHorizontal: scale(10), justifyContent: 'center', flex: 1 }}>
      <Text numberOfLines={1} style={extraStyles.pepoleName}>{item.name}</Text>
      <Text numberOfLines={1} style={extraStyles.pepoleDec}>
        {item?.cancer_category?.name && `${item?.cancer_category?.name.trim()} -`}
        {item?.cancer_stage?.cancer_stage && item?.cancer_stage?.cancer_stage}</Text>
    </View>
  </View>
}

export const blogView = (item, index, section, props) => {
  const extraStyles = extraStyle(props.theme);
  const theme = props.theme
  return <CancerPost
    item={item}
    onPress={(item) => {
      props.navigation.navigate('Zen.CommunityComment', {
        id: item.id, item: item,
        updateSupport: updateSupport,
        updateComment: updateCommentDetail,
        handleReport: handleReportDetail
      })
    }}
    navigation={props.navigation}
    // onPressBookMark={(item) => onPressBookMark(props.actions, item, reloadPage, setReloadPage, userId)}
    // // onPressPin={onPressPin}
    // onSupport={(item) => apiCallForUpdateSupport(props.actions, item, reloadPage, setReloadPage, userId)}
    // // apiCallFollowList={apiCallFollowList}
    // apiCallMarkAsSpamList={(item) => apiCallMarkAsSpamList(props.actions, item, communityList, setCommuityList, reloadPage, setReloadPage, userId)}
    // apiCallReportList={(item) => apiCallReportList(props.actions, item, communityList, setCommuityList, reloadPage, setReloadPage, userId)}
    // onClickCommentHeart={(comment, item) => onClickHeart(props.actions, comment, item, userId, reloadPage, setReloadPage)}
    // showDay={true}
    theme={theme}
    index={index}
  // textShown={textShown}
  // setTextShown={setTextShown}
  // openProfileScreen={(item) => openUserProfileScreen(item, props.navigation, theme)}
  // addComments={(data, item) => addComments(props.actions, data, item, setItem)}
  // apiCallDeletePost={(item) => apiCallDeletePost(props.actions, item, communityList, setCommuityList, reloadPage, setReloadPage)}
  />

  // <View style={extraStyles.blowMainView}>
  //   <FastImage
  //     style={extraStyles.blogImage}
  //     source={item.image ? { uri: item.image } : require('../../assets/images/profileImage.png')}
  //     resizeMode={FastImage.resizeMode.cover}
  //   />
  //   <View style={{ padding: 10, flex: 1 }}>
  //     <Text numberOfLines={2} style={extraStyles.blogTitle}>{item.title}</Text>
  //     <View style={extraStyles.blogSemiView}>
  //       <View style={extraStyles.blogShareView}>
  //         <View style={extraStyles.blogIconView}>
  //           <View style={extraStyles.blogIcon}>
  //             <Ribbon height={16} width={9} />
  //           </View>
  //           <View style={{ marginLeft: scale(5) }}>
  //             <Text numberOfLines={2} style={[extraStyles.blogSemiText, { fontSize: scale(11) }]}>
  //               ZenOnco.io</Text>
  //             <Text numberOfLines={2} style={extraStyles.blogSemiText}>{item?.support_count}k View</Text>
  //           </View>
  //         </View>
  //         <Pressable>
  //           <AntDesign name={'sharealt'} size={20} color={theme?.GRAY_BLACK} />
  //         </Pressable>
  //       </View>
  //       <Pressable style={extraStyles.bookMark}>
  //         <Feather name={'bookmark'} size={20} color={theme?.GRAY_BLACK} />
  //       </Pressable>
  //     </View>
  //   </View>
  // </View>
}

export const groupView = (item, index, section, props) => {
  const extraStyles = extraStyle(props.theme);
  const theme = props.theme
  return <View style={extraStyles.blowMainView}>
    <FastImage
      style={extraStyles.blogImage}
      source={item.image ? { uri: item.image } : require('../../assets/images/portrait-sample.jpg')}
      resizeMode={FastImage.resizeMode.cover}
    />
    <View style={{ padding: 10, flex: 1 }}>
      <Text numberOfLines={2} style={extraStyles.blogTitle}>{item.name}</Text>
      <View style={[extraStyles.blogSemiView, { justifyContent: 'space-between' }]}>
        <View style={{
          width: '60%', flexDirection: 'row',
          alignItems: "center", height: verticalScale(30)
        }}>
          <MaterialIcons name='people' size={16} color={theme.SUB_TITLE} />
          <Text numberOfLines={2} style={[extraStyles.blogSemiText, {
            marginLeft: scale(4),
            color: theme.SUB_TITLE, marginTop: Platform.OS === 'ios' ? 0 : 3
          }]}>1.5 k</Text>
        </View>
        <Pressable style={extraStyles.joinButton}>
          <Text numberOfLines={2} style={[extraStyles.blogTitle, { color: theme.PRIMARY, marginTop: Platform.OS === 'ios' ? 0 : 3 }]}>Join</Text>
        </Pressable>
      </View>
    </View>
  </View>
}

export const wellnessView = (item, index, section, props) => {
  const extraStyles = extraStyle(props.theme);
  const theme = props.theme
  return <WellnessRender item={item}
    navigation={props.navigation}
    WellNessCategoryById={[{
      data: {
        categoryName: item?.wellness_category?.categoryName ?
          item?.wellness_category?.categoryName : 'yoga poses'
      }
    }]}
    extraStyle={{ width: '100%' }}
    theme={props.theme}
    onPress={(item) => {
      // let data = WellNessCategoryById
      // if (WellNessCategoryById[0]?.data?.length > 1) {
      //   let filterdata = WellNessCategoryById[0]?.data.filter(itemA => itemA.id == item.wellnessCategoryId)
      //   data = [{ data: filterdata[0] }]
      // }
      // props.navigation.navigate('Zen.WellnessCategoryItem', {
      //   item: item,
      //   WellNessCategoryById: data
      // })
    }}
    onPlusPress={(item: any) => {
      // props.navigation.navigate('Zen.AddActivity', {
      //   title: item.title,
      //   wellnessid: item.id,
      //   category: WellNessCategoryById[0].data.calendar_category || item.calCat,
      //   isFromWellness: true,
      //   isWellnessCategory: true
      // })
    }} />
}

export const productView = (item, index, section, props) => {
  const extraStyles = extraStyle(props.theme);
  const theme = props.theme
  return <View style={[extraStyles.blowMainView, { padding: 10 }]}>
    <FastImage
      style={styles.productImage}
      source={item.image ? { uri: item.image } : require('../../assets/images/profileImage.png')}
      resizeMode={FastImage.resizeMode.contain}
    />
    <View style={{ padding: 10, flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Text numberOfLines={2} style={extraStyles.blogTitle}>{item?.product}</Text>
      </View>
      <Text numberOfLines={1} style={[extraStyles.blogSemiText, { marginTop: Platform.OS === 'ios' ? 0 : -4 }]}>500mg (60 Capsules)</Text>
      <View style={[extraStyles.blogSemiView, { justifyContent: 'space-between', marginTop: Platform.OS === 'ios' ? 8 : 5 }]}>
        <View style={extraStyles.productSemiView}>
          <View style={[extraStyles.plusProductView, extraStyles.addRemoveItemContainer]} >
            <Pressable style={[extraStyles.addRemoveItem, {}]} onPress={() => { }}>
              <Text style={extraStyles.addRemoveText}>-</Text>
            </Pressable>
            <Text style={[extraStyles.blogTitle, { marginHorizontal: scale(10) }]}>1</Text>
            <Pressable style={[extraStyles.addRemoveItem, {}]} onPress={() => { }}>
              <Text style={extraStyles.addRemoveText}>+</Text>
            </Pressable>
          </View>
          <Text numberOfLines={1} style={[extraStyles.blogTitle, {
            color: theme.BLACK,
          }]}>₹{item?.salePrice}</Text>
        </View>
      </View>
    </View>
  </View>
}

export const recipesView = (item, index, section, props) => {
  const extraStyles = extraStyle(props.theme);
  const theme = props.theme
  return <View style={extraStyles.blowMainView}>
    <FastImage
      style={[extraStyles.blogImage, { height: verticalScale(93) }]}
      source={item.image ? { uri: item.image } : require('../../assets/images/profileImage.png')}
      resizeMode={FastImage.resizeMode.cover}>
      <>
        <Pressable style={styles.nonLikeVw} >
          <Image source={require('../../assets/images/nonlike.png')} style={{ tintColor: theme.RED }} />
        </Pressable>
        <View style={styles.foodTypeVw} >
          <Text style={styles.foodtypeText} >Semi-solid</Text>
        </View>
      </>
    </FastImage>
    <View style={{ padding: 10, flex: 1, justifyContent: 'space-between' }}>
      <Text numberOfLines={2} style={extraStyles.blogTitle}>{item?.food_item}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Timer />
          <Text numberOfLines={1} style={[extraStyles.blogTitle, {
            color: theme.SUB_TITLE,
            marginLeft: 5,
            width: '60%'
          }]}>{item?.minutes_cooking}</Text>
        </View>
        <View style={{
          width: '26%',
          flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
          backgroundColor: theme?.ICON_TINT, paddingHorizontal: 3, borderRadius: scale(5)
        }}>
          <Text numberOfLines={1} style={[extraStyles.blogTitle, {
            color: theme.PRIMARY,
            marginLeft: 5
          }]}>{item?.star_rating}</Text>
          <Entypo name='star' color={theme.PRIMARY} size={scale(11)} />
        </View>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <AntDesign name='check' size={scale(12)} color={theme.SUB_TITLE} />
        <Text numberOfLines={1} style={[extraStyles.blogTitle, {
          color: theme.SUB_TITLE,
          marginLeft: 5
        }]}>Anti-inflammatory</Text>
      </View>
    </View>
  </View>
}

const extraStyle = (theme: any) => {
  return StyleSheet.create({
    pepoleName: {
      fontSize: scale(13),
      color: theme?.BLACK,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM
    },
    pepoleDec: {
      fontSize: scale(12),
      color: theme?.SUB_TITLE,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM
    },
    itemView: {
      flexDirection: 'row',
      paddingHorizontal: scale(15),
      paddingVertical: scale(12),
      alignItems: 'center',
      backgroundColor: theme.PRIMARY,
      marginVertical: verticalScale(7),
      borderColor: '#eeeeee',
      borderWidth: 1,
      borderRadius: scale(10)
    },
    itemImage: {
      width: scale(43),
      height: scale(43),
      borderRadius: scale(10)
    },
    productImage: {
      height: 91,
      width: 91
    },
    blowMainView: {
      flexDirection: 'row',
      backgroundColor: theme.PRIMARY,
      marginVertical: scale(10),
      overflow: 'hidden',
      borderColor: '#eeeeee',
      borderWidth: 1,
      borderRadius: scale(10)
    },
    blogImage: {
      height: verticalScale(90),
      width: scale(110),
    },
    nonLikeVw: {
      width: 28,
      height: 28,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 14,
      backgroundColor: theme.PRIMARY,
      position: 'absolute',
      right: 5,
      top: 5
    },
    foodTypeVw: {
      flexDirection: 'row',
      position: 'absolute',
      bottom: 8,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
      alignItems: 'center',
      paddingHorizontal: 8,
      justifyContent: 'center',
      paddingVertical: 3
    },
    foodtypeText: {
      color: theme.PRIMARY,
      fontSize: 10,
      fontFamily: FONTFAMILY.POPPINS_REGULAR
    },
    blogTitle: {
      fontSize: scale(12),
      color: theme?.BLACK,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM
    },
    blogSemiView: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      flex: 1
    },
    bookMark: {
      marginBottom: verticalScale(2),
      marginLeft: scale(10),
      marginBottom: scale(5)
    },
    blogSemiText: {
      fontSize: scale(10),
      color: theme?.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM
    },
    blogIcon: {
      backgroundColor: theme.PAGINATION_SELECCT,
      alignItems: 'center',
      justifyContent: 'center',
      height: scale(25),
      width: scale(25),
      borderRadius: scale(10)
    },
    blogIconView: {
      flexDirection: 'row',
      flex: 1, alignItems: 'center'
    },
    blogShareView: {
      flexDirection: 'row',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    joinButton: {
      height: Platform.OS === 'ios' ? verticalScale(30) : verticalScale(32),
      backgroundColor: theme.SECONDARY,
      paddingHorizontal: scale(15),
      borderRadius: scale(5),
      alignItems: 'center', justifyContent: 'center'
    },
    addRemoveItemContainer: {
      padding: 2,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderRadius: scale(50),
    },
    addRemoveItem: {
      width: scale(23),
      height: scale(23),
      borderRadius: scale(23),
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.SECONDARY,
    },
    addRemoveText: {
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: scale(16),
      color: theme.PRIMARY
    },
    plusProductView: {
      borderColor: '#e2e2e2',
      alignSelf: "flex-end",
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1, borderRadius: scale(50)
    },
    productSemiView: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      justifyContent: 'space-between'
    }
  })
}

let well = {
  id: 1,
  calendarCategoryId: 5,
  categoryName: "Yoga poses",
  image: "https://zenapp-test.s3.ap-south-1.amazonaws.com/Yoga+poses.svg",
  selected_image: "https://zenapp-test.s3.ap-south-1.amazonaws.com/Yoga+poses_selected.svg",
  Count: 76,
  calendar_category: {
    id: 5,
    name: "Exercise",
    image: "https://zenapp-test.s3.ap-south-1.amazonaws.com/Exercise.svg",
    color: "#F5E9F7",
    shadow: "#EAD2EE",
    table: "exercise",
    status: 1,
    display_order: 0,
    createdAt: "2022-06-08T05:09:08.000Z",
    updatedAt: "2022-06-08T05:09:08.000Z"
  },
  wellCat: 'Emotional wellness',
  wellnesses: [
    {
      id: 1,
      wellnessCategoryId: 1,
      title: "Tree Pose or Handstand Pose",
      image: "",
      short_description: "Strengthens arms, shoulders wrist",
      long_description: "Adho Mukha Vrikshasana is also known as downward facing tree or yoga handstand.\n\nProcedure:\n",
      url: "https://www.youtube.com/watch?v=X8L3Wtuqvao",
      hours: 0,
      minutes: 6,
      seconds: 18,
      wellnesses_conditions: [{
        id: 130,
        wellnessId: 1,
        wellnessCategoryId: 1,
        conditions: 59,
        do_avoid: 1
      }]
    }
  ]
}