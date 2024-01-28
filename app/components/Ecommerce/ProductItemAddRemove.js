import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import themes from '../../config/themes-config';
import { FONTFAMILY } from '../../config/font-config';

const ProductitemAddRemove = ((props) => {
    return(
        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.addRemoveItemContainer}>
            <Pressable style={[styles.addRemoveItem , {marginRight:15 , marginLeft:4}]}>
              <Text style={styles.addRemoveText}>－</Text>
            </Pressable>

            <Text style={styles.totalItem}>2</Text>

            <Pressable style={[styles.addRemoveItem , {marginLeft:15, marginRight:4}]}>
              <Text style={styles.addRemoveText}>＋</Text>
            </Pressable>
          </View>
        </View>
    );
})
const styles = StyleSheet.create({
  
      addRemoveItemContainer: {
        // backgroundColor: '#D6F6F0',
        paddingVertical: 3,
        // borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
      },
      addRemoveItem: {
        width: 30,
        height: 30,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#108fe5',
      },
      addRemoveText: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18,
        color: themes.SECONDARY
      },
      totalItem: {
        fontSize: 19,
        color: themes.GRAY_BLACK,
        fontFamily: FONTFAMILY.MEDIUM,
      },
})
export default ProductitemAddRemove;