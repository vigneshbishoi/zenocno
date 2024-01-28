/**
 * Landing layout page
 * @Author: Anand R
 * @Date: Wed Nov 17 2021 19:22:35 GMT+0530 (India Standard Time)
 * @Desc: View part for component
 */
import React, { useCallback, useEffect, useState } from 'react';
import style from './Style';
import { View, SafeAreaView, Pressable, FlatList, Text, Dimensions, TextInput, Share, Platform, PermissionsAndroid, RefreshControl } from 'react-native';
import { withTheme } from '../../../utils/ThemeProvider';
import { useSelector } from "react-redux";
import AntDesign from 'react-native-vector-icons/AntDesign'
import Search from '../../../assets/images/search.svg';
import Filter from '../../../assets/images/filter_.svg';
import PDF from '../../../assets/images/pdf.svg';
import JPG from '../../../assets/images/jpg.svg';
import DOC from '../../../assets/images/doc.svg';
import XLS from '../../../assets/images/xls.svg';
import TXT from '../../../assets/images/Text.svg';
import Delete from '../../../assets/images/delete.svg';
import Download from '../../../assets/images/download.svg';
import ShareIcon from '../../../assets/images/share.svg';
import Close from '../../../assets/images/close.svg';
import ReportFilter from '../../../components/ReportFilter';
import ReportSearch from '../../../components/ReportSearch';
import Modal from 'react-native-modal'
import actionTypes from '../../../store/actions/types';
import RNFetchBlob from 'rn-fetch-blob';
import { useIsFocused } from '@react-navigation/native';
import AppLoader from '../../../components/Plugins/AppLoader';
import request from '../../../services/client';
import RNFS from "react-native-fs";
import Alert from "../../../components/AlertScreen/Index"
import FileViewer from "react-native-file-viewer";
import moment from 'moment';
import CONFIG from '../../../config/app-config';
import { scale } from 'react-native-size-matters';
import translate from "../../../utils/Text";

interface IProps {
  theme: any;
  navigation: any;
  store: any
  actions: any
}

