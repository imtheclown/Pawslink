import {
    Text,
    StyleSheet,
    Image,
    View,
    ScrollView,
    TouchableOpacity
  } from "react-native";
import { Border, Color, FontFamily, FontSize } from "../assets/view_post/GlobalStyles";
import { Avatar } from "@rneui/base";
import { capitalizeFirstLetter } from "../utils/TextBasedUtilityFunctions";
import { useState } from "react";

const ReplyContainer = ({commenntObject, withPhoto}) =>{
    const {
        username,
        profilePictureLink,
        durationOfPost,
        contentText,
        imageLinkList,
    } = commenntObject
    return (
        <View style ={[styles.viewPostContentContainer]}>
        {/* profile and other infor */}
        <View style = {[styles.profileContainer]} >
          <Avatar
            size={48}
            rounded
            source={{ uri: profilePictureLink}}
          />
          <View style ={[styles.profileTextContainer]}>
            <Text style = {[styles.profileText]}>
              {username}
            </Text>
            <Text style ={[styles.timeText]}>
              {durationOfPost}
            </Text>
          </View>
        </View>
        {/* text content */}
        <View style = {[styles.mainContentContainer]}>
            <Text style = {[styles.contentText]}>
            {capitalizeFirstLetter(contentText)}
            </Text>
        </View>
        {/* optional photos */}
        {/* implement this */}
        {
        withPhoto?
        <ScrollView horizontal = {true}
        contentContainerStyle = {[styles.imageContainer]}
        scrollEnabled = {false}
        style = {[styles.scrollViewStyle]}
        >
        <TouchableOpacity>
            <Image
            style = {[styles.imageContent]}
            resizeMode="cover"
            source={require("../assets/view_post/image-110.png")}
            />
        </TouchableOpacity>
        </ScrollView>
        :<></>
        }
        <TouchableOpacity style ={[styles.replyContainer, ]}
        >
            <Text style ={[styles.replyText]}>
                {capitalizeFirstLetter('reply')}
            </Text>
        </TouchableOpacity>
      </View>
    )
}

const styles = StyleSheet.create({
    viewPostContentContainer:{
        width: '95%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        shadowRadius: 8,
        shadowColor: "rgba(23, 26, 31, 1)",
        height: 'auto',
        shadowOpacity: 1,
        shadowOffset: {
          width: 0,
          height: 3,
        },
        backgroundColor: Color.colorWhite,
        elevation:4,
        marginBottom: 10
    },
    profileContainer:{
        width: '95%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        height: 'auto',
      },
      profileTextContainer:{
        flexDirection: 'column',
        alignItems:'flex-start',
        marginLeft: 20,
        marginVertical: 10
      },
      profileText :{
        color: Color.colorLightslategray,
        lineHeight: 24,
        fontFamily: FontFamily.interRegular,
        fontSize: FontSize.size_sm,
      },
      timeText:{
        color: Color.colorSlategray,
        lineHeight: 24,
        textAlign: "left",
        fontFamily: FontFamily.interRegular,
        fontSize: FontSize.size_sm,
      },
      mainContentContainer:{
        width: '90%',
        height: 'auto',
        marginBottom: 10 
      },
      contentText:{
        color: Color.colorDarkslategray,
        lineHeight: 19,
        textAlign: "left",
        fontSize: FontSize.size_sm,
        fontFamily: FontFamily.interRegular,
      },
      scrollViewStyle:{
        width: '90%',
        height: 'auto',
      },
      imageContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginBottom: 10,
        flexDirection: 'row'
      },
      imageContent:{
        height: 63,
        width: 64,
        borderRadius: Border.br_9xs,
        marginRight : 5
    },
    replyContainer:{
        width: '90%',
        height: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },
    replyText:{
        color: Color.colorLightslategray,
        lineHeight: 30,
        fontFamily: FontFamily.interRegular,
        fontSize: FontSize.size_sm,
    }

})

export default ReplyContainer