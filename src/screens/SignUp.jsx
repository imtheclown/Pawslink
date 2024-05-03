import React from "react";
import { KeyboardAvoidingView,
SafeAreaView, 
View, 
StyleSheet, 
Image, 
Text, 
TextInput, 
Pressable,
TouchableOpacity} from "react-native";
import { FontFamily, Color, Border, FontSize } from "../assets/sign_up/GlobalStyles";
import { useState } from "react";
import CheckBox from '@react-native-community/checkbox';
import { AppProvider, UserProvider } from "@realm/react";

import CredentialInputTextBox from "../components/CredentialTextInput";
import PasswordInputField from "../components/PasswordInputField";

// regular expression for the user name, password and email
const userNameRegEx = /^[a-zA-Z0-9]{8,}$/
const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*.]).{8,}$/

const SignUp = () => {
    const [isChecked, setIsChecked] = useState(false);
    const [userName, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPass, setConfirmPass] = useState("")
    const [userNameError, setUserNameError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [passError, setPassError] = useState(false)
    const [confPassErr, setConfPassError] = useState(false)

    const checkUserName = () => {
        if(userNameRegEx.test(userName)){
            setUserNameError(false)
        }else{
            setUserNameError(true)
        }
    }
    const checkEmail = () => {
        if(emailRegEx.test(email)){
            setEmailError(false)
        }else{
            setEmailError(true)
        }
    }
    const checkPass = () => {
        if(passwordRegEx.test(password)){
            setPassError(false)
        }else{
            setPassError(true)
        }
    }
    const checkConfirmPass = () => {
        if(password !== confirmPass){
            setConfPassError(true)
        }else{
            setConfPassError(false)
        }
    }
    const SubmitRegistration = () =>{
        checkUserName();
        checkEmail();
        checkPass();
        checkConfirmPass();
    }
    

    const ToggleAgreementCheckBox = () => {
        setIsChecked(!isChecked)
    }
    return (
        <SafeAreaView style = {[styles.flexContainer]}>
            <KeyboardAvoidingView style = {[styles.flexContainer]} enabled = {false}>
                <View style={styles.flexContainer}>
                    {/* logo */}
                        <View style = {[styles.topView]}>
                            <Image
                                style={styles.topLogo}
                                resizeMode="cover"
                                source={require("../assets/general/image-23.png")}
                            />
                            <Text style={[styles.createAccountText]}>
                                create an account
                            </Text>
                        </View >
                    {/* forms */}
                    <View style = {[styles.midView]}>
                        <CredentialInputTextBox
                        imageAsset={require("../assets/sign_up/user.png")}
                        name={"username"}
                        value={userName}
                        setValue={setUsername}
                        isError={userNameError}
                        errorMessage={"ⓘ Use only letters and numbers, minimum 8 characters."}
                        /> 
                        <CredentialInputTextBox
                        imageAsset={require("../assets/sign_up/email.png")}
                        name={"email"}
                        value={email}
                        setValue={setEmail}
                        isError={emailError}
                        errorMessage={`ⓘ Invalid email format.`}
                        /> 
                        <PasswordInputField
                        imageAsset={require("../assets/sign_up/password.png")}
                        name={"password"}
                        value={password}
                        setValue={setPassword}
                        isError={passError}
                        errorMessage={`ⓘ Needs an uppercase, lowercase, a number, and a special character: @&%*#.`}
                        />

                        <PasswordInputField
                        imageAsset={require("../assets/sign_up/password1.png")}
                        name={"confirm password"}
                        value={confirmPass}
                        setValue={setConfirmPass}
                        isError={confPassErr}
                        errorMessage={`ⓘ Passwords do not match!`}/>
                    </View>
                    {/* bottom part */}
                    <View style = {[styles.bottomView]}>
                        {/* checkbox and the link for the terms and condition */}
                        <View style={[styles.bottomViewContainer]}>
                            <CheckBox
                                disabled={false}
                                value={isChecked}
                                onValueChange={ToggleAgreementCheckBox}
                            />
                            {/* the terms and conditions */}
                            <View style={[styles.termsAndConditionsContainer]}>
                                <Text style = {[styles.firsText]}>
                                    {`I accept the `}
                                </Text>
                                <TouchableOpacity>
                                    <Text style = {[styles.secondText]}>
                                        {`Terms and Conditions`}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View>
                            <TouchableOpacity
                                style={[styles.signUpButton]}
                                onPress={SubmitRegistration}
                            >
                                <Text style={[styles.signUpText]}>sign up</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    flexContainer:{
        flex: 1
    },
    topView: {
        marginTop: 10,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    topLogo:{
        width: 167,
        height: 74,
    },
    createAccountText: {
        fontSize: 27,
        lineHeight: 42,
        color: "#d2628a",
        textAlign: "center",
        fontFamily: FontFamily.epilogueBold,
        fontWeight: "700",
    },
    midView:{
        flex: 4,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    bottomView: {
        flex: 3,
        flexDirection: 'column',
        alignItems: 'center'
    },
    bottomViewContainer: {
        height: '10%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    checkBox:{
        backgroundColor: "transparent",
    },
    checkBoxButton:{
        overflow: "hidden"
    },
    termsAndConditionsContainer:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    firsText: {
        color: Color.colorDarkslategray
    },
    secondText: {
        color: "#379ae6",
        textDecorationLine: "underline",
    },
    signUpButton:{
        borderRadius: 31,
        backgroundColor: "#9032ab",
        width: 303,
        height: 61,
        elevation: 2,
        shadowRadius: 2,
        shadowColor: "rgba(23, 26, 31, 0.12)",
        shadowOpacity: 1,
        shadowOffset: {
          width: 0,
          height: 3,
        },
        alignItems: 'center',
        justifyContent: 'center'
    },
    signUpText:{
        fontSize: 20,
        lineHeight: 30,
        color: "#fff",
        fontFamily: FontFamily.epilogueBold,
        fontWeight: "700"
    },
    errorBorder:{
        borderWidth: 1,
        borderColor: 'red'
    }

})

export default SignUp;