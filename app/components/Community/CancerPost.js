import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text, Pressable, Share, TextInput, Keyboard, Platform, Dimensions } from 'react-native';
import { FONTFAMILY } from '../../config/font-config';
import PostHeader from './PostHeader';
import { dateDiffInDaysMonthsYears, shortNameFunc } from '../../utils/commonFunction';
import { useSelector } from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import { Menu, MenuItem, menuPopUp } from 'react-native-material-menu';
import appConfig from '../../config/app-config';
import FullScreenImage from './FullScreenImage';
import Video from 'react-native-video';
import Right_Grey from '../../assets/images/right_arrow_grey.svg';
import Share1 from '../../assets/images/share1.svg';
import Comment from '../../assets/images/comment.svg';
import Support from '../../assets/images/support.svg';
import Support1 from '../../assets/images/support_unselected.svg';
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';
import RenderHtml from 'react-native-render-html';
import translate from "../../utils/Text"
import ImageGrid from '@baronha/react-native-image-grid';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-toast-message';
import ReadMore from '@fawazahmed/react-native-read-more';
import clip from 'text-clipper';


const defaultWidth = Dimensions.get('window').width;

const CancerPost = ((props) => {
    const { onClickCommentHeart, reloadPage, setReloadPage, showDay, apiCallReportList, apiCallMarkAsSpamList, theme, index, onPress, item, onSupport,
        apiCallFollowList, onPressBookMark, setVisible, onPressPin, textShown, apiCallDeletePost, openProfileScreen, page, addComments, isFrom } = props
    const styles = modalStyles(theme);
    const favImg = require('../../assets/images/like.png')
    const notFavImg = require('../../assets/images/nonlike.png')
    const userData = useSelector((state) => state.onboardingReducer.userDetails);
    const [commentTxt, setCommentTxt] = useState('');
    const [imageModal, setImageModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(undefined);
    // const [height, setHeight] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);
    const videoPlayer = useRef(null);
    const [duration, setDuration] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [paused, setPaused] = useState(true);
    const [playerState, setPlayerState] = useState(PLAYER_STATES.PAUSED);
    const [currentTime, setCurrentTime] = useState(0);
    const [isPostShow, setPostShown] = useState(false);
    const [isPostImageShow, setPostImageShown] = useState(false);
    const [screenType, setScreenType] = useState('content');
    const [modalImage, setModalImage] = useState(null);
    const [modalIndex, setModalIndex] = useState(0);
    const [mediaArr, setMediaArr] = useState([]); 
    const menuPopUp = React.createRef();


    const createCommentObject = () => {
        if (userData == undefined || Object.keys(userData).length == 0) {
            // navigation.navigate('Zen.Summary')
            props.navigation.navigate('Zen.UserOnBoarding')
        } else if (commentTxt.length > 0 || selectedImage != undefined) {
            Keyboard.dismiss();
            const formData = new FormData();
            formData.append('userId', userData?.data?.userId);
            if (selectedImage != undefined) {
                formData.append('image', { uri: selectedImage?.path, name: 'image.jpg', type: 'image/jpeg' });
            }
            formData.append('comment', commentTxt.trim());
            formData.append('cancerHealingStoryId', item?.id);
            addComments(formData, item)
        }
        Toast.show({
            // type: 'error',
            text1: 'Successful',
        });
        setCommentTxt('')
        setSelectedImage(undefined)
    }

    const onShare = async () => {
        let cleanText = item?.title?.length > 0 ? item.title : item?.content?.replace(/<\/?[^>]+(>|$)/g, "").substring(0, 40);
        let message = 'I came across this interesting post on the Zenonco Care App: \n' + cleanText + '...' + '\n\n' + 'You can find more on the Zenonco Care App:\n\nAndroid: ' + appConfig.PLAY_STORE + '\niOS: ' + appConfig.APP_STORE
        try {
            const result = await Share.share({
                message: message,
            });
        } catch (error) {
        }
    };

    const openGallery = () => {
        ImagePicker.openPicker({
            compressImageMaxWidth: 1080,
            compressImageMaxHeight: 1080,
            cropping: false
        }).then(image => {
            setSelectedImage(image)
            setPostImageShown(true)
        });
    }
    const openCamera = () => {
        ImagePicker.openCamera({
            compressImageMaxWidth: 1080,
            compressImageMaxHeight: 1080,
            cropping: false,
        }).then(image => {
            setSelectedImage(image)
            setPostImageShown(true)
        });
    }
    const onPressImage = (itemA, index) => {
        if (item?.post_images?.length > 6 && index == 5) {
            onPress(item)
        } else {
            let arr = []
            item?.post_images.map((item) => {
                 arr.push({
                    uri: item.image
                 })   
            })
            setMediaArr(arr)
            setTimeout(() => {
                setImageModal(true)
            }, 300)
            
            setModalImage(itemA?.image)
            setModalIndex(index)
        }
    };
    const hashTag_formatter = string => {
        return string?.split(/((?:^|\s)(?:#[a-z\d-]+))/gi).filter(Boolean).map((v, i) => {
            if (v.includes('#')) {
                return (
                    <Pressable onPress={() => { props.navigation.navigate('Zen.CommunitySearch', { search: v }) }}>
                        <Text key={i} style={{ color: '#000080', fontWeight: '600' }}>{v}</Text>
                    </Pressable>
                )
            } else {
                return <Text key={i}>{v}</Text>
            }
        })
    };

    const seeMoreFunc = () => {
        onPress(item)
    }

    const kFormatter = (num) => {
        return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
    }

    const postOption = () => {
        return (
            <Menu
                ref={menuPopUp}
                style={{ borderRadius: 15, borderWidth: 1, borderColor: '#dcd8d8', width: 150, height: 50, marginTop: 23 }}
                anchor={
                    <Pressable onPress={() => menuPopUp.current.show()}
                        style={{ width: 30, height: 50, alignItems: 'center', marginTop: -8 }}
                    >
                        <Image style={{ height: 18, width: 18 }} source={require('../../assets/images/dots.png')} />
                    </Pressable>}
                onRequestClose={() => menuPopUp.current.hide()}>

                <MenuItem style={{}} onPress={() => {
                    menuPopUp.current.hide();
                    // apiCallReportList(item);
                    setVisible(true, item)
                }}>Report Comment</MenuItem>
            </Menu>
        );
    }

    return (
        <>
            <Pressable key={item?.id} style={[styles.cancerPostView, index == 0 &&
                { marginTop: isFrom == 'GroupDetails' ? 10 : 0 }]} onPress={() => {
                    onPress(item)
                }}>
                {item?.author_detail?.user_details?.length > 0 &&
                    <PostHeader
                        header={item?.author_detail?.user_details[0]?.name}
                        icon={require('../../assets/images/profileImage.png')}
                        theme={theme}
                        onPressBookMark={onPressBookMark}
                        apiCallFollowList={apiCallFollowList}
                        apiCallMarkAsSpamList={apiCallMarkAsSpamList}
                        apiCallReportList={apiCallReportList}
                        onPressPin={onPressPin}
                        showDay={showDay}
                        item={item}
                        openProfileScreen={openProfileScreen}
                        apiCallDeletePost={apiCallDeletePost}
                        setVisible={setVisible}
                    />
                }
                {item?.title?.length > 0 &&
                    <Text style={styles.postTitle}>{item?.title}</Text>
                }

                {/* <Text style={styles.postDescription}
                    onPress={() => { onPress(item)}}
                    onLongPress={() => {
                        Clipboard.setString(item?.content)
                        Toast.show({
                            // type: 'error',
                            text1: 'Success',
                            text2: 'Copied to clipboard'
                        });
                    }}
                >
                        {hashTag_formatter(textShown === index ? item?.content : item?.content?.substring(0, 140))}
                        {item?.content?.length > 140 ?
                            <>
                                <Text style={[styles.seeMoreLessTxt, { color: theme.BLACK }]}>... </Text>
                                <Text
                                    onPress={() => onPress(item)}
                                    style={styles.seeMoreLessTxt}>
                                    See more
                                </Text> </> : ''}
                </Text> */}

                {(item?.post_category?.id == 3 || item?.post_category?.id == 1) ?
                    <TouchableOpacity style={{ marginVertical: item?.title?.length > 0 ? 0 : 10 }}
                        onPress={() => { onPress(item) }}
                        onLongPress={() => {
                            Clipboard.setString(item?.content)
                            Toast.show({
                                // type: 'error',
                                text1: 'Success',
                                text2: 'Copied to clipboard'
                            });
                        }}
                    >

                        {/* <RenderHtml
                            contentWidth={100}
                            StyleSheet={htmlStyles}
                            baseStyle={styles.postDescription}
                            source={{ html: item?.content?.substring(0, 140) }}
                        /> */}

                        <ReadMore onSeeMoreBlocked={seeMoreFunc} numberOfLines={4} seeMoreStyle={styles.seeMoreLessTxt}
                            allowFontScaling={false}
                            debounceSeeMoreCalc={0}
                            animate={false}
                            style={{ marginTop: Platform.OS == 'android' ? '-1.5%' : 0 }}
                        >
                            {clip(item?.content?.replace(/<\/?[^>]+(>|$)/g, ""), { html: true, stripTags: true })}
                        </ReadMore>


                        {/* {item?.content?.length > 140 ?
                            <View style={{flexDirection:'row'}}>
                                <Text style={[styles.seeMoreLessTxt, { color: theme.BLACK }]}>... </Text>
                                <Text
                                    onPress={() => onPress(item)}
                                    style={styles.seeMoreLessTxt}>
                                    See more
                                </Text> 
                            </View> 
                        : ''} */}
                    </TouchableOpacity>
                    :
                    <Text style={styles.postDescription} numberOfLines={isFrom == 'HomeExpert' ? 1 : 4}
                        onPress={() => { onPress(item) }}
                        onLongPress={() => {
                            Clipboard.setString(item?.content)
                            Toast.show({
                                // type: 'error',
                                text1: 'Success',
                                text2: 'Copied to clipboard'
                            });
                        }}
                    >
                        {hashTag_formatter(textShown === index ? item?.content : item?.content?.substring(0, 140))}
                        {item?.content?.length > 140 ?
                            <>
                                <Text style={[styles.seeMoreLessTxt, { color: theme.BLACK }]}>... </Text>
                                <Text
                                    onPress={() => onPress(item)}
                                    style={styles.seeMoreLessTxt}>
                                    See more
                                </Text> </> : ''}
                    </Text>
                }

                {/* {item?.content?.length > 140 &&
                    <Text
                        onPress={() => onPress(item)}
                        style={styles.seeMoreLessTxt}>
                        See more
                    </Text>
                } */}
                {item?.parent_post?.map((itemA, index) => {
                    return index < 3 ? (
                        <>
                            <View style={[styles.lineVW, { marginHorizontal: 0 }]} />
                            <Pressable style={{ flexDirection: "row", paddingHorizontal: 10, paddingVertical: 8 }} onPress={() => {
                                onPress(itemA)
                            }}>
                                <Text style={[styles.cancerTypeText, { color: theme.GRAY_BLACK, width: '90%' }]}>{itemA?.content?.substring(0, 100)}</Text>
                                <View style={{ width: '10%', justifyContent: 'center', alignItems: 'flex-end' }}>
                                    <Right_Grey />
                                </View>
                            </Pressable>
                            <View style={[styles.lineVW, { marginHorizontal: 0 }]} />
                        </>
                    ) : (
                        <Pressable style={{ flexDirection: 'row', paddingHorizontal: 25, paddingVertical: 8 }} onPress={() => {
                            onPress(item)
                        }}>
                            <Text style={styles.cancerTypeText}>More Cancer Type</Text>
                            <View style={{ width: '5%', justifyContent: 'center', alignItems: 'flex-end' }}>
                                <Right />
                            </View>
                        </Pressable>
                    )
                })}

                {item?.post_images?.length > 0 && isFrom != 'HomeExpert' &&
                    <View>
                        <ImageGrid
                            dataImage={item?.post_images}
                            onPressImage={onPressImage}
                            // spaceSize={10}
                            containerStyle={{ marginTop: 3 }}
                            width={Dimensions.get('window').width - 6}
                            sourceKey={'image'}
                        // videoKey={'type'}
                        // conditionCheckVideo={'video'}
                        //videoURLKey={'thumbnail'}
                        />
                    </View>}


                <View style={[styles.utilityView, { paddingTop: 8, paddingBottom: 5 }]}>
                    {/* <View style={{ flexDirection: 'row', alignItems: 'center' }} > */}
                    <Pressable style={[styles.utility]} onPress={() => {
                        onSupport(item)
                    }}>
                        <View style={{ width: 22 }}>
                            {item?.cancer_healing_story_supports?.length != undefined && item?.cancer_healing_story_supports?.length > 0 && item?.cancer_healing_story_supports[0].status == 1
                                ? <Support /> : <Support1 />}
                        </View>
                        <Text style={[styles.utilityText, { fontSize: 12, color: theme.GRAY_BLACK, marginLeft: 8, }]}>
                            {/* {item?.support_count == 0 || item?.support_count == null ? '' : item.support_count}{' '}{translate("COMMONTEXT")["SUPPORT"]} */}
                            {item?.support_count == 0 || item?.support_count == null ? '' : kFormatter(item?.support_count)}{' '}{translate("COMMONTEXT")["SUPPORT"]}
                        </Text>
                        {/* <Image source={item?.cancer_healing_story_supports?.length != undefined && item?.cancer_healing_story_supports?.length > 0 && item?.cancer_healing_story_supports[0].status == 1 ? favImg : notFavImg} style={[styles.imgStyle, { marginLeft: 0 }]} /> */}
                        {/* <Text style={[styles.utilityText, { fontSize: 12, color: theme.GRAY_BLACK, marginLeft: 8 }]}>{item?.support_count != null ? item.support_count : '0'} {translate("COMMONTEXT")["SUPPORT"]}</Text> */}
                    </Pressable>
                    {/* <Image source={item?.cancer_healing_story_supports?.length != undefined && item?.cancer_healing_story_supports?.length > 0 && item?.cancer_healing_story_supports[0].status == 1 ? favImg : notFavImg} style={[{ marginLeft: 0, resizeMode: 'contain', width: 14, height: 12 }]} /> */}
                    {/* <Text style={[styles.utilityText]}>{item?.support_count != null ? item.support_count : '0'}{' '}{translate("COMMONTEXT")["SUPPORT"]}
                        </Text></View> */}
                    <Pressable style={styles.utility} onPress={() => onPress(item)}>
                        {/* <Image source={require('../../assets/images/comment.png')} style={styles.imgStyle} /> */}
                        <Comment />
                        <Text style={[styles.utilityText, { fontSize: 12, color: theme.GRAY_BLACK, marginLeft: 8 }]}>{item?.comments_count == 0 || item?.comments_count == null ? '' : item.comments_count}{' '}{translate("COMMONTEXT")["COMMENT"]}</Text>
                        {/* <Text style={[styles.utilityText, { fontSize: 12, color: theme.GRAY_BLACK, marginLeft: 8 }]}>{item?.comments_count != null ? item.comments_count : '0'}{' '}{translate("COMMONTEXT")["COMMENT"]}</Text> */}
                    </Pressable>
                    <Pressable style={[styles.utility]}
                        onPress={onShare}
                    >
                        {/* <Image source={require('../../assets/images/share.png')} style={styles.imgStyle} /> */}
                        <Share1 />
                        <Text style={[styles.utilityText, { fontSize: 12, color: theme.GRAY_BLACK, marginLeft: 8 }]}>{item?.view_count != null && item.view_count != 0 ? item.view_count : '1'} {translate("COMMONTEXT")["VIEWS"]}</Text>
                    </Pressable>
                    {/* <Text style={styles.utilityText}>{item?.comments_count != null ? item.comments_count : '0'} {translate("COMMONTEXT")["COMMENTS"]}</Text> */}
                    {/* <Text style={[styles.utilityText]}>{item?.view_count != null ? item.view_count : '0'} {translate("COMMONTEXT")["VIEWS"]}</Text> */}
                </View>
                {/* <View style={{ backgroundColor: '#c5c5c5', height: 1 }} /> */}

                {/* <View style={styles.utilityView}>
                    <Pressable style={[styles.utility]} onPress={() => {
                        onSupport(item)
                    }}>
                        <Image source={item?.cancer_healing_story_supports?.length != undefined && item?.cancer_healing_story_supports?.length > 0 && item?.cancer_healing_story_supports[0].status == 1 ? favImg : notFavImg} style={[styles.imgStyle, { marginLeft: 0 }]} />
                        <Text style={[styles.utilityText, { fontSize: 12, color: theme.GRAY_BLACK, marginLeft: 8 }]}>{translate("COMMONTEXT")["SUPPORT"]}</Text>
                    </Pressable>
                    <Pressable style={styles.utility}>
                        <Image source={require('../../assets/images/comment.png')} style={styles.imgStyle} />
                        <Text style={[styles.utilityText, { fontSize: 12, color: theme.GRAY_BLACK, marginLeft: 8 }]}>{translate("COMMONTEXT")["COMMENT"]}</Text>
                    </Pressable>
                    <Pressable style={[styles.utility]}
                        onPress={onShare}
                    >
                        <Image source={require('../../assets/images/share.png')} style={styles.imgStyle} />
                        <Text style={[styles.utilityText, { fontSize: 12, color: theme.GRAY_BLACK, marginLeft: 8 }]}>{translate("COMMONTEXT")["SHARE"]}</Text>
                    </Pressable>
                </View> */}
                <View style={styles.line2} />

                {item?.cancer_healing_story_comments?.length > 0 && isFrom != 'HomeExpert' &&
                    <View style={styles.commentContainer}>
                        <View style={styles.imgView}>
                            <Image style={styles.icon} source={item.cancer_healing_story_comments[0].user?.user_details[0]?.image == null ? require('../../assets/images/profileImage.png') : { uri: item.cancer_healing_story_comments[0].user?.user_details[0]?.image }} />
                        </View>

                        <View style={styles.commentVw}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.nameText}>{item.cancer_healing_story_comments[0].user?.user_details[0]?.name}</Text>
                                <View style={{ flexDirection: "row", position: 'absolute', right: 0 }}>
                                    <Text style={styles.minuteText}>{dateDiffInDaysMonthsYears(item.cancer_healing_story_comments[0].createdAt)}</Text>
                                    {userData?.data?.userId != item.cancer_healing_story_comments[0].user?.id &&
                                        <>
                                            {postOption()}
                                        </>
                                    }

                                </View>
                            </View>
                            {item.cancer_healing_story_comments[0].comment?.length > 0 &&
                            <Text style={styles.commentText} numberOfLines={1}>{item.cancer_healing_story_comments[0].comment}</Text>}
                            {item.cancer_healing_story_comments[0].image != null &&
                                <Image style={styles.commentImage} source={{ uri: item.cancer_healing_story_comments[0].image }} />
                            }
                        </View>
                    </View>
                }
                {item?.cancer_healing_story_comments?.length > 0 &&
                    <View style={[styles.writeHereVw, { marginBottom: 10 }]}>
                        <Pressable style={[styles.utility, { marginLeft: '13%', width: 50 }]} onPress={() => onClickCommentHeart(item.cancer_healing_story_comments[0], item)}>
                            <Image source={item?.cancer_healing_story_comments.length > 0 && item?.cancer_healing_story_comments[0].cancer_healing_story_supports && item?.cancer_healing_story_comments[0].cancer_healing_story_supports[0]?.status == 1 ? require('../../assets/images/like.png') : require('../../assets/images/nonlike.png')} style={{ width: 16, height: 14 }} />
                            <Text style={styles.utilityText}>{item.cancer_healing_story_comments[0]?.commentSupport} </Text>
                        </Pressable>
                        {userData?.user_profile?.id >= item?.post_category?.whoComment &&
                            <Pressable style={[styles.utility, { marginLeft: 0 }]}>
                                <Image source={require('../../assets/images/reply.png')} style={{ width: 21, height: 15 }} />
                                <Text style={styles.utilityText}>{item?.cancer_healing_story_comments[0]?.commentReplyCount}</Text>
                            </Pressable>}
                    </View>
                }
                {item?.my_new_comment?.length > 0 &&
                    <>
                        {item.cancer_healing_story_comments.length > 0 &&
                            <View style={styles.line} />}
                        <View style={styles.commentContainer}>
                            <View style={styles.imgView}>
                                <Image style={styles.icon} source={userData?.data?.image == null ? require('../../assets/images/profileImage.png') : { uri: userData?.data?.image }} />
                            </View>

                            <View style={styles.commentVw}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.nameText}>{userData?.data?.name}</Text>
                                    {/* <Text style={styles.minuteText}>{dateDiffInDaysMonthsYears(item.my_new_comment[0].createdAt)}</Text> */}
                                </View>
                                <Text style={styles.commentText} numberOfLines={1}>{item.my_new_comment[0].comment}</Text>
                                {item.my_new_comment[0].image != null &&
                                    <Image style={styles.commentImage} source={{ uri: item.my_new_comment[0].image }} />
                                }
                            </View>
                        </View>
                    </>
                }
                {selectedImage != undefined &&
                    <View style={{ marginTop: 5, marginBottom: 15 }}>
                        <Image source={{ uri: selectedImage?.path }} style={styles.selectedImage} />
                        <Pressable style={styles.closeImageVw} onPress={() => {
                            setSelectedImage(undefined)
                            setPostImageShown(false)
                        }}>
                            <Image source={require('../../assets/images/close.png')} style={styles.closeImage} />
                        </Pressable>
                    </View>}
                {userData?.user_profile?.id >= item?.post_category?.whoComment ?
                    <View style={{ flexDirection: "row", paddingBottom: 0 }}>
                        <View style={styles.imgView}>
                            <Image style={styles.icon} source={userData?.data?.image == null ? require('../../assets/images/profileImage.png') : { uri: userData?.data?.image }} />
                        </View>
                        <View style={[styles.writeInputVw, (isPostShow || isPostImageShow) && { width: '80%' }]} onPress={() => { }} >
                            <TextInput placeholder='Write a comment...' style={styles.wrtHr} placeholderTextColor={theme.SUB_TITLE} multiline={true} value={commentTxt} onChangeText={(text) => {
                                if (text.length > 0) {
                                    setPostShown(true)
                                } else {
                                    setPostShown(false)
                                }
                                setCommentTxt(text)
                            }} />
                            <Pressable onPress={() => openGallery()} style={[styles.cameraGalleryVw, { right: 33, top: 2 }]}>
                                <Image source={require('../../assets/images/picture.png')} style={[styles.cameraGalleryIcn]} />
                            </Pressable>
                            <Pressable onPress={() => openCamera()} style={[styles.cameraGalleryVw, { right: 5 }]}>
                                <Image source={require('../../assets/images/camera.png')} style={[styles.cameraGalleryIcn, { right: 0 }]} />
                            </Pressable>
                        </View>
                        {(isPostShow || isPostImageShow) &&
                            <Pressable style={{ padding: 5, justifyContent: 'center', position: 'absolute', right: -5 }} onPress={() => { createCommentObject() }}>
                                <Text style={styles.postText}>Post</Text>
                            </Pressable>}
                    </View> : (
                        <View style={styles.commentVw1}>
                            <Text style={styles.commentTitle}>Only Zen Cancer Experts can comment</Text>
                        </View>
                    )}
                <FullScreenImage
                    mediaArr={mediaArr} 
                    theme={theme} modalDisplay={imageModal} setModalDisplay={setImageModal}
                    // image={item?.image}
                    index={modalIndex}
                    // image={modalImage}
                />
                {/* </View> */}
            </Pressable>
        </>
    );
})
const modalStyles = (theme: any) => {
    return StyleSheet.create({
        cancerPostView: {
            paddingHorizontal: 10,
            backgroundColor: theme.PRIMARY,
            paddingTop: 7,
            // marginTop: 10,
            borderBottomWidth: 4,
            borderColor: theme.TAB_BG,
        },
        topicView: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 10,
        },
        topicIcon: {
            width: 13,
            height: 13,
            resizeMode: 'contain'
        },
        topicTxt: {
            fontSize: 12,
            marginHorizontal: 10,
            textAlign: 'center',
            fontFamily: FONTFAMILY.POPPINS_MEDIUM,
            color: theme.SUB_TITLE
        },
        imageView: {
            marginTop: 10,
            borderRadius: 20,
            overflow: 'hidden',
            backgroundColor: 'rgba(0,0,0,0.2)'
        },
        postImg: {
            borderRadius: 20,
            overflow: 'hidden',
            width: defaultWidth - 20,
            height: defaultWidth - 20,
            resizeMode: 'contain'
        },
        dot: {
            width: 2,
            height: 2,
            backgroundColor: 'gray',
            borderRadius: 1
        },
        postDescription: {
            lineHeight: 20,
            fontSize: 14,
            marginTop: 10,
            fontFamily: FONTFAMILY.POPPINS_REGULAR,
            color: theme.BLACK
        },
        postTitle: {
            fontSize: 14,
            marginTop: 10,
            fontFamily: FONTFAMILY.POPPINS_BOLD,
            color: theme.GRAY_BLACK,
        },
        counterVw: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            paddingHorizontal: 10,
            paddingVertical: 3,
            zIndex: 100,
            top: 15,
            borderRadius: 10,
            flexDirection: 'row',
            position: 'absolute',
            alignItems: 'center',
            right: 10
        },
        countText: {
            fontFamily: FONTFAMILY.POPPINS_MEDIUM,
            fontSize: 12,
            color: theme.PRIMARY
        },
        cancerVw: {
            marginVertical: 10,
            flexDirection: 'row',
            height: 21,
            borderRadius: 2,
            width: 125,
            paddingHorizontal: 10,
            backgroundColor: '#bae1ff',
            alignItems: 'center',
            justifyContent: 'center'
        },
        cancerType: {
            color: '#464646',
            fontSize: 11,
            fontFamily: FONTFAMILY.POPPINS_REGULAR,
            textAlign: "center",
            borderRadius: 6,
            paddingHorizontal: 10,
            paddingVertical: 4,
        },
        utilityView: {
            flexDirection: "row",
            paddingVertical: 10,
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        utility: {
            flexDirection: 'row',
            alignItems: 'center',
            width:'30%'
        },
        utilityText: {
            marginLeft: 5,
            fontSize: 11,
            fontFamily: FONTFAMILY.POPPINS_REGULAR,
            color: theme.SUB_TITLE
        },
        line2: {
            backgroundColor: '#c5c5c5',
            height: 1,
            marginBottom: 5
        },
        postText: {
            fontSize: 14,
            fontFamily: FONTFAMILY.POPPINS_MEDIUM,
            color: theme.SECONDARY
        },
        imgStyle: {
            height: 17,
            width: 18,
            resizeMode: 'contain'
        },
        line: {
            width: '100%',
            height: 0.5,
            backgroundColor: theme.LIGHT_GRAY,
            marginTop: 10
        },
        commentContainer: {
            flexDirection: "row",
            paddingVertical: 5,
        },
        imgView: {
            width: 33,
            height: 32,
            borderRadius: 8,
            overflow: 'hidden',
        },
        cameraGalleryVw: {
            height: 30,
            width: 30,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute'
        },
        cameraGalleryIcn: {
            width: 16,
            height: 16,
        },
        icon: {
            width: '100%',
            height: '100%',
        },
        nameText: {
            fontSize: 13,
            fontFamily: FONTFAMILY.POPPINS_MEDIUM,
            color: theme.GRAY_BLACK
        },
        minuteText: {
            fontSize: 11,
            fontFamily: FONTFAMILY.POPPINS_REGULAR,
            color: theme.MINUTE_GRAY,
            // position: 'absolute',
            // right: 0,
        },
        commentImage: {
            height: 80,
            width: 80,
            marginVertical: 5,
            borderRadius: 10,
        },
        moreImg: {
            position: 'absolute',
            right: 0,
            top: -11,
        },
        commentText: {
            fontSize: 13,
            fontFamily: FONTFAMILY.POPPINS_REGULAR,
            color: theme.SUB_TITLE,
        },
        writeHereVw: {
            flexDirection: "row",
            alignItems: 'center'
        },
        writeInputVw: {
            backgroundColor: theme.SELECTED,
            marginBottom: 10,
            height: Platform.OS === 'ios' ? 32 : null,
            width: '88%',
            paddingLeft: 10,
            paddingRight: 23,
            marginLeft: '2%',
            borderRadius: 10,
            flexDirection: 'row',
            alignItems: 'center',
        },
        seeMoreLessTxt: {
            color: theme.SECONDARY,
            fontFamily: FONTFAMILY.POPPINS_REGULAR,
            fontSize: 13,
            // marginTop: Platform.OS == 'ios' ? 0 : 20
        },
        notifyVw: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 10,
            marginTop: 3,
            backgroundColor: theme.LIGHT_GREEN1,
            paddingHorizontal: 25
        },
        notifyIcon: {
            width: 13,
            height: 13
        },
        notifyText: {
            fontSize: 12,
            fontFamily: FONTFAMILY.POPPINS_REGULAR,
            color: theme.GRAY_BLACK,
        },
        notifyUserText: {
            fontSize: 12,
            fontFamily: FONTFAMILY.POPPINS_REGULAR,
            color: theme.SECONDARY,
            marginTop: 0,
            marginLeft: 10
        },
        commentVw: {
            backgroundColor: theme.SELECTED,
            width: '87%',
            marginHorizontal: 10,
            paddingVertical: 7,
            paddingHorizontal: 15,
            borderRadius: 10,
            borderTopLeftRadius: 0
        },
        wrtHr: {
            width: '80%',
            color: theme.SUB_TITLE,
            fontSize: 13,
            paddingVertical: Platform.OS === 'ios' ? 0 : 3,
            fontFamily: FONTFAMILY.POPPINS_REGULAR,
            marginLeft: 5,
        },
        slide: {
            marginVertical: 15,
            overflow: 'hidden',
            borderRadius: 20,
        },
        sliderImageStyle: {
            height: Dimensions.get('window').width - 20,
            width: Dimensions.get('window').width - 20,
            resizeMode: 'cover',
            marginVertical: Platform.OS === 'ios' ? 15 : 10,
            overflow: 'hidden',
            borderRadius: 20,
        },
        sliderVideoStyle: {
            alignItems: 'center', backgroundColor: theme.BLACK, marginVertical: Platform.OS === 'ios' ? 15 : 10,
            overflow: 'hidden',
            borderRadius: 20, height: Dimensions.get('window').width - 20,
            width: Dimensions.get('window').width - 20, justifyContent: 'center'
        },
        backgroundVideo: {
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            justifyContent: 'center',
            alignSelf: 'center',
        },
        backgroundaVideo: {
            position: 'absolute',
            left: 0,

            right: 0,
            justifyContent: 'center',
            alignSelf: 'center',
        },
        toolbar: {
            marginTop: 30,
            backgroundColor: theme.PRIMARY,
            padding: 10,
            borderRadius: 5,
        },
        selectedImage: {
            height: 50,
            width: 50,
            borderRadius: 10,
            marginHorizontal: 20
        },
        closeImageVw: {
            position: 'absolute',
            top: 20,
            right: 20
        },
        closeImage: {
            height: 15,
            width: 15
        },
        lineVW: {
            backgroundColor: '#c5c5c5',
            height: 1,
            marginHorizontal: 20,
            marginVertical: 3
        },
        cancerTypeText: {
            color: theme.SECONDARY,
            width: '100%',
            lineHeight: 20,
            fontSize: 13,
            fontFamily: FONTFAMILY.POPPINS_REGULAR
        },
        commentVw1: {
            paddingVertical: 5,
            alignItems: 'center',
            marginLeft: -10,
            marginRight: -10,
            justifyContent: 'center',
            backgroundColor: '#F0F1F5'
        },
        commentTitle: {
            color: '#666666',
            fontSize: 11,
            fontFamily: FONTFAMILY.POPPINS_REGULAR
        }
    });
};

const htmlStyles = (theme: any) => {
    return StyleSheet.create({
        wp: {
            fontSize: 14,
            fontFamily: FONTFAMILY.POPPINS_REGULAR,
            color: theme.GRAY_BLACK
        }
    });
};
export default CancerPost;