/** 
 * javascript comment 
 * @Author: Anand R
 * @Date: 2021-12-02 11:38:32 
 * @Desc: Razorpay
 */
import React, { Component } from 'react';
import RazorpayCheckout from 'react-native-razorpay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import translate from '../utils/Text'
import actionTypes from '../store/actions/types';
import { useSelector } from 'react-redux';
export default class PaymentDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    async componentDidMount() {
        const { payInfo, setShowRazorpay, setShowAlert, setStatus, actions, onSuccess,razorPayKey,
            userId, subId, setError, phone, name, navigation, fromProduct,fromAppointment= false,onError } = this.props
       console.log("234---", razorPayKey)


        var options = {
            description: '',
            image: 'https://zenonco-web-image.s3.ap-south-1.amazonaws.com/assets/images/Logo.svg',
            currency: 'INR',
            key: razorPayKey,
            // key: "rzp_test_MpkO1VBDGMAa6y",
            amount: payInfo.amount,
            name: 'ZenOnco.io',
            //order_id: payInfo.id,
            prefill: {
                contact: phone,
                name: name
            },
            // modal: {
            //     escape: false
            // },
            theme: { color: '#104462' }
        }

        RazorpayCheckout.open(options).then((data) => {
            setStatus(JSON.stringify(data))
            // setShowAlert(true)

            setError(false)
            setStatus("Payment is Success")
            // actions.loader('loader', true, actionType.LOADER);
            setShowRazorpay(false)

            if (fromProduct || fromAppointment) {
                onSuccess(data)
            } else {
                actions.callVerifyPayment(actionTypes.GET_PAYMENT_VERFIY, {
                    module: "payment",
                    action: "verifyPay",
                    formData: {
                        userId: userId,
                        subscriptionPlanId: subId,
                        razorpay_signature: data.razorpay_signature,
                        razorpay_order_id: data.razorpay_order_id,
                        razorpay_payment_id: data.razorpay_payment_id
                    }
                })
                // navigation.navigate("Zen.Community")
                navigation.navigate("Zen.Home")
            }

        }).catch((error) => {
            if(fromAppointment){
                onError()
            }
            console.log("1234--", error)
            // console.log(JSON.stringify(error.error.description), "failure")
            setStatus(error?.error?.description)
            setError(true)
            setShowAlert(true)
            setShowRazorpay(false)

        });
    }

    render() {
        return (
            <>
            </>
        )
    }

}