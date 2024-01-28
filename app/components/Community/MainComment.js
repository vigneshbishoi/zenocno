import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, Pressable, Platform } from 'react-native';
import { FONTFAMILY } from "../../config/font-config";
import { dateDiffInDaysMonthsYears } from '../../utils/commonFunction';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import SubComment from './SubComment'
import FullScreenImage from '../../components/Community/FullScreenImage';
import translate from "../../utils/Text"


const MainComment = (({ navigation, item, index, theme, userId, handleEdit, apiCallDeleteComment, onClickHeart, onClickReply,
  onClickReplyToReply, detail }) => {
  const styles = modalStyles(theme);
  const favImg = require('../../assets/images/like.png')
  const notFavImg = require('../../assets/images/nonlike.png')
  const [heart, setHeart] = useState(item?.cancer_healing_story_supports.length > 0 ? item?.cancer_healing_story_supports[0]?.status == 1 ? true : false : false);
  const [commentCount, setCommentCount] = useState(item.commentSupport);
  const [imageModal, setImageModal] = useState(false);
  const [valueChange, setValueChange] = useState(false);
  const [commentImgArr, setCommentImgArr] = useState([]);


  const popupMenu = React.createRef();
  const menuPopUp = React.createRef();


  useEffect(() => {
     setHeart(item?.cancer_healing_story_supports.length > 0 ? item?.cancer_healing_story_supports[0]?.status == 1 ? true : false : false)
    // setCommentCount(item.commentSupport)
  }, [item?.cancer_healing_story_supports[0]?.status])

  const openProfileScreen = () => {
    navigation.navigate('Zen.ProfileScreen', {
      item: item,
      showDay: true, theme: theme
    });
  }

  const postOption = () => {
    return (
      <Menu
        ref={menuPopUp}
        style={{ borderRadius: 15, borderWidth: 1, borderColor: '#dcd8d8', width: 150, height: 50, marginTop:10, marginLeft:55}}
        anchor={
          <Pressable onPress={() => menuPopUp.current.show()}
            style={{ position:'absolute', right:-52, top: Platform.OS == 'ios' ? -16 : -18 }}
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

  const commentPopup = () => {
    return (
      <Menu
        ref={popupMenu}
        style={styles.menuStyle}
        anchor={<Pressable style={styles.menuAnchorStyle} onPress={() => popupMenu.current.show()}>
          <Image style={styles.moreImg} source={require('../../assets/images/dots.png')} />
        </Pressable>}
        onRequestClose={() => popupMenu.current.hide()}>
        <MenuItem style={{}} onPress={() => { popupMenu.current.hide(); apiCallDeleteComment(item) }}>{translate("COMMONTEXT")["DELETE"]}</MenuItem>
        <MenuItem style={{}} onPress={() => {
          popupMenu.current.hide();
          handleEdit(item)
        }}>{translate("COMMONTEXT")["EDIT"]}</MenuItem>
      </Menu>
    );
  }


  return (
    <View>
      <View style={styles.commentContainer}>
        <Pressable onPress={() => openProfileScreen()}>
          <Image style={styles.commentIcon} source={item?.user?.user_details[0]?.image == null ? require('../../assets/images/profileImage.png') : { uri: item?.user?.user_details[0]?.image }} />
          {/* <Image style={styles.commentIcon} source={item?.user?.user_details[0]?.user_profile } /> */}
        </Pressable>
        <View style={styles.commentDesVw}>
          <View style={styles.userNameVw}>
            <Pressable style={{ width: '83%' }} onPress={() => openProfileScreen()}>
              <Text style={styles.nameText} numberOfLines={1} >{item?.user?.user_details[0]?.name}</Text>
            </Pressable>
            <Text style={[styles.minuteText, { right: 22 }]}>{dateDiffInDaysMonthsYears(item.createdAt)}</Text>
            {/* {userId != item?.user?.user_details[0]?.userId &&
              <>
                {postOption()}
              </>
            } */}
            {/* {item?.user?.user_details[0]?.userId === userId &&
                <View style={styles.moreCommentImg}>
                  {commentPopup()}
                </View>} */}

            {item?.user?.user_details[0]?.userId === userId ?
              <View style={styles.moreCommentImg}>
                {commentPopup()}
              </View>
              :
              <>
                {postOption()}
              </>
            }
          </View>

          <Text style={styles.commentText} >{item.comment}</Text>

          {item.image != null &&
            <Pressable onPress={() => {setImageModal(true)
              let array = [];
                if(item != undefined || item != null || item != ''){
                  if(item.image != undefined && item.image != null && item.image != ''){                    
                    array.push({
                      uri: item.image
                   }) 
                  }
                }
                setCommentImgArr(array)
            }}>
              <Image style={{ height: 80, width: 80, marginVertical: 5, borderRadius: 10 }} source={{ uri: item.image }} />
            </Pressable>
          }
        </View>

      </View>
      <View style={{ flexDirection: "row", alignItems: 'center' }}>
        <Pressable style={[styles.utility, { marginLeft: '13%', height: 30, marginTop: -5, width: 100 }]} onPress={() => {
          if (item?.cancer_healing_story_supports.length > 0) {
            let count = 0
            if (item?.cancer_healing_story_supports[0].status == 1) {
              count = commentCount - 1;
              item.commentSupport = count;
            } else {
              count = commentCount + 1;
              item.commentSupport = count;
            }
            setCommentCount(count);
            item.cancer_healing_story_supports[0].status = item?.cancer_healing_story_supports[0].status == 1 ? 0 : 1
          } else {
            item.cancer_healing_story_supports = [{ status: 1 }]
            setCommentCount(1);
          }
          setValueChange(!valueChange)
          onClickHeart(item, index)
        }}>
          <Image source={heart ? favImg : notFavImg} style={{ width: 16, height: 14 }} />
          <Text style={styles.countUtilityText}>{commentCount} {translate("COMMONTEXT")["SUPPORTS"]}</Text>
        </Pressable>
        {detail?.author_detail?.user_details[0]?.user_profile.id >= detail?.post_category?.whoComment &&
          <Pressable style={[styles.utility, { marginLeft: 10, height: 30, marginTop: -5, width: 80 }]} onPress={() => {
            onClickReply(item)
          }}>
            <Image source={require('../../assets/images/reply.png')} style={{ width: 21, height: 15 }} />
            <Text style={styles.countUtilityText}>{item.comment_reply.length} {translate("COMMONTEXT")["REPLIES"]}</Text>
          </Pressable>}

      </View>
      <View style={{ marginLeft: '13%' }}>
        {item?.comment_reply?.length > 0 &&
          item?.comment_reply?.map((itemSub, indexSub) => (
            <SubComment
              item={itemSub}
              index={indexSub}
              replyToComment={() => { }}
              theme={theme}
              userId={userId}
              onClickHeart={onClickHeart}
              handleEdit={handleEdit}
              navigation={navigation}
              apiCallDeleteComment={apiCallDeleteComment}
              detail={detail}
              onReplyPress={(name) => {
                onClickReplyToReply(item, name)
              }}
            />
          )
          )}
      </View>
      {/* <FullScreenImage theme={theme} modalDisplay={imageModal} setModalDisplay={setImageModal} image={item?.image} /> */}
      <FullScreenImage 
        theme={theme} 
        modalDisplay={imageModal} 
        setModalDisplay={setImageModal} 
        mediaArr={commentImgArr} 
      />
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
  menuStyle: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#dcd8d8',
    width: 132,
    marginTop: 22
  },
  menuAnchorStyle: {
    padding: 8,
    marginTop: -16
  },
  commentContainer: {
    flexDirection: "row",
    paddingVertical: 5,
    marginTop: 8
  },
  commentDesVw: {
    backgroundColor: theme.SELECTED,
    width: '90%',
    marginHorizontal: 10,
    paddingVertical: 10,
    justifyContent: 'center',
    paddingHorizontal: 15,
    borderRadius: 10,
    borderTopLeftRadius: 0
  },
  userNameVw: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center'
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
    resizeMode: 'contain',
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
    fontSize: 14,
    fontFamily: FONTFAMILY.POPPINS_REGULAR,
    color: theme.SUB_TITLE
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
  countUtilityText: {
    marginLeft: 5,
    fontSize: 11,
    fontFamily: FONTFAMILY.POPPINS_REGULAR,
    color: theme.SUB_TITLE,
    marginTop: 2
  },
})
export default MainComment;