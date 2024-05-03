import { View,
    SafeAreaView,
    Image,
    TouchableOpacity,
    StyleSheet,
    Text
 } from "react-native";
import { Border, Color, FontFamily, FontSize } from "../assets/forum/GlobalStyles";

const PostContainer = ({username, profilePicture, content, postImage, hasImage, commentNum, datePosted }) =>{
    return (
        <SafeAreaView>
            <TouchableOpacity style = {[styles.postContainer]}>
                {/* top container */}
                <View style = {[styles.postTopContainer]}>
                    <View style = {[styles.profileContainer]}>
                        {/* profile picture */}
                        <Image
                        style = {[styles.profilePicture]}
                        resizeMode="cover"
                        source={require("../assets/forum/avatar-5.png")}
                        />
                        {/* username */}
                        <Text style={[styles.username]}>randomuser</Text>
                    </View>
                    {/* content */}
                    <View style = {[styles.contentContainer]}>
                        {/* title */}
                        <Text style = {[styles.postTitle]}>this is a question</Text>
                        {/* content */}
                        <Text numberOfLines={3} style = {[styles.contentText]}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim veniam, quis sdfgdfgds dsfg sdfg dsg dsgfd
                        </Text>
                    </View>
                </View>
                {/* image part */}
                {hasImage?
                    <View style={[styles.postImageContainer]}>
                        <View style = {[styles.contentImageContainer]}>
                            <Image
                            style = {[styles.postImage]}
                            resizeMode="cover"
                            source={require("../assets/forum/image-109.png")}
                            />
                        </View>
                    </View>: <></>
                }
                {/* bottom part */}
                <View  style = {[styles.bottomContainer]}>
                    {/* comment stuff */}
                    <View style = {[styles.bottomContentContainer]}>
                        <View style={[styles.flexContainer, styles.commentSection]}>
                            <Image
                            style = {[styles.commentIcon]}
                            source={require("../assets/forum/comment-2.png")}
                            />
                            <Text style={[styles.username]}>5 comments</Text>
                        </View>
                        <View style = {[styles.flexContainer, styles.commentSection]}>
                            <Text style={[styles.username]}>03-10-2024</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    flexContainer:{
        flex:1
    },
    postContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
        shadowRadius: 2,
        shadowColor: "rgba(23, 26, 31, 0.12)",
        borderRadius: Border.br_3xs,
        left: 19,
        shadowOpacity: 1,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        backgroundColor: Color.colorWhite,
        width: '90%',
        marginBottom:10
    },
    postTopContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        height: 90,
    },
    profileContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentContainer:{
        flex: 3,
    },
    profilePicture:{
        borderRadius: 24,
        width: 48,
        height: 48,
        overflow: "hidden",
    },
    username:{
        color: Color.colorLightslategray,
        lineHeight: 18,
        textAlign: "left",
        fontFamily: FontFamily.interRegular,
        fontSize: FontSize.size_3xs,
    },
    contentText:{
        lineHeight: 14,
        color: Color.colorSilver,
        width: 260,
        fontSize: FontSize.size_3xs,
        textAlign: "left",
        fontFamily: FontFamily.interRegular
    },
    postTitle:{
        fontSize: FontSize.size_2xs,
        fontFamily: FontFamily.interBold,
        color: Color.colorDarkslateblue,
        fontWeight: "700",
        lineHeight: 18,
        textAlign: "left",
    },
    postImageContainer:{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    contentImageContainer:{
        width: '75%',
        justifyContent: 'flex-start',
        flexDirection:'row'
    },
    postImage:{
        width: '95%',
        maxHeight: 247,
        minHeight: 270
    },
    bottomContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 35,
        maxHeight: 35,
    },
    bottomContentContainer:
    {
        flexDirection: 'row',
        width: "90%"
    },
    commentSection:{
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'row'
    },
    commentIcon:{
        height: 12,
        width: 12,
        overflow: 'hidden'
    }
})
export default PostContainer