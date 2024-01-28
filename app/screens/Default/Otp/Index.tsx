/**
 * Otp Component
 * @Author: Anand R
 * @Date: Thu Nov 18 2021 22:03:40 GMT+0530 (India Standard Time)
 * @Desc: Bussiness logic and validation
 */
import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import actionTypes from '../../../store/actions/types'


interface IProps {
  actions: any
}

export default function Otp(props: IProps) {

  // useEffect(() => {

  // }, [])

  return <Layout {...props} />;
}
