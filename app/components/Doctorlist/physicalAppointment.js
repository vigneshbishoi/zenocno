import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Image, Share, Text, Pressable, Platform, Dimensions, FlatList, LayoutAnimation } from 'react-native';
import { FONTFAMILY } from '../../config/font-config';
import translate from "../../utils/Text"
import Back from '../../assets/images/Back.svg'
import DoctorsListItem from './doctorsListItem.js'
import Share1 from '../../assets/images/share.svg'
import ZenOnco from '../../assets/images/zenOnco.svg'
import Info from '../../assets/images/info.svg'
import OnlineVideo from '../../assets/images/onlineVideo.svg'
import CheckCircle from '../../assets/images/checkCircle.svg'
import Wishlist from '../../assets/images/Wishlist.svg'
import CheckMarkComment from '../../assets/images/checkMarkComment.svg'
import appConfig from '../../config/app-config';
import DoctorCardInfo from './doctorCardInfo';
import OnlineConsultation from '../../components/OnlineConsultation';
import TimeSlot from './timeSlot';
import NeedHelp from '../NeedHelp';
import ReviewCard from '../ReviewCard';
import { useSelector } from 'react-redux';

const width = Dimensions.get('window').width;

const PhysicalAppointment = ((props) => {
    const { item, theme, navigation, mainItem, slots, bookSlot, dates, getDoctoDetail, onPressBookMark,userId, isFromCancel } = props
    const styles = modalStyles(theme);
    const [selectAvailableDate, setSelectAvailbleDate] = useState('')
    const [selectAvailableTime, setSelectAvailbleTime] = useState('')
    const [selectedDate, setSelectDate] = useState('')
    const [textShown, setTextShown] = useState(false);
    const [showMoreButton, setShowMoreButton] = useState(false);
    const [numLines, setNumLines] = useState(undefined);
    const [valueChange, setValueChange] = useState(false)
    const [specializationExpanded, setSpecializationExpanded] = useState(false)
    const [educationsExpanded, setEducationsExpanded] = useState(false)
    const [experienceExpanded, setExperienceExpanded] = useState(false)
    const [membershipExpanded, setMembershipExpanded] = useState(false)
    const [cancerWarriorExpanded, setCancerWarriorExpanded] = useState(false)
    const [boostImmunityExpanded, setBoostImmunityExpanded] = useState(false)
    const doctorReview =
    useSelector((state) => state?.appointmentReducer?.docotorReview?.length > 0 ?
        state?.appointmentReducer?.docotorReview[0] : []) || [];


    useEffect(() => {
        setSelectAvailbleDate(dates?.length > 0 ? dates[0] : '')
        // setSelectAvailbleTime(slots?.length > 0 ? slots[0] : '')
        setSelectDate(dates?.length > 0 ? dates[0]?.date : '')
    }, [props.dates])

    useEffect(() => {
        setNumLines(textShown ? undefined : 3);
    }, [textShown]);
    const toggleTextShown = () => {
        setTextShown(!textShown);
    };
    const onTextLayout = useCallback(
        (e) => {
            if (e.nativeEvent.lines.length > 3 && !textShown) {
                setShowMoreButton(true);
                setNumLines(3);
            }
        },
        [textShown],
    );
    const updateBookMark = () => {
        getDoctoDetail()
      }
    const handleReport = () => {
        getDoctoDetail()
    }
    const onShare = async (item: any) => {
        let link = Platform.OS == 'ios' ? appConfig.APP_STORE : appConfig.PLAY_STORE
        let message = 'I came across this: \n' + item.blogTitle + '\n\n' + 'You can find more on this Cancer Care App:\n' + link
        try {
          const result = await Share.share({
            message: message,
          });
        } catch (error) {
        }
    };
    const updateBookMark1 = (item: any) => {
        if (item.cancer_healing_story_bookmarks.length > 0) {
            item.cancer_healing_story_bookmarks = []
        } else {
            item.cancer_healing_story_bookmarks = [{ userId: userId }]
        }
        setValueChange(!valueChange)
    }
    const renderBlogArticleItem = ({ item, index }) => {
        return (
            <Pressable style={[styles.blogItemContainer, styles.dropShadow]} onPress={() => {
                props.navigation.navigate('Zen.CommunityComment', {
                    id: item.id, item: item,
                     updateSupport: () => {},
                     updateComment: () => {},
                     handleReport: handleReport,
                     updateBookMark: updateBookMark
                  })
            }}>
                <Image style={styles.blogImage} source={{ uri: item?.blogImage }} />
                <View style={styles.blogDesVw} >
                    <Text style={[styles.commonItemText, { fontFamily: FONTFAMILY.POPPINS_MEDIUM }]} numberOfLines={2} >{item?.blogTitle}</Text>
                    <Text style={[styles.tabText, { color: theme.SUB_TITLE, marginVertical: 7 }]} numberOfLines={1} >{item.blogDate}</Text>
                    <View style={styles.blogBottomVw} >
                        <Image style={styles.zenOncoImage} source={{ uri: item?.author_detail?.user_details[0].authorImage }} />
                        <View style={styles.zenOncoTextContainer}>
                            <Text style={styles.zenOncoTitle} numberOfLines={1} >{item?.author_detail?.user_details[0].authorName}</Text>
                            <Text style={styles.viewerText} numberOfLines={1} >{item?.viewCount} View</Text>
                        </View>
                        <Pressable style={styles.shareVw} onPress={() => onShare(item)}>
                            <Share1 width={16} height={20} />
                        </Pressable>
                        <Pressable style={styles.bookmarkVw} onPress={() => {
                            updateBookMark1(item) 
                            onPressBookMark(item.id)
                        }}>
                            <Image source={item?.cancer_healing_story_bookmarks?.length > 0 ? require('../../assets/images/bookmark1.png') : require('../../assets/images/bookmark.png')} />
                        </Pressable>
                    </View>
                </View>
            </Pressable>
        );
    }


    return (
            <View>
                <DoctorCardInfo
                    hasDoctorsDetails
                    item={mainItem}
                    theme={theme}
                    navigation={props.navigation}/>

                <View style={styles.fulfillContainer} >
                     <Text style={styles.fulfilledText} >{translate("DOCTORSLIST")["FULFILLED_BY"]}</Text>
                     <View style={styles.fulfillSubContainer}>
                        <ZenOnco/>
                        <View style={styles.fixContainer}>
                            <Text style={styles.assistedText}>{translate("DOCTORSLIST")["ASSISTANCE_EXPERIEANCE"]}   <Info /></Text> 
                        </View>
                     </View>
                    <View style={styles.assistanceContainer}>
                      <CheckCircle/><Text style={styles.assistedSubText}>{translate("DOCTORSLIST")["DEDICATED_PERSONAL_ASSISTANCE"]}</Text>
                     </View>
                    <View style={styles.assistanceContainer}>
                      <CheckCircle/><Text style={styles.assistedSubText}>{translate("DOCTORSLIST")["ASSISTANCE_INSURANCE_CLAIM"]}</Text>
                     </View>
                    <View style={styles.assistanceContainer}>
                      <CheckCircle/><Text style={styles.assistedSubText}>{translate("DOCTORSLIST")["POST_SURGERY_CARE_AND_GUIDANCE"]}</Text>
                     </View>
                     <View style={styles.interestedContainer}>
                        {/* <Text style={styles.fulfilledText}>{translate("DOCTORSLIST")["DOCTORE_INTERESTED_LEARN_MORE"]} </Text> */}
                     </View>
                   </View>
                <OnlineConsultation />
                <View style={styles.timeSlotContainer}>
                    <TimeSlot 
                        hasViewAllSlot
                        dates={dates} 
                        theme={theme} 
                        slots={slots} 
                        selectAvailableDate={selectAvailableDate}
                        selectAvailableTime={selectAvailableTime}
                        selectedDate={selectedDate}
                        setSelectAvailbleDate={setSelectAvailbleDate}
                        setSelectAvailbleTime={setSelectAvailbleTime}
                        setSelectDate={setSelectDate}
                        bookSlot={bookSlot}
                        onSelectSlot={(selectedTime)=>{
                            navigation.navigate('Zen.VideoAppointment',{item: mainItem, date: selectAvailableDate, time: selectedTime, isFromCancel: isFromCancel})
                        }}
                    />
                </View>
                <View style={styles.needHelpContainer}>
                    <View style={styles.needHelpSubContainer}>
                        <NeedHelp navigation={navigation} />
                    </View>
                </View>
                <View style={styles.highlyRecomndedContainer}>
                    <Text style={styles.highlyRecomndedTitle}>{translate("DOCTORSLIST")["HIGHLY_RECOMNDED_FOR"]} </Text>
                    <View style={styles.highlyRecomndedSubContainer}>
                        <View style={{marginTop:3}}>
                            <Wishlist />
                        </View>
                        <View>
                            <Text style={styles.doctorFrienTitle}>{translate("DOCTORSLIST")["DOCTOR_FRIENDLINES"]} </Text>
                            <Text style={styles.doctorFrienSubTitle}>{(doctorReview?.review_avg * 100 / 5).toFixed(0)}%{translate("DOCTORSLIST")["PATIENTS_AND_DOCTORE_FRIENDLY"]} </Text>
                        </View>
                    </View>
                    <View style={styles.highlyRecomndedSubContainer}>
                        <View style={{marginTop:3}}>
                            <CheckMarkComment />
                        </View>
                        <View>
                            <Text style={styles.doctorFrienTitle}>{translate("DOCTORSLIST")["DETAILED_TREATMENT_EXPLANATION"]} </Text>
                            <Text style={styles.doctorFrienSubTitle}>{(doctorReview?.review_avg * 100 / 5).toFixed(0)}%{translate("DOCTORSLIST")["PATIENTS_RECOMMEND_DECTOR"]} </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.borderBottom} />

                <ReviewCard item={mainItem} />

                <View style={styles.borderBottom} />
                {item?.doctor_education?.length > 0 && item?.doctor_education[0]?.services != null && item?.doctor_education[0]?.services?.length > 0 &&
                <>
                <View style={styles.highlyRecomndedContainer}>
                    <Text style={styles.highlyRecomndedTitle}>{translate("DOCTORSLIST")["SERVICE_BY"]} {item?.doctor_detail?.length > 0 ? item?.doctor_detail[0]?.doctorName : ''}</Text>
                    <View style={styles.serviceContainer}>
                        <View>
                            <Text style={styles.serviceText}>{item?.doctor_education[0]?.services != null && item?.doctor_education[0]?.services}</Text>
                        </View>
                    </View>
              
                </View>
            <View style={styles.borderBottom} />
            </>
            }

            <View style={{marginBottom:10}}>
                <Text style={[styles.doctornameText, styles.extraStyle]} numberOfLines={1} >{translate("COMMONTEXT")["ABOUT"]} {item?.doctor_detail?.length > 0 ? item?.doctor_detail[0]?.doctorName : ''}</Text>
                <Text onTextLayout={onTextLayout} style={[styles.commonItemText, { marginHorizontal: 20, color: theme.SUB_TITLE, lineHeight: 18 }]} numberOfLines={numLines}>{item?.doctor_desc?.length > 0 ? item?.doctor_desc[0]?.description : ''}</Text>
                {showMoreButton ? <Text onPress={toggleTextShown} style={styles.seeMoreLessTxt}>{textShown ? '' : 'See More'}</Text> : null}
            </View>

            {/* <Pressable style={styles.bookAppButtonVw} onPress={()=> {
                navigation.navigate('Zen.VideoAppointment',{item:mainItem, date: selectAvailableDate, time: selectAvailableTime, isFromCancel: isFromCancel})
            }} >
                <Text style={styles.bookAppText} numberOfLines={1} >{translate("DOCTORSLIST")["BOOK_APPOINTMENT"]}</Text>
            </Pressable> */}

            {/* <View style={styles.optionBorder} />
            <Pressable style={[styles.featureDesVw,]} onPress={() => {}} >
                <Text style={styles.featureTitleText} numberOfLines={1} >{translate("DOCTORSLIST")["Q&A_ANSWERED_BY"]} {item?.doctor_detail?.length > 0 ? item?.doctor_detail[0]?.doctorName : ''}</Text>
                <Back width={7} height={13} style={styles.rightArraw} />
            </Pressable>
            <View style={styles.optionBorder} />

            <Pressable style={[styles.featureDesVw,]} onPress={() => { }} >
                <Text style={styles.featureTitleText} numberOfLines={1} >{translate("DOCTORSLIST")["FAQ"]}</Text>
                <Back width={7} height={13} style={styles.rightArraw} />
            </Pressable> */}
            <View style={styles.optionBorder} />
            
            {item?.doctor_education?.length > 0 && item?.doctor_education[0]?.interest != null && item?.doctor_education[0]?.interest?.length > 0 &&
                <>
                    <Pressable style={styles.featureDesVw} onPress={() => { 
                        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                        setSpecializationExpanded(!specializationExpanded);
                    }} >
                        <Text style={styles.featureTitleText} numberOfLines={1} >{translate("ONBOARDING")["SPECIALIZATION"]}</Text>
                        <Back width={7} height={13} style={styles.rightArraw} />
                    </Pressable>
                    <View style={{ height: specializationExpanded ? null : 0, overflow: 'hidden' }}>
                      <Text style={[styles.commonItemText, { marginHorizontal: 20, color: theme.SUB_TITLE, lineHeight: 18 }]}>{item?.doctor_education[0]?.interest}</Text>
                    </View>
                    <View style={[styles.borderBottom, {marginTop: specializationExpanded ? 10 : 0}]} />
                </>
            }
            {item?.doctor_education?.length > 0 && item?.doctor_education[0]?.education != null && item?.doctor_education[0]?.education?.length > 0 &&
                <>
                    <Pressable style={styles.featureDesVw} onPress={() => {
                          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                          setEducationsExpanded(!educationsExpanded);
                     }} >
                        <Text style={styles.featureTitleText} numberOfLines={1} >{translate("DOCTORSLIST")["EDUCATIONS"]}</Text>
                        <Back width={7} height={13} style={styles.rightArraw} />
                    </Pressable>
                    <View style={{ height: educationsExpanded ? null : 0, overflow: 'hidden' }}>
                     <Text style={[styles.commonItemText, { marginHorizontal: 20, color: theme.SUB_TITLE, lineHeight: 18 }]}>{item?.doctor_education[0]?.education}</Text>
                    </View>
                    <View style={[styles.borderBottom, {marginTop: educationsExpanded ? 10 : 0}]} />
                </>
            }
        
            {item?.doctor_education?.length > 0 && item?.doctor_education[0]?.experience != null && item?.doctor_education[0]?.experience?.length > 0 &&
                <>
                    <Pressable style={[styles.featureDesVw]} onPress={() => {
                          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                          setExperienceExpanded(!experienceExpanded);
                     }} >
                        <Text style={styles.featureTitleText} numberOfLines={1} >{translate("DOCTORSLIST")["EXPERIENCE"]}</Text>
                        <Back width={7} height={13} style={styles.rightArraw} />
                    </Pressable>
                    <View style={{ height: experienceExpanded ? null : 0, overflow: 'hidden' }}>
                        <Text style={[styles.commonItemText, { marginHorizontal: 20, color: theme.SUB_TITLE, lineHeight: 18 }]}>{item?.doctor_education[0]?.experience}</Text>
                    </View>
                    <View style={[styles.borderBottom, {marginTop: experienceExpanded ? 10 : 0}]} />
                </>
            }
            {item?.doctor_education?.length > 0 && item?.doctor_education[0]?.memberships != null && item?.doctor_education[0]?.memberships?.length > 0 &&
                <>
                    <Pressable style={styles.featureDesVw} onPress={() => { 
                          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                          setMembershipExpanded(!membershipExpanded);
                    }} >
                        <Text style={styles.featureTitleText} numberOfLines={1} >{translate("DOCTORSLIST")["MEMBERHIPS"]}</Text>
                        <Back width={7} height={13} style={styles.rightArraw} />
                    </Pressable>
                    <View style={{ height: membershipExpanded ? null : 0, overflow: 'hidden' }}>
                      <Text style={[styles.commonItemText, { marginHorizontal: 20, color: theme.SUB_TITLE, lineHeight: 18 }]}>{item?.doctor_education[0]?.memberships}</Text>
                    </View>
                    <View style={[styles.borderBottom, {marginTop: membershipExpanded ? 10 : 0}]} />
                </>
            }
            {item?.doctor_education?.length > 0 && item?.doctor_education[0]?.awards != null && item?.doctor_education[0]?.awards?.length > 0 &&
                <>
                    <Pressable style={styles.featureDesVw} onPress={() => { }} >
                        <Text style={styles.featureTitleText} numberOfLines={1} >{translate("DOCTORSLIST")["AWARD"]}</Text>
                        {/* <Back width={7} height={13} style={styles.rightArraw} /> */}
                    </Pressable>
                    <Text style={[styles.commonItemText, { marginHorizontal: 20, color: theme.SUB_TITLE, lineHeight: 18 }]}>{item?.doctor_education[0]?.awards}</Text>
                    <View style={[styles.borderBottom, {marginTop: 0}]} />
                </>
            }
    
            {item?.doctor_education?.length > 0 && item?.doctor_education[0]?.research != null && item?.doctor_education[0]?.research?.length > 0 &&
                <>
                    <Pressable style={styles.featureDesVw} onPress={() => { }} >
                        <Text style={styles.featureTitleText} numberOfLines={1} >{translate("DOCTORSLIST")["RESEARCH_PUBLICATION"]}</Text>
                        <Back width={7} height={13} style={styles.rightArraw} />
                    </Pressable>
                    <Text style={[styles.commonItemText, { marginHorizontal: 20, color: theme.SUB_TITLE, lineHeight: 18 }]}>{item?.doctor_education[0]?.research}</Text>
                    <View style={[styles.borderBottom, {marginTop: 0}]} />
                </>
            }
            {/* {item?.doctor_education?.length > 0 && item?.doctor_education[0]?.faq != null && item?.doctor_education[0]?.faq?.length > 0 &&
                <>
                    <Pressable style={styles.featureDesVw} onPress={() => { }} >
                        <Text style={styles.featureTitleText} numberOfLines={1} >{translate("DOCTORSLIST")["FAQ"]}</Text>
                        <Back width={7} height={13} style={styles.rightArraw} />
                    </Pressable>
                    <Text style={[styles.commonItemText, { marginHorizontal: 20, color: theme.SUB_TITLE, lineHeight: 18 }]}>{item?.doctor_education[0]?.faq}</Text>
                    <View style={[styles.borderBottom, {marginTop: 0}]} />
                </>
            } */}
            {/* <View style={styles.bottomLine} /> */}
            {/* Review Section */}
            {/* {item?.doctor_review?.length > 0 &&
                <View style={{ padding: 20 }}>
                    <Text style={styles.doctornameText} numberOfLines={1} >{translate("DOCTORSLIST")["PATIENT_REVIEWS"]}</Text>
                    {item?.doctor_review.map((item, index) => index <= 3 && (
                        <>
                            {item?.user?.user_details[0]?.reviewerName ? <View style={styles.patientsProfileVw} >
                                <Image style={styles.patientImage} source={{ uri: item?.user?.user_details[0]?.reviewerImage }} />
                                <View style={styles.patientInfo} >
                                    <Text style={styles.patientName} numberOfLines={1}>{item?.user?.user_details[0]?.reviewerName}</Text>
                                    <Text style={styles.patientType} numberOfLines={1}>{item?.user?.user_details[0]?.cancer_category?.reviewerCancerType} - {item?.user?.user_details[0]?.cancer_stage?.reviewerCancerStage} (Patient)</Text>
                                </View>
                            </View>: null}
                            <Text style={[styles.commonItemText, { fontSize: 13, lineHeight: 22 }]} >{item?.review}</Text>
                            <View style={styles.reviewBorderBottom} />
                        </>
                    ))}
                    <Pressable style={{ paddingTop: 15 }} onPress={() => navigation.navigate('Zen.PatientReviews', { item: mainItem })}>
                        <Text style={styles.viewallText} numberOfLines={1} >{translate("DOCTORSLIST")["READ_ALL_REVIEWS"]}</Text>
                    </Pressable>
                </View>} */}
            {/* {item?.doctor_post?.length > 0 &&
                <>
                    <View style={styles.bottomLine} />
                    <View style={[styles.patientsProfileVw, { paddingHorizontal: 20 }]} >
                        <Text style={[styles.doctornameText, { width: '70%' }]} numberOfLines={1} >{translate("DOCTORSLIST")["BLOG_ARTICLES"]}</Text>
                        <Text style={[styles.viewallText, styles.viewAllExtra]} numberOfLines={1} >{translate("COMMONTEXT")["VIEW_ALL"]}</Text>
                    </View>

                    <FlatList
                        data={item?.doctor_post}
                        keyExtractor={item => item.key}
                        horizontal
                        contentContainerStyle={styles.containerStyle}
                        showsHorizontalScrollIndicator={false}
                        renderItem={renderBlogArticleItem} />
                </>
            } */}
            
        </View>
    );
})
const modalStyles = (theme: any) => {
    return StyleSheet.create({
        tabText: {
            fontFamily: FONTFAMILY.POPPINS_REGULAR,
            fontSize: 11
        },
        availableDateVw: {
            backgroundColor: theme.PRIMARY,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: '#d1e1f1',
            width: width * 0.28,
            height: 46,
            alignItems: 'center',
            justifyContent: 'center',
            margin: 5,
        },
        commonItemText: {
            fontFamily: FONTFAMILY.POPPINS_REGULAR,
            fontSize: 12,
            color: theme.GRAY_BLACK
        },
        viewallVw: {
            alignItems: 'center',
            padding: 5
        },
        viewallText: {
            fontFamily: FONTFAMILY.POPPINS_REGULAR,
            fontSize: 14,
            color: theme.SECONDARY
        },
        viewAllExtra: {
            position: 'absolute',
            right: 20,
            width: '25%',
            textAlign: 'right'
        },
        bottomLine: {
            height: 7,
            backgroundColor: theme.SELECTED
        },
        doctornameText: {
            fontFamily: FONTFAMILY.POPPINS_MEDIUM,
            fontSize: 16,
            color: theme.GRAY_BLACK,
        },
        extraStyle: {
            marginHorizontal: 20,
            marginTop: 17,
            marginBottom: Platform.OS === 'ios' ? 5 : 2
        },
        featureDesVw: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 20,
            paddingVertical: Platform.OS === 'ios' ? 15 : 12
        },
        topBorder: {
            borderTopWidth: 1,
            borderTopColor: theme.BORDER_COLOR,
        },
        bottomBorder: {
            borderBottomWidth: 1,
            borderBottomColor: theme.BORDER_COLOR,
        },
        featureTitleText: {
            fontFamily: FONTFAMILY.POPPINS_MEDIUM,
            fontSize: 16,
            color: theme.GRAY_BLACK,
            width: "85%",
        },
        rightArraw: {
            right: 20,
            transform: [{ rotateY: '180deg' }],
            position: 'absolute'
        },
        patientsProfileVw: {
            flexDirection: 'row',
            alignItems: "center",
            marginTop: Platform.OS === 'ios' ? 18 : 16,
            marginBottom: 12
        },
        patientImage: {
            width: 41,
            height: 41,
            borderRadius: 10
        },
        patientInfo: {
            marginLeft: 8,
            width: '85%'
        },
        patientName: {
            fontSize: 16,
            color: theme.BLACK,
            fontFamily: FONTFAMILY.POPPINS_MEDIUM
        },
        patientType: {
            fontSize: 10,
            color: theme.SUB_TITLE,
            fontFamily: FONTFAMILY.POPPINS_REGULAR,
            marginTop: Platform.OS === 'ios' ? 0 : -4
        },
        bookAppButtonVw: {
            backgroundColor: theme.SECONDARY,
            borderRadius: 10,
            paddingVertical: Platform.OS === 'ios' ? 15 : 13,
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: 20,
            marginVertical: 23,
        },
        bookAppText: {
            color: theme.PRIMARY,
            fontFamily: FONTFAMILY.POPPINS_REGULAR,
            fontSize: 16
        },
        blogItemContainer: {
            borderRadius: 10,
            width: 201,
            backgroundColor: theme.PRIMARY,
            marginRight: 10
        },
        blogImage: {
            height: 123,
            width: 201,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10
        },
        blogDesVw: {
            paddingVertical: 4,
            paddingHorizontal: 10
        },
        zenOncoTitle: {
            color: theme.GRAY_BLACK,
            fontFamily: FONTFAMILY.POPPINS_MEDIUM,
            fontSize: 11
        },
        viewerText: {
            color: theme.SUB_TITLE,
            fontFamily: FONTFAMILY.POPPINS_REGULAR,
            fontSize: 10,
            marginTop: Platform.OS === 'ios' ? 0 : -3.5
        },
        shareVw: {
            position: 'absolute',
            right: 35,
            padding: 5
        },
        bookmarkVw: {
            position: 'absolute',
            right: -5,
            padding: 5
        },
        dropShadow: {
            elevation: Platform.OS === 'ios' ? 0 : 5,
            shadowColor: 'grey',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: Platform.OS == 'ios' ? .5 : 1.0,
        },
        seeMoreLessTxt: {
            color: theme.SECONDARY,
            fontFamily: FONTFAMILY.POPPINS_REGULAR,
            fontSize: 12,
            marginHorizontal: 20,
            textDecorationLine: 'underline'
        },
        containerStyle: {
            paddingHorizontal: 20,
            paddingBottom: 7,
            paddingTop: 3
        },
        blogBottomVw: {
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 5,
            marginBottom: 10
        },
        zenOncoImage: {
            height: 26,
            width: 26,
            borderRadius: 5
        },
        zenOncoTextContainer: {
            marginLeft: 8,
            width: '50%'
        },
        borderBottom: {
            width:'92%',
            alignSelf:'center',
            borderBottomWidth: 1,
            borderBottomColor: theme.BORDER_COLOR,
            marginTop: 10
        },
        optionBorder: {
            width:'92%',
            alignSelf:'center',
            borderBottomWidth: 1,
            borderBottomColor: theme.BORDER_COLOR,
        },
        reviewBorderBottom: {
            borderBottomWidth: 1,
            borderBottomColor: theme.BORDER_COLOR,
            marginVertical: 8
        },
        timeSlotContainer:{
            marginTop:6, borderBottomWidth:1, borderBottomColor:theme.LIGHT_BORDER
        },
        fulfillContainer:{
            paddingHorizontal:20, marginTop:16
        },
        fulfillSubContainer:{
            flexDirection:'row', marginTop:11
        },
        fixContainer:{
            position:'absolute', left:110, top: 2
        },
        fulfilledText:{
            color: theme.SEARCH_TITLE,
            fontSize: 11,
            fontFamily: FONTFAMILY.POPPINS_REGULAR,
            lineHeight:18
        },
        assistedText:{
            color: theme.SUB_TITLE,
            fontSize: 12,
            fontFamily: FONTFAMILY.POPPINS_REGULAR,
        },
        assistanceContainer:{
            flexDirection:'row', alignItems:'center',marginTop:12
        },
        assistedSubText:{
            color: theme.BLACK,
            fontSize: 13,
            fontFamily: FONTFAMILY.POPPINS_REGULAR,
            marginLeft:8.5
        },
        interestedContainer:{
            marginTop:13, marginBottom:16
        },
        needHelpContainer:{
            paddingHorizontal: 14, marginTop:10
        },
        needHelpSubContainer:{
            borderWidth:1,
            borderRadius:6,
            borderColor: theme.LIGHT_BORDER
        },
        highlyRecomndedContainer:{
          paddingHorizontal:20,
          marginTop:14,
          marginBottom:6
        },
        highlyRecomndedTitle:{
            color: theme.BLACK,
            fontSize: 18,
            fontFamily: FONTFAMILY.POPPINS_SEMIBOLD,
        },
        highlyRecomndedSubContainer:{
            width:'97%',
            flexDirection:'row', 
            marginTop: 18,
        },
        doctorFrienTitle:{
            color: theme.BLACK,
            fontSize: 16,
            fontFamily: FONTFAMILY.POPPINS_MEDIUM,
            marginLeft:6
        },
        doctorFrienSubTitle:{
            color: theme.SUB_TITLE,
            fontSize: 11,
            fontFamily: FONTFAMILY.POPPINS_REGULAR,
            marginLeft:6,
            marginTop:2
        },
        serviceContainer:{
            width:'97%',
            flexDirection:'row', 
        },
        serviceText:{
            color: theme.SUB_TITLE,
            fontSize: 14,
            fontFamily: FONTFAMILY.POPPINS_REGULAR,
            marginTop: 18,
            
        },
        downIcon: {
            width: 12,
            height: 12,
      
          },
    });
};
export default PhysicalAppointment;  