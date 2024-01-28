import React, {useState, useEffect} from 'react';
import { StyleSheet, View, FlatList, Text, Pressable, Dimensions } from 'react-native';
import { FONTFAMILY } from '../../config/font-config';
import {newGetTimeSlot} from '../../utils/commonFunction'
import moment from 'moment'

const width = Dimensions.get('window').width;

const TimeSlot = ((props) => {
    const { theme, dates, slots, selectAvailableDate, selectAvailableTime, setSelectAvailbleTime,setSelectDate,
        selectedDate, setSelectAvailbleDate, bookSlot, onSelectSlot = () => {}, hasViewAllSlot=false } = props
    const styles = modalStyles(theme);
    const [timeSlots, setTimeSlots] = useState();
    const [selectedViewAll, setSelectViewAll] = useState(false);

    useEffect(() => {
        setTimeSlots(slots?.length > 0 ? slots : [])
    }, [props.slots])

    const renderAvailableDate = ({ item, index }) => {
        let momentObj = moment(item?.date, 'YYYY-MM-DD')
        let showDate = moment(momentObj).format('ddd, MMM, D')
        return (
            <Pressable style={[styles.availableDateVw, selectAvailableDate == item ? { borderBottomColor:theme.SECONDARY }:{borderBottomColor:theme.LIGHT_BORDER} ]} onPress={() => {
                setSelectAvailbleDate(item)
                setSelectDate(item?.date)
                let filterData = []
                if(bookSlot?.length > 0){
                    filterData = bookSlot?.filter(itemA => itemA.apptDate == item?.date)
                }
                let allSlots = newGetTimeSlot(item, filterData)
                setSelectAvailbleTime(allSlots[0])
                setTimeSlots(allSlots)
            }} >
                <Text style={[styles.commonItemText, selectAvailableDate == item && { color: theme.SECONDARY }]} numberOfLines={1} >{showDate}</Text>
            </Pressable>
        );
    }
    const renderAvailableTime = ({ item, index }) => {
        return (
                <Pressable style={[styles.availableTimeVw, { backgroundColor : selectAvailableTime == item ? theme.SECONDARY : theme.PRIMARY }]} 
                  onPress={() => {
                        setSelectAvailbleTime(item)
                        onSelectSlot(item)
                }} >
                    <Text style={[styles.commonItemTimeText,  { color: selectAvailableTime == item ? theme.PRIMARY : theme.SECONDARY }]} numberOfLines={1} >{item}</Text>
                </Pressable>
        );
        // return ((!selectedViewAll && index <= 2) || selectedViewAll) && (
        //         <Pressable style={[styles.availableTimeVw, selectAvailableTime == item && { backgroundColor: theme.SECONDARY }]} onPress={() => {
        //             setSelectAvailbleTime(item)
        //         }} >
        //             <Text style={[styles.commonItemText, selectAvailableTime == item && { color: theme.PRIMARY }]} numberOfLines={1} >{item}</Text>
        //         </Pressable>
        // );
    }


    return (
        <View>
        <View style={{ backgroundColor: theme.SECONDARY_WHITE,  }} >
            <FlatList
                data={dates}
                horizontal
                contentContainerStyle={{ paddingHorizontal: 15, paddingVertical: 0 }}
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.key}
                showsVerticalScrollIndicator={false}
                renderItem={renderAvailableDate} />
        </View>
        {/* <Text style={[styles.commonItemText, { fontSize: 20, marginHorizontal: 20, marginVertical: 12 }]} numberOfLines={1} >{selectedDate}</Text> */}
        {selectedDate.length > 0 &&
        <View style={{backgroundColor: theme.SECONDARY_WHITE, paddingBottom:10, paddingTop: 10}}>
            <FlatList
                data={timeSlots}
                horizontal
                contentContainerStyle={{marginLeft:5}}
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.key}
                showsVerticalScrollIndicator={false}
                renderItem={renderAvailableTime} 
            />
            {
                hasViewAllSlot &&
                <View>
                    {timeSlots?.length > 3 &&
                    <Text style={styles.viewAllText} 
                    onPress={()=>{
                        setSelectViewAll(!selectedViewAll);
                    }}>{selectedViewAll ? 'Hide all' : 'View all'}</Text>}
                </View>
            }
        </View>}
    </View>
    );
})

const modalStyles = (theme: any) => {
    return StyleSheet.create({
        availableDateVw:{
            // backgroundColor:theme.PRIMARY,
            // borderRadius:8,
            // borderWidth:1,
            // borderColor:'#d1e1f1',
            borderBottomWidth:1,
            width:width*0.28,
            height:40,
            alignItems:'center',
            justifyContent:'center',
            // margin:5,
            // backgroundColor:'red'
          },
          availableTimeVw:{
            backgroundColor:theme.PRIMARY,
            borderRadius: 4,
            borderWidth:1,
            borderColor:theme.SECONDARY,
            // width:'30%',
            // height:46,
            // alignItems:'center',
            // justifyContent:'center',
            margin:5,
            paddingHorizontal:25,
            paddingVertical:10,
            marginHorizontal:10

          },
          commonItemText:{
           fontFamily:FONTFAMILY.POPPINS_MEDIUM,
           fontSize:14,
           color:theme.GRAY_BLACK
          },
          commonItemTimeText:{
           fontFamily:FONTFAMILY.POPPINS_MEDIUM,
           fontSize:12,
           color:theme.GRAY_BLACK,
           lineHeight:16
          },
          viewAllText: {
            fontSize:12, 
            alignSelf:"center", 
            // marginVertical:10, 
            // marginBottom:15,
            marginTop:10,
            color:theme.SECONDARY,
            fontFamily:FONTFAMILY.POPPINS_MEDIUM,
        }
    });
};

export default TimeSlot