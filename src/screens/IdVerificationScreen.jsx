import { View,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image
} from "react-native";;
import DocumentPicker, { types } from 'react-native-document-picker';
import { Border, Color, FontFamily, FontSize } from "../assets/forms/GlobalStyles";
import { capitalizeFirstLetter } from "../utils/TextBasedUtilityFunctions";
import FormButton from "../components/FormButton";

const IMAGE_TYPES =[
    DocumentPicker.types.images
]
const IdVerificationScreen = ({route, navigation}) => {
    const pickDocument = async () => {
        try {
          const result = await DocumentPicker.pick({
            // allowMultiSelection: false,
            type: IMAGE_TYPES,
          });
          if (result) {
            console.log('Picked document:0', result);
            const { name, size, type, uri } = result[0];
            return {
                name,
                type,
                uri,
                size,
              };
            }
        } catch (err) {
          if (DocumentPicker.isCancel(err)) {
            // User cancelled the document picker
            console.log('Document picker cancelled by user');
          } else {
            // Handle other errors
            console.log('Error picking document:', err);
          }
          return null;
        }
    };
     return (
        <SafeAreaView style = {[styles.mainContainer, styles.flexContainer]}>
        {/* contentcontainer */}
        <View style = {[styles.header, styles.centeredContainer]}>
            <Text style = {[styles.headerText]}>verify for adoption</Text>
        </View>
            {/* form */}
        <View style = {[styles.formContainer, styles.centeredContainer]}>
            <ScrollView style = {[styles.scrollViewContainer]}>
                <View style = {[styles.filePickerContainer]}>
                    <View>
                        <Text style ={[styles.verificationText]}>
                        {`Please attach a copy of your ID for us to verify your identity.`}
                        </Text>
                    </View>
                    {/* selection */}
                    <View style ={[styles.idVerificationContentContainer]}>
                        {/* top view */}
                        <View style ={[styles.flexContainer, styles.idVerTopContainer]}>
                            <View style ={[styles.idVerTopContentContainer]}>
                                <Text style ={[styles.idVerTopContainerText]}>
                                id photo
                                </Text>
                                <TouchableOpacity>
                                    <Image
                                    style ={[styles.removeButton]}
                                    resizeMode="cover"
                                    source={require("../assets/id_verification/e-remove-2.png")}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {/* mid view */}
                        <TouchableOpacity style ={[styles.flexContainer, styles.idVertMidContainer]}
                            onPress={pickDocument}
                        >
                                <Text style ={[styles.idVerTopContainerText]}>
                                    {capitalizeFirstLetter("attach file")}
                                </Text>
                                <Text style ={[styles.supportedFormatText]}>
                                    {capitalizeFirstLetter("supported format: PNG, JPG")}
                                </Text>
                        </TouchableOpacity>
                        {/* bot view */}
                        <View style ={[styles.flexContainer, styles.idVertBottomContainer]}>
                            <TouchableOpacity style ={[styles.idVertButton]}>
                                <Text style ={[styles.idVerButtonText, styles.idVerCancelText]}>{capitalizeFirstLetter("cancel")}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style ={[styles.idVertButton, styles.idverUploadButton]}>
                                <Text style ={[styles.idVerButtonText, styles.idVerUploadText]}>{capitalizeFirstLetter("upload")}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <FormButton
                    textlabel={"next"}
                    styleButton={styles.nextButton}
                    styleText={styles.nextText}
                />
                <FormButton
                    textlabel={"return to previous page"}
                    styleButton={styles.returnButton}
                    styleText={styles.returnText}
                />
            </ScrollView>
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
        flex: 9,
        width: '100%'
    },

    headerText:{
        textTransform: 'capitalize',
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
    bottomContentContainer:{
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        flexDirection: 'column',
    },
    returnButton:
    {
        backgroundColor: Color.colorGray_200,
        borderColor: Color.colorPalevioletred,
        borderStyle: "solid",
        borderWidth: 1,
    },
    nextButton:{
        backgroundColor: Color.colorPalevioletred,
    },
    returnText: {
        color: Color.colorPalevioletred,
    },
    nextText:{
        color: Color.colorWhite,
    },
    filePickerContainer:{
        width: '100%',
        justifyContent:'center',
        alignItems: 'center',
    },
    verificationText:{
        color: Color.colorGray_100,
        lineHeight: 26,
        fontSize: FontSize.size_base,
        fontFamily: FontFamily.interRegular,
        textAlign: "left",
    },
    idVerificationContentContainer:{
        marginBottom: 50,
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
        height: 230,
        borderRadius: Border.br_7xs,
        elevation: 2,
        shadowRadius: 2,
        shadowColor: "rgba(23, 26, 31, 0.12)",
        overflow: "hidden",
        backgroundColor: Color.colorWhite,
        shadowOpacity: 1,
        shadowOffset: {
          width: 0,
          height: 3,
        },
    },
    idVerTopContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
        width: '90%'
    },
    idVerTopContentContainer:{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    idVerTopContainerText:{
        fontFamily: FontFamily.epilogueRegular,
        lineHeight: 30,
        fontSize: FontSize.size_xl,
        color: Color.colorGray_100,
        textAlign: "left",
    },
    removeButton:{
        width: 28,
        height: 28
    },
    idVertMidContainer:{
        flexDirection:'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        height: '100%',
        backgroundColor: "#fafafb",
        borderStyle: "dashed",
        borderColor: "#bdc1ca",
        borderWidth: 2,
        borderRadius: Border.br_7xs,
    },
    supportedFormatText:{
        lineHeight: 22,
        fontSize: FontSize.size_sm,
        color: Color.colorSlategray,
    },
    idVertBottomContainer:{
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    idVertButton:{
        justifyContent: 'center',
        alignItems:'center',
        borderRadius: Border.br_9xs,
        width: 82,
        height: 36,
    },
    idverUploadButton:{
        backgroundColor: Color.colorPalevioletred,
    },
    idVerButtonText:{
        lineHeight: 22,
        fontSize: FontSize.size_sm,
        fontFamily: FontFamily.interRegular,
    },
    idVerUploadText:{
        color: Color.colorWhite,
    },
    idVerCancelText:{
        color: "#9095a1",
    }
})

export default IdVerificationScreen