/**
 * Landing layout page
 * @Author: Anand R
 * @Date: Wed Nov 17 2021 19:22:35 GMT+0530 (India Standard Time)
 * @Desc: View part for component
 */
import React, { useCallback, useEffect, useState } from 'react';
import style from './Style';
import { View, SafeAreaView, Pressable, FlatList, Text, Dimensions, TextInput, Share, Platform, PermissionsAndroid, RefreshControl, ScrollView } from 'react-native';
import { withTheme } from '../../../utils/ThemeProvider';
import translate from "../../../utils/Text"
import { useSelector } from "react-redux";
import AntDesign from 'react-native-vector-icons/AntDesign'
import Search from '../../../assets/images/search.svg';
import Filter from '../../../assets/images/filter_.svg';
import PDF from '../../../assets/images/pdf.svg';
import JPG from '../../../assets/images/jpg.svg';
import DOC from '../../../assets/images/doc.svg';
import XLS from '../../../assets/images/xls.svg';
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
import TXT from '../../../assets/images/Text.svg';
import CONFIG from '../../../config/app-config';
import FastImage from 'react-native-fast-image';
import { scale } from 'react-native-size-matters';


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
  const MyFilter = useSelector(state => state.myReportsReducer?.filterData)
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
  const [EditItem, setEditItem] = useState(null)
  const [deleteAlert, setDeleteAlert] = useState(false)

  useEffect(() => {
    if (props?.route?.params?.Item != undefined) {
      setEditItem(props?.route?.params?.Item)
    }
  }, [])

  useEffect(() => {
    if (MyReports != undefined) {
      setReportList(MyReports)
    }
    setLoader(false)
    setRefresh(false)
  }, [MyReports])

  //api call
  const apiCall = () => {
    props.actions.getMyReportsList(actionTypes.GET_MY_REPORTS_LIST, {
      module: 'document_user',
      action: `ByUserId?user_id=${userId}`,
      formData: {}
    });
  }

  const checkPermission = async () => {
    if (Platform.OS === 'ios') {
      if (EditItem?.document_files?.length > 0) {
        EditItem?.document_files?.map((data, index) => {
          downloadFile(data?.url, index);
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
          console.log('EditItem?.document_files', EditItem?.document_files);

          if (EditItem?.document_files?.length > 0) {
            EditItem?.document_files?.map((data, index) => {
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
        if ((EditItem?.document_files?.length - 1) == index) {
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

  const openFileView = (data) => {
    setLoader(true)
    const url = data

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

  const fileIconsUrl = (data) => {
    let updateName = data?.url?.toLowerCase();
    // console.log('KKKKK', updateName);
    return (
      updateName?.includes('pdf') ?
        <PDF width="100%" height="100%" /> :
        (updateName?.includes('jpg') || updateName?.includes('png') || updateName?.includes('heic') ||
          updateName?.includes('heif') || updateName?.includes('jpeg') || updateName?.includes('gif')) ?
          <FastImage
            style={[styles.iconStyle, {}]}
            source={{
              uri: updateName,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
          /> :
          (updateName?.includes('msword') || updateName?.includes('doc'))
            ? <DOC width="100%" height="100%" /> :
            (updateName?.includes('ms-excel') || updateName?.includes('xls')) ?
              <XLS width="100%" height="100%" /> :
              <DOC width="100%" height="100%" />
    )
  }

  let ShareInfo = `Hi. I'm sharing my report with you. Please find details as below:

  Title: ${EditItem?.title}
  Category: ${MyCategory?.length > 0 ?
      MyCategory[EditItem?.category - 1]?.category : 'Category label'}
  Report date: ${moment(EditItem?.reportDate).format('DD MMM YYYY')}
  Description: ${EditItem?.description}

  I'm using the Zenonco Care App to help me manage my cancer treatment journey. It can be downloaded from here:
  • Android: ${CONFIG.PLAY_STORE}
  • iOS: ${CONFIG.APP_STORE}`

  const DeleteItem = async () => {
    try {
      setLoader(true)
      const deleteApiCall = await request({
        method: 'delete', data: {
          module: 'document_user',
          action: `delete?doc_id=${EditItem?.id}`,
          formData: {},
        },
        isFormData: true
      });
      apiCall()
      setLoader(false)
      props.navigation.goBack()
    } catch (error) {
      console.log(error, 'Error');
      setLoader(false)
    }
  }

  let CategoryUpdate = ''
  if (MyCategory?.length > 0) {
    MyCategory.filter((data) => {
      if (data.id == EditItem?.category) {
        CategoryUpdate = data?.category
      }
    })
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <AppLoader visible={loader} textContent={translate("COMMONTEXT")["PLEASE_WAIT"]} />
        <View style={styles.header}>
          <Pressable style={[styles.arrowButton, { position: 'absolute', zIndex: 99 }]}
            onPress={() => { props.navigation.goBack() }}>
            <AntDesign name={"left"} color={theme.DARK_GRAY} size={18} />
          </Pressable>
          <Text style={[styles.headerText, styles.container]}>{translate("COMMONTEXT")["REPORT_DETAILS"]}</Text>
          <Pressable style={styles.dotButton} onPress={(event) => {
            let screenHeight = Dimensions.get('screen').height
            setOptionModal(true)
            setOptionHeight((screenHeight - event.nativeEvent.pageY > 150 ?
              event.nativeEvent.pageY : event.nativeEvent.pageY - 180))
            setSelectOption(EditItem)
          }}>
            <AntDesign name={"ellipsis1"} size={28} />
          </Pressable>
        </View>
        <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={[styles.renderView, {}]}>
              <Pressable onPress={() => { EditItem?.document_files.length > 0 ? openFileView(EditItem?.document_files[0]?.url) : null }}>
                {EditItem && fileIcons(EditItem)}
              </Pressable>
              <View style={styles.renderTextView}>
                <View style={styles.renderdivider}>
                  <Text numberOfLines={1} style={styles.renderTitle}>
                    {EditItem?.title}</Text>
                </View>
                <View style={styles.renderdivider}>
                  {CategoryUpdate != '' ? <Text numberOfLines={1} style={styles.renderCategory}>{CategoryUpdate}</Text> :
                    <Text numberOfLines={1} style={styles.renderEmptyCategory}></Text>}
                  <Text numberOfLines={1} style={styles.renderDate}>{moment(EditItem?.reportDate).format('DD MMM YYYY')}</Text>
                </View>
              </View>
            </View>
            <Text style={styles.desc}>{EditItem?.description}</Text>
            <View style={styles.extraPadding}>
              {EditItem?.document_files.map((data, index) => {
                return (
                  <View style={[, styles.renderMainView, {
                    marginTop: 12
                  }]}>
                    <Pressable style={styles.iconStyle}
                      onPress={() => { openFileView(data?.url) }}>
                      {fileIconsUrl(data)}
                      <Pressable style={styles.fileNameView} onPress={() => { openFileView(data?.url) }}>
                        <Text numberOfLines={1}
                          style={styles.renderText}>{data?.fileName}</Text>
                      </Pressable>
                    </Pressable>
                  </View>
                )
              })}
            </View>
          </ScrollView>
        </View>
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
                  props.navigation.navigate('Zen.AddReports', {
                    EditItem: EditItem,
                    GoBack: (data) => {
                      if (data != undefined && data != null) {
                        if (data == 'delete') {
                          props.navigation.goBack()
                        } else {
                          setEditItem(data)
                        }
                      }
                    }
                  })
                }, 100);
              }}>
                <AntDesign name={"edit"} color={theme.DARK_GRAY} size={18} />
                <Text style={styles.optionText}>{translate("COMMONTEXT")["EDIT"]}</Text>
              </Pressable>
              {EditItem?.document_files?.length > 0 &&
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
                    url: EditItem?.document_files[0]?.url,
                    message: ShareInfo
                  })
                }, 100);
              }}>
                <ShareIcon width={16} height={16} />
                <Text style={styles.optionText}>{translate("COMMONTEXT")["SHARE"]}</Text>
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


