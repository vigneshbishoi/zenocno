/**
 * Benifits Component
 * @Author: Astha
 * @Date: Wed April 7 2022 17:35:26 GMT+0530 (India Standard Time)
 * @Desc: Sisplay Benifits
 */
import React, { useState, useEffect } from 'react';
import style from './Style';
import {
    FlatList,
    TextInput,
    Pressable,
    View,
    Text,
    StatusBar,
    SafeAreaView,
    Platform,
    Image
} from 'react-native';
import { withTheme, _changeTranslations } from '../../../utils/ThemeProvider';
import Back from '../../../assets/images/Back.svg'
import { useSelector } from 'react-redux';
import Search from '../../../assets/images/search.svg'
// import LocationIcon from '../../../assets/images/locationIcon.svg'
import LocationIcon from '../../../assets/images/financialLocation.svg'
import translate from "../../../utils/Text"
import actionTypes from '../../../store/actions/types';
import AppHeader from '../../../components/CommonInput/appHeader';
import AppHeaderSearch from '../../../components/CommonInput/appHeaderSearch';

interface IProps {
    theme: any;
    navigation: any;
    actions: any
    data: any
}
const Layout = (props: IProps) => {
    const styles = style(props.theme);
    const theme = props.theme
    const [searchValue, setSearchValue] = useState('');
    const [searchData, setSearchData] = useState([])
    const financialResource = useSelector((state) => state.eventReducer?.financialResources?.length > 0 ?
       state.eventReducer.financialResources[0]?.message : []) || [];
    const [searchValueShow, setSearchValueShow] = useState(false);

    useEffect(() => {
        getFinancialResources()
    }, [])

    //Api Call
    const getFinancialResources = () => {
        props.actions.financialResources(actionTypes.GET_FINACIAL_RESOURCE, {
            module: 'website_rest_api',
            action: 'get_financial_resources',
        });
    }

    //Helper Methods
    const resourRenderItem = ({ item, index }) => {
        return (
            <Pressable style={[styles.resourceItemContainer, index == 0 && styles.borderStyle]} onPress={() => props.navigation.navigate('Zen.FinancialResourcesDetail',{item:item}) } >
                <View style={styles.descVw} >
                        <Text style={styles.rnameText}>{item.institute}</Text>
                        <View style={styles.locationInnerVw} >
                            <LocationIcon />
                            <Text style={styles.rlocationText} numberOfLines={1} >{item.region}</Text>
                        </View>
                </View>
                <Back width={7} height={12} style={{ marginTop: 17, transform: [{ rotateY: '180deg' }] }} />
            </Pressable>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle='dark-content' backgroundColor={theme.PRIMARY} />
            {!searchValueShow ? <AppHeader
                    theme={theme}
                    onBackPress={() => props.navigation.pop()}
                    headerTitle={translate("DRAWER")["FINANCIAL_RESOURCES"]}
                    isRightComponent={true}
                    isFirstIcon={true}
                    rightFirstIcon={<View style={styles.searchIcon}>
                        <Image source={require('../../../assets/images/eventSearch.png')} /></View>}
                    rightFirstPress={() => {setSearchValueShow(!searchValueShow)}}
                    extraHeaderTxt={{fontSize: 24}}
                    extraHeaderTxtView={{ flex:1 }}
                /> :
                <AppHeaderSearch
                    theme={theme}
                    showSearchIcon={true}
                    onBackPress={() => {setSearchValueShow(!searchValueShow)}}
                    searchValue={searchValue}
                    setSearchValue={(value: any)=> {
                        setSearchValue(value)
                        let  filterData = financialResource.filter(item => item.institute.toLowerCase().includes(value.toLowerCase()) || 
                        item.region.toLowerCase().includes(value.toLowerCase()))
                        setSearchData(filterData)
                    }}
                    onSearch={() => {}}
                    inputViewStyle={{flex:0.9}}
                    inputStyle={{ flex:1 }}
                />}
            {/* <Text style={styles.nameLocationTitle} numberOfLines={1} >{translate("COMMONTEXT")["INSTITUE_REGION"]}</Text> */}
            <FlatList
                data={searchValue.length > 0 ? searchData : financialResource}
                showsVerticalScrollIndicator={false}
                style={{ marginTop: Platform.OS === 'ios' ? 10 : 5 }}
                renderItem={resourRenderItem}
            />
        </SafeAreaView>
    );
};

export default withTheme(Layout);
