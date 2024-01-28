import React from 'react';
import { View, Dimensions, StyleSheet, Text, Image, ImageBackground, Pressable, Platform, Share } from 'react-native';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import { FONTFAMILY } from '../../config/font-config';
import Add_Wellness from '../../assets/images/addw.svg';
import Clock from '../../assets/images/clock.svg'
import DotMenu from '../../assets/images/dotMenu.svg'
import Story from '../../assets/images/story.svg'
import Bookmark from '../../assets/images/Bookmark.svg'
import ShareIcon from '../../assets/images/shareProductIcon.svg'
import BlankHeart from '../../assets/images/blankHeart.svg'
import AddIcon from '../../assets/images/addIcon.svg'    
import translate from "../../utils/Text"

const width = Dimensions.get('window').width;

export const WellnessRender = ({ item, navigation, theme, isHorizontal = false, onPress, WellNessCategoryById, onPlusPress, onPressLike=()=>{}, onPressShare=()=>{}, extraStyle = {} }) => {
    const styles = modalStyles(theme);
    let key = item.image
    let url = 'https://img.youtube.com/vi/' + key + '/hqdefault.jpg'
    const menuPopUp = React.createRef();

    const postOption = () => {
        return (
            <Menu
                ref={menuPopUp}
                style={{ 
                        borderRadius: 6, 
                        borderWidth: 1,
                        borderColor: '#dcd8d8',
                        marginTop: 23,
                        // width:15
                        paddingHorizontal:10,
                       
                    }}
                anchor={ null
                    // <Pressable onPress={() => menuPopUp.current.show()} style={{ marginTop: -5, width: 30, height: 50, alignItems: 'center', justifyContent: 'center',}}>
                    //    <DotMenu />
                    // </Pressable>
                }
                onRequestClose={() => menuPopUp.current.hide()}>
                <View>
                    {/* <Pressable 
                        onPress={() => {
                            onPressLike(item)
                            menuPopUp.current.hide()
                        }}
                         style={styles.menuItemcontainer}>
                            <View style={{flexDirection:'row',  }}>
                                <BlankHeart /> 
                                <Text style={styles.popupMenuText}>
                                    {
                                        translate("COMMONTEXT")["LIKE"] 
                                    }
                                </Text>
                            </View>
                    </Pressable> */}
                    <Pressable 
                        onPress={() => {
                            onPlusPress(item);
                            menuPopUp.current.hide() 
                        }}
                         style={styles.menuItemcontainer}>
                            <View style={{flexDirection:'row'}}>
                            <AddIcon/>
                            <Text style={styles.popupMenuText}>
                                {
                                    translate("COMMONTEXT")["ADD_TO_CALENDER"] 
                                }
                            </Text>
                        </View>
                    </Pressable>
                    <Pressable 
                        onPress={() => {
                            onPressShare(item)
                        }}
                         style={styles.menuItemcontainer}>
                        <View style={{flexDirection:'row'}}>
                            <ShareIcon /> 
                            <Text style={styles.popupMenuText}>
                                {
                                    translate("COMMONTEXT")["SHARE"] 
                                }
                            </Text>
                        </View>
                    </Pressable>
                    
                </View>
            </Menu>
        );
    }

    return (
        <Pressable style={[styles.itemContainer, { width: width - 15,}, extraStyle]} onPress={() => onPress(item)}>
            <Pressable style={{ borderRadius: 8,  overflow: 'hidden', marginRight: 9, marginLeft:10  }}
                onPress={() => navigation.navigate('Zen.VideoScreen', {
                    url: key
                })}>
                <ImageBackground style={styles.imgItem} source={{ uri: url }} >
                    <View style={styles.playIconVw}>
                        <Image style={styles.playIconImg} source={require('../../assets/images/play.png')} />
                    </View>
                </ImageBackground>
            </Pressable>

            <View style={styles.centerVw} >
                <View style={{}}>
                    <Text style={styles.description} numberOfLines={1}>{item?.title}</Text>
                    <Text style={[styles.description]} numberOfLines={2}>{item?.short_description}</Text>
                </View>
                <View>
                    <Text style={styles.cancerType}>{WellNessCategoryById[0].data?.categoryName || item?.wellCat}</Text>
                    <View style={{flexDirection:"row", alignItems:"center"}}>
                        <Clock/>
                        <Text style={styles.durationText}>{item.minutes} m</Text>
                    </View>
                </View>
            </View>
            {/* <Pressable style={{ width: 40, height: 50, position: 'absolute', right: 0, alignItems: 'center', justifyContent: 'center' }} onPress={() => onPlusPress(item)}>
                <Add_Wellness width={20} height={22} />
            </Pressable> */}
              <View style={{ position: 'absolute', right:-10, top: -11 }}>

                <Pressable onPress={() => menuPopUp.current.show()} style={{ marginTop: -5, width: 30, height: 50, alignItems: 'center', justifyContent: 'center',}}>
                    <DotMenu />
                </Pressable>
              </View>
                <View style={{right:30}}>
                  {postOption()}
                </View>
        </Pressable>
    );
}

