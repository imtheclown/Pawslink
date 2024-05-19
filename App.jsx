const Stack = createNativeStackNavigator();
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Realm from "realm";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BottomTabs from "./src/components/BottomTabs";
import ViewAnimal from "./src/screens/ViewAnimal";
import SignInScreen from "./src/screens/SignIn";
import SignUp from "./src/screens/SignUp";
const BrowseStack = createNativeStackNavigator();
import CreatePostScreen from "./src/screens/CreatePostScreen";
import LandingPageScreen from "./src/screens/LandingScreen";
import NeedLoginScreen from "./src/screens/NeedLogInScreen";
import LoadingScreen from "./src/screens/Loading";
import EventsScreen from "./src/screens/EventsScreen";
import AdoptionFormScreen1 from "./src/screens/AdoptionFormScreen1";
import AdoptionFormScreen2 from "./src/screens/AdoptionFormScreen2";
import AdoptionFormScreen3 from "./src/screens/AdoptionFormScreen3";
import AdoptionFormScreen4 from "./src/screens/AdoptionFormScreen4";
import IdVerificationScreen from "./src/screens/IdVerificationScreen";
import DataPrivacyContentScreen from "./src/screens/DataPrivacyContentScreen";
import ThankYouForAdoptionScreen from "./src/screens/ThankYouForAdoptionScreen";
import ViewPostScreen from "./src/screens/ViewPostScreen";
import NotificationScreen from "./src/screens/NotificationScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import EditProfileScreen from "./src/screens/EditProfileScreen";
const AppStack = () =>{
    return(
        <BrowseStack.Navigator>
            <BrowseStack.Screen
            name="Landing Page"
            component={LandingPageScreen}
            options={{
              headerShown : false
            }}/>
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
            <BrowseStack.Screen
            name="Create Post"
            component={CreatePostScreen}
            options={{
              headerShown: false
              }
            }/>
            <BrowseStack.Screen
            name="Sign In"
            component={SignInScreen}
            options={{
              headerShown: false
              }
            }
            />
            <BrowseStack.Screen
            name="Sign Up"
            component={SignUp}
            options={{
              headerShown: false
              }
            }
            />
            <BrowseStack.Screen
            name="Adoption Form 1"
            component={AdoptionFormScreen1}
            options={{
              headerShown: false
            }}
            />
            <BrowseStack.Screen
            name="Adoption Form 2"
            component={AdoptionFormScreen2}
            options={{
              headerShown: false
            }}
            />
            <BrowseStack.Screen
            name="Adoption Form 3"
            component={AdoptionFormScreen3}
            options={{
              headerShown: false
            }}
            />
            <BrowseStack.Screen
            name="Adoption Form 4"
            component = {AdoptionFormScreen4}
            options={{
              headerShown: false
            }}
            />
            <BrowseStack.Screen
            name = "ID Verification"
            component ={IdVerificationScreen}
            options={{
              headerShown: false
            }}
            />
            <BrowseStack.Screen
            name = "Data Privacy Consent"
            component ={DataPrivacyContentScreen}
            options={{
              headerShown: false
            }}
            />
            <BrowseStack.Screen
            name="Thank You For Adoption"
            component={ThankYouForAdoptionScreen}
            options={{
              headerShown: false
            }}
            />
        </BrowseStack.Navigator>
    )
}
const App = () => {
  Realm.copyBundledRealmFiles()
  return (
      // <NavigationContainer>
      //   <AppStack/>
      // </NavigationContainer>
      <EditProfileScreen/>
  );
};
export default App;

