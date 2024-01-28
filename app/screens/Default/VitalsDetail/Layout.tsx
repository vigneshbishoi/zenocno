/**
 * Benifits Component
 * @Author: Astha
 * @Date: Wed April 7 2022 17:35:26 GMT+0530 (India Standard Time)
 * @Desc: Sisplay Benifits
 */
import React from 'react';
import style from './Style';
import {
    FlatList,
    Pressable,
    View,
    Text,
    StatusBar,
    SafeAreaView,
} from 'react-native';
import { withTheme, _changeTranslations } from '../../../utils/ThemeProvider';
import VitalsItem from '../../../components/vitalsItem.js'
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import AppHeader from '../../../components/CommonInput/appHeader';

interface IProps {
    theme: any;
    navigation: any;
    actions: any
    data: any
}
const Layout = (props: IProps) => {
    const styles = style(props.theme);
    const theme = props.theme
    const insets = useSafeAreaInsets();
    const arr = props?.route?.params?.arr

    const renderItemArr = ({ item, index }) => {
        return (
            <VitalsItem
                arr={arr}
                item={item}
                theme={theme}
                isSymptoms={props?.route?.params?.isSymptoms}
                navigation={props.navigation}
            />
        );
    }

    return (
        <SafeAreaProvider style={styles.container}>
            <View style={{ height: insets.top, backgroundColor: theme.PRIMARY }} >
                <StatusBar barStyle='dark-content' backgroundColor={theme.PRIMARY} />
            </View>
            <AppHeader
                theme={theme}
                onBackPress={() => props.navigation.pop()}
                headerTitle={props?.route?.params?.headerText}
                isRightComponent={false}
            />
            <View style={styles.subContainer}>
                <FlatList
                    data={arr}
                    keyExtractor={item => item.key}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    showsVerticalScrollIndicator={false}
                    renderItem={renderItemArr} />
            </View>
            <View style={{ height: insets.bottom, backgroundColor: theme.SELECTED }} />
        </SafeAreaProvider>
    );
};

export default withTheme(Layout);