const Report = (props: IProps) => {
  const styles = style(props.theme);
  const theme = props.theme
  const userId = useSelector((state) => state.loginReducer.userData?.data?.data?.id);
  const userName = useSelector(state => state.loginReducer.userData)
  const MyReports = useSelector(state => state.myReportsReducer?.data)
  const MyCategory = useSelector(state => state.myReportsReducer?.category)
  const MyFilter = useSelector(state => state.myReportsReducer)
  const [filterShow, setFilterShow] = useState(false)
  const [searchShow, setSearchShow] = useState(false)
  const [optionModal, setOptionModal] = useState(false)
  const [selectOption, setSelectOption] = useState({})
  const [optionHeight, setOptionHeight] = useState(0)
  const [search, setSearch] = useState('')
  const [reportList, setReportList] = useState([])
  const [loader, setLoader] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [filter, setFilter] = useState(false)
  const [category, setCategory] = useState(null)
  const Focused = useIsFocused()
  const height = Dimensions.get('window').height;
  const widht = Dimensions.get('window').width;
  const [showErrorMsg, setShowErrorMsg] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  const [deleteAlert, setDeleteAlert] = useState(false)

  useEffect(() => {
    console.disableYellowBox = true
    if (Focused) {
      apiCall()
      // categoryApi()
    }
  }, [Focused])

  useEffect(() => {
    categoryApi()
  }, [])

  useEffect(() => {
    if (MyReports != undefined && MyReports?.length > 0 && !MyFilter?.loader) {
      setReportList(MyReports?.sort((a, b) => b?.reportDate?.localeCompare(a?.reportDate)))
    }
    if (MyReports == null && !MyFilter?.loader) {
      setReportList([])
    }
    setLoader(false)
    setRefresh(false)
  }, [MyReports, MyFilter])

  //api call
  const apiCall = () => {
    props.actions.getMyReportsList(actionTypes.GET_MY_REPORTS_LIST, {
      module: 'document_user',
      action: `ByUserId?user_id=${userId}`,
      formData: {}
    });
  }

  //Category filter api call
  const apiFilterCall = (ID) => {
    let CheckFilter = ID.map((data) => {
      return `&cat_id=${data}`
    })
    props.actions.getReportFilterList(actionTypes.GET_REPORTS_FILTER_LIST, {
      module: 'document_user',
      action: `ByUserIdCatId?user_id=${userId}${CheckFilter?.join('')}`,
      formData: {}
    });
  }

  //Category api call
  const categoryApi = () => {
    props.actions.getReportCategoryList(actionTypes.GET_REPORTS_CATEGORY_LIST, {
      module: 'document_category',
      action: `getAll`,
      formData: {}
    });
  }

  const checkPermission = async () => {
    if (Platform.OS === 'ios') {
      if (selectOption != {}) {
        selectOption?.document_files?.map((data) => {
          downloadFile(data?.url);
        })
      }
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message:
              'Application needs access to your storage to download File',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          if (selectOption != {}) {
            selectOption?.document_files?.map((data, index) => {
              downloadFile(data?.url, index);
            })
          }
          console.log('Storage Permission Granted.');
        } else {
          // If permission denied then show alert
        }
      } catch (err) {
        // To handle permission related exception
      }
    }
  };

  const downloadFile = (item, index) => {

    let date = new Date();
    let FILE_URL = item;
    let file_ext = getFileExtention(FILE_URL);

    file_ext = '.' + file_ext[0];

    const { config, fs } = RNFetchBlob;
    let RootDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        path:
          RootDir +
          '/file_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          file_ext,
        description: 'downloading file...',
        notification: true,
        useDownloadManager: true,
      },
    };
    config(options)
      .fetch('GET', FILE_URL)
      .then(res => {
        // Alert after successful downloading
        if ((selectOption?.document_files?.length - 1) == index) {
          setShowAlert(true)
          setShowErrorMsg('Success')
        }
      });
  };

  const getFileExtention = fileUrl => {
    // To get the file extension
    return /[.]/.exec(fileUrl) ?
      /[^.]+$/.exec(fileUrl) : undefined;
  };

  const renderItem = (item: any, index: any) => {
    let CategoryUpdate = ''
    if (MyCategory?.length > 0) {
      MyCategory.filter((data) => {
        if (data.id == item?.category) {
          CategoryUpdate = data?.category
        }
      })
    }
    return (
      <>
        {index == 0 ? null : <View style={styles.divider} />}
        <View style={[styles.renderView, {}]}>
          <Pressable onPress={() => {
            item?.document_files.length > 0 ?
              openFileView(item) : props.navigation.navigate('Zen.ReportDetail', { Item: item })
          }}>
            {fileIcons(item)}
          </Pressable>
          <Pressable onPress={() => { props.navigation.navigate('Zen.ReportDetail', { Item: item }) }}
            style={styles.renderTextView}>
            <View style={styles.renderdivider}>
              <Text numberOfLines={1} style={styles.renderTitle}>
                {item.title}</Text>
              <Pressable style={{ paddingHorizontal: 5, marginRight: -5 }} onPress={(event) => {
                let screenHeight = Dimensions.get('screen').height
                setOptionModal(true)
                setOptionHeight((screenHeight - event.nativeEvent.pageY > scale(270) ?
                  event.nativeEvent.pageY : event.nativeEvent.pageY - scale(item?.document_files.length > 0 ?
                    185 : 165)))
                setSelectOption(item)
              }}>
                <AntDesign name={"ellipsis1"} size={24} />
              </Pressable>
            </View>
            <View style={styles.renderdivider}>
              {CategoryUpdate != '' ?
                <Text numberOfLines={1} style={styles.renderCategory}>{CategoryUpdate}</Text> :
                <Text numberOfLines={1} style={[styles.renderEmptyCategory]}> </Text>}
              <Text numberOfLines={1} style={styles.renderDate}>{moment(item?.reportDate).format('DD MMM YYYY')}</Text>
            </View>
          </Pressable>
        </View>
      </>
    )
  }

  const openFileView = (data) => {
    setLoader(true)
    const url = data?.document_files[0]?.url

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

  const fileIcons = (data) => {
    let updateName = data?.document_files[0]?.url?.toLowerCase();
    return (
      updateName?.includes('pdf') ?
        <PDF width={height * 0.05} height={height * 0.055} /> :
        (updateName?.includes('jpg') || updateName?.includes('png') || updateName?.includes('heic') ||
          updateName?.includes('heif') || updateName?.includes('jpeg') || updateName?.includes('gif')) ?
          <JPG width={height * 0.05} height={height * 0.055} /> :
          (updateName?.includes('msword') || updateName?.includes('doc')) ?
            <DOC width={height * 0.05} height={height * 0.055} /> :
            (updateName?.includes('ms-excel') || updateName?.includes('xls')) ?
              <XLS width={height * 0.05} height={height * 0.055} /> :
              <TXT width={height * 0.05} height={height * 0.055} />
    )
  }

  const DeleteItem = async () => {
    try {
      setLoader(true)
      const deleteApiCall = await request({
        method: 'delete', data: {
          module: 'document_user',
          action: `delete?doc_id=${selectOption?.id}`,
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

  const EditItem = (renderItem: any) => {
    props.navigation.navigate('Zen.AddReports', { EditItem: renderItem })
  }

  let UpdateLink = selectOption != {} && selectOption != null && selectOption?.document_files?.map((data) => {
    return `${data.url.replace(",", " ")}\n`
  })

  let ShareInfo = `Hi. I'm sharing my report with you. Please find details as below:

  Title: ${selectOption?.title}
  Category: ${MyCategory?.length > 0 ?
      MyCategory[selectOption?.category - 1]?.category : 'Category label'}
  Report date: ${moment(selectOption?.reportDate).format('DD MMM YYYY')}
  Description: ${selectOption?.description}
  File links: ${UpdateLink?.join("")}  

  I'm using the Zenonco Care App to help me manage my cancer treatment journey. It can be downloaded from here:
  • Android: ${CONFIG.PLAY_STORE}
  • iOS: ${CONFIG.APP_STORE}`

  return (
    <>
      <SafeAreaView style={styles.container}>
        <AppLoader visible={loader} textContent={translate("COMMONTEXT")["PLEASE_WAIT"]} />
        <View style={styles.header}>
          <Pressable style={[styles.arrowButton, { flex: searchShow ? 0 : 1 }]}
            onPress={() => { props.navigation.goBack() }}>
            <AntDesign name={"left"} color={theme.DARK_GRAY} size={18} />
          </Pressable>
          {searchShow ?
            <View style={styles.serachView}>
              <Search width={widht * 0.04} height={widht * 0.04} />
              <TextInput style={styles.textInput}
                value={search}
                placeholder={translate("COMMONTEXT")["SEARCH"]}
                autoFocus={true}
                onChangeText={(text) => {
                  setSearch(text)
                  const UpdateArr = MyReports?.filter(function (item: any) {
                    let check = item?.title?.toLowerCase();
                    if (check.includes(text.toLowerCase())) {
                      return item
                    }
                  })
                  setReportList(UpdateArr)
                }} />
              <Pressable style={styles.closeIcon}
                onPress={() => {
                  if (search == '') { setSearchShow(false) }
                  else { setSearch(''), setReportList(MyReports != null ? MyReports : []) }
                }}>
                <Close width={widht * 0.04} height={widht * 0.04} />
              </Pressable>
            </View> : <>
              <Text style={[styles.headerText]}>{translate("DRAWER")["MEDICAL_RECORDS"]}</Text>
              <View style={[styles.headerRightView, styles.container]}>
                <Pressable style={styles.arrowButton}
                  onPress={() => { setSearchShow(true) }}>
                  <Search width={20} height={20} />
                </Pressable>
                <Pressable style={styles.filterIcon}
                  onPress={() => { setFilterShow(true) }}>
                  <Filter />
                </Pressable>
              </View>
            </>}
        </View>
        <View style={styles.divider} />
        <View style={styles.container}>
          <FlatList
            data={reportList}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }: any) => renderItem(item, index)}
            keyExtractor={(item, index) => index.toString()}
            extraData={reportList}
            refreshControl={<RefreshControl
              colors={["#9Bd35A", "#689F38"]}
              refreshing={refresh}
              onRefresh={() => { setRefresh(true), setFilter(false), apiCall() }} />}
            ListEmptyComponent={() => {
              return (!MyFilter?.loader) ? <View style={styles.emptyList}>
                <Text style={styles.emptyListMsg}>{search == '' ? 'Start adding your medical reports!' :
                  'No matching results'}</Text>
              </View> : null
            }}
          />
          <Pressable onPress={() => { props.navigation.navigate('Zen.AddReports') }}
            style={styles.saveButton}>
            <Text style={styles.addReportText}>{translate("COMMONTEXT")["ADD_REPORT"]}</Text>
          </Pressable>
        </View>
        {/* Search Modal */}
        {/* <ReportSearch
        visible={searchShow}
        theme={theme}
        close={() => { setSearchShow(false) }}
        done={(data) => { setSearchShow(false) }} /> */}
        {/* Category filter Modal */}
        <ReportFilter
          visible={filterShow}
          theme={theme}
          category={MyCategory}
          close={() => { setFilterShow(false) }}
          done={(data) => {
            setFilterShow(false)
            console.log('data', data);

            if (data?.length > 0) {
              setFilter(true)
              setCategory(data), apiFilterCall(data)
            } else {
              setFilter(false), apiCall()
            }
          }} />
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
                  EditItem(selectOption)
                }, 100);
              }}>
                <AntDesign name={"edit"} color={theme.DARK_GRAY} size={18} />
                <Text style={styles.optionText}>{translate("COMMONTEXT")["EDIT"]}</Text>
              </Pressable>
              {selectOption?.document_files?.length > 0 &&
                <Pressable style={styles.optionButton} onPress={() => {
                  setOptionModal(false)
                  setTimeout(() => {
                    checkPermission()
                  }, 100);
                }}>
                  <AntDesign name={"download"} color={theme.DARK_GRAY} size={18} />
                  <Text style={styles.optionText}>{translate("COMMONTEXT")["DOWNLOAD"]}</Text>
                </Pressable>}
              <Pressable style={styles.optionButton} onPress={() => {
                setOptionModal(false)
                setTimeout(async () => {
                  await Share.share({
                    url: selectOption?.document_files[0]?.url,
                    message: ShareInfo
                  })
                }, 100);
              }}>
                <ShareIcon width={16} height={16} />
                <Text style={styles.optionText}>{translate("COMMONTEXT")["SHARE"]}</Text>
              </Pressable>
              <Pressable style={[styles.optionButton, { marginBottom: 0 }]} onPress={() => {
                setDeleteAlert(true)
                setShowAlert(true)
                setOptionModal(false)
              }}>
                <AntDesign name={"delete"} color={theme.DARK_GRAY} size={18} />
                <Text style={styles.optionText}>{translate("COMMONTEXT")["DELETE"]}</Text>
              </Pressable>
            </View>
          </Pressable>
        </Modal>
      </SafeAreaView>
      <Alert
        show={showAlert}
        title={deleteAlert ? 'Delete' : showErrorMsg == 'Success' ? "Success" : "Sorry !"}
        message={deleteAlert ? 'Are you sure you want to Delete' :
          showErrorMsg == 'Success' ? 'Your report has been downloaded successfully' : showErrorMsg}
        closeOnTouchOutside={{ val: true, setShowAlert: setShowAlert }}
        closeOnHardwareBackPress={true}
        showConfirmButton={true}
        confirmText={"Ok"}
        cancelText={"Cancel"}
        showCancelButton={deleteAlert}
        onConfirmPressed={() => {
          setShowAlert(false)
          setTimeout(() => {
            setShowErrorMsg('')
          }, 500);
          if (deleteAlert) {
            DeleteItem()
            setDeleteAlert(false)
          }
        }}
        cancelButtonStyle={{ marginRight: scale(5) }}
        confirmButtonStyle={{ marginLeft: scale(5) }}
        onCancelPressed={() => {
          setShowAlert(false)
          setTimeout(() => {
            setShowErrorMsg('')
          }, 500);
          setDeleteAlert(false)
        }}
      />
    </>
  );
};
export default withTheme(Report);


