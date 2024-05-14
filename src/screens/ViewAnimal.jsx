import * as React from "react";
import { Pressable, Text, StyleSheet, View, Image, SafeAreaView, ScrollView, FlatList } from "react-native";
import { Color, FontFamily, FontSize } from "../assets/view_animal/GlobalStyles";

// placeholders for nows
const lastVaccination = {
    title: 'VACCINATED LAST:',
    value: 'NA'
}

const lastDeworm= {
    title: 'DEWORMED LAST:',
    value: 'NA'
}



// generates an object
const boxContentGenerator = (title, value) =>{
    return{
        title: title,
        value: value
    }
}
// creates small boxes component
const SmallBoxes = ({title, value}) => {
    return (
        <View style = {[styles.boxContainer]}>
            <Text style={[styles.titleStyle]}>{title.toUpperCase()}</Text>
            <Text style = {[styles.valueStyle]}>{value.toUpperCase()}</Text>
        </View>
    )
}
const ViewAnimal = ({route, navigation}) =>{
    const {animalObject} = route.params
    const {age, mainName, status, location, traitsAndPersonality, notes} = animalObject
    const newAge = boxContentGenerator("age", age)
    const newStatus = boxContentGenerator("status", status)
    
    const boxes = [newAge, newStatus, lastVaccination, lastDeworm]
    const goBackToBrowse = () =>{
        navigation.goBack();
    }
    const gotoForms = () =>{
        navigation.navigate({name:'Adoption Form 1'})
    }
    return(
        <SafeAreaView 
        style = {[styles.mainContainer, styles.sectionContainer]}>
            {/* return Button */}
            <View style = {[styles.sectionContainer, styles.backButtonContainer]}>
                <Pressable style={styles.backButton} onPress={goBackToBrowse}>
                    <Image
                    style={[styles.backButton]}
                    resizeMode="cover"
                    source={require("../assets/view_animal/circle-arrow-left-1.png")}
                    />
                </Pressable>
            </View>
            <SafeAreaView style = {[styles.scrollViewContainer]}>
                <ScrollView
                contentContainerStyle = {[styles.scrollViewStyle]}>
                {/* animal image*/}
                    <View style = {[styles.imageContainer]}>
                        <Image
                            style={styles.animalImage}
                            resizeMode="cover"
                            source={require("../assets/view_animal/image-82.png")}
                        />
                    </View>
                    {/* animal name, sex and location */}
                    <View style = {[styles.nameLocationContainer]}>
                        {/* name and gender icon */}
                        <View style = {[styles.name]}>
                            <Text style = {[styles.nameText]}>
                                {mainName}
                            </Text>
                            <Image
                                    style={styles.genderIcon}
                                    resizeMode="cover"
                                    source={require("../assets/general/woman-21-1.png")}
                            />
                        </View>
                        {/* location */}
                        <View style = {[styles.location]}>
                            <Text style={styles.locationText}>
                                {location}
                            </Text>
                        </View>
                    </View>
                    {/* age, status and medical records */}
                    <View style= {[styles.smallBoxesContainer]}>
                        <View style = {[styles.smallBoxesStyle]}>
                            {
                                boxes.map((item, index) =>(
                                    <SmallBoxes key={index} title={item.title} value={item.value}/>
                                ))
                            }
                        </View>
                    </View>
                    {/* traits and personality */}
                    <View  style = {[styles.longBoxContentContainer]}>
                        <View style = {[styles.longBoxIndivContainer]}>
                            <Text style={[styles.longBoxTitle]}>
                                TRAITS AND PERSONALITY
                            </Text>
                            <Text style={[styles.longBoxContent]}>   
                                {traitsAndPersonality}
                            </Text>
                        </View>
                        {/* other information */}
                        {
                            notes.length?
                            <View style = {[styles.longBoxIndivContainer]}>
                                <Text style={[styles.longBoxTitle]}>
                                    OTHER INFORMATION
                                </Text>
                                <Text style={[styles.longBoxContent]}>   
                                    {notes}
                                </Text>
                            </View>: <></>
                        }
                    </View>
                    {/* adopt me button */}
                    <View style = {[styles.adoptButtonContainer]}>
                        <Pressable
                            style={[styles.adoptMeButton]}
                            onPress={gotoForms}
                        >
                            <Text style={styles.adoptButtonText}>adopt me</Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaView>
    )
}

