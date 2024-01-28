import React, { useEffect } from 'react';
import { useState } from 'react';
import { View, Text, Pressable, Image, StyleSheet, Platform, Alert } from 'react-native';
import { FONTFAMILY } from '../../config/font-config';
import { dateDiffInDaysMonthsYears, shortNameFunc } from '../../utils/commonFunction';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import { useSelector } from 'react-redux';
import { deletePost } from '../../store/actions/storiesActions';
import { transform } from 'lodash';
import translate from "../../utils/Text"
import Bookmark from '../../assets/images/bookmark_selected.svg';
import Bookmark1 from '../../assets/images/bookmark_unselected.svg';
import Dots from '../../assets/images/Dots.svg';
import Toast from 'react-native-toast-message';


const PostHeader = ((props) => {
    const { header, apiCallReportList, description, apiCallMarkAsSpamList, apiCallDeletePost,  setVisible, theme, showDay, item, onPressBookMark, onPressPin, apiCallFollowList, openProfileScreen } = props
    const styles = modalStyles(theme);
    const [follow, setIsfollow] = useState(item?.post_subcategory?.user_follows?.length != undefined && item?.post_subcategory?.user_follows?.length > 0 ?
        item?.post_subcategory?.user_follows[0].status == 1 ? true : false : false);
    const menuPopUp = React.createRef();
    const userData = useSelector((state) => state.onboardingReducer.userDetails);

    const postOption = () => {
        return (
            <Menu
                ref={menuPopUp}
                style={{ borderRadius: 15, borderWidth: 1, borderColor: '#dcd8d8', width: 132, height: 
                userData?.user_profile?.id >= 7 ? userData?.data?.userId == item?.author_detail?.id ? 50  : 130 : 
                userData?.data?.userId == item?.author_detail?.id ? 50 : 90, marginTop: 23 }}
                anchor={
                    <Pressable onPress={() => menuPopUp.current.show()} style={{ marginTop: -7, width: 30, height: 50, alignItems: 'center', justifyContent: 'center' }}>
                        {/* <Image style={[styles.moreImg, { marginTop: -20 }]} source={require('../../assets/images/dots.png')} /> */}
                        <Dots />
                    </Pressable>}
                onRequestClose={() => menuPopUp.current.hide()}>
                    {userData?.data?.userId != item?.author_detail?.id &&
                <MenuItem style={{}} onPress={() => {
                    menuPopUp.current.hide();
                    // apiCallReportList(item);
                    handleAlert()
                }}>Hide Post</MenuItem>}
                {userData?.data?.userId != item?.author_detail?.id &&
                <MenuItem style={{}} onPress={() => {
                    menuPopUp.current.hide();
                    // apiCallReportList(item);
                    setVisible(true, item)
                }}>Report Post</MenuItem>}
                {userData?.data?.userId == item?.author_detail?.id &&
                <MenuItem style={{}} onPress={() => {
                    menuPopUp.current.hide();
                    apiCallDeletePost(item)
                }}>{translate("COMMONTEXT")["DELETE"]}</MenuItem>}
                {userData?.user_profile?.id >= 7 && userData?.data?.userId != item?.author_detail?.id &&
                    <MenuItem style={{ marginTop: -11 }} onPress={() => {
                        menuPopUp.current.hide();
                        apiCallMarkAsSpamList(item);
                    }}>{translate("COMMONTEXT")["MARK_AS_SPAM"]}</MenuItem>}
                {/* <MenuItem style={{}} onPress={() => {
                    menuPopUp.current.hide()
                    onPressPin(item)
                }}>{props.item?.cancer_healing_story_pins?.length != undefined && props.item?.cancer_healing_story_pins.length > 0 ? "Unpin post" : "Pin post"}</MenuItem> */}
            </Menu>
        );
    }
    const handleAlert = () => {
        Alert.alert(
            'Hide Post',
            'Are you sure you want to hide this post?',
            [
              {
                text: "No",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              {
                text: "Yes", onPress: () => {
                    apiCallReportList(item);
                }
              }
            ]
          )
    }

    return (
        <View style={styles.header}>
            <Pressable style={styles.imgView} onPress={() => item.anonymous_flag != 1 && openProfileScreen(item)} >
                <Image style={styles.icon} source={item.anonymous_flag == 1 || item?.author_detail?.user_details[0]?.image == null ? require('../../assets/images/profileImage.png') : { uri: item?.author_detail?.user_details[0]?.image }} />
            </Pressable>
            <View style={{ marginHorizontal: 7, width:'73%' }}>
                {item.anonymous_flag != 1 ?
                    <Pressable onPress={() => openProfileScreen(item)}>
                        <Text style={styles.headerText} numberOfLines={1}>{header}</Text>
                    </Pressable> :
                        <Text style={styles.headerText} numberOfLines={1}>{translate("CREATE_POST")["Anonymous"]}</Text>
                }

                {item.anonymous_flag != 1 &&  item?.author_detail?.user_details.length > 0
                && shortNameFunc(
                    item?.author_detail?.user_details.length > 0 ?
                        item?.author_detail?.user_details[0] : undefined
                ).length > 0 && <Text style={styles.disText} numberOfLines={1}>{shortNameFunc(
                                item?.author_detail?.user_details.length > 0 ?
                                    item?.author_detail?.user_details[0] : undefined
                            )}</Text>}

                <View style={styles.topicView}>
                    <Image style={styles.topicIcon} source={require('../../assets/images/home/Healing_stories.png')} />
                    <Text style={styles.topicTxt}>{item?.post_category?.name}</Text>
                    {showDay &&
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ textAlignVertical: 'bottom', color: theme.SUB_TITLE }}>•</Text>
                            <Text style={styles.topicTxt}>{dateDiffInDaysMonthsYears(item.createdAt)}</Text>
                        </View>
                    }
                </View>
            </View>
            <View style={styles.moreImgView}>
                {props.item?.cancer_healing_story_pins.length > 0 && <Pressable style={{ marginRight: 30 }} onPress={() => onPressPin(item)}>
                    <Image style={[styles.moreImg, { resizeMode: "cover" }]} source={require('../../assets/images/pin.png')} />
                </Pressable>}
                <Pressable style={{ marginRight: 20, height: 20, width: 35, alignItems:'center', justifyContent:'center' }} onPress={() => {
                    onPressBookMark(item);
                    {props.item.cancer_healing_story_bookmarks.length > 0 ?
                        Toast.show({
                            text1: 'Success',
                            text2: 'Bookmark added successfully'
                        })
                    :   Toast.show({
                            text1: 'Success',
                            text2: 'Bookmark removed successfully'
                        })
                    }
                }} >
                    {props.item.cancer_healing_story_bookmarks.length > 0  ? <Bookmark/> : <Bookmark1/>}
                </Pressable>
                {/* <Pressable style={{top:-7}} onPress={() => setItemMenuVisible(!itemMenuVisible)}>
                    <Image style={[styles.moreImg]} source={require('../../assets/images/dots.png')} />
                </Pressable> */}
                <View style={{ position: 'absolute', right: -5, top: -7 }}>
                    {postOption()}
                </View>
            </View>
        </View>

    );
})
const modalStyles = (theme) => StyleSheet.create({
    header: {
        flexDirection: 'row',
        marginTop: 5,
        alignItems: 'center'
    },
    imgView: {
        borderRadius: 10,
        width: 41,
        height: 41,
    },
    icon: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    headerText: {
        color: theme.BLACK,
        fontSize: 14,
        fontFamily: FONTFAMILY.POPPINS_MEDIUM,
    },
    disText: {
        color: theme.GRAY_BLACK,
        fontSize: 11,
        marginTop: Platform.OS === 'ios' ? -2 : -5,
        fontFamily: FONTFAMILY.POPPINS_REGULAR,
    },
    moreImgView: {
        position: 'absolute',
        right: 0,
        top: 3,
        flexDirection: 'row',
    },
    moreImg: {
        height: 18,
        width: 18,
    },
    topicView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: Platform.OS === 'ios' ? -1 : -3,
    },
    topicIcon: {
        width: 13,
        height: 13,
        resizeMode: 'contain'
    },
    topicTxt: {
        fontSize: 11,
        marginHorizontal: 3,
        textAlign: 'center',
        fontFamily: FONTFAMILY.POPPINS_REGULAR,
        color: theme.SUB_TITLE
    },
    menuText: {
        fontFamily: FONTFAMILY.POPPINS_REGULAR,
        color: theme.GRAY_BLACK,
        fontSize: 12,

    }
})
export default PostHeader;