import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, Pressable } from 'react-native';
import { FONTFAMILY } from "../../config/font-config";
import { dateDiffInDaysMonthsYears } from '../../utils/commonFunction';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import FullScreenImage from '../../components/Community/FullScreenImage';
import translate from "../../utils/Text"

const SubComment = (({navigation, theme, item, userId, onReplyPress, onClickHeart, index, apiCallDeleteComment, handleEdit, detail }) => {
    const styles = modalStyles(theme);

    const popupMenu = React.createRef();
    const [heart, setHeart] = useState(item?.cancer_healing_story_supports[0]?.status == 1 ? true : false);
    const [commentCount, setCommentCount] = useState(item.commentSupport);
    const [imageModal, setImageModal] = useState(false);

    const openProfileScreen = () => {
        navigation.navigate('Zen.ProfileScreen', {
          item: item,
          showDay: true, theme: theme
        });
      }

    const subCommentPopup = () => {
        return (
            <Menu
                ref={popupMenu}
                style={{ borderRadius: 15, borderWidth: 1, borderColor: '#dcd8d8', width: 132, marginTop: 22 }}
                anchor={
                    <Pressable style={{ padding: 8, marginTop: -16 }} onPress={() => popupMenu.current.show()}>
                        <Image style={[styles.moreImg]} source={require('../../assets/images/dots.png')} />
                    </Pressable>}
                onRequestClose={() => popupMenu.current.hide()}>
                <MenuItem style={{}} onPress={() => { popupMenu.current.hide(); apiCallDeleteComment(item) }}>Delete</MenuItem>
                <MenuItem style={{}} onPress={() => { popupMenu.current.hide(); handleEdit(item) }}>{translate("COMMONTEXT")["EDIT"]}</MenuItem>
            </Menu>
        );
    }

    return (
        <View style={{ marginTop: 10 }}>
            <View style={{ flexDirection: "row" }}>
                <Pressable style={styles.userView} onPress={() =>  openProfileScreen()}>
                    {item.image == null ? <Image style={styles.commentIcon} source={item?.user?.user_details[0]?.image == null ? require('../../assets/images/profileImage.png') : { uri: item?.user?.user_details[0]?.image }} />
                        : <Image style={styles.userIcon} source={item.image} />}
                </Pressable>

                <View style={styles.commentView}>
                <View style={{ flexDirection: 'row',width: '100%', alignItems:'center'}}>
                        <Pressable style={{width:'82%'}} onPress={() => openProfileScreen()}>
                            <Text style={styles.nameText} numberOfLines={1}>{item?.user?.user_details[0]?.name}</Text>
                        </Pressable>
                        <Text style={[styles.minuteText, { right: item?.user?.id === userId ? 20 : 0 }]} numberOfLines={1}>{dateDiffInDaysMonthsYears(item?.createdAt)}</Text>
                        {item?.user?.id === userId &&
                            <View style={styles.moreCommentImg}>
                                {subCommentPopup()}
                            </View>
                        }
                    </View>

                    {(item?.tagName != null && item?.tagName.length > 0) ?
                        <View>
                            <Text style={styles.tagName}>{item?.tagName}{'  '}<Text style={[styles.commentText]}>{item.comment}</Text></Text>
                        </View>
                        : <View style={{ flexDirection: 'row', width: '75%' }} >
                            {item?.tagName != undefined && <Text style={styles.tagName}>{item?.tagName}{' '}</Text>}
                            <Text style={[styles.commentText]}>{item.comment}</Text>
                        </View>
                    }
                    {item.image != null &&
                     <Pressable onPress={() => setImageModal(true)}>
                        <Image style={{ height: 80, width: 80, marginVertical: 5, borderRadius: 10 }} source={{ uri: item.image }} />
                        </Pressable>
                    }
                </View>
            </View>

            <View style={{ flexDirection: "row", marginTop: 5, alignItems: 'center' }}>
                <Pressable style={[styles.utility, { marginLeft: '13%', height: 30, marginTop: -5, width: 100 }]} onPress={() => {
                    if (heart) {
                        let count = commentCount - 1;
                        setCommentCount(count);
                    } else {
                        let count = commentCount + 1;
                        setCommentCount(count);
                    }
                    setHeart(!heart)
                    onClickHeart(item, index)
                }}>
                    <Image source={heart ? require('../../assets/images/like.png') : require('../../assets/images/nonlike.png')} style={[styles.imgStyle, { marginLeft: 0, width: 21, height: 15 }]} />
                    <Text style={styles.utilityText}>{commentCount} Supports</Text>
                </Pressable>
                {detail?.author_detail?.user_details[0]?.user_profile.id >= detail?.post_category?.whoComment &&
                <Pressable style={[styles.utility, { height: 30, marginTop: -5, width: 80 }]} onPress={() => onReplyPress(item?.user?.user_details[0].name)}>
                    <Image source={require('../../assets/images/reply.png')} style={styles.imgStyle} />
                    <Text style={styles.utilityText}>Reply</Text>
                </Pressable>}
            </View>
            <FullScreenImage theme={theme} modalDisplay={imageModal} setModalDisplay={setImageModal} image={item?.image}/>
        </View>

    );
});
const modalStyles = (theme) => StyleSheet.create({
    utilityView: {
        flexDirection: "row",
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    utility: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    utilityText: {
        marginLeft: 5,
        fontSize: 11,
        fontFamily: FONTFAMILY.POPPINS_REGULAR,
        color: theme.SUB_TITLE
    },
    imgStyle: {
        height: 16,
        width: 16,
        marginLeft: 15,
        resizeMode: 'contain'
    },
    userView: {
        width: 32,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        backgroundColor: 'aliceblue'
    },
    userIcon: {
        width: 20,
        height: 20,
        resizeMode: 'center',
    },
    moreImgView: {
        position: 'absolute',
        right: 0,
    },
    moreImg: {
        height: 35,
        width: 15,
        resizeMode: 'contain'
    },
    commentView: {
        backgroundColor: theme.SELECTED,
        width: '88%',
        marginHorizontal: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        borderTopLeftRadius: 0
    },
    nameText: {
        fontSize: 11,
        fontFamily: FONTFAMILY.POPPINS_MEDIUM,
        color: theme.GRAY_BLACK,
        width: '100%'
    },
    minuteText: {
        fontSize: 11,
        fontFamily: FONTFAMILY.POPPINS_REGULAR,
        color: theme.MINUTE_GRAY,
        position: 'absolute',
        right: 20,
    },
    moreCommentImg: {
        position: 'absolute',
        right: -8,
        top: -8,
    },
    commentText: {
        fontSize: 11,
        fontFamily: FONTFAMILY.POPPINS_REGULAR,
        color: theme.SUB_TITLE,
    },
    tagName: {
        color: theme.SECONDARY,
        fontSize: 11,
        fontFamily: FONTFAMILY.POPPINS_REGULAR,
    },
    commentIcon: {
        width: 32,
        height: 32,
        borderRadius: 8,
    },
})
export default SubComment;