const modalStyles = (theme) => StyleSheet.create({
    itemContainer: {
        borderRadius: 15,
        backgroundColor: theme.PRIMARY,
        marginVertical: 8,
        flexDirection: 'row',
        paddingHorizontal: 5,
    },
    livePlanVw: {
        width: width - 40,
    },
    imgItem: {
        height: 110,
        resizeMode: 'contain',
        width: 110,
        justifyContent: 'center'
    },
    durationView: {
        flexDirection: 'row',
        marginHorizontal: 15,
        alignItems: 'center',
    },
    clockIcon: {
        width: 12,
        height: 12,
    },
    durationText: {
        fontSize: 14,
        color: theme.SEARCH_TITLE,
        marginLeft: 5,
        fontFamily: FONTFAMILY.POPPINS_MEDIUM,
        marginTop: Platform.OS == 'android' ? 2 : 0
    },
    description: {
        color: theme.GRAY_BLACK,
        // marginTop: -6,
        fontSize: 15,
        fontFamily: FONTFAMILY.POPPINS_MEDIUM,
        width: '100%'
    },
    shortDescription: {
        color: theme.GRAY_BLACK,
        // marginTop: -6,
        fontSize: 15,
        fontFamily: FONTFAMILY.POPPINS_MEDIUM,
        width: '100%'
    },
    cancerVw: {
        position: 'absolute',
        bottom: Platform.OS === 'ios' ? -1 : -2,
        flexDirection: 'row',
        borderRadius: 5
    },
    cancerType: {
        color: theme.SUB_TITLE,
        // paddingHorizontal: 10,
        // paddingVertical: 2,
        // backgroundColor: '#dff1ff',
        fontSize: 13,
        fontFamily: FONTFAMILY.POPPINS_MEDIUM,
        // textAlign: "center",
        // textAlignVertical: "center",
        borderRadius: 5,
        // overflow: 'hidden'
    },
    playIconVw: {
        borderRadius: 14,
        backgroundColor: 'rgba(58, 58, 58, 0.8)',
        borderColor: theme.PRIMARY, borderWidth: 1.5,
        alignSelf: 'center',
        width: 28,
        height: 28,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf:'center'
    },
    playIconImg: {
        width: 9,
        height: 12,
        tintColor: theme.PRIMARY
    },
    centerVw: {
        width: '70%',
        marginLeft: 3,
        height: '85%'
    },
    popupMenuText: {
        marginLeft:10, 
        color: theme.BLACK,
        fontSize: 12,
        // lineHeight:16,
        fontFamily: FONTFAMILY.POPPINS_MEDIUM
    },
    menuItemcontainer:{
        justifyContent:'center',
         height:50,
        marginLeft:10
    }
    
})
