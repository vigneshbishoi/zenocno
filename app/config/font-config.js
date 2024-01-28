/** 
 * font and font familt configuration 
 * @Author: Anand R 
 * @Date: 2021-11-20 15:52:28 
 * @Desc: font and font familt configuration 
 */
import { Dimensions, Platform, PixelRatio } from 'react-native';
// import { RFValue } from "react-native-responsive-fontsize";

/**
 * font size config
 */
const { width, height } = Dimensions.get('window');
//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;
const verticalScale = size => height / guidelineBaseHeight * size;

// const moderateScale = (size) => {
//     const newSize = size - 1;
//     return RFValue(newSize);
// }
// const FONTSIZE = { FONT_0: moderateScale(0), FONT_1: moderateScale(1), FONT_2: moderateScale(2), FONT_3: moderateScale(3), FONT_4: moderateScale(4), FONT_5: moderateScale(5), FONT_6: moderateScale(6), FONT_7: moderateScale(7), FONT_8: moderateScale(8), FONT_9: moderateScale(9), FONT_10: moderateScale(10), FONT_11: moderateScale(11), FONT_12: moderateScale(12), FONT_13: moderateScale(13), FONT_14: moderateScale(14), FONT_15: moderateScale(15), FONT_16: moderateScale(16), FONT_17: moderateScale(17), FONT_18: moderateScale(18), FONT_19: moderateScale(19), FONT_20: moderateScale(20), FONT_21: moderateScale(21), FONT_22: moderateScale(22), FONT_23: moderateScale(23), FONT_24: moderateScale(24), FONT_25: moderateScale(25), FONT_26: moderateScale(26), FONT_27: moderateScale(27), FONT_28: moderateScale(28), FONT_29: moderateScale(29), FONT_30: moderateScale(30), FONT_31: moderateScale(31), FONT_32: moderateScale(32), FONT_33: moderateScale(33), FONT_34: moderateScale(34), FONT_35: moderateScale(35), FONT_36: moderateScale(36), FONT_37: moderateScale(37), FONT_38: moderateScale(38), FONT_39: moderateScale(39), FONT_40: moderateScale(40), FONT_41: moderateScale(41), FONT_42: moderateScale(42), FONT_43: moderateScale(43), FONT_44: moderateScale(44), FONT_45: moderateScale(45), FONT_46: moderateScale(46), FONT_47: moderateScale(47), FONT_48: moderateScale(48), FONT_49: moderateScale(49), FONT_50: moderateScale(50), FONT_60: moderateScale(60) };

/**
 * font family config
 */

const FONTFAMILY = {
    "REGULAR": "Ubuntu-Regular",
    "BOLD": "Ubuntu-Bold",
    "ITALIC": "Ubuntu-Italic",
    "MEDIUM": "Ubuntu-Medium",
    // "SEMIBOLD": "Ubuntu-SemiBold",
    // "THIN": "Ubuntu-Thin",
    "LIGHT": "Ubuntu-Light",
    "NEXA_BOLD": "NEXA BOLD",
    "NEXA_LIGHT": "NEXA LIGHT",
    "POPPINS_MEDIUM": "Poppins-Medium",
    "POPPINS_REGULAR": "Poppins-Regular",
    "POPPINS_BOLD": "Poppins-Bold",
    "POPPINS_SEMIBOLD": "Poppins-SemiBold",
    "POPPINS_LIGHT": "Poppins-Light",

}

export { FONTFAMILY }
