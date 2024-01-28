import React from 'react';
import { View, Pressable, Text,Image, StyleSheet } from 'react-native';
import { FONTFAMILY } from '../../config/font-config';
import translate from '../../utils/Text'

const CartitemTab = ((props: any) => {
    const { index } = props;

    return (
      
        <View style={{ flexDirection: "row", width: '100%', height: 40, backgroundColor: "#AFEEE2" }}>
          <View style={[styles.tabView, {backgroundColor:'#19CEAB' }]}>
            <Image source={require('../../assets/images/tick.png')} style={styles.tabIcon} />
            <Text style={styles.tabText}>Cart</Text>
          </View>
          <View onPress={() => index} style={[styles.tabView, {backgroundColor: index >= 1 ? '#19CEAB' : '#74E6D1', }]}>
          <Image source={require('../../assets/images/polygon1.png')} style={[styles.cartPolygon,]} />
            <Image source={require('../../assets/images/tick.png')} style={[styles.tabIcon, {marginLeft:10}]} />
            <Text style={styles.tabText}>Address</Text>
          </View>
          { index == 1 ?
              <Image source={require('../../assets/images/polygon1.png')} style={styles.addressPolygon} />
            : <Image source={require('../../assets/images/polygon2.png')} style={styles.addressPolygon} />
          }
          <View onPress={() => index} style={[styles.tabView, {backgroundColor: index == 2 ? '#19CEAB' :'#AFEEE2', }]}>
            <Image source={require('../../assets/images/tick.png')} style={styles.tabIcon} />
            <Text style={styles.tabText}>{translate("CHECKOUT")["PAYMENT"]}</Text>
          </View>
        </View>
    );
})
const styles = StyleSheet.create({
     
      tabView: {
        width: '31.2%', 
        backgroundColor: "#AFEEE2", 
        alignItems: "center", 
        justifyContent: "center", 
        flexDirection: "row"
      },
      tabIcon:{ 
         width: 16,
         height: 16,
         resizeMode:"contain",
         },
      tabText:{ 
        color: "white", 
        fontSize: 16,
        fontWeight:"600", 
        marginLeft: 5, 
        fontFamily:FONTFAMILY.POPPINS_REGULAR 
      },
      cartPolygon: { 
        marginLeft:-20, 
        width:22,
        resizeMode:'contain', 
        height:'100%', 
      },
      addressPolygon: { 
        marginLeft:-2, 
        width:22, 
        height:'100%'
      }
});
export default CartitemTab;