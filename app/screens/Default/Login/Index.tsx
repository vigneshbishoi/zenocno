/**
 * Login Component
 * @Author: Anand R
 * @Date: Fri Nov 12 2021 13:46:28 GMT+0530 (India Standard Time)
 * @Desc: Bussiness logic and validation
 */
import React, { useEffect } from 'react';
import Layout from './Layout';

interface IProps {
  navigation: any;
}

export default function Login(props: IProps) {

  useEffect(() => {
    setTimeout(() => {
      // props.navigation.navigate('Zen.LanguageSelection')

    }, 5000)
  }, [])
  return <Layout {...props} />;
}
