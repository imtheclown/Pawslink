import { View, Pressable, Text, StyleSheet, ImageBackground, Image } from "react-native";
import { Sex } from "../utils/CustomTypes";
import { Border, Color, FontSize, FontFamily } from "../assets/bottom_tabs/GlobalStyles";
import { useNavigation } from "@react-navigation/native";

// capitalize the first letter of each element
function capitalizeFirstLetter(string) {
    return (string.charAt(0).toUpperCase() + string.slice(1)).toString();
}
// returns array
const capitalizeElements = (charList) =>{
    const capitalizedStrings = charList.map((element) =>(
        capitalizeFirstLetter(element)
    ))
    return capitalizedStrings
}
// capitalizes the first letter of the element of properties of Animal schema with type of array
// combines the element of the properties of type array and seperate each element with ", "
// returns array
const SerializableAnimalInstance = (animalObject) =>{
    const processedTraits = capitalizeElements(animalObject.traitsAndPersonality)
    const processNotes = capitalizeElements(animalObject.notes)
    const processLocation = capitalizeElements(animalObject.location)
    const processedStatus = capitalizeElements(animalObject.status)
    const processedCoatColor = capitalizeElements(animalObject.coatColor)
    const processedDisabilities = capitalizeElements(animalObject.disabilities)
    const serializedAnimal = {
        _id: animalObject._id.toString(),
        fertilityStatus: animalObject.fertilityStatus,
        mainName: animalObject.mainName,
        location: processLocation.join(", "),
        sex: animalObject.sex,
        status: processedStatus.join(", "),
        coatColor: processedCoatColor.join(", "),
        imgUrl: animalObject.imgUrl,
        notes: processNotes.join(", "),
        species: animalObject.species, 
        traitsAndPersonality: processedTraits.join(", "),
        disabilities: processedDisabilities.join(", "),
        age: animalObject.age > 0? animalObject.age.toString() : "UNKNOWN"

    }
    return serializedAnimal
}

export {SerializableAnimalInstance}
// returns JSX element
function AnimalProfileBox({flatListItem}){
    // destructure the props, an object following the animal schema
    // just get the name and the location
    const navigation = useNavigation()
    const queryObject = flatListItem.item;
    const animalObject = SerializableAnimalInstance(queryObject)
    const {mainName, location, sex} = animalObject;
    // convert the array to a string of location element seperated with space
    const gotoView = () =>{
        navigation.navigate("View Animal", {animalObject: animalObject})
    }
    return(
        <Pressable style={[styles.animalInstanceBoxContainer]} onPress={gotoView}>
            <View style= {[styles.topContainer]} >
                {/* image part */}
                <ImageBackground
                    style={styles.animalInstanceImage}
                    resizeMode="cover"
                    source={require("../assets/browse_animals/image82.png")}
                />
            </View>
            <View style = {[styles.sectionContainer, styles.bottomContainer]}>
                {/* contains the name, location and gender */}
                <View style = {[styles.topContainer, styles.bottomLeftContainer]}>
                    <Text style={styles.instanceBoxNameText}>{mainName}</Text>
                    <View style ={[styles.sectionContainer, styles.bottomContainer]}>
                        <Image
                            style = {styles.locationIcon}
                            resizeMode="cover"
                            source={require("../assets/browse_animals/love-heart-pin-1.png")}
                        />
                        {/* group the location and the location tag */}
                        <Text numberOfLines={1} ellipsizeMode="tail" style = {styles.locationText}>{location}</Text>
                    </View>
                </View>
                <View style ={[styles.sectionContainer, styles.bottomRightContainer]}>
                    <Image
                    style = {styles.genderIcon}
                    resizeMode="cover"
                    source={sex === Sex.FEMALE? require("../assets/general/woman-21-1.png") : require("../assets/general/man-20-1.png")}
                    />
                </View>
            </View>
      </Pressable>
    )
}
export default AnimalProfileBox

const styles = StyleSheet.create({
    animalInstanceBoxContainer: {
        margin: 10,
        height: 161,
        width: 160,
        borderRadius: Border.br_5xs,
        elevation: 2,
        shadowRadius: 2,
        shadowColor: "rgba(23, 26, 31, 0.12)",
        shadowOpacity: 1,
        shadowOffset: {
          width: 0,
          height: 3,
        },
        backgroundColor: Color.colorWhite,
        flexDirection: 'column'
    },
    instanceBoxNameText: {
        left: 8,
        fontSize: FontSize.size_xs,
        color: Color.colorGray,
        fontFamily: FontFamily.interRegular,
        lineHeight: 20,
        textAlign: "left",
    },
    animalInstanceImage: {
        top: 10,
        left: 9,
        width: 141,
        height: 101,

    },
    genderIcon: {
        width: 18,
        height: 18,
        overflow: "hidden",
        alignContent: 'flex-end'
    },
    sectionContainer: {
        flex: 1
    },
    locationText:{
        fontSize: FontSize.size_3xs,
        color: Color.colorDarkslateblue,
        fontFamily: FontFamily.interRegular,
        textAlign: "left",
    },
    bottomContainer: {
        marginHorizontal: 5,
        flexDirection: 'row',

    },
    bottomLeftContainer:{
        flexDirection: 'column',
    },
    topContainer: {
        flex: 3
    },
    locationIcon:{
        width: 12,
        height: 12,
        overflow: "hidden",
    },
    bottomRightContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginRight: 5
    },
    
})