import * as React from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Image,
  Pressable,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  KeyboardAvoidingViewBase
} from "react-native";
import {useQuery } from "@realm/react";
import NetInfo from '@react-native-community/netinfo'
import { useEffect, useState } from "react";
import { useContext } from "react";
import { AnimalListContext } from "../context/AnimalListContext";

import { ConnectionContext } from "../components/ConnectionContext";
import { Border, Color, FontSize, FontFamily } from "../assets/browse_animals/GlobalStyles";
import AnimalProfileBox from "../components/AnimalProfileBox";

import { AnimalISLocalWrapper, AnimalISSyncWrapper } from "../components/AnimalISWrappers";
import Tag from "../components/BrowseAnimalTag";
import BrowseAnimalSearchBar from "../components/BrowseAnimalSearchBar";
// custom type
import { LifeStatus } from "../utils/CustomTypes";
// returns JSX element wrapped in Realm elements
// access to database, both local and synced
const BrowseAnimals = () => {
    // get the global value
    const isConnected = useContext(ConnectionContext)
    return (
        <>
        {isConnected == null? <Text>Error</Text>:
        isConnected? <AnimalISLocalWrapper children = {<BrowseAnimalMainContent />}/>: 
        <AnimalISLocalWrapper children = {<BrowseAnimalMainContent />}/> }
        </>
    )
  };
export default BrowseAnimals;

// tagnames
const TagNames = {
    DOG : 'dog',
    CAT: 'cat',
    ALL : 'all',
    FOR_ADOPTION : 'for adoption'
}
// categories
const categories = [TagNames.ALL, TagNames.CAT, TagNames.DOG, TagNames.FOR_ADOPTION]

// screen/UI for the browse animal page
import { Animal } from "../database/schemas/Schema";

function BrowseAnimalMainContent(){
    const animalQuery = useQuery(Animal);
    // create an array from the query as it has type of Result<Animal> which is not equivalent to primitive array
    const animals = Array.from(animalQuery)
    // all animals upon the opening of the up
    const [animalList, setAnimalList] = useState(animals);
    // filter is equivalent to tag names
    // defaults to all, equivalently, the animalList defaults to the whole animalList
    const [filter, setFilter] = useState(TagNames.ALL)
    // used to search for individual animal by means of name
    const [searchKeyWord, setSearchKeyWord] = useState('');
    // reacts to the change in category/tags
    // filters the animals to show dependent on the chosen category
    const changeCategory = (newCategory) =>{
        // there is no change in category
        if(newCategory != filter){
            setFilter(newCategory);
            if(newCategory === TagNames.CAT){
                const cats = animals.filter(checkCat)
                cats.sort(sortAnimals)
                setAnimalList(cats)
            }else if(newCategory === TagNames.DOG) {
                const dogs = animals.filter(checkDog)
                dogs.sort(sortAnimals)
                setAnimalList(dogs)
            } else {
                const notAdopted = animalList.filter(checkAdopted)
                notAdopted.sort(sortAnimals)
                setAnimalList(notAdopted)
            }
        }
    }

    const checkDog = (item) =>{
        if(item.species == TagNames.DOG){
            return true
        }else{
            false
        }
    }
    
    const checkCat = (item) =>{
        if(item.species == TagNames.CAT){
            return true
        }else{
            return false
        }
    }

    const checkAdopted = (item) =>{
        if(item.status.includes(LifeStatus.ADOPTED)){
            return false
        }
        return true
    }
    
    const searchAnimal = (keyword) =>{
        setSearchKeyWord(keyword)
    }

    return (
        <AnimalListContext.Provider value={animals}>
            <SafeAreaView
                style={styles.mainContainer}
            >
                {/* this is the top view
                    includes: logo
                    search bar and notif bar
                    tags
                    title */}
                <View style ={ styles.topContainer}>
                    <View style = {styles.sectionContainer}>
                        {/* for the PawsLink logo */}
                        <Image
                            style={styles.pawsLinkLogo}
                            resizeMode="cover"
                            source={require("../assets/browse_animals/image-23.png")}
                        />
                    </View>
                    <View style = {[styles.sectionContainer, styles.searchBarNotifContainer]} >
                        {/* for the search bar and the notif bar */}
                        <View>
                            <BrowseAnimalSearchBar onSearch={searchAnimal}/>
                        </View>
                        <View>
                            <Pressable
                                onPress={() => {}}
                            >
                                <Image 
                                style = {styles.notifIcon}
                                resizeMode="cover"
                                source={require("../assets/browse_animals/container-72.png")}
                                />
                            </Pressable>
                        </View>
                    </View>
                    <View style ={[styles.sectionContainer]}>
                        <View>
                            <Text style={styles.browseAnimalTitle} >
                                browse animals
                            </Text>
                        </View>
                        <View style = {[styles.categoryTags, styles.sectionContainer]}>
                            {categories.map((item, index) =>{
                                return <Tag
                                tagName = {item}
                                currentFilter = {filter}
                                onPress = {(params) => {changeCategory(params)}}
                                key = {index.toString()}
                                />
                            })}
                        </View>
                    </View>
                </View>
                <View style = {styles.boxContainer}>
                    {/* for the pressable boxes */}
                    <FlatList
                    contentContainerStyle = {[styles.seperateComponents]}
                    key={2}
                    keyExtractor={(item) => item._id.toString()}
                    data={animalList}
                    horizontal = {false}
                    numColumns={2}
                    renderItem={(item) => {
                        return (
                            <AnimalProfileBox key={item.item._id.toString()}
                            flatListItem = {item}
                            >
                            </AnimalProfileBox>
                        )
                    }}
                    >

                    </FlatList>
                </View>
            </SafeAreaView>
        </AnimalListContext.Provider>
    );
}

const sortAnimals = (a, b) =>{
    return a.mainName.localeCompare(b.mainName)
}
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: 'column',
        padding: 20
    }, 
    topContainer:{
        flex: 1
    },
    sectionContainer: {
        flex: 1
    },
    boxContainer: {
        flex: 3
    },
    pawsLinkLogo: {
        width: 129,
        height: 57,
    },
    searchBarNotifContainer: {
        top: 5,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    notifIcon: {
        height: 48,
        width: 48
    },
    browseAnimalTitle: {
        fontSize: 24,
        lineHeight: 32,
        fontWeight: "700",
        fontFamily: FontFamily.epilogueBold,
        color: "#d2628a",
    },
    categoryTags: {
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    seperateComponents: {
        alignItems: 'center',
    }
    
})