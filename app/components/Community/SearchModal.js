import React, { useState, useEffect } from 'react';
import {
  FlatList, Pressable, TextInput, Text, View, Image, SectionList, Platform, Dimensions,
  StyleSheet
} from 'react-native';
import Modal from 'react-native-modal'
import Back from '../../assets/images/Back.svg'
import Search from '../../assets/images/search.svg'
import { FONTFAMILY } from '../../config/font-config';
import TabBar from '../../components/TabBar'
import { scale, verticalScale } from 'react-native-size-matters';
import { blogView, groupView, peopleView, productView, recipesView, wellnessView } from './SearchModalCom';
import actionTypes from '../../store/actions/types';
import { useSelector } from 'react-redux';
import request from '../../services/client';
import { getHomeSearchList } from '../../store/actions/homeSearch';
import translate from "../../utils/Text"

export default function SearchModal(props: any) {
  const { searchVisible, setSearchVisible, styles, theme } = props;
  const [searchValue, setSearchValue] = useState('');
  const [searchList, setSearchList] = useState([]);
  const [fullsearchList, setFullSearchList] = useState([]);
  const [filterText, setFilterText] = useState('');
  const extraStyles = extraStyle(props.theme);
  const SearchData = useSelector(state => state)
  const [searchCatArr, setSearchCatArr] = useState([])
  const [seachId, setSearchId] = useState({ key: '1', name: ' All ' });
  const [suggesionSrcArr, setSuggesionSrcArr] = useState([
    { key: '1', title: 'Blood Cancer' },
    { key: '2', title: 'Increase chances of cure' },
    { key: '3', title: 'Test Check' },
    { key: '4', title: 'Mouth Cancer' },
  ])
  useEffect(() => {
    searchApi()
  }, [searchValue])

  const searchApi = async () => {
    try {
      const apiCall = await request({
        method: 'get', data: {
          module: `search?search_text=${searchValue}`,
          formData: {},
          isModules: true
        }
      });
      let response = apiCall
      if (response?.status == 200) {
        let SearchUpdateList = []
        let SearchCatArr = []
        Object?.keys(apiCall?.data?.data)?.map((key) => {
          if (apiCall?.data?.data[key]?.length > 0) {
            SearchUpdateList.push({ 'title': capitalizeFirstLetter(key?.slice(0, key?.indexOf("D"))), 'data': apiCall?.data?.data[key] })
          }
        })
        getHomeSearchList(actionTypes?.GET_HOME_SEARCH_LIST, apiCall?.data?.data)
        //Search List Data
        setSearchList(SearchUpdateList?.length > 0 ? SearchUpdateList : [])
        setFullSearchList(SearchUpdateList?.length > 0 ? SearchUpdateList : [])
        //Search List header data
        function capitalizeFirstLetter(string) {
          return string.charAt(0).toUpperCase() + string.slice(1);
        }
        SearchUpdateList?.map((data, index) => {
          if (index == 0) {
            SearchCatArr.push({ key: '1', name: ' All ' })
          }
          SearchCatArr.push({ key: `${index + 2}`, name: capitalizeFirstLetter(data?.title) })
        })
        setSearchCatArr(SearchCatArr)
      }
    } catch (error) {
      console.log('FFFF', error);
    }
  }

  const renderSearchSectionHeader = ({ section: { title } }) => {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={extraStyles.itemTitle}>{title}</Text>
        <Text style={[extraStyles.itemTitle, { color: theme?.SECONDARY }]}>View All</Text>
      </View>
    );
  }

  const serchListItem = ({ item, index, section }) => {
    return section.title == 'People' ?
      peopleView(item, index, section, props) : section.title == 'Post' ?
        blogView(item, index, section, props) : section.title == 'Group' ?
          groupView(item, index, section, props) : section.title == 'Wellness' ?
            wellnessView(item, index, section, props) : section.title == 'Product' ?
              productView(item, index, section, props) : section.title == 'Recipe' ?
                recipesView(item, index, section, props) : null
  }

  const renderSearchCatItem = ({ item, index }) => {
    return (
      <View style={{ marginRight: 10 }}>
        <Pressable style={[styles.searchItem, seachId === item && styles.selected]}
          onPress={() => setSearchId(item)}>
          <Text style={[styles.searchTitle, seachId === item && { color: theme.PRIMARY }]}>{item.title}</Text>
        </Pressable>
      </View>
    );
  }

  const renderSuggestionItem = ({ item, index }) => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
        <Image style={{ width: 18, height: 18 }} source={require('../../assets/images/close.png')} />
        <Text style={styles.sugSrchTxt}>{item.title}</Text>
        <Image style={{ width: 10, height: 10, position: 'absolute', right: 0 }}
          source={require('../../assets/images/close.png')} />
      </View>
    );
  }

  const selectItem = (item) => {
    setSearchId(item)
  }

  return (
    <Modal
      isVisible={searchVisible}
      backdropColor={theme.BLACK}
      backdropOpacity={0.30}
      style={{ margin: 0 }} >
      <View style={extraStyles.container}>

        <View style={extraStyles.headerView}>

          <Pressable style={{ padding: scale(10) }}
            onPress={() => { setSearchVisible(false); setSearchValue(''); }}>
            <Back width={15} height={20} />
          </Pressable>

          <View style={extraStyles.searchView}>
            <Search />
            <TextInput placeholder={translate("COMMONTEXT")["FIND_PEOPLE"]}
              placeholderTextColor={'#707070'}
              style={extraStyles.searchInput}
              value={searchValue}
              onChangeText={(value) => {
                setSearchValue(value);
                var filterTxt = suggesionSrcArr.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()) == true)
                setFilterText(filterTxt)
              }} />

            <Pressable style={extraStyles.removeText} onPress={() => setSearchValue('')}>
              <Image style={extraStyles.closeIcon} source={require('../../assets/images/close.png')} />
            </Pressable>
          </View>
        </View>
        {searchValue.length > 0 &&
          <View style={extraStyles.searchValueView}>
            {(filterText.length > 0) ?
              <View>
                <Text style={styles.recentSrch}>Recent Searched</Text>
                <FlatList
                  data={filterText}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ marginTop: scale(10) }}
                  renderItem={renderSuggestionItem}
                />
              </View>
              : <Text style={styles.noSug}>{translate("COMMONTEXT")["NO_SUGGESTION_FOUND"]}</Text>}

          </View>
        }
        {/* <View >
          <FlatList
            data={searchCatArr}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 20 }}
            renderItem={renderSearchCatItem} />
        </View> */}
        <TabBar
          theme={theme}
          data={searchCatArr}
          catId={seachId}
          handleCategorySelection={(item) => {
            try {
              if (fullsearchList?.length > 0) {
                fullsearchList.filter((data) => {
                  if (data.title == item?.name) {
                    setSearchList([data])
                  }
                  if (' All ' == item?.name) {
                    setSearchList(fullsearchList)
                  }
                })
              }
            } catch (error) {

            }
            selectItem(item)
          }}
          isSearch={true}
          extraTextStyle={(item) => [
            {
              color: seachId?.key == item?.key ? theme.PRIMARY : theme.GRAY_BLACK
            }]}
          extraButtonStyle={(item) => [
            {
              backgroundColor: seachId?.key == item?.key ? theme.PAGINATION_SELECCT : theme.PRIMARY
            }]}
        />
        <SectionList
          contentContainerStyle={{ paddingHorizontal: scale(20) }}
          sections={searchList}
          showsVerticalScrollIndicator={false}
          renderItem={serchListItem}
          style={{ marginBottom: scale(30), marginTop: scale(15) }}
          renderSectionHeader={renderSearchSectionHeader}
          stickySectionHeadersEnabled={false}
        />
      </View>
    </Modal>
  )
}

