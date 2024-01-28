/**
 * Landing Component
 * @Author: Anand R
 * @Date: Wed Nov 17 2021 19:22:35 GMT+0530 (India Standard Time)
 * @Desc: Bussiness logic and validation
 */
import React, { useEffect } from 'react';
import Layout from './Layout';
import actionTypes from '../../../store/actions/types'

interface IProps {
  actions: any

}

export default function Report(props: IProps) {


  return <Layout {...props} />;
}
