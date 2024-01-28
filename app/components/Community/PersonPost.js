import React from 'react';
import { StyleSheet, View, Pressable, Text, Image } from 'react-native';
import themes from '../../config/themes-config';


const PersonPost = ((props) => {
  const { desText,theme } = props
  return (
    <View>
      <View style={styles.topicView}>
        <Image style={styles.topicIcon} source={require('../../assets/images/discussion.png')} />
        <Text style={styles.topicTxt} numberOfLines={1}>Discussion</Text>
      </View>

      <View style={styles.personHeader}>
        <View style={styles.personImgView}>
          <Image style={styles.personLogo} source={require('../../assets/images/testProfile.png')} />
        </View>

        <View style={{ marginHorizontal: 10 }}>
          <Text style={styles.headerText} numberOfLines={1}>Sandip Maheshwari</Text>
          <Text style={styles.disText} numberOfLines={1}>Record Cancer-3 [abc]</Text>
        </View>
        <Pressable style={[styles.moreImgView]}>
          <Image style={styles.moreImg} source={require('../../assets/images/dots.png')} />
        </Pressable>
      </View>


      <Text style={styles.postDescription}>{desText.substring(0, 150)}</Text>
      <View style={{ marginVertical: 10, flexDirection: 'row' }}>
        <Text style={styles.cancerType}>Coleractal Cancer</Text>
      </View>
      <View style={styles.imageView}>
        <Image style={styles.img} source={require('../../assets/images/sample.png')} />
      </View>

      <View style={{ backgroundColor: 'gray', marginTop: 10, height: 0.5 }} />

      <View style={[styles.utilityView, { paddingVertical: 5 }]}>
        <Text style={[styles.utilityText, { position: 'absolute', left: 0 }]}>36 Supports</Text>
        <Text style={styles.utilityText}>16 Comments</Text>
        <Text style={[styles.utilityText, { position: 'absolute', right: 0 }]}>56 Views</Text>
      </View>
      <View style={{ backgroundColor: 'gray', height: 0.5 }} />
      <View style={styles.utilityView}>
        <Pressable style={[styles.utility, { position: 'absolute', left: 0 }]} >
          <Image source={require('../../assets/images/like.png')} style={[styles.imgStyle, { marginLeft: 0 }]} />
          <Text style={styles.utilityText}>Support</Text>
        </Pressable>
        <Pressable style={styles.utility}>
          <Image source={require('../../assets/images/comment.png')} style={styles.imgStyle} />
          <Text style={styles.utilityText}>Comment</Text>
        </Pressable>
        <Pressable style={[styles.utility, { position: 'absolute', right: 0 }]}>
          <Image source={require('../../assets/images/share.png')} style={styles.imgStyle} />
          <Text style={styles.utilityText}>Share</Text>
        </Pressable>
      </View>
      <View style={{ backgroundColor: 'gray', height: 0.5 }} />

    </View>
  );
});
const styles = StyleSheet.create({
  topicView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  topicIcon: {
    width: 20,
    height: 20,
    resizeMode: "cover"
  },
  topicTxt: {
    fontSize: 12,
    marginHorizontal: 10,
    color: themes.GRAY_BLACK,
  },
  personHeader: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
  },
  personImgView: {
    overflow: 'hidden',
    borderRadius: 10,
  },
  personLogo: {
    width: 40,
    height: 40
  },
  headerText: {
    color: themes.GRAY_BLACK,
    fontSize: 16,
    fontWeight: 'bold',
  },
  disText: {
    color: themes.GRAY_BLACK,
    fontSize: 10,
  },
  cancerType: {
    color: themes.GRAY_BLACK,
    fontSize: 12,
    backgroundColor: "#c6f9ff",
    textAlign: "center",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius:6,
    overflow: 'hidden'
  },
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
    fontSize: 12,
  },
  imageView: {
    marginTop: 20,
    alignItems: 'center',
    overflow: 'hidden'
  },
  img: {
    height: 190,
    width: 350,
    borderRadius: 20,
  },
  moreImgView: {
    position: 'absolute',
    right: 20,
  },
  moreImg: {
    height: 15,
    width: 15,
    tintColor: themes.SUB_TITLE,
  },
  imgStyle: {
    height: 18,
    width: 18,
    marginLeft: 15,
    resizeMode: "contain"
  },
  postDescription: {
    color: themes.GRAY_BLACK,
    lineHeight: 20,
    fontSize: 12,
  },
  dot: {
    width: 2,
    height: 2,
    backgroundColor: themes.GRAY_BLACK,
    borderRadius: 1
  },
});
export default PersonPost