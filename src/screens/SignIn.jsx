import { KeyboardAvoidingView, 
    SafeAreaView, 
    StyleSheet, 
    Image, 
    View, 
    Text,
    TouchableOpacity,
    Pressable
 } from "react-native";
import { useState } from "react";
import { AppProvider, UserProvider } from "@realm/react";

import CredentialInputTextBox from "../components/CredentialTextInput";
import PasswordInputField from "../components/PasswordInputField";
import { FontSize, FontFamily, Color } from "../assets/sign_in/GlobalStyles";
import { APP_ID } from "../database/RealmConfig";

const SignInScreen = () =>{
    const [userName, setUsername] = useState("")
    const [password, setPassword] = useState("")
    return(
        <SafeAreaView style = {[styles.flexContainer]}>
        <KeyboardAvoidingView style = {[styles.flexContainer]}>
            {/* Top view */}
            <View style = {[styles.flexContainer, styles.topContainer]}>
                <Image 
                style = {[styles.pawsLinkLogo]}
                resizeMode="cover"
                source={require('../assets/logo/pawslink_round.png')}/>
                <Text style = {[styles.welcomeBackText]}>
                welcome back
                </Text>
            </View>
            {/* mid view */}
            <View style = {[styles.flexContainer, styles.midView]}>
                <CredentialInputTextBox 
                name={"username"}
                imageAsset={require('../assets/sign_up/user.png')}
                value={userName}
                setValue={setUsername}
                isError={false}
                errorMessage={""}/>
                <PasswordInputField
                name={"password"}
                imageAsset={require("../assets/sign_up/password.png")}
                value={password}
                setValue={setPassword}
                isError={false}
                errorMessage={""}
                />
                <TouchableOpacity style = {[styles.logInButton]}>
                    <Text style={[styles.loginText]}>login</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style = {[styles.forgotPassText]}>
                        forgot password?
                    </Text>
                </TouchableOpacity>
                
            </View>

            {/* bottom view */}
            <View style = {[styles.flexContainer, styles.bottomView]}>
                <View style = {[styles.bottomSubContainer]}>
                    <View>
                        <Text>Error Message</Text>
                    </View>
                    <TouchableOpacity>
                    <Text style = {[styles.dontHaveAccountText]}>dont have an account? sign up</Text>
                    </TouchableOpacity>
                </View>
                <View style = {[styles.bottomSubContainer]}>
                    <Text style={[styles.inPartnerShipText]}>
                            in partnership with
                    </Text>
                    <View style = {[styles.bottomLogoContainer]}>
                        <Image
                        style = {[styles.bottomLogo]}
                        resizeMode="cover"
                        source={require("../assets/logo/upv_logo.png")}
                        />
                        <Image
                        style = {[styles.bottomLogo]}
                        resizeMode="cover"
                        source={require("../assets/logo/pahinungod_round.png")}
                        />
                        <Image
                        style = {[styles.bottomLogo]}
                        resizeMode="cover"
                        source={require("../assets/logo/project_pawradise_round.png")}
                        />
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    flexContainer : {
        flex: 1
    },
    topContainer:{
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    pawsLinkLogo: {
        width: 136,
        height: 136,
    },
    welcomeBackText: {
        fontSize: 42,
        lineHeight: 60,
        fontFamily: FontFamily.epilogueBold,
        color: "#774a7f",
        fontWeight: 700
    },
    midView: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logInButton: {
        marginTop: 5,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 31,
        backgroundColor: "#9032ab",
        height: 61,
        width: 337,
        elevation: 2,
        shadowRadius: 2,
        shadowColor: "rgba(23, 26, 31, 0.12)",
        shadowOffset: {
            width: 0,
            height: 3,
        }
    },
    loginText:{
        fontSize: 18,
        lineHeight: 28,
        fontFamily: FontFamily.interBold,
        color: "#fff",
        fontWeight: 700
    },
    forgotPassText: {
        fontSize: FontSize.size_base,
        fontFamily: FontFamily.interRegular,
        color: Color.colorPlum,
        lineHeight: 24
    },

    bottomView :{
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    bottomSubContainer:{
        flex: 1,
        flexDirection: "column",
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    bottomLogoContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    bottomLogo:{
        marginHorizontal: 10,
        height: 75,
        width: 75,
    },
    dontHaveAccountText : {
        textDecorationLine: "underline",
        color: "#424856",
        lineHeight: 24,
        textAlign: "left",
        fontSize: FontSize.size_base,
        fontFamily: FontFamily.interRegular
    },
    inPartnerShipText: {
        fontSize: 12,
        fontStyle: "italic",
        fontFamily: FontFamily.interLight,
        color: Color.colorPlum,
        lineHeight: 24
    }
})

export default SignInScreen