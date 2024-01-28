import React from 'react'
import { StyleSheet, Pressable, View, Text } from 'react-native'
import { FONTFAMILY } from "../../config/font-config";
import Back from '../../assets/images/Back.svg';
import Back1 from '../../assets/images/backWhite.svg'
// import translate from "../../utils/Text"
import PostButton from '../../components/CommonInput/navigateButton';

const AppHeader = (props) => {
    const {
        theme,
        onBackPress,
        headerTitle,
        isRightComponent = false,
        isText = false,
        rightText = '',
        onRightPress,
        isFirstIcon = false,
        isSecondIcon = false,
        rightFirstIcon,
        rightSecondIcon,
        rightFirstPress,
        rightSecondPress,
        isThirdIcon = false,
        isFourthIcon = false,
        rightThirdIcon,
        rightFourthIcon,
        rightThirdPress,
        rightFourthPress,
        isMenu = false,
        menuOption,
        isButton = false,
        ButtonText,
        onPressButton,
        postBtnEnable,
        fontColor = theme.SECONDARY,
        isWhite = false,
        backgroundColor = null,
        radius = null,
        isSubText = false,
        subText,
        headerFontColor = theme.GRAY_BLACK,
        extraHeaderTxt= {},
        extraHeaderTxtView= {}
    } = props

    const stylesActivity = (theme: any) => {
        return StyleSheet.create({
            headerContainer: {
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                height: 50
            },
            backImgVw: {
                position: "absolute",
                left: 0,
                width: 40,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: backgroundColor,
                borderRadius: radius
            },
            headerTxt: {
                fontSize: 16,
                color: headerFontColor,
                fontFamily: FONTFAMILY.POPPINS_MEDIUM,

            },
            commonText: {
                textAlign: 'center',
                fontSize: 12,
                color: theme.SUB_TITLE,
                fontFamily: FONTFAMILY.POPPINS_MEDIUM,
            },
            rightComponent: {
                position: "absolute",
                right: 10,
                alignItems: 'center',
                justifyContent: 'center'
            },
            rightTextS: {
                fontSize: 14,
                color: fontColor,
                fontFamily: FONTFAMILY.POPPINS_MEDIUM,
            },
            iconContainer: {
                flexDirection: 'row',
                alignItems: 'center'
            },
            buttons: {
                paddingHorizontal: 8
            }
        })
    };

    const styles = stylesActivity(theme);

    return (
        <View style={styles.headerContainer} >
            <Pressable onPress={onBackPress} style={styles.backImgVw}>
                {!isWhite ? <Back width={8} height={15} /> :
                    <Back1 width={8} height={15} />}
            </Pressable>
            <View style={[{ marginHorizontal: 40 },extraHeaderTxtView]} >
                <Text style={[styles.headerTxt,extraHeaderTxt]} numberOfLines={1} >{headerTitle}</Text>
               {isSubText && <Text numberOfLines={1} style={[styles.commonText, { marginTop: Platform.OS === 'ios' ? 0 : -5 }]} >{subText}</Text>}
            </View>
            {isRightComponent &&
                <Pressable style={styles.rightComponent} onPress={onRightPress} >
                    {isText ?
                        <Text style={styles.rightTextS} numberOfLines={1} >{rightText}</Text>
                        :
                        <View style={styles.iconContainer} >
                            {isFourthIcon &&
                                <Pressable style={styles.buttons} onPress={rightFourthPress} >
                                    {rightFourthIcon}
                                </Pressable>}
                            {isThirdIcon &&
                                <Pressable style={styles.buttons} onPress={rightThirdPress} >
                                    {rightThirdIcon}
                                </Pressable>}
                            {isFirstIcon &&
                                <Pressable style={styles.buttons} onPress={rightFirstPress} >
                                    {rightFirstIcon}
                                </Pressable>}
                            {isSecondIcon &&
                                <Pressable style={styles.buttons} onPress={rightSecondPress} >
                                    {rightSecondIcon}
                                </Pressable>}
                        </View>
                    }

                    {isMenu && <>{menuOption}</>}

                    {isButton &&
                        <PostButton postBtnEnable={postBtnEnable} onPress={onPressButton} width={50} height={34} marginTop={0} theme={theme} buttonText={ButtonText} fontSize={12} />
                    }

                </Pressable>
            }
        </View>
    );
}

export default AppHeader;