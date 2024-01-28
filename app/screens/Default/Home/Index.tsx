/**
 * Home Component
 * @Author: Anand R
 * @Date: Thu Dec 02 2021 10:53:59 GMT+0530 (India Standard Time)
 * @Desc: Bussiness logic and validation
 */
import React from 'react';
import Layout from './Layout';

interface IProps {}

export default function Home(props: IProps) {
  return <Layout {...props} />;
}
