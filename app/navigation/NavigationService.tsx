import * as React from 'react';
import { NavigationContainerRef } from '@react-navigation/native';
import { createNavigationContainerRef } from '@react-navigation/native';

// NavigationContainer is referred here - Check NavigationStack
export const navigationRef = React.createRef<any>();

export const navigationNotfiRef = React.createRef<any>();

function navigate(name: string, params?: any) {
  navigationRef.current?.navigate(name, params);
}

function goBack() {
  navigationRef.current?.goBack();
}

function navigateNotification(name: string, params?: any) {
  navigationNotfiRef.current?.navigate(name, params);
}

function goBackNotification() {
  navigationNotfiRef.current?.goBack();
}

export default {
  navigate,
  goBack,
  navigateNotification,
  goBackNotification
};
