/**
 * Benifits Component
 * @Author: Astha
 * @Date: Wed April 7 2022 17:35:26 GMT+0530 (India Standard Time)
 * @Desc: Sisplay Benifits
 */
import React, { useState, useEffect } from 'react';
import style from './Style';
import {
    Dimensions,
    View,
    Text,
    StatusBar,
    Platform,
    ScrollView
} from 'react-native';
import { withTheme, _changeTranslations } from '../../../utils/ThemeProvider';
import { useSelector } from 'react-redux';
import LocationIcon from '../../../assets/images/locationIcon.svg'
import translate from "../../../utils/Text"
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context'
import actionTypes from '../../../store/actions/types';
import AppHeader from '../../../components/CommonInput/appHeader';
import ContentLoader from "react-native-easy-content-loader";

const widht = Dimensions.get('window').width;

interface IProps {
    theme: any;
    navigation: any;
    actions: any
    data: any
}
const Layout = (props: IProps) => {
    const styles = style(props.theme);
    const theme = props.theme
    const item = props?.route?.params?.item
    const insets = useSafeAreaInsets();
    const [financialResource, setFinancialResource] = useState([])
    const financialResourceData = useSelector((state) => state.eventReducer?.financialResource)
    // const financialResourceData = useSelector((state) => state.eventReducer?.financialResource?.length > 0 ?
    //     state.eventReducer.financialResource[0]?.message[0] : []) || [];
    const [loader, setLoader] = useState(true)
    useEffect(() => {
        getFinancialResourceById()
        setTimeout(() => {
            setLoader(false)    
        }, 10000)
    }, [])

    useEffect(() => {
        if(financialResourceData?.length > 0)
        {
            setFinancialResource(item.ID == financialResourceData[0]?.message[0]?.ID ?
                 financialResourceData[0]?.message[0]: [])
            if(item.ID == financialResourceData[0]?.message[0]?.ID){
                setLoader(false)
            }
        }
    }, [financialResourceData])

    //Api Call
    const getFinancialResourceById = () => {
        props.actions.financialResourcesById(actionTypes.GET_FINACIAL_RESOURCE_BY_ID, {
            module: 'website_rest_api',
            action: 'get_financial_resources_detail',
            formData: {
                resource_id: item.ID
            }
        });
    }

    return ( 
        <SafeAreaProvider style={styles.container}>
            <View style={{ height: insets.top, backgroundColor: theme.PRIMARY }} >
                <StatusBar barStyle='dark-content' backgroundColor={theme.PRIMARY} />
            </View>
            {!loader &&
            <AppHeader
                theme={theme}
                onBackPress={() => props.navigation.pop()}
                headerTitle={translate("DRAWER")["FINANCIAL_RESOURCES"]}
                extraHeaderTxtView={{flex: 1}}
            />}
            {loader ? <ContentLoader
                containerStyles={{ marginTop: 50 }}
                loading={loader}
                pRows={4}
                pHeight={[200, 200, 50, 50]}
                pWidth={[widht - 20, widht - 20, widht - 20, widht - 20]}
            /> :
            <ScrollView bounces={false} showsVerticalScrollIndicator={false} >
                <Text style={styles.rnameText}>{financialResource.institute}</Text>
                <View style={styles.resourceBasicVw} >
                    {/* <View style={styles.locationInnerVw} >
                        <LocationIcon width={16} height={19} />
                        <Text style={styles.rlocationText} numberOfLines={1} >{financialResource.region}</Text>
                    </View> */}
                    {/* <Text style={styles.contactDetailTitle}>{translate("COMMONTEXT")["CONTACT_DETAILS"]}</Text> */}
                    <View style={[styles.contactItem, { marginTop : 0 }]} >
                        <Text style={styles.contactItemTitleText} >{translate("COMMONTEXT")["PHONE"]}</Text>
                        <Text style={[styles.contactItemTitleText,{width:10}]} >:</Text>
                        <Text style={styles.contactItemInfoText} numberOfLines={1} >{financialResource.contact}</Text>
                    </View>
                    <View style={styles.contactItem} >
                        <Text style={styles.contactItemTitleText} >{translate("COMMONTEXT")["EMAIL"]}</Text>
                        <Text style={[styles.contactItemTitleText,{width:10}]} >:</Text>
                        <Text style={styles.contactItemInfoText}>{financialResource.email}</Text>
                    </View>
                    <View style={styles.contactItem} >
                        <Text style={styles.contactItemTitleText} >{translate("COMMONTEXT")["WEBSITE"]}</Text>
                        <Text style={[styles.contactItemTitleText,{width:10}]} >:</Text>
                        <Text style={styles.contactItemInfoText} >{financialResource.website}</Text>
                    </View>
                    <View style={styles.contactItem} >
                        <Text style={styles.contactItemTitleText} >{translate("COMMONTEXT")["LOCATION"]}</Text>
                        <Text style={[styles.contactItemTitleText,{width:10}]} >:</Text>
                        <Text style={styles.contactItemInfoText} numberOfLines={1}>{financialResource.region}</Text>
                    </View>
                </View>

                <View style={styles.resourceDetailVw} >
                    <Text style={styles.detailText} >{financialResource.about}</Text>
                    {financialResource?.remarks != '' &&
                        <View style={styles.remarkVw} >
                            <Text style={styles.remarkText} numberOfLines={1} >{translate("COMMONTEXT")["REMARK"]}</Text>
                            <Text style={styles.remarkDetailText} >{financialResource.remarks}</Text>
                        </View>}
                </View>
            </ScrollView>}
        </SafeAreaProvider>
    );
};

export default withTheme(Layout);
