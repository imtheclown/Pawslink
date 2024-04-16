const Stack = createNativeStackNavigator();
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BottomTabs from "./src/components/BottomTabs";
import ViewAnimal from "./src/screens/ViewAnimal";
import Realm from "realm";

const BrowseStack = createNativeStackNavigator();

const AppStack = () =>{
    return(
        <BrowseStack.Navigator>
            <BrowseStack.Screen
            name="Home" 
            component={BottomTabs}
            options={{
              headerShown: false
              }
            }/>
            <BrowseStack.Screen 
            name="View Animal" 
            component={ViewAnimal}
            options={{
              headerShown: false
              }
            }/>
        </BrowseStack.Navigator>
    )
}
const App = () => {
  Realm.copyBundledRealmFiles()
  return (
      <NavigationContainer>
        <AppStack/>
      </NavigationContainer>
  );
};
export default App;

