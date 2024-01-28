/**
 * Otp Component
 * @Author: Anand R
 * @Date: Thu Nov 18 2021 22:03:40 GMT+0530 (India Standard Time)
 * @Desc: Bussiness logic and validation
 */
 import React, { useEffect, useState } from 'react';
 import Layout from './Layout';
 
 
 interface IProps {
   actions: any
 }
 
 export default function Patients(props: IProps) {
 
   // useEffect(() => {
 
   // }, [])
 
   return <Layout {...props} />;
 }
 