const extraStyle = (theme: any) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      marginTop: Platform.OS === 'ios' ? verticalScale(40) : 0,
      backgroundColor:theme.PRIMARY
    },
    headerView: {
      paddingVertical: verticalScale(10),
      paddingHorizontal: scale(20),
      flexDirection: 'row',
      alignItems: 'center'
    },
    searchView: {
      backgroundColor: theme.PRIMARY,
      borderRadius: scale(8),
      width: Dimensions.get('window').width - 100,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: scale(10),
      paddingVertical: Platform.OS === 'ios' ? verticalScale(7) : 0
    },
    searchInput: {
      marginLeft: scale(8),
      marginRight: scale(40),
      fontFamily: FONTFAMILY.POPPINS_REGULAR
    },
    removeText: {
      paddingLeft: scale(20),
      position: 'absolute',
      paddingRight: scale(10),
      right: 0
    },
    closeIcon: { width: scale(12), height: scale(12) },
    searchValueView: {
      width: "90%",
      backgroundColor: theme.PRIMARY,
      borderRadius: scale(10),
      borderWidth: 1,
      padding: scale(20),
      borderColor: theme.VERY_LIGHT_GRAY,
      alignSelf: 'center'
    },
    itemTitle: {
      fontSize: scale(14),
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      color: theme?.GRAY_BLACK
    },
    tabPress: {
      marginRight: scale(10),
      paddingHorizontal: scale(12),
      paddingVertical: scale(8),
      backgroundColor: theme.PRIMARY,
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: scale(12),
      elevation: Platform.OS === 'ios' ? 0 : 5,
      shadowColor: 'grey',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: Platform.OS == 'ios' ? .5 : 1.0
    }
  })
}