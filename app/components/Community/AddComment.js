import React from 'react';
import { FlatList, StyleSheet, View, Pressable, Text, Image, TextInput } from 'react-native';
import themes from '../../config/themes-config';
import { data } from '../DietPlan/cuisinesData';
import SubComment from './SubComment';


const AddComment = ((props) => {
    const { commentArr, addComment, replyToComment, commentTxt , setCommentTxt} = props
    const favImg = require('../../assets/images/like.png')

    const renderComment = (item, index ) => {
        return (
            <View>
                <View style={{ flexDirection: "row", paddingVertical: 10 }}>
                    <View style={styles.imgView}>
                        <Image style={styles.icon} source={require('../../assets/images/reply.png')} />
                    </View>

                    <View style={styles.commentView}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 12 }} numberOfLines={1}>Aaditya Michare</Text>
                            <Text style={{ color: 'gray', fontSize: 10, position: 'absolute', right: 25 }} numberOfLines={1}>36m</Text>
                            <Pressable style={[styles.moreImgView]}>
                                <Image style={styles.moreImg} source={require('../../assets/images/dots.png')} />
                            </Pressable>
                        </View>
                        <Text style={{ fontSize: 12 }} numberOfLines={1}>{item.value}</Text>
                    </View>
                </View>


                <View style={{ flexDirection: "row", alignItems: 'center' }}>
                    <Pressable style={[styles.utility, { marginLeft: '13%' }]} >
                        <Image source={favImg} style={[styles.imgStyle, { marginLeft: 0 }]} />
                        <Text style={styles.utilityText}>10 Supports</Text>
                    </Pressable>
                    <Pressable style={styles.utility} onPress={() => replyToComment(item, index)}>
                        <Image source={require('../../assets/images/reply.png')} style={styles.imgStyle} />
                        <Text style={styles.utilityText}>12 Replies</Text>
                    </Pressable>
                </View>

                <FlatList
                    data={item.subcommnet}
                    style={{ marginLeft: '13%' }}
                    renderItem={renderReplyItem}
                />
            </View>
        );
    }

    const renderReplyItem = ({ item, index }) => {
        return (
            <View>
                <SubComment
                    replyToComment={replyToComment} />
            </View>
        );
    }

    return (
        <View>
            {commentArr.map((item,index) =>{renderComment(item,index)})}

            <View style={styles.writeCommentContainer}>
                <View style={{ backgroundColor: themes.SELECTED, width: '90%', height:40, marginBottom:20, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, borderRadius: 15, paddingVertical: 5 }}>
                    <TextInput placeholder='Write here' style={{ width: '80%' }} value={commentTxt} onChangeText={(value) => setCommentTxt(value)}></TextInput>

                    <View style={{ position: 'absolute', flexDirection: 'row', right: 15, }}>
                        <Pressable >
                            <Image source={require('../../assets/images/picture.png')} style={{ height: 18, marginRight: 10, width: 18 }} />
                        </Pressable>
                        <Pressable >
                            <Image source={require('../../assets/images/camera.png')} style={{ height: 18, width: 18 }} />
                        </Pressable>
                    </View>
                </View>
                <Pressable style={{ margin: 5,height:40, }} onPress={() => addComment()}>
                    <Text style={{ color: 'dodgerblue', fontSize: 14, fontWeight: 'bold' }}>Post</Text>
                </Pressable>
            </View>
        </View>
    );
});
const styles = StyleSheet.create({
    writeCommentContainer: {
        flexDirection: 'row',
        marginTop: 10,
        alignItems: 'center'
    },
    imgView: {
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: 'aliceblue',
    },
    icon: {
        width: 20,
        height: 20,
        resizeMode: 'center',
    },
    commentView: {
        backgroundColor: 'aliceblue',
        width: '87%',
        marginHorizontal: 10,
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderRadius: 10,
        borderTopLeftRadius: 0,
    },

    moreImgView: {
        position: 'absolute',
        right: 0,
    },
    moreImg: {
        height: 15,
        width: 15,
        tintColor: themes.SUB_TITLE,
    },
    utility: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    utilityText: {
        marginLeft: 5,
        fontSize: 12,
    },
    imgStyle: {
        height: 18,
        width: 18,
        marginLeft: 15,
    },

});
export default AddComment