export default ViewAnimal

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection : 'column',
        flex: 1,
        backgroundColor: Color.colorWhite,
    },
    sectionContainer: {
        flex: 1
    },
    backButtonContainer: {
        justifyContent: 'flex start',
        flexDirection: 'row',
        alignItems: 'center'
    },
    backButton: {
        width: 34,
        height: 34,
        marginLeft: 15
    },
    scrollViewContainer: {
        flex: 12,
        flexDirection: 'column',
    }, 
    scrollViewStyle: {
        flexDirection: 'column',
    },
    animalImage: {
        width: 339,
        height: 229,
    },
    imageContainer: {
        height: 229,
        alignItems: 'center'
    },
    nameLocationContainer:{
        marginTop: 3,
        flexDirection: 'column',
        alignItems: 'center'
    },
    name: {
        flexDirection: 'row',
        width: 345,
        alignItems: 'center'
    },
    nameText: {
        fontSize: 24,
        fontFamily: FontFamily.epilogueBold,
        color: "#774a7f",
        fontWeight: "700",
    },
    genderIcon:  {
        width: 22,
        height: 22,
        overflow: "hidden",
        marginLeft: 10
    },
    location: {
        flexDirection: 'row',
        width: 345,
        alignItems: 'center'
    },
    locationText: {
        lineHeight: 24,
        color: Color.colorSilver,
        fontFamily: FontFamily.interRegular,
        fontSize: FontSize.size_sm,
        textAlign: "left",
    },
    smallBoxesContainer:{
        marginTop: 10,
        flexDirection: 'column',
        alignItems: 'center'
    },
    smallBoxesStyle:{
        justifyContent: 'center',
        width: 345,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    boxContainer :{
        width: 172,
        marginTop: 15
    },
    titleStyle:{
        fontSize: FontSize.size_xs,
        color: Color.colorSilver,
        fontFamily: FontFamily.interRegular,
        lineHeight: 20,
        textAlign: "left",
    },
    valueStyle: {
        fontSize: FontSize.size_base,
        color: Color.colorDimgray,
        fontFamily: FontFamily.interRegular,
        textAlign: "left",
        lineHeight: 26,
    },
    longBoxContent: {
        width: 350,
        color: Color.colorDimgray,
        fontFamily: FontFamily.interRegular,
        lineHeight: 20,
        fontSize: FontSize.size_sm,
        textAlign: "left",
    },
    longBoxTitle: {
        fontSize: FontSize.size_xs,
        color: Color.colorSilver,
        fontFamily: FontFamily.interRegular,
        lineHeight: 20,
        textAlign: "left",
    },
    longBoxContentContainer:{
        alignItems: 'center'
    },
    longBoxIndivContainer:{
        marginTop: 20
    },
    adoptMeButton: {
        borderRadius: 34,
        backgroundColor: "#f6d25e",
        shadowColor: "rgba(23, 26, 31, 0.12)",
        shadowRadius: 2,
        elevation: 2,
        width: 344,
        height: 68,
        shadowOpacity: 1,
        shadowOffset: {
          width: 0,
          height: 3,
        },
        alignItems: 'center',
        justifyContent: 'center'
    },
    adoptButtonText:{
        fontSize: 18,
        fontFamily: FontFamily.interBold,
        color: Color.colorWhite,
        textAlign: "left",
        fontWeight: "700",
        lineHeight: 26,
    },
    adoptButtonContainer: {
        alignItems:'center',
        marginTop: 20
    }
})