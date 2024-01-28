import React from 'react'
import { StyleSheet, Platform, Pressable, Text, View } from 'react-native'
import { FONTFAMILY } from "../../config/font-config";
import { TextField } from '../../components/Plugins/Textfield/index';

const CommonDropDown = (props) => {
    const {
        theme,
        value,
        placeHolder,
        onComponentPress,        
        isErrowShow = false,
        multiLine = false,
        editable = false,
        onChangeText,
        iconName = "keyboard-arrow-down",
        isIcon = true,
        isfromHW = false,
        firstText,
        secondText,
        onSelectFirst,
        onSelectSecond,
        formData={},
        onFocus = () => {},
        isMetrics,
        isSave,
        onSave,
        maxLength,
        extraInputStyle= {},
        placeholderTextColor = null,
        onClose,
        isClose
    } = props

    const stylesActivity = (theme: any) => {
        return StyleSheet.create({
            container: {
                paddingHorizontal: 15,
                marginTop: 8,
                flexDirection: 'row',
                alignItems: 'center',
            },
            txtContainer: {
                paddingRight: 10,
                paddingLeft: 0,
                justifyContent: 'center',
                height: 28,
                borderBottomColor: isErrowShow ? theme.RED : theme.SEARCH_TITLE,
                borderBottomWidth: 1,
                color: theme.GRAY_BLACK
            },
            iconStyle: {
                position: "absolute",
                top: 5,
                right: -12,
                color: theme.SEARCH_TITLE
            },
            prefixText: {
                fontSize: 11,
                color: theme.SUB_TITLE,
                fontFamily: FONTFAMILY.POPPINS_REGULAR,
            },
            optionContainer:{ 
                flexDirection: 'row', 
                right: 10, 
                alignItems: 'center', 
                borderRadius: 2, 
                borderWidth: 0.5, 
                borderColor: theme.SECONDARY, 
                position: 'absolute' 
            },
            saveContainer:{ 
                flexDirection: 'row', 
                right: 10, 
                alignItems: 'center', 
                position: 'absolute' ,
                top: 25
            },
            firstOption:{
                paddingHorizontal: 8, 
                borderTopLeftRadius: 2, 
                borderBottomLeftRadius: 2 
            },
            secondOption:{
                paddingHorizontal: 8, 
                borderTopRightRadius: 2, 
                borderBottomRightRadius: 2
            },
            optionText:{
                fontSize: 10, 
                fontFamily: FONTFAMILY.POPPINS_MEDIUM
            }
        })
    };

    const styles = stylesActivity(theme);


    return (
        <View style={styles.container}>
            <Pressable style={{ width: '100%' }} onPress={onComponentPress}>
                <View style={{height:20}}>
                {value?.length > 0 && <Text style={styles.prefixText} numberOfLines={1} >{placeHolder}</Text>}
                </View>
                <TextField
                    maxLength={maxLength}
                    labelHeight={0}
                    disabled={false}
                    keyboardType={isfromHW ? "decimal-pad" : null}
                    lineWidth={1}
                    fontSize={13}
                    value={value}
                    multiline={multiLine}
                    editable={editable}
                    placeholder={placeHolder}
                    placeholderTextColor={placeholderTextColor}
                    titleTextStyle={{ fontFamily: FONTFAMILY.POPPINS_REGULAR }}
                    affixTextStyle={{ fontFamily: FONTFAMILY.POPPINS_REGULAR }}
                    iconName={isSave ? '' : iconName}
                    iconType={(isIcon && !isfromHW )? "MaterialIcons" : " "}
                    iconStyle={styles.iconStyle}
                    textColor={theme.GRAY_BLACK}
                    baseColor={theme.GRAY_BLACK}
                    tintColor={theme.GRAY_BLACK}
                    returnKeyType="next"
                    blurOnSubmit={true}
                    onChangeText={onChangeText}
                    onFocus={onFocus}
                    inputStyleOverrides={[{ flex: 0.9 }, extraInputStyle]}
                    inputContainerPadding={ Platform.OS === 'ios' ? 0 : 0 }
                    containerStyle={styles.txtContainer} />

            </Pressable>
         {isfromHW && 
            <View style={styles.optionContainer} >
                <Pressable style={[styles.firstOption, {backgroundColor: isMetrics ? theme.SECONDARY : theme.PRIMARY}]} onPress={onSelectFirst} >
                    <Text style={[styles.optionText,{color: isMetrics ?  theme.PRIMARY : theme.SECONDARY}]} >{firstText}</Text>
                </Pressable>
                <Pressable style={[styles.secondOption, {backgroundColor: isMetrics ? theme.PRIMARY : theme.SECONDARY}]} onPress={onSelectSecond} >
                    <Text style={[styles.optionText,{color: isMetrics ?  theme.SECONDARY : theme.PRIMARY}]} >{secondText}</Text>
                </Pressable>
            </View>
        } 
        {isSave && 
            <View style={styles.saveContainer} >
                <Pressable style={[styles.firstOption, {backgroundColor: isMetrics ? theme.SECONDARY : theme.PRIMARY}]} onPress={onSave} >
                    <Text style={[styles.optionText,{color: theme.SECONDARY, fontSize: 12}]} >Save</Text>
                </Pressable>
            </View>
        } 
        {isClose && 
            <View style={styles.saveContainer} >
                <Pressable style={[styles.firstOption, {backgroundColor: isMetrics ? theme.SECONDARY : theme.PRIMARY}]} onPress={onClose} >
                    <Text style={[styles.optionText,{color: theme.SECONDARY, fontSize: 12}]} >Close</Text>
                </Pressable>
            </View>
        } 
        </View>
    );
}

export default CommonDropDown;