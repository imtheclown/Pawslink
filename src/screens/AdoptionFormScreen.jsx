import { View,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity
} from "react-native";
import { FontFamily, Color, FontSize, Border } from "../assets/forms/GlobalStyles";
import FormTextInput from "../components/FormTextInput";
import CheckBox from '@react-native-community/checkbox';
const AdoptionFormScreen = () =>{
    // header will just change in terms of name
    // scrollview forms will be the one to change per press of buttons
    // create states for this
    return(
        <SafeAreaView style = {[styles.mainContainer, styles.flexContainer]}>
            {/* header */}
            <View style = {[styles.header, styles.centeredContainer]}>
                <Text style = {[styles.headerText]}>verify for adoption</Text>
            </View>
            {/* form */}
            <View style = {[styles.formContainer, styles.centeredContainer]}>
                <ScrollView style = {[styles.scrollViewContainer]}>
                    <FormTextInput title={'first name'}/>
                    <FormTextInput title={'last name'}/>
                    <View style={[styles.ageStudentContainer]}>
                        {/* age */}
                        <View style = {[styles.ageContainer]}>
                            <Text style={[styles.ageText]}>age</Text>
                            <TextInput
                                style={[styles.ageInputText]}
                                placeholder="Input number"
                                keyboardType="number-pad"
                                placeholderTextColor="#bdc1ca"
                            />
                        </View>
                        {/* checkboxes */}
                        <View style = {[styles.studentContainer]}>
                            {/* title */}
                            <Text style = {[styles.studentText]}>student</Text>
                            {/* checkboxes */}
                            <View style = {[styles.checkBoxContainer]}>
                                <View style = {[styles.indivCheckBoxContainer]}>
                                    <CheckBox
                                    value = {false}/>
                                    <Text style = {[styles.checkBoxLabel]}>yes</Text>
                                </View>
                                <View style = {[styles.indivCheckBoxContainer]}>
                                    <CheckBox
                                        value ={true}
                                    />
                                    <Text style = {styles.checkBoxLabel}>no</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <FormTextInput title={'contact number'}/>
                    <FormTextInput title={'email address'}/>
                    <FormTextInput title={'facebook link'}/>
                    <FormTextInput title={'complete home address'}/>
                    <FormTextInput title={'complete current address'}/>
                </ScrollView>
            </View>
            {/* buttons */}
            <View style = {[styles.buttonContainer, styles.centeredContainer]}>
                
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    flexContainer:{
        flex: 1,
    },
    centeredContainer:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    mainContainer: {
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
    },
    header:{
        flex: 1,
        width: '100%'
    },
    formContainer:{
        flex: 7,
        width: '100%'
    },
    buttonContainer:{
        flex: 2,
        width: '100%'
    },
    headerText:{
        fontSize: 25,
        lineHeight: 28,
        fontWeight: "700",
        fontFamily: FontFamily.interBold,
        color: Color.colorDarkslateblue,
        textAlign: "left",
    },
    scrollViewContainer:{
        width: '90%',
        height: '100%'
    },
    ageStudentContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: Color.colorGray_200,
        width: '100%',
        height: 80,
    },
    ageContainer:{
        width: '50%',
        height: '100%'
    },
    studentContainer: {
        flexDirection: 'column',
        width: '50%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    ageText:{
        lineHeight: 22,
        fontWeight: "700",
        fontFamily: FontFamily.interBold,
        color: Color.colorDarkslategray,
        textAlign: "left",
    },
    ageInputText:{
        borderRadius: Border.br_9xs,
        backgroundColor: Color.colorWhite,
        borderStyle: "solid",
        borderColor: Color.colorLightslategray,
        borderWidth: 1,
        fontFamily: FontFamily.interRegular,
    },
    checkBoxContainer:{
        width: '100%',
        height: '70%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    indivCheckBoxContainer:{
        width: '50%',
        height: '100%',
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 5
    },
    studentText:{
        fontWeight: "700",
        fontFamily: FontFamily.interBold,
        color: Color.colorDarkslategray,
    },
    checkBoxLabel:{
        lineHeight: 22,
        fontSize: FontSize.size_sm,
        fontFamily: FontFamily.interRegular,
        color: Color.colorGray_100,
    }
})

export default AdoptionFormScreen