import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import LoginScreen from './screens/LoginScreen';
import Page2Screen from './screens/Page2Screen';
import Page3Screen from './screens/Page3Screen';
import Page4Screen from './screens/Page4Screen';
import Page5Screen from './screens/Page5Screen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Page2" component={Page2Screen} options={{ title: 'Página 2' }} />
        <Stack.Screen name="Page3" component={Page3Screen} options={{ title: 'Página 3' }} />
        <Stack.Screen name="Page4" component={Page4Screen} options={{ title: 'Página 4' }} />
        <Stack.Screen name="Page5" component={Page5Screen} options={{ title: 'Página 5' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
