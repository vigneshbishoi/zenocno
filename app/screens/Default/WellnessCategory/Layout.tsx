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
    View,
    Text,
    StatusBar,
    SafeAreaView,
    ActivityIndicator,
    Share
} from 'react-native';
import { withTheme, _changeTranslations } from '../../../utils/ThemeProvider';
import { WellnessRender } from '../../../components/Home/Wellness'
import actionTypes from '../../../store/actions/types';
import { useSelector } from 'react-redux';
import Search from '../../../assets/images/search.svg'
import CalenderIcon from '../../../assets/images/CalenderIcon.svg'
import translate from "../../../utils/Text"
import AppHeader from '../../../components/CommonInput/appHeader';
import AppHeaderSearch from '../../../components/CommonInput/appHeaderSearch';
import SelectionTab from '../../../components/CommonInput/selectionTab';
import { InstagramLoader } from 'react-native-easy-content-loader';
import { onPressLikeWellness, onPressShareWellness } from '../../../utils/wellnessFunction';


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
    const [wellnessData, setWellnessData] = useState([]);
    const [filterData, setFilterData] = useState([]);
    const [catId, setCatId] = useState('0')
    const [search, setSearch] = useState(false)
    const [loadeMore, setLoadMore] = useState(true)
    const WellNessCategoryById = useSelector(state => state.storiesReducer.getAllWellnessCategoryById);
    const allWellNessCategory = useSelector(state => state.storiesReducer.getAllWellnessCategory);
    const userId = useSelector((state) => state.loginReducer.userData?.data?.data?.id);
    const [reloadPage, setReloadPage] = useState(false)
    const [page, setPage] = useState(1)
    const [Loading , setLoading ] = useState(true)

    useEffect(() => {
        var inputRequest = {
            module: 'wellness_category',
            action: 'getAll',
        }
        props.actions.getWellnessCategory(actionTypes.GET_ALL_WELLNESS_CATEGORY, inputRequest);
        getAllWellness(0, 1)
    }, []);

    useEffect(() => {
        if (WellNessCategoryById != undefined && WellNessCategoryById?.length > 0) {
            let data1 = []
            if (WellNessCategoryById[0]?.data?.wellnesses != undefined) {
                data1 = WellNessCategoryById[0]?.data?.wellnesses
                setWellnessData(WellNessCategoryById[0]?.data?.wellnesses)
            } else {
                if (WellNessCategoryById[0]?.data?.length > 0) {
                    setLoading(false)
                    let data = []
                    WellNessCategoryById[0]?.data.map(item => {
                        item.wellnesses.map(itemA => {
                            itemA.wellCat = item.categoryName
                            itemA.calCat = item.calendar_category
                            data.push(itemA)
                        })
                    })
                    data1 = data
                    setWellnessData(data)
                }
            }
            if (searchValue?.length > 0) {
                var filterData = data1.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()))
                setFilterData(filterData)
            }
        }
        setTimeout(() => {
            setLoading(false)
        }, 6000);
    }, [WellNessCategoryById]);


    //Api Call
    const getAllWellness = (id: any, page: number) => {
        let obj = {}
        if(id != 0){
            obj.id = id
            obj.page = page
        }
        props.actions.allWellness(actionTypes.ALL_WELLNESS, {
            module: 'wellness',
            action: 'all_wellness_by_cancer_type',
            formData:obj
        });
    }

    //Helper Methods
    const selectCategory = (item) => {
        setFilterData([])
        getAllWellness(item?.id, 1)
        setCatId(item.id)
        setReloadPage(!reloadPage)
        setLoading(true)
        setTimeout(() => {
           setLoading(false) 
        }, 1000);
    }
    const statics = [{ id: '0', name: 'All' }]
    const searchData = (searchValue: string) => {
        let data = wellnessData
        var filterData = data.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()))
        setFilterData(filterData)
    }
    const renderFooter = () => {
        return loadeMore && (
          //Footer View with Load More button
          <View style={styles.footer}>
            <ActivityIndicator color="red" style={{ marginLeft: 8 }} />
          </View>
        );
      }

      const likeWellness = (item: any) =>{
        onPressLikeWellness(props.actions, item, userId )
      }
      
      const onPressShare = (item: any) =>{
        onPressShareWellness(item)
      }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle='dark-content' backgroundColor={theme.SELECTED} />
            {!search ? 
            <AppHeader
                theme={theme}
                onBackPress={() => props.navigation.goBack()}
                headerTitle={translate("DRAWER")["WELLNESS"]}
                isRightComponent={true}
                rightFirstPress={() => {setSearch(true)}}
                isFirstIcon={true}
                isSecondIcon={true}
                rightSecondIcon={
                <View style={{width:36, height:36, borderRadius: 36, justifyContent:'center', backgroundColor: theme.DARK_SILVER , alignItems:'center',}}>
                    <CalenderIcon />
                </View>}
                rightFirstIcon={
                <View style={{width:36, height:36, borderRadius: 36, justifyContent:'center', backgroundColor: theme.DARK_SILVER , alignItems:'center',}}>
                    <Search />
                </View>}
                rightSecondPress={() => {
                    props.navigation.navigate('Zen.ActivityShow')
                }}
                extraHeaderTxt={{fontSize: 24}}
                extraHeaderTxtView={{ flex:1 }}
            /> :
            <AppHeaderSearch
                theme={theme}
                onBackPress={() => {setSearch(false), searchData('')}}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onSearch={searchData}
            /> }

            <SelectionTab
                theme={theme}
                data={allWellNessCategory?.length > 0 ? statics.concat(allWellNessCategory[0]?.data) : []}
                catId={catId}
                handleCategorySelection={(item) => selectCategory(item)}
            />
            {/* <InstagramLoader active listSize={Loading ?10 : 0} /> */}

            {Loading ? 
               (
                <InstagramLoader active listSize={Loading ?10 : 0} />
            //    <ActivityIndicator color={theme.PAGINATION_SELECCT} style={{ alignSelf:"center",flex:1  }}  size="small"/>
               ):(
                <FlatList
                data={searchValue.length > 0 ? filterData : wellnessData}
                keyExtractor={item => item.key}
                contentContainerStyle={{ paddingHorizontal: 0, flexGrow: 1, marginTop:10 }}
                showsHorizontalScrollIndicator={false}
                renderItem={(item) => {
                    return (
                        <WellnessRender item={item.item} navigation={props.navigation} WellNessCategoryById={WellNessCategoryById} theme={props.theme} onPress={(item) => {
                            let data = WellNessCategoryById
                                if (WellNessCategoryById[0]?.data?.length > 1) {
                                    let filterdata = WellNessCategoryById[0]?.data.filter(itemA => itemA.id == item.wellnessCategoryId)
                                    data = [{ data: filterdata[0] }]
                                }
                                props.navigation.navigate('Zen.WellnessCategoryItem', {
                                    item: item,
                                    WellNessCategoryById: data
                                })
                            }}
                            onPlusPress={(item: any) => {
                                props.navigation.navigate('Zen.AddActivity', {
                                    title: item.title,
                                    wellnessid: item.id,
                                    category: WellNessCategoryById[0]?.data.calendar_category || item.calCat,
                                    isFromWellness: true,
                                    isWellnessCategory: true
                                })
                            }}
                            onPressLike={(item: any)=> likeWellness(item)}
                            onPressShare={(item: any)=> onPressShare(item)}
                        />
                    )
                }}
                // ItemSeparatorComponent={() =>
                //     <View style={{ height: 3, backgroundColor: theme.TAB_BG }} />
                // }
                ListEmptyComponent={() =>
                    <View style={styles.emptyVw} >
                        <Text style={styles.noActivityText}> {filterData.length < 0 ? 'No results found' : 'No activities found'}</Text>
                    </View> 
                }
                onEndReached={() => {
                    if (loadeMore) {
                        getAllWellness(catId)
                    }
                  }}
                onEndReachedThreshold={0.5}
                // ListFooterComponent={renderFooter}
            />
               )}
        </SafeAreaView>
    );
};

export default withTheme(Layout);
