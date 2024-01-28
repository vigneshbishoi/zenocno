import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import {
    StyleSheet,
    Text,
    View,
    StyleProp,
    ViewStyle,
    TextStyle,
    TextProps,
} from 'react-native'
import dayjs from 'dayjs'
import { FONTFAMILY } from '../config/font-config';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
        marginBottom: 10,
    },
    text: {
        backgroundColor: 'transparent',
        color: '#999999',
        fontSize: 14,
        fontFamily:FONTFAMILY.POPPINS_REGULAR
    },
})

export interface IMessage {
    _id: string | number
    text: string
    createdAt: Date | number
    image?: string
    video?: string
    audio?: string
    system?: boolean
    sent?: boolean
    received?: boolean
    pending?: boolean
}

const StylePropType = PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number,
    PropTypes.bool,
])



export interface DayProps<TMessage extends IMessage> {
    currentMessage?: TMessage
    nextMessage?: TMessage
    previousMessage?: TMessage
    containerStyle?: StyleProp<ViewStyle>
    wrapperStyle?: StyleProp<ViewStyle>
    textStyle?: StyleProp<TextStyle>
    textProps?: TextProps
    dateFormat?: string
    inverted?: boolean
}

export default class Day<
    TMessage extends IMessage = IMessage
    > extends PureComponent<DayProps<TMessage>> {
    static contextTypes = {
        getLocale: PropTypes.func,
    }

    static defaultProps = {
        currentMessage: {
            createdAt: null,
        },
        previousMessage: {},
        nextMessage: {},
        containerStyle: {},
        wrapperStyle: {},
        textStyle: {},
        textProps: {},
        dateFormat: 'll',
    }

    static propTypes = {
        currentMessage: PropTypes.object,
        previousMessage: PropTypes.object,
        nextMessage: PropTypes.object,
        inverted: PropTypes.bool,
        containerStyle: StylePropType,
        wrapperStyle: StylePropType,
        textStyle: StylePropType,
        textProps: PropTypes.object,
        dateFormat: PropTypes.string,
    }

 isSameDay = (
        currentMessage: IMessage,
        diffMessage: IMessage | null | undefined,
    ) => {
        if (!diffMessage || !diffMessage.createdAt) {
            return false
        }
    
        const currentCreatedAt = dayjs(currentMessage.createdAt)
        const diffCreatedAt = dayjs(diffMessage.createdAt)
    
        if (!currentCreatedAt.isValid() || !diffCreatedAt.isValid()) {
            return false
        }
    
        return currentCreatedAt.isSame(diffCreatedAt, 'day')
    }

    isToday = (currentMessage: IMessage,dateFormat :string | undefined) =>  {
    
        const currentCreatedAt = dayjs(currentMessage.createdAt).format('DD MM YYYY')
        const currentAt = dayjs(new Date()).format('DD MM YYYY')
        const yesterday = dayjs(new Date(new Date().setDate(new Date().getDate() - 1))).format('DD MM YYYY')
        //console.log("date" , currentCreatedAt == currentAt)
        if (currentCreatedAt == currentAt) {
            return "Today"
        } else if (currentCreatedAt == yesterday) {
            return "Yesterday"
        } else {
            return dayjs(currentMessage.createdAt)
                //.locale(this.context.getLocale())
                .format(dateFormat)
         }
} 

    render() {
        const {
            dateFormat,
            currentMessage,
            previousMessage,
            containerStyle,
            wrapperStyle,
            textStyle,
            textProps,
        } = this.props

        if (currentMessage && !this.isSameDay(currentMessage, previousMessage!)) {
            return (
                <View style={[styles.container, containerStyle]}>
                    <View style={wrapperStyle}>
                        <Text style={[styles.text, textStyle]} {...textProps}>
                        {this.isToday(currentMessage,dateFormat)}
                        </Text>
                    </View>
                </View>
            )
        }
        return null
    }
}

// {dayjs(currentMessage.createdAt)
//     //.locale(this.context.getLocale())
//     .format(dateFormat)}