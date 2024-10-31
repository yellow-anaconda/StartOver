import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import store from './store';
import AppNavigator from "./src/navigation/AppNavigator"
import { UserContext } from './src/context/UserContext';
import { ModalPortal } from 'react-native-modals';

export default function App() {
  return (
    <>

      <Provider store={store}>
        <UserContext>
          <AppNavigator />
          <ModalPortal />
        </UserContext>
      </Provider>
    </>
    
       
     
   
  );
} 

