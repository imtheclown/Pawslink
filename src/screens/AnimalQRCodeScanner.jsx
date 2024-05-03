import QRCodeScanner from "react-native-qrcode-scanner";
import { View, Image, StyleSheet, Pressable, Text,  SafeAreaView } from "react-native";
import { FontFamily, Color } from "../assets/scanner/GlobalStyles";
import { useContext } from "react";
import { useObject, useQuery } from "@realm/react";
import { Animal } from "../database/schemas/Schema";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import { ConnectionContext } from "../components/ConnectionContext";
import { AnimalISLocalWrapper, AnimalISSyncWrapper } from "../components/AnimalISWrappers";
import { SerializableAnimalInstance } from "../components/AnimalProfileBox";
import { Realm } from 'realm'

const CustomMarker = () => {

    return (
        <Image
            source={require('../assets/scanner/scan-3.png')}
        />
    )
}
const AnimalQRCodeScannerMain = () => {
    const [animalID, setAnimalID] = useState("")

    const ClearAnimalID = () => {
        setAnimalID("")
    }
    const OnSuccess = (e) => {
        setAnimalID(e.data)
    }
    return (
        <>
        {
            animalID.length? <ScanHandleScreen animalID={animalID} ClearAnimalID = {ClearAnimalID}/>
            :
            <QRCodeScanner
            reactivate={true}
            reactivateTimeout={1000}
            onRead={e => {
                OnSuccess(e)
            }}
            showMarker={true}
            customMarker={<CustomMarker />}
            markerStyle={[styles.scanIcon]}
            containerStyle={[styles.mainContainer]}
            />
        }
        </>
    );
};

const ScanHandleScreen = ({ animalID, ClearAnimalID }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const animalObjectId = new Realm.BSON.ObjectId(animalID);
    const animalInstance = useObject(Animal, animalObjectId);
    const navigation = useNavigation();
  
    useEffect(() => {
      if (animalInstance) {
        const animalObject = SerializableAnimalInstance(animalInstance);
        setLoading(false);
        navigation.navigate("View Animal", { animalObject: animalObject });
      } else {
        setError(true);
        setLoading(false);
      }
    }, [animalInstance, navigation]);
  
    const handleScanAgain = () => {
        ClearAnimalID()
    };
  
    if (loading) {
      return <Text>Loading...</Text>;
    }
  
    if (error) {
      return (
        <View style={[styles.qrError, styles.qrErrorShadowBox]}>
          <View style={styles.container85} />
          <Image
            style={styles.image155Icon}
            resizeMode="cover"
            source={require("../assets/scanner/image-155.png")}
          />
          <Text style={[styles.thankYouFor, styles.backToHomeLayout]}>
            Sorry, invalid QR code!
          </Text>
          <Pressable
            style={[styles.button16, styles.qrErrorShadowBox]}
            onPress={handleScanAgain}
          >
            <Text style={[styles.button16]}>
              Scan Again
            </Text>
          </Pressable>
        </View>
      );
    }
  
    return (
      <View style ={[styles.returnToCamContainer]}>
        <Pressable style = {[styles.returnToHomeButton]} onPress={handleScanAgain}>
          <Text style = {[styles.returnText]}>Scan Again</Text>
        </Pressable>
      </View>
    );
  };

const AnimalQRCodeScanner = () =>{
    const isConnected = useContext(ConnectionContext)
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
    returnToCamContainer: {
      flex:1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent:'center'
    },
    returnToHomeButton: {
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 26,
      backgroundColor: Color.colorWhite,
      shadowColor: "rgba(23, 26, 31, 0.12)",
      shadowRadius: 2,
      elevation: 2,
      borderStyle: "solid",
      borderColor: Color.colorPalevioletred,
      borderWidth: 1,
      width: 234,
      height: 52,
      overflow: "hidden",
    },
    returnText: {
      fontSize: 18,
      fontFamily: FontFamily.interRegular,
      color: Color.colorPalevioletred,
      textAlign: "center",
    }
})

