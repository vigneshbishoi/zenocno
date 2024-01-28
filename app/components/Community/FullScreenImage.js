import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, Text, TouchableOpacity, View, Pressable } from 'react-native';
import Modal from 'react-native-modal'
import ImageViewer from 'react-native-image-zoom-viewer';
import ImageView from "react-native-image-viewing";
import { FONTFAMILY } from '../../config/font-config';

export default function FullScreenImage(props: any) {
    const styles = Style(props.theme);
    const [indexImage, setIndexImage] = useState(0);
    const theme = props.theme
    const { modalDisplay, setModalDisplay, image, index, mediaArr } = props;
    
    useEffect(() => {
        setIndexImage(0)
    }, [props])
 

    return (
        <ImageView
            images={mediaArr}
            imageIndex={0}
            visible={modalDisplay}
            animationType={'slide'}
            swipeToCloseEnabled={true}
            HeaderComponent={(item) => {
                return (
                    <>
                        <View style={styles.textVw}>
                            <Text style={styles.text}>{indexImage + 1} / {mediaArr.length}</Text>
                        </View>
                        <Pressable onPress={() => {setModalDisplay(false); }} style={styles.closeImgVw}>
                            <Image style={styles.closeImg} source={require('../../assets/images/close.png')} />
                        </Pressable>
                    </>
                )
            }}
            onImageIndexChange	={(index) => setIndexImage(index)}
            onRequestClose={() => {setModalDisplay(false), setIndexImage(0)}}
        />
    )


    // return (
    //     <Modal
    //         style={styles.modalStyle}
    //         isVisible={modalDisplay}
    //         onBackButtonPress={() => { setModalDisplay(false) }}
    //         onBackdropPress={() => { setModalDisplay(false) }}>
    //         <ImageView
    //             images={mediaArr}
    //             imageIndex={2}
    //             // keyExtractor={(item) => {console.log("47747-----", item);}}
    //             visible={modalDisplay}
    //             presentationStyle={'fullScreen'}
    //             onRequestClose={() => setModalDisplay(false)}
    //         />
    //         {/* <ImageViewer

    //                 onSwipeDown={() => {
    //                     setModalDisplay(false)
    //                 }}
    //                 // index={index}
    //                 pageAnimateTime={300}               
    //                 renderIndicator={(currentIndex, allSize) => {
    //                     return (
    //                         <View style={styles.textVw}>
    //                             <Text style={styles.text}>{`${currentIndex} / ${allSize}`}</Text>
    //                         </View>
    //                     )
    //                 }}
    //                 imageUrls={mediaArr} 
    //                 enableSwipeDown={true} style={{ width: '100%' }} 
    //             /> */}

    //         <Pressable onPress={() => setModalDisplay(false)} style={styles.closeImgVw}>
    //             <Image style={styles.closeImg} source={require('../../assets/images/close.png')} />
    //         </Pressable>
    //     </Modal>
    // );
}

const Style = (theme: any) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.PRIMARY
        },
        textVw: {
            position: 'absolute',
            alignSelf: 'center',
            top: 40,
            flexDirection: "row"
        },
        text: {
            color: theme.PRIMARY,
            fontSize: 20,
            fontFamily: FONTFAMILY.POPPINS_REGULAR
        },
        modalStyle: {
            justifyContent: "flex-end",
            width: '100%',
            alignSelf: 'center',
            margin: 0
        },
        modalVw: {
            flex: 1,
            marginTop: 0,
            paddingHorizontal: 0,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.PRIMARY
        },
        closeImgVw: {
            position: 'absolute',
            right: 10,
            top: 33,
            padding: 10,
        },
        closeImg: {
            width: 20,
            height: 20,
            tintColor: theme.PRIMARY,
        },
    });
};
