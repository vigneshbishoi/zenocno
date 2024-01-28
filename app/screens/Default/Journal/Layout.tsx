/**
 * Community Component
 * @Author: Astha
 * @Date: Wed April 14 2022 17:35:26 GMT+0530 (India Standard Time)
 * @Desc: Sisplay Benifits
 */
import React, { useState, useEffect, useCallback, useReducer, useRef } from 'react';
import style from './Style';
import {
  View,
  Image,
  SafeAreaView,
  StatusBar,
  FlatList,
  Pressable,
  Text,
  Dimensions,
  ImageBackground,
  Modal,
  RefreshControl,
  ScrollView
} from 'react-native';
import { withTheme, _changeTranslations } from '../../../utils/ThemeProvider';
import translate from "../../../utils/Text"
import AntDesign from 'react-native-vector-icons/AntDesign'
import { FONTFAMILY } from '../../../config/font-config';
import { useSelector } from 'react-redux';
import actionTypes from '../../../store/actions/types';
import moment from 'moment';
import { useIsFocused } from '@react-navigation/native';
import PDF from '../../../assets/images/pdf.svg'
import JPG from '../../../assets/images/jpg.svg'
import DOC from '../../../assets/images/doc.svg'
import XLS from '../../../assets/images/xls.svg'
import PLUS from '../../../assets/images/AddBlack.svg'
import Search from '../../../assets/images/search.svg'
import AppLoader from '../../../components/Plugins/AppLoader';
import RNFS from "react-native-fs";
import FileViewer from "react-native-file-viewer";
import request from '../../../services/client';
import FastImage from 'react-native-fast-image'
import Alert from "../../../components/AlertScreen/Index"
import { scale } from 'react-native-size-matters';
import AppHeader from '../../../components/CommonInput/appHeader';
import AppHeaderSearch from '../../../components/CommonInput/appHeaderSearch';
import LinearGradient from 'react-native-linear-gradient';
import TabBar from '../../../components/TabBar';
import Support from '../../../assets/images/support.svg';
import Support1 from '../../../assets/images/support_unselected_white.svg';
interface IProps {
  theme: any;
  navigation: any;
  actions: any
  data: any
}
const Layout = (props: IProps) => {
  const styles = style(props.theme);
  const theme = props.theme
  const [journal, setJournal] = useState([])
  const [rerender, setRerender] = useState(false)
  const userId = useSelector((state) => state.loginReducer.userData?.data?.data?.id);
  const userName = useSelector(state => state.loginReducer.userData)
  const journalList = useSelector((state) => state.journalReducer?.data);
  const journalCateList = useSelector((state) => state.journalReducer?.journalCate);
  const journalLoader = useSelector((state) => state.journalReducer?.loader);
  const journalSearch = useSelector((state) => state.journalReducer?.searchData);
  const format = 'MMM YYYY'
  const [date, updateDate] = useState(moment(new Date()).format(format))
  const [showEmpty, setShowEmpty] = useState(false)
  const [loader, setLoader] = useState(false)
  const Focused = useIsFocused()
  const [optionModal, setOptionModal] = useState(false)
  const [selectOption, setSelectOption] = useState({})
  const [optionHeight, setOptionHeight] = useState(0)
  const [refresh, setRefresh] = useState(false)
  const [deleteAlert, setDeleteAlert] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const ScrollRef = useRef()
  const [searchValueShow, setSearchValueShow] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [categoryType, setCategoryType] = useState([{id: 0, category: 'All'}])
  const [searchData, setSearchData] = useState([])
  const [catId, setCatId] = useState({id: 0, category: 'All'})
  const [page, setPage] = useState(1)

  useEffect(() => {
    if (Focused) {
      setPage(1)
      apiCall(1)
      ScrollRef?.current?.scrollTo({ x: 0, y: 0, animated: true })
    }
  }, [Focused]);

  useEffect(() => {
    let catType = []
    if(journalCateList?.length > 0){
      journalCateList.map(item => {
          catType.push({id: item.id, category: item.category})
      })
      if(catType.length > 0 && categoryType.length == 1){
        setCategoryType(categoryType.concat(catType))
      }else if(catType.length > 0 && categoryType.length > 1){
        catType.unshift({id: 0, category: 'All'})
        setCategoryType(catType)
      }
    }
  }, [journalCateList]);

  useEffect(() => {
    if (journalSearch != undefined && journalSearch != null) {
      setSearchData(journalSearch)
    }
  }, [journalSearch]);

  useEffect(() => {
    if (categoryType.length > 0) {
        setCatId(categoryType[0])
    }
  }, [categoryType])

  useEffect(() => {
    apiCategoryCall()
  }, []);

  useEffect(() => {
    console.disableYellowBox = true
    setRefresh(false)
    if (journalList?.length > 0 && !journalLoader && journalList != undefined) {
      page > 1 && catId.id == 0 ? setJournal(journal.concat(journalList)) : setJournal(journalList)
    }
    if (journalList == null && !journalLoader) {
      page > 1 ? null : setJournal([])
    }
  }, [journalList, journalLoader]);

  //api call
  const apiCall = (data) => {
    props.actions.getJournalList(actionTypes.GET_JOURNAL_LIST, {
      module: 'journal_user',
      action: data != undefined && data != null ?
       `ByUserId?user_id=${userId}&page=${data}` : `ByUserId?user_id=${userId}&page=${page}`,
      formData: {}
    });
  }

  //api call
  const GetCategoryCall = (data) => {
    props.actions.getJournalList(actionTypes.GET_JOURNAL_LIST, {
      module: 'journal_user',
      action: `ByUserId?user_id=${userId}&journalCategoryId=${data}`,
      formData: {}
    });
  }

  //api call
  const apiCategoryCall = () => {
    props.actions.getJournalCategoryList(actionTypes.GET_JOURNAL_CATEGORY_LIST, {
      module: 'journal_user',
      action: `get_jounal_category`,
      formData: {}
    });
  }

  //search api call
  const apiSearchCall = (data) => {
    props.actions.getJournalSearchList(actionTypes.GET_JOURNAL_SEARCH_LIST, {
      module: 'journal_user',
      action: `ByUserId?user_id=${userId}&search_text=${data}&page=1`,
      formData: {}
    });
  }

  // useEffect(() => {
  //   setShowEmpty(true)
  //   journal?.map((renderItem) => {
  //     if (moment(renderItem?.date).format(format) == date) {
  //       setShowEmpty(false)
  //     }
  //   })
  // }, [date, journal])

  const EditItem = (renderItem: any) => {
    // props.navigation.navigate('Zen.AddMemory', { EditItem: renderItem })
    props.navigation.navigate('Zen.JournalDetail', { EditItem: renderItem })
  }

  const renderItem = (renderItem: any, mainIndex: any) => {
      return(
      <View style={[styles.renderMainView, styles.commonShadow,
        {height: renderItem?.journal_images?.length > 0 ? 400 : 200, }]}>
        <LinearGradient colors={renderItem?.journal_images?.length > 0 ? 
          ['transparent', 'transparent', 'transparent'] : 
            ['#0087C4', '#00DFE7', '#0040C8']} start={{ x: 0.7, y: 0 }} 
          style={styles.flex100}>
          <View style={styles.renderTitleView}>
            <Pressable onPress={() => { EditItem(renderItem) }} style={styles.cardPress}>
              {renderItem?.journal_images?.length > 0 ? 
                  fileIcons(renderItem?.journal_images[0], styles.flex100) : 
                  null}
                <View style={[styles.cardView, renderItem?.journal_images?.length > 0 ?
                    styles.emptyCardView : {}]}>
                  <Text style={styles.cardTitle} numberOfLines={2}>{renderItem?.title}</Text>
                  <Text style={styles.cardDate} numberOfLines={2}>
                    {moment(renderItem?.date).format("MMM DD, YYYY").toLocaleUpperCase()}</Text>
                </View>
                <View style={[styles.heartView,{
                  backgroundColor:'transparent'
                }]}>
                    <Pressable onPress={(event) => {}} style={{padding:5, marginRight: 15}}>  
                      <Support width={21} height={18} />
                    </Pressable>
                    <Pressable onPress={(event) => {
                        let screenHeight = Dimensions.get('screen').height
                        setOptionModal(true)
                        setOptionHeight((screenHeight - event.nativeEvent.pageY > 180 ?
                          (event.nativeEvent.pageY + 10) : event.nativeEvent.pageY - 100))
                        setSelectOption(renderItem)
                    }} style={{padding:2}}>
                        <View style={styles.dots} />
                        <View style={styles.dots} />
                        <View style={styles.dots} />
                    </Pressable>
                </View>
            </Pressable>
          </View>
        </LinearGradient>
      </View>
    )
    //  : null
  }

  const fileIcons = (data, extraStyle = {}) => {
    let updateName = data?.image?.toLowerCase();
    return (
      <View style={[styles.itemImages,extraStyle]}>
        {updateName?.includes('pdf') ?
          <PDF width="100%" height="100%" /> :
          (updateName?.includes('jpg') || updateName?.includes('png') || updateName?.includes('heic') ||
            updateName?.includes('heif') || updateName?.includes('jpeg') || updateName?.includes('gif')) ?
            <FastImage
              style={[styles.itemImages,extraStyle]}
              source={{
                uri: data?.image,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.cover}
            /> :
            (updateName?.includes('msword') || updateName?.includes('doc'))
              ? <DOC width="100%" height="100%" /> :
              (updateName?.includes('ms-excel') || updateName?.includes('xls')) ?
                <XLS width="100%" height="100%" /> :
                <JPG width="100%" height="100%" />}
      </View>
    )
  }

  const DeleteItem = async () => {
    try {
      setLoader(true)
      const deleteApiCall = await request({
        method: 'delete', data: {
          module: 'journal_user',
          action: `remove_all_usr_journal_details?id=${selectOption?.id}`,
          formData: {},
        },
        isFormData: true
      });
      apiCall()
      setLoader(false)
    } catch (error) {
      console.log(error, 'Error');
      setLoader(false)
    }
  }

  const openFileView = (data) => {
    setLoader(true)
    const url = data?.image

    function getUrlExtension(url) {
      return url.split(/[#?]/)[0].split(".").pop().trim();
    }
    const extension = getUrlExtension(url);
    const localFile = `${RNFS.DocumentDirectoryPath}/temporaryfile.${extension}`;

    const options = {
      fromUrl: url,
      toFile: localFile,
    };
    RNFS.downloadFile(options)
      .promise.then(() => FileViewer.open(localFile, {
        onDismiss: () => setLoader(false)
      }))
      .then(() => {
        // success
        // setLoader(false)
      })
      .catch((error) => {
        setLoader(false)
        // error
      });
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.PRIMARY }}>
      <StatusBar barStyle='dark-content' backgroundColor={theme.PRIMARY} />
      <AppLoader visible={loader} textContent={translate("COMMONTEXT")["PLEASE_WAIT"]} />
      {!searchValueShow ? <AppHeader
        theme={theme}
        onBackPress={() => props.navigation.pop()}
        headerTitle={translate("COMMONTEXT")["MEMORIES"]}
        isRightComponent={true}
        isFirstIcon={true}
        rightFirstIcon={<View style={styles.searchIcon}>
          <Image source={require('../../../assets/images/eventFilter.png')} /></View>}
        rightFirstPress={() => {}}
        isFourthIcon={true}
        rightFourthIcon={<View style={styles.searchIcon}>
          <Search width={18} height={18} /></View>}
        rightFourthPress={() => {setSearchValueShow(!searchValueShow)}}
        isSecondIcon={true}
        rightSecondIcon={<PLUS width={36} height={36} />}
        rightSecondPress={() => {props.navigation.navigate('Zen.AddMemory')}}
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
            apiSearchCall(value)
            // let filterData = journal.filter(item => item?.title?.toLowerCase().includes(value?.toLowerCase()))
            // setSearchData(filterData)
            }}
          onSearch={() => {}}
          inputViewStyle={{flex:0.9}}
          inputStyle={{ flex:1 }}
        />}
      <View style={styles.container}>
        {searchValue.length > 0 ? null : <TabBar
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
              setPage(1)
              if(item.id == 0){
                apiCall(1)
              }else{
                GetCategoryCall(item.id)
              }
              }} />}
        <FlatList
          data={searchValue.length > 0 ? searchData : journal}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }: any) => renderItem(item, index)}
          keyExtractor={(item, index) => index.toString()}
          style={{marginTop: 5}}
          refreshControl={<RefreshControl
            colors={["#9Bd35A", "#689F38"]}
            refreshing={refresh}
            onRefresh={() => { setRefresh(true), apiCall() }} />}
          onEndReached={() => {
            if(catId.category == 'All')
            {
              apiCall(page + 1)
              setPage(page+ 1)
            }
          }}
          onEndReachedThreshold={0.5}
        ListEmptyComponent={() => {
          return <View style={[{ opacity: 1 }, styles.emptyView, styles.alingCenter]}>
            {!journalLoader ? <Text style={styles.monthText}>{translate("MEMORY")["START_ADD_MEMORY"]}</Text>: null}
          </View>
        }}
        />
        {/* {(showEmpty && !journalLoader) ? <View style={[{ opacity: 1 }, styles.emptyView, styles.alingCenter]}>
          <Text style={styles.monthText}>{translate("MEMORY")["START_ADD_MEMORY"]}</Text>
        </View> : null} */}
      </View>
      {/* <View style={styles.bottomButtonView}>
        <Pressable onPress={() => {
          props.navigation.navigate('Zen.AddMemory')
        }} style={styles.addMemoryButton}>
          <Text style={[styles.renderTitle, { fontSize: 16, color: theme.PRIMARY }]}>{translate("MEMORY")["ADD_MEMORY"]}</Text>
        </Pressable>
      </View> */}
      {/* Option Modal */}
      <Modal
        transparent={true}
        visible={optionModal}
        onRequestClose={() => {
        }}
      >
        <Pressable style={{ flex: 1 }}
          onPress={() => { setOptionModal(false) }}>
          <View style={[styles.optionView, { top: optionHeight }]}>
            <Pressable style={styles.optionButton} onPress={() => {
              setOptionModal(false)
              setTimeout(() => {
                props.navigation.navigate('Zen.AddMemory', { EditItem: selectOption })
              }, 100);
            }}>
              <AntDesign name={"edit"} color={theme.DARK_GRAY} size={18} />
              <Text style={styles.optionText}>{translate("COMMONTEXT")["EDIT"]}</Text>
            </Pressable>
            <Pressable style={[styles.optionButton, { marginBottom: 0 }]} onPress={() => {
              setOptionModal(false)
              setShowAlert(true)
              setDeleteAlert(true)
            }}>
              <AntDesign name={"delete"} color={theme.DARK_GRAY} size={18} />
              <Text style={styles.optionText}>{translate("COMMONTEXT")["DELETE"]}</Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
      <Alert
        show={showAlert}
        title={deleteAlert ? 'Delete' : "Sorry !"}
        message={deleteAlert ? 'Are you sure you want to Delete' : ''}
        closeOnTouchOutside={{ val: true, setShowAlert: setShowAlert }}
        closeOnHardwareBackPress={true}
        showConfirmButton={true}
        confirmText={"Ok"}
        cancelText={"Cancel"}
        showCancelButton={deleteAlert}
        onConfirmPressed={() => {
          setShowAlert(false)
          if (deleteAlert) {
            DeleteItem()
            setDeleteAlert(false)
          }
        }}
        cancelButtonStyle={{ marginRight: scale(5) }}
        confirmButtonStyle={{ marginLeft: scale(5) }}
        onCancelPressed={() => {
          setShowAlert(false)
          setDeleteAlert(false)
        }}
      />
    </SafeAreaView>
  );
};
export default withTheme(Layout);