import {
    Image,
    StyleSheet,
    Pressable,
    View,
    Text,
    ImageBackground,
    SafeAreaView,
    ScrollView
  } from "react-native";
import { Color, FontFamily, FontSize } from "../assets/events/GlobalStyles";

const EventPostContainer = ({hasImage}) =>{
    return (
    <View style = {[styles.eventMainContainer]}>
        {/* image container */}
        {
            hasImage?         
            <View style = {[styles.postImageContainer]}>
                <Image
                resizeMode="cover"
                style= {[styles.postImage]}
                source={require("../assets/events/event_img_placeholder.png")}/>
            </View>
            :
            <></>
        }
        {/* other details */}
        <View style = {[styles.descriptionContainer]}>
            <Text style = {[styles.eventTitle]}>event title</Text>
            <View style = {[styles.detailContainer]}>
                {/* date */}
                <Text style={[styles.detailtext]}>
                    May 28, 2024 | 
                </Text>
                {/* time */}
                <Text style={[styles.detailtext]}>
                    4:30 PM | 
                </Text>
                {/* location */}
                <Text style={[styles.detailtext]}>
                    CDH
                </Text>
            </View>
            {/* description */}
            <View style = {[styles.bottomText]}>
                <Text style={[styles.detailtext]}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                </Text>
            </View>
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    eventMainContainer:{
        marginBottom: 15,
        borderRadius: 4,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
        shadowRadius: 2,
        shadowColor: "rgba(23, 26, 31, 0.12)",
        shadowOpacity: 1,
        shadowOffset: {
          width: 0,
          height: 3,
        },
        backgroundColor: Color.colorWhite
    },
    postImageContainer: {
        width: '100%',
        height: 'auto',
        justifyContent: 'center',
        alignItems: 'center'
    },
    postImage: {
        marginTop: 10,
        width: '95%',
        aspectRatio: 1,
        height: 'auto'
    },
    descriptionContainer:{
        width: '95%',
        height: 'auto'
    },
    eventTitle: {
        fontSize: 18,
        textAlign: "left",
        color: Color.colorPalevioletred,
        fontFamily: FontFamily.epilogueBold,
        fontWeight: "700",
        lineHeight: 32,
        textTransform: 'capitalize',
        alignSelf: 'flex-start'
    },
    detailContainer:{
        flexDirection:'row',
        width: '100%',
        height: 'auto',
        justifyContent:'flex-start',
        alignItems: 'center'
    },
    detailtext:{
        color: Color.colorDarkslategray,
        fontFamily: FontFamily.interRegular,
        lineHeight: 19,
        fontSize: FontSize.size_xs,
        textAlign: "left",
        paddingRight: 5
    },
    bottomText:{
        width: '100%',
        height: 'auto',
        marginBottom: 10
    }
})

export default EventPostContainer