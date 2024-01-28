/**
 * AddActivity Component
 * @Author: Astha
 * @Date: Wed April 19 2022 17:35:26 GMT+0530 (India Standard Time)
 * @Desc: AddActivity 
 */
import React from 'react';
import style from './Style';
import {
    StatusBar,
    SafeAreaView,
} from 'react-native';
import { withTheme, _changeTranslations } from '../../../utils/ThemeProvider';
import AppHeader from '../../../components/CommonInput/appHeader';
import { WebView } from 'react-native-webview';

interface IProps {
    theme: any;
    navigation: any;
    actions: any
    data: any
    route: object
}

const Layout = (props: IProps) => {
    const styles = style(props.theme);
    const theme = props.theme

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle='dark-content' backgroundColor={theme.SELECTED} />
            <AppHeader
                theme={theme}
                onBackPress={() => props.navigation.goBack()}
                headerTitle={''}
                isRightComponent={false}  />
            <WebView source={{ uri: 'https://zenonco.io/about-us' }} style={{ backgroundColor: '#E4E4E4' }}
            //onLoadEnd={() => { setIsLoader(false)}}
            onLoadStart={() => { }} />
        </SafeAreaView>
    );
};
export default withTheme(Layout);