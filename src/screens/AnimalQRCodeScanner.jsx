import QRCodeScanner from "react-native-qrcode-scanner";
import { View, Image, StyleSheet, Pressable, Text,  SafeAreaView } from "react-native";
import { FontFamily, Color } from "../assets/scanner/GlobalStyles";
import { useContext } from "react";
import { useObject, useQuery } from "@realm/react";
import { Animal } from "../database/schemas/Schema";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import { ConnectionContext } from "../components/ConnectionContext";
import { AnimalListContext } from "../context/AnimalListContext";
import { AnimalISLocalWrapper, AnimalISSyncWrapper } from "../components/AnimalISWrappers";
import { ColorSpace } from "react-native-reanimated";


const CustomMarker = () => {

    return (
        <Image
            source={require('../assets/scanner/scan-3.png')}
        />
    )
}
const AnimalQRCodeScannerMain = () => {
    const [animalID, setAnimalID] = useState(null)
    const navigation = useNavigation();

    if(animalID){
        const animalInstance = useObject(Animal, animalID)
        console.log(animalInstance)
    }

    return (
        <QRCodeScanner
            reactivate={true}
            onRead={e => {
                setAnimalID(e.data)
            }}
            showMarker={true}
            customMarker={<CustomMarker />}
            markerStyle={[styles.scanIcon]}
            containerStyle={[styles.mainContainer]}
        />
    );
};

const AnimalQRCodeScanner = () =>{
    const isConnected = useContext(ConnectionContext);
    return (
        // temporary for now
        // local is used when there is internet connection since the synced is not implemented yet
        <>
            {isConnected ? <AnimalISLocalWrapper children={<AnimalQRCodeScannerMain/>}/>
            : <AnimalISLocalWrapper children={<AnimalQRCodeScannerMain/>}/>}
        </>
    )
}
export default AnimalQRCodeScanner

const styles = StyleSheet.create({
    scanIcon: {
        width: 348,
        height: 348,
    },
    mainContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: "#774a7f"
    },
    cameraStyle: {
        height: '100%'
    },
})