import React from 'react';
import {Pressable , Text, StyleSheet} from 'react-native';

const CancerButton = ((props) => {
    const {title, onPress} = props
    return(
        <Pressable style={styles.joinGroupButton} onPress={onPress}>
            <Text style={styles.joinGroupText}>{title}</Text>
      </Pressable>
    );
});
const styles = StyleSheet.create({
    joinGroupButton: {
        backgroundColor: 'dodgerblue',
        borderRadius: 20,
        paddingVertical: 20,
        marginVertical: 20,
        alignItems: 'center',
        justifyContent: 'center',
      },
      joinGroupText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
      },
});
export default CancerButton;