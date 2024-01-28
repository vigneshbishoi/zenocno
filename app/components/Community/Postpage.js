import * as React from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    View,
    Text,
    SafeAreaView
} from 'react-native';

const Postpage = () => {


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor:'white' }}>
            <View style={{ flex: 1, padding: 16 }}>
                 <Text> Post Page</Text>    
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
        width: 300,
        marginTop: 16,
    },
});
export default Postpage;