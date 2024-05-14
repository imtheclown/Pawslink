import { View,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity
} from "react-native";
import { FontFamily, Color, FontSize, Border } from "../assets/forms/GlobalStyles";
import { useNavigation } from "@react-navigation/native";
const FormButton = ({textlabel, styleButton, styleText, eventHandler}) => {

    return(
        <TouchableOpacity style = {[styles.defaultButton, styleButton]}
        onPress={eventHandler}
        >
        {/* return button */}
            <Text style = {[styles.defaultText, styleText]}>
                {textlabel}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    defaultButton:{
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "rgba(23, 26, 31, 0.12)",
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowRadius: 2,
        elevation: 2,
        width: '100%',
        height: 52,
        borderRadius: Border.br_7xl,
        overflow: "hidden",
        marginBottom: 10,
    },
    defaultText: {
        fontSize: FontSize.size_lg,
        lineHeight: 28,
        fontFamily: FontFamily.interRegular,
    }
})

export default FormButton;