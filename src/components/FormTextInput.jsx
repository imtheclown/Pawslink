import { 
    View,
    Text,
    TextInput,
    StyleSheet, 
    KeyboardAvoidingView
} from "react-native"
import { FontFamily, Color, FontSize, Border } from "../assets/forms/GlobalStyles";
const FormTextInput = ({title}) => {
    return (
        <KeyboardAvoidingView>
            <View style = {[styles.textInputContainer]}>
                <Text style = {[styles.textInputTitle]}>
                    {title}
                </Text>
                <TextInput style = {[styles.textInputBox]}>
                </TextInput>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    textInputContainer:{
        height:'auto',
        width: '100%',
        marginBottom: 10
    },
    textInputTitle:{
        lineHeight: 22,
        fontWeight: "700",
        fontFamily: FontFamily.interBold,
        color: Color.colorDarkslategray,
        textAlign: "left",
        fontSize: FontSize.size_sm,
    },
    textInputBox:{
        borderRadius: Border.br_9xs,
        backgroundColor: Color.colorWhite,
        borderStyle: "solid",
        borderColor: Color.colorDarkslateblue,
        borderWidth: 1,
        fontFamily: FontFamily.interRegular,
        fontSize: FontSize.size_sm,
    }
})

export default FormTextInput