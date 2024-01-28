import React, { useState } from 'react';
import {
    StyleSheet,
    FlatList,
    View,
    Text,
    Image,
} from 'react-native';
import Itemheader from './ItemHeader';
import { FONTFAMILY } from '../../config/font-config';


const CommonCard = ((props) => {

    const { header, arry, txt, showUser, showDescription, icon, theme, onAllPress } = props
    const styles = modalStyles(theme);
    const [showMore, setShowMore] = useState(false);

    const renderItem = ({ item }) => {
        return (
            <View>
                <View style={{ overflow: 'hidden', height: 181, width: 301, borderRadius: 15, margin: 10 }}>
                    <Image style={{ resizeMode: 'contain' }} source={item.image} ></Image>
                </View>


                {showUser &&
                    <View style={{ flexDirection: "row", alignItems: 'center', marginTop: 8, marginHorizontal: 10, }}>
                        <View style={{ borderRadius: 15, overflow: "hidden" }}>
                            <Image source={item.image2} style={{ height: 30, width: 30, resizeMode: 'cover' }}></Image>
                        </View>
                        <Text style={styles.nameText}>{item.name}</Text>
                        <View style={styles.lblVw}>
                        <Text style={styles.lblText}>Coleractal Cancer</Text>
                        {/* <Text style={{ color: "black", position: "absolute", right: 0, fontSize: 14, backgroundColor: "#fff7d8", textAlign: "center", borderRadius: 8, paddingHorizontal: 10 , paddingVertical:2}}>Coleractal Cancer</Text> */}
                        </View>
                    </View>}
                    
                {showDescription &&
                    <View style={{ marginHorizontal: 10, marginVertical: 8,  width: 301 }}>
                        <Text style={styles.descriptionText} numberOfLines={2} onTextLayout={(e) => setShowMore(console.log("----",e.nativeEvent.lines.length))}>{txt}</Text>
                        {/* <Text style={{color:"dodgerblue", fontWeight:"bold"}}>Show more</Text> */}
                        {/* {txt.length > 150 ?
                            <TouchableOpacity>
                            </TouchableOpacity>
                            : null} */}
                    </View>
                }

                <View style={{ flexDirection: "row",  marginHorizontal:20, alignItems:'center', marginTop: 0}}>
                        <Image source={require('../../assets/images/like.png')} style={[styles.imgStyle, {marginLeft:-10}]} />
                        <Text style={styles.numberText}>11</Text>
                        <Image source={require('../../assets/images/comment.png')} style={[styles.imgStyle, {marginLeft:15}]} />
                        <Text style={styles.numberText}>11</Text>
                        <Image source={require('../../assets/images/share.png')} style={[styles.imgStyle, {marginLeft:15}]} />
                        <Text style={styles.numberText}>11</Text>
                    <View style={[styles.dateText, { position: "absolute", right: 5 }]}>
                        <Text>14 Aug, 2022</Text> 
                    </View> 
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>

            <Itemheader
                header={header}
                option='View all'
                icon={icon}
                color={'aliceblue'} 
                theme={theme}
                onAllPress={onAllPress}
                />

            <FlatList
                data={arry}
                renderItem={renderItem}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingLeft: 28,   paddingVertical: 10 }}
                horizontal
            />
        </View>
    )
})

const modalStyles = (theme) => StyleSheet.create({
    container: {
        paddingVertical: 25,
    },
    headerMainView: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 10,
    },
    personalizeView: {
        padding: 8,
        borderRadius: 25,
        backgroundColor: "white"
    },
    imgStyle: {
        height: 18,
        width: 18,
        resizeMode:'contain'
    },
    numberText: {
        fontFamily: FONTFAMILY.REGULAR,
        fontSize: 12,
        marginLeft: 2
    },
    dateText: {
        fontFamily: FONTFAMILY.REGULAR,
        fontSize: 12,
        color:theme.SEARCH_TITLE
    },
    descriptionText: {
        fontFamily: FONTFAMILY.REGULAR,
        fontSize: 14,
        color:theme.GRAY_BLACK,
        height: 40
    },
    nameText: {
        fontFamily: FONTFAMILY.MEDIUM,
        fontSize: 14,
        color:'#5c6672',
        marginLeft: 5
    },
    lblVw: {
        position: "absolute", 
        right: 0, 
         backgroundColor: "#fff7d8",
          borderRadius: 8, 
          paddingHorizontal: 10 ,
           height:22,
           alignItems:'center',
           justifyContent:'center'
    },
    lblText: {
        fontFamily: FONTFAMILY.MEDIUM,
        fontSize: 11,
        color:'#5c6672',
    },

})
export default CommonCard;