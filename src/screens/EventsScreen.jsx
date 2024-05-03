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
import EventPostContainer from "../components/EventPostContainer";
const EventsScreen = () => {
    return (
        <SafeAreaView style = {[styles.flexContainer, styles.mainContainer]}>
            {/* header */}
            <View style={[styles.headerContainer]}
            >
                <Image
                style= {[styles.headerLogoStyle]}
                resizeMode="cover"
                source={require("../assets/logo/pawslink_header.png")}/>
                <Text style={[styles.eventText]} >events</Text>
            </View>

            {/* content */}
            <ScrollView 
            style ={[styles.eventContainer]}
            >
                <EventPostContainer hasImage={true}/>
                <EventPostContainer/>
                <EventPostContainer hasImage={true}/>
            </ScrollView>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    flexContainer: {
        flex: 1
    },
    mainContainer:{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerLogoStyle: {
        width: 129,
        height: 57,
    },
    headerContainer: {
        flexDirection: 'column',
        height: '15%',
        width: '90%',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    eventText:{
        fontSize: 24,
        textAlign: "left",
        color: Color.colorPalevioletred,
        fontFamily: FontFamily.epilogueBold,
        fontWeight: "700",
        lineHeight: 32,
        textTransform: 'capitalize',
        paddingLeft: 10
    },
    eventContainer:{
        width: '90%',
        height: '80%'
    },
    eventContentContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    // event container component
})

export default EventsScreen