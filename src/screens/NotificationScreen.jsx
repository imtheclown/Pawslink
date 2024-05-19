import { 
    Text, 
    StyleSheet, 
    Pressable, 
    Image, 
    View,
    SafeAreaView,
    TouchableOpacity,
    ScrollView
} from "react-native";
import { Border, Color, FontFamily, FontSize } from "../assets/notification/GlobalStyles";
import { capitalizeFirstLetter } from "../utils/TextBasedUtilityFunctions";
import NotificationContainer from "../components/NotificationContainer";
const NotificationScreen = () => {
    // implement the back button
    return (
        <SafeAreaView style = {[styles.flexContainer,styles.mainContainer]}>
            <View style ={[styles.headerContainer]}>
                <TouchableOpacity style ={[styles.arrowContainer]}>
                    <Image
                    style = {[styles.arrowImage]}
                    source={require("../assets/notification/circle-arrow-left-1.png")}
                    resizeMode="cover"
                />
                </TouchableOpacity>
                <Text style ={[styles.notificationText]}>
                    {capitalizeFirstLetter('notifications')}
                </Text>
            </View>
            <ScrollView
            style = {[styles.mainContentContainer]}
            contentContainerStyle = {[styles.centerContainer]}>
                {/* query notifications here */}
                <NotificationContainer/>
            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    flexContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    mainContainer:{
        backgroundColor: Color.colorWhite,
        width: "100%",
    },
    headerContainer:{
        width: '90%',
        height: '10%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    arrowContainer:{
        height: 'auto',
        width: 'auto',
        marginRight: 20
    },
    arrowImage: {
        width: 34,
        height: 34,
    },
    notificationText:{
        fontSize: 24,
        lineHeight: 32,
        fontFamily: FontFamily.epilogueBold,
        textAlign: "left",
        fontWeight: "700",
        color: Color.colorPalevioletred,
    },
    mainContentContainer:{
        width: '100%',
        height: '90%',
    },
    centerContainer:{
        justifyContent: 'center',
        alignItems: 'center'
    }
    
})

export default NotificationScreen