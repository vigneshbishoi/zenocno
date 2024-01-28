/**
 * Benifits Component
 * @Author: Astha
 * @Date: Wed April 7 2022 17:35:26 GMT+0530 (India Standard Time)
 * @Desc: Sisplay Benifits
 */
import React, { useState, useEffect } from 'react';
import style from './Style';
import {
  View,
  SafeAreaView,
  StatusBar,
  SectionList,
  Pressable,
  Image,
  ImageBackground,
  Platform,
  FlatList
} from 'react-native';
import { withTheme, _changeTranslations } from '../../../utils/ThemeProvider';
import Text from '../../../components/CustomText';
import translate from '../../../utils/Text'
import Back from '../../../assets/images/Back.svg'
import { useIsFocused } from '@react-navigation/native';
import actionTypes from '../../../store/actions/types';
import { RootState } from '../../../store';
import { useSelector } from 'react-redux';
import { exp } from 'react-native-reanimated';
import AppHeader from '../../../components/CommonInput/appHeader';
import AppHeaderSearch from '../../../components/CommonInput/appHeaderSearch';
import TabBar from '../../../components/TabBar';
import { FONTFAMILY } from '../../../config/font-config';

interface IProps {
  theme: any;
  navigation: any;
  actions: any
  data: any
}
const Layout = (props: IProps) => {
  const styles = style(props.theme);
  const theme = props.theme
  const [data, setData] = useState([])
  const [AllData, setAllData] = useState([])
  const [chunkArr, setChunkArr] = useState([])
  const [loadMore, setLoadMore] = useState(0)
  const [loader, setLoader] = useState(true)
  const [catData, setCatData] = useState([])
  const [selectedSection, setSelectedSection] = useState([])
  const [selectedItem, setSelectedItem] = useState([])
  const [valueChange, setValueChange] = useState(false)
  const [expand, setExpand] = useState(false)
  const isFocused = useIsFocused();
  const regex = /(<([^>]+)>)/ig;
  const [searchValueShow, setSearchValueShow] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchData, setSearchData] = useState([])
  const [categoryType, setCategoryType] = useState([{id: 1, category: 'All'}])
  const [catId, setCatId] = useState({id: 1, category: 'All'})
  const faqData =
    useSelector((state: RootState) => state.storiesReducer?.faqListData?.length > 0 ? state.storiesReducer.faqListData[0]?.data : []) || [];

  useEffect(() => {
    let arrData = []
    let catType = []
    let cateId = 1
    faqData.map(item => {
      let obj = {}
      let filterData = arrData.filter(itemA => itemA.title == item.faq_category.name)
      if (filterData.length > 0) {
        filterData[0].data.push(item)
      } else {
        let arr = []
        obj.title = item.faq_category.name
        arr.push(item)
        catType.push({id: cateId + 1, category: item.faq_category.name})
        cateId = cateId + 1
        obj.data = arr
        arrData.push(obj)
      }
    })
    if(catType.length > 0 && categoryType.length == 1){
      setCategoryType(categoryType.concat(catType))
    }else if(catType.length > 0 && categoryType.length > 1){
      catType.unshift({id: 1, category: 'All'})
      setCategoryType(catType)
    }
    setData(arrData)
    setTimeout(() => {
     setLoader(false)
    }, 2000);
  }, [faqData.length > 0]);

  useEffect(() => {
    const perChunk = 20 // items per chunk    
    const inputArray = faqData
    const result = inputArray.reduce((resultArray, item, index) => { 
      const chunkIndex = Math.floor(index/perChunk)
      if(!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = [] // start a new chunk
      }
      resultArray[chunkIndex].push(item)
      return resultArray
    }, [])
    setChunkArr(result)
    if(loadMore == 0){
      setAllData(result[0])
    }
  },[data])

  useEffect(() => {
    if (chunkArr.length > 0) {
      if(loadMore == 0){
        setAllData(chunkArr[0])
      }else if(loadMore < chunkArr.length){
        setAllData(AllData.concat(chunkArr[loadMore]))
      }
    }
  }, [loadMore])

  useEffect(() => {
    if (categoryType.length > 0) {
        setCatId(categoryType[0])
    }
  }, [categoryType])

  useEffect(() => {
    if (isFocused) {
      props.actions.getFaqListData(actionTypes.GET_FAQ_LIST_DATA, {
        module: 'faq_question',
        action: 'get_all_faq_question',
        formData: {
          page: 1,
        }
      });
    }
  }, [isFocused]);

  const Item = ({ item }) => {
    return (
      <Pressable style={[styles.itemVw,selectedItem.includes(item.id.toString()) && { backgroundColor: '#f4f9fe' }]} onPress={() => {
        if (selectedItem.includes(item.id.toString())) {
          let filterData = selectedItem.filter(itemA => itemA != item.id.toString())
          setSelectedItem(filterData)
        } else {
          selectedItem.push(item.id.toString())
          setSelectedItem(selectedItem)
        }
        setValueChange(!valueChange)
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 }}>
          <Text style={styles.header}>{item.question}</Text>
          <Image style={[styles.icon]} source={selectedItem.includes(item.id.toString()) ? require('../../../assets/images/upArrow.png') : require('../../../assets/images/downArrow.png')} />
        </View>
        {selectedItem.includes(item.id.toString()) &&
          <Text style={styles.itemText}>{item.answer.replace(regex, '')}</Text>}
      </Pressable>
    )
  };

  const RenderSectionHeader = ({ item }) => {
    return (
      <Pressable style={[styles.sectionVw, { backgroundColor: selectedSection.includes(item.title) ? theme.SECONDARY : theme.PRIMARY }]} onPress={() => {
        if (selectedSection.includes(item.title)) {
          let filterData = selectedSection.filter(itemA => itemA != item.title)
          setSelectedSection(filterData)
        } else {
          selectedSection.push(item.title)
          setSelectedSection(selectedSection)
        }
        setValueChange(!valueChange)
      }}>
        <Text style={[styles.header, { color: selectedSection.includes(item.title) ? theme.PRIMARY : theme.GRAY_BLACK }]}>{item.title}</Text>
        <Image style={[styles.icon]} source={selectedSection.includes(item.title) ? require('../../../assets/images/upArrow_white.png') : require('../../../assets/images/downArrow.png')} />
      </Pressable>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='dark-content' backgroundColor={theme.PRIMARY} />
      {!searchValueShow ? <AppHeader
          theme={theme}
          onBackPress={() => props.navigation.pop()}
          headerTitle={translate("DOCTORSLIST")["FAQ"]}
          isRightComponent={true}
          isFirstIcon={true}
          rightFirstIcon={<View style={styles.searchIcon}>
              <Image source={require('../../../assets/images/eventSearch.png')} /></View>}
          rightFirstPress={() => {setSearchValueShow(!searchValueShow)}}
          extraHeaderTxt={styles.extraTitle}
      /> :
      <AppHeaderSearch
          theme={theme}
          showSearchIcon={true}
          onBackPress={() => {setSearchValueShow(!searchValueShow)}}
          searchValue={searchValue}
          setSearchValue={(value: any)=> {
              setSearchValue(value)
              if(catId.category == 'All'){
                let  filterData = faqData.filter(item => item.question.toLowerCase().includes(value.toLowerCase()))
                setSearchData(filterData)
              }else{
                let  filterData = catData.filter(item => item.question.toLowerCase().includes(value.toLowerCase()))
                setSearchData(filterData)
              }
          }}
          onSearch={() => {}}
          inputViewStyle={{flex:0.9}}
          inputStyle={{ flex:1 }}
      />}
      <View style={{marginTop: 5}} />
      <View style={{marginLeft: -5}}>
        {faqData?.length > 0 && <TabBar
            theme={theme}
            data={categoryType}
            isEvents={true}
            catId={catId}
            selectExtraStyle={{backgroundColor: theme.SKY_BLUE_EVENT}}
            selectExtraTextStyle={{color: theme.SECONDARY }}
            extraButtonStyle={() => [{shadowOpacity:0}]}
            extraTextStyle={() => [{color: theme.BLACK, fontFamily: FONTFAMILY.POPPINS_MEDIUM,}]}
            handleCategorySelection={(item) => {
              setCatId(item)
              data?.filter((data) => {if(item.category == data?.title){
                setCatData(data.data)
              }})}} />}
      </View>
      <View style={{ flex: 1, }}>
          <FlatList
            data={searchValue.length > 0 ? searchData : catId.category == 'All' ? AllData : catData }
            keyExtractor={item => item.key}
            showsVerticalScrollIndicator={false}
            initialNumToRender={15}
            renderItem={(item) => <Item item={item.item} />}
            ListEmptyComponent={() =>
            <View style={styles.emptyVw} >
              <Text style={styles.noActivityText}> {!loader ? translate("COMMONTEXT")["NO_RESULTS_FOUND"] : '' } </Text>
            </View>
            }
            onEndReached={() => {
              if(catId.category == 'All')
              {
                setLoadMore(loadMore + 1)
              }
            }}
          onEndReachedThreshold={0.5}
           />
          {/* <Text style={styles.title} >{translate('FAQ').TITLE}</Text> */}
          {/* <Pressable style={{position:'absolute', right: 0}} onPress={() => {
          if(selectedSection.length != data.length){
              let expandArr = []
              data.map(item => {
                if(!selectedSection.includes(item.title)){
                  expandArr.push(item.title)
                }
              })
              setSelectedSection([...selectedSection, ...expandArr])
          } else {
            setSelectedSection([])
          }
          setValueChange(!valueChange)
        }}> 
        <Text style={[styles.header, {color: theme.SECONDARY}]}>{selectedSection.length != data.length ? 'Expand All' : 'Collapse All'}</Text>
      </Pressable> */}

        {/* <SectionList
          sections={data}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ marginTop: 10 }}
          keyExtractor={(item, index) => item + index}
          renderItem={(item) => <Item item={item.item} section={item.section} />}
          renderSectionHeader={(item) => (
            <RenderSectionHeader item={item.section} />
          )}
        /> */}
      </View>
    </SafeAreaView>
  );
};
export default withTheme(Layout);
