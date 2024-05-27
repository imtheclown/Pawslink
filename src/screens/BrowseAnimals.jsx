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
import Tag from "../components/BrowseAnimalTag";
import BrowseAnimalSearchBar from "../components/BrowseAnimalSearchBar";
import LoadingModal from "../components/LoadingModal";
import { useState, useEffect } from "react";
import UpdateDateSchema from "../database/schemas/UpdateDate";
import { fetch } from "@react-native-community/netinfo";
import { Animal, AnimalSchema } from "../database/schemas/Schema";
// custom type
import { LifeStatus } from "../utils/CustomTypes";
import axios from "axios";
import { localMachineIPAddress, port } from "../utils/networkConf";
import { createRealmContext } from "@realm/react";
import { Realm } from "realm";
// returns JSX element wrapped in Realm elements
// access to database, both local and synced

const UpdateDateContext = createRealmContext({
    schema: [UpdateDateSchema],
    path:"Animal.realm"
})

const AnimalContext = createRealmContext({
    schema: [AnimalSchema],
    path:"UpdateDate.realm"
})

const {
    RealmProvider: UpdateDateProvider,
    useRealm: useUpdateDateRealm,
    useQuery: useUpdateDateQuery
} = UpdateDateContext;

const {
    RealmProvider: AnimalProvider,
    useRealm: useAnimalRealm,
    useQuery: useAnimalQuery
} = AnimalContext

  
const BrowseAnimalWrapper = () => {
    return (
        <AnimalProvider>
            <UpdateDateProvider>
                <BrowseAnimalMainContent/>
            </UpdateDateProvider>
        </AnimalProvider>
    )
}
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
import { Types } from "realm";
import { create } from "react-test-renderer";

function BrowseAnimalMainContent(){
    const navigation = useNavigation();
    const animalQuery = useAnimalQuery(AnimalSchema);
    const updateDateQuery = useUpdateDateQuery(UpdateDateSchema);
    const animalRealm = useAnimalRealm();
    const updateDateRealm = useUpdateDateRealm();
    // create an array from the query as it has type of Result<Animal> which is not equivalent to primitive array
    const animals = Array.from(animalQuery)
    // all animals upon the opening of the up

    const [updating, setUpdating] = useState(false);
    const[isConnected, setIsconnected] = useState(false);
    const [animalList, setAnimalList] = useState(animals);
    // filter is equivalent to tag names
    // defaults to all, equivalently, the animalList defaults to the whole animalList
    const [filter, setFilter] = useState(TagNames.ALL)
    // used to search for individual animal by means of name
    const [searchKeyWord, setSearchKeyWord] = useState('');

    const [isLoading, setIsloading] = useState(false);

    useEffect(() =>{
        updateData(filter);
        checkInternetConnection();
        if(isConnected){
            // update everything
            if(!updating){
                updateAnimalCollection();
            }
        }
    }, [isConnected, filter])

    const updateAnimalCollection = async() =>{
        setUpdating(true);
        var data;
        if(updateDateQuery.length === 0){
            data = await getUpdates(`&`);
        }else{
            data = await getUpdates(`&startDate=${updateDateQuery[0].lastUpdateId}`);
        }
        await updateAsynchronously(data);
        setUpdating(false);
    }

    const updateAsynchronously = async (logList) =>{
        for(var i = 0 ; i < logList.length; i++){
            const animalData = await axios.get(`http://${localMachineIPAddress}:${port}/api/getanimals?id=${logList[i].documentId}`)
            .then(result =>{
                let resultData;
                if(result && result.data && result.data.data){
                    resultData = result.data.data;
                }else{
                    resultData = result.data;
                }
                return resultData;
            }).catch(err => {
                console.log(err);
            })
            const data = animalData[0];
            animalRealm.write(() =>{
                data["_id"] = new Types.ObjectId(data._id); 
                animalRealm.create(AnimalSchema, data, 'modified');
            })
            updateDateRealm.write(() =>{
                var id;
                if(updateDateQuery && updateDateQuery[0] && updateDateQuery[0]._id)
                {
                    id = new Types.ObjectId(updateDateQuery[0]._id)
                }else{
                    id = new Realm.BSON.ObjectId()
                }
                updateDateRealm,create(UpdateDateSchema, {
                    _id: id,
                    lastUpdateDate: new Date(),
                    lastUpdateId: new Types.ObjectId(data._id)
                })
            })
        }
    }
    const checkInternetConnection = async () =>{
        await fetch()
        .then(result =>{
            if(result.isConnected){
                setIsconnected(true);
            }else{
                setIsconnected(false);
            }
        }).catch(err =>{
            console.log(err);
            setIsconnected(false);
        })
    }
    const getUpdates = async (dateParams) =>{
        const updates = await axios.get(`http://${localMachineIPAddress}:${port}/api/getAdminLog?collectionName=animals${dateParams}`)
        .then(result =>{
            if(result && result.data){
                return result.data
            }
            return []
        }).catch(err =>{
            console.log(err)
        })
        return updates;
    }
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