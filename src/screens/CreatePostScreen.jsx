import { SafeAreaView,
    StyleSheet,
    View,
    Text,
    TextInput,
    Pressable,
    Image,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard
} from "react-native"
import { FontSize, FontFamily, Border, Color } from "../assets/create_post/GlobalStyles";
const CreatePostScreen = () =>{
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style = {[styles.flexContainer, styles.mainContainer]}>
            {/* header */}
            <View style = {[styles.headerContainer]}>
                <Text style = {[styles.createPostText]}>
                create a post
                </Text>
            </View>
            {/* create post */}
            <View style = {[styles.creatPostContainer]}>
                <TextInput
                    style = {[styles.createPostTextInput]}
                    placeholder="Add a title..."
                    placeholderTextColor="#9095a1"
                />
                <TextInput
                numberOfLines={6}
                multiline={true}
                textAlignVertical="top"
                style = {[styles.createContentTextInput]}
                placeholder="Write text here..."
                placeholderTextColor="#9095a1"
                returnKeyType="done"
                />
                <View>
                    <TouchableOpacity style={[styles.attachFileButton]}>
                        <Image
                        style={[styles.attachmentIcon]}
                        resizeMode="cover"
                        source={require("../assets/create_post/attachment.png")}
                        />
                        <Text style={[styles.attachButtonText]}>attach file</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* buttons */}
            <View style = {[styles.buttonContainer]}>
                <TouchableOpacity style={[styles.postButton]}>
                    <Text style = {[styles.postButtonText]}>post</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {[styles.cancelButton]}>
                    <Text style = {[styles.cancelText]}>cancel</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    flexContainer: {
        flex: 1
    },
    mainContainer:{
        alignItems: 'center'
    },
    headerContainer:{
        width: '90%',
        height: '10%',
        flexDirection:'column',
        justifyContent: 'flex-end'
    },
    createPostText:{
        fontSize: 21,
        lineHeight: 32,
        fontFamily: FontFamily.epilogueBold,
        color: "#774a7f",
        textAlign: "left",
        fontWeight: "700",
        marginVertical: 20
    },
    creatPostContainer:{
        width: '90%',
        height: "50%",
    },
    createPostTextInput:{
        height: 45,
        fontFamily: FontFamily.interBold,
        fontSize: FontSize.size_lg,
        width: '100%',
        elevation: 2,
        shadowRadius: 2,
        shadowColor: "rgba(23, 26, 31, 0.12)",
        borderRadius: Border.br_9xs,
        fontWeight: "700",
        shadowOpacity: 1,
        shadowOffset: {
          width: 0,
          height: 3,
        },
        backgroundColor: Color.colorWhite,
        marginBottom: 10
    },
    createContentTextInput:{
        width: '100%',
        borderRadius: Border.br_9xs,
        elevation: 2,
        shadowRadius: 2,
        shadowColor: "rgba(23, 26, 31, 0.12)",
        shadowOpacity: 1,
        shadowOffset: {
          width: 0,
          height: 3,
        },
        backgroundColor: Color.colorWhite,
        fontFamily: FontFamily.interRegular,
        paddingBottom: 20,
        fontSize: 25
    },
    attachFileButton:{
        flexDirection: 'row',
        height: 36,
        backgroundColor: Color.colorPalevioletred,
        overflow: "hidden",
        borderRadius: Border.br_9xs,
        justifyContent: 'center',
        alignItems: 'center'
    },
    attachButtonText:{
        lineHeight: 22,
        color: Color.colorWhite,
        fontSize: FontSize.size_sm,
        fontFamily: FontFamily.interRegular,
        textAlign: "left"
    },
    attachmentIcon:{
        width: 16,
        height: 16,
        overflow: "hidden",
    },
    buttonContainer:{
        width: '90%',
        flexDirection: 'column',
        alignItems:'center',
    },
    postButton:{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.colorPalevioletred,
        elevation: 2,
        shadowRadius: 2,
        shadowColor: "rgba(23, 26, 31, 0.12)",
        shadowOpacity: 1,
        shadowOffset: {
          width: 0,
          height: 3,
        },
        height: 52,
        width: '100%',
        borderRadius: Border.br_7xl,
        overflow: "hidden",
    },
    postButtonText :{
        fontFamily: FontFamily.interRegular,
        fontSize: FontSize.size_lg,
        textAlign: "left",
        color: Color.colorWhite,
    },
    cancelButton:{
        marginTop: 10,
        backgroundColor: "rgba(0, 0, 0, 0)",
        borderStyle: "solid",
        borderColor: Color.colorPalevioletred,
        borderWidth: 1,
        height: 52,
        width: '100%',
        borderRadius: Border.br_7xl,
        overflow: "hidden",
        justifyContent: 'center',
        alignItems: 'center'
    },
    cancelText:{
        color: Color.colorPalevioletred,
    }
})

export default CreatePostScreen