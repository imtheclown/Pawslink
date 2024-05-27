import * as React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native";
import {useQuery, useRealm } from "@realm/react";

import {FontFamily } from "../assets/browse_animals/GlobalStyles";
import AnimalProfileBox from "../components/AnimalProfileBox";
import { RealmProvider } from "@realm/react";
import Tag from "../components/BrowseAnimalTag";
import BrowseAnimalSearchBar from "../components/BrowseAnimalSearchBar";
import LoadingModal from "../components/LoadingModal";
import { useState, useEffect } from "react";
import UpdateDateSchema from "../database/schemas/UpdateDate";
import { fetch } from "@react-native-community/netinfo";
import { AnimalSchema } from "../database/schemas/Schema";
// custom type
import { LifeStatus } from "../utils/CustomTypes";
import axios from "axios";
import { localMachineIPAddress, port } from "../utils/networkConf";
// returns JSX element wrapped in Realm elements
// access to database, both local and synced

const updateDateConfig = {
    schema:[UpdateDateSchema],
    path:"UpdateDate.realm"
}

const animalConfig = {
    schema :[AnimalSchema],
    path:"Animal.realm"
}
const BrowseAnimalWrapper = () => {
    return (
        <RealmProvider
            schema={[UpdateDateSchema]}
            path ="UpdateDate.realm"
        >
            <BrowseAnimals/>
        </RealmProvider>
    )
}

const BrowseAnimals = () => {
    const updateDate = useQuery(UpdateDateSchema);
    const [animalupdates, setAnimalUpdates] = useState([])
    const realm = useRealm(updateDateConfig);
    useEffect(() =>{
        // there is no updates ever since
        if(!(updateDate.length > 0)){
            getUpdates();
        }
    },[])

    const getUpdates = async () =>{
        await axios.get(`http://${localMachineIPAddress}:${port}/api/getAdminLog?collectionName=animals`)
        .then(result =>{
            if(result && result.data){
                setAnimalUpdates(result.data)
            }
        }).catch(err =>{
            console.log(err)
        })
    }
    return (
        <RealmProvider 
        schema={[AnimalSchema]}
        path="Animals.realm"
        >
            <BrowseAnimalMainContent updates = {animalupdates}/>
        </RealmProvider>
    )
  };
export default BrowseAnimalWrapper;

// tagnames
const TagNames = {
    DOG : 'dog',
    CAT: 'cat',
    ALL : 'all',
    FOR_ADOPTION : 'for adoption'
}
// categories
const categories = [TagNames.ALL, TagNames.CAT, TagNames.DOG, TagNames.FOR_ADOPTION]

import { useNavigation } from "@react-navigation/native";

function BrowseAnimalMainContent(){
    const navigation = useNavigation();
    const animalQuery = useQuery(AnimalSchema);
    console.log(animalQuery);
    // create an array from the query as it has type of Result<Animal> which is not equivalent to primitive array
    const animals = Array.from(animalQuery)
    // all animals upon the opening of the up
    const [animalList, setAnimalList] = useState(animals);
    // filter is equivalent to tag names
    // defaults to all, equivalently, the animalList defaults to the whole animalList
    const [filter, setFilter] = useState(TagNames.ALL)
    // used to search for individual animal by means of name
    const [searchKeyWord, setSearchKeyWord] = useState('');

    const [isLoading, setIsloading] = useState(false);

    useEffect(() =>{
        setIsloading(true);
        updateData(filter);
        setIsloading(false);
    }, [filter])
    // reacts to the change in category/tags
    // filters the animals to show dependent on the chosen category
    const changeCategory = (newCategory) =>{
        // there is no change in category
        if(newCategory != filter){
            setFilter(newCategory);
            
        }
    }
    const updateData = (newCategory) => {
        if(newCategory === TagNames.CAT){
            const cats = animals.filter(checkCat)
            cats.sort(sortAnimals)
            setAnimalList(cats)
        }else if(newCategory === TagNames.DOG) {
            const dogs = animals.filter(checkDog)
            dogs.sort(sortAnimals)
            setAnimalList(dogs)
        }
        else if(newCategory === TagNames.ALL){
            setAnimalList(animals);
        }
        else {
            const notAdopted = animalList.filter(checkAdopted)
            notAdopted.sort(sortAnimals)
            setAnimalList(notAdopted)
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
    const gotoAdminMessage = () =>{
        navigation.navigate("Message Admin")
    }
    return (
        <SafeAreaView
            style={styles.mainContainer}
        >
            {/* this is the top view
                includes: logo
                search bar and notif bar
                tags
                title */}
            <LoadingModal isLoading={isLoading}/>
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
                        <TouchableOpacity
                            onPress = {gotoAdminMessage}
                        >
                            <Image 
                            style = {styles.notifIcon}
                            resizeMode="cover"
                            source={require("../assets/browse_animals/container-72.png")}
                            />
                        </TouchableOpacity>
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
                columnWrapperStyle = {styles.row}
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
        width: '100%',
        height: '70%'
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
    row: {
        justifyContent: 'space-between',
        marginBottom: 20,
        width: '100',
        height: '100'
    }
    
})