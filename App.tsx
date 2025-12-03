import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import { UserProvider } from "./context/UserContext";

import Page2Screen from "./screens/Page2Screen";
import Page3Screen from "./screens/Page3Screen";
import Page4Screen from "./screens/Page4Screen";
import Page5Screen from "./screens/Page5Screen";
import Page6Screen from "./screens/Page6Screen";
import Page7Screen from "./screens/Page7Screen";
import Page8Screen from "./screens/Page8Screen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="index">
          <Stack.Screen
            name="Page2"
            component={Page2Screen}
            options={{ title: "Página 2" }}
          />
          <Stack.Screen
            name="Page3"
            component={Page3Screen}
            options={{ title: "Página 3" }}
          />
          <Stack.Screen
            name="Page4"
            component={Page4Screen}
            options={{ title: "Página 4" }}
          />
          <Stack.Screen
            name="Page5"
            component={Page5Screen}
            options={{ title: "Página 5" }}
          />
          <Stack.Screen
            name="Page6"
            component={Page6Screen}
            options={{ title: "Página 6" }}
          />
          <Stack.Screen
            name="Page7"
            component={Page7Screen}
            options={{ title: "Detalle" }}
          />
          <Stack.Screen
            name="Page8"
            component={Page8Screen}
            options={{ title: "Calendario" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
