import React, { useState } from "react";
import {
    StyleSheet, Text, View, Image, TextInput,
    ImageBackground, ScrollView, SafeAreaView, KeyboardAvoidingView,
    TouchableOpacity,
    Linking
} from "react-native";
import qs from 'qs';
import DefaultImage from "../assets/welcomePage.jpg";
const DEFAULT_IMAGE = Image.resolveAssetSource(DefaultImage).uri;
const image = { uri: DEFAULT_IMAGE };
const styles = require("./authScreens/authStyle.js");
import { sendEmail } from './sendEmail';

export default function ContactUs() {
    const [email, setEmail] = useState();
    const [names, setNames] = useState();
    const [message, setMessage] = useState();

    const submitMessage = () => {
        console.log('asdasd')
        sendEmail(
            'lubomirstavrev02@gmail.com',
            'We need your feedback',
            `From ${names}:\n ${message}`,
            { cc: email }
        ).then(() => {
            console.log('Your message was successfully sent!');
        }).catch(err => {
            console.log(err);
        });
    }
    return (
        <>
            <View style={innerStyles.container}>
                <ImageBackground
                    resizeMode="cover"
                    source={image}
                    style={innerStyles.image}>

                    <View style={innerStyles.body}>

                        <View style={styles.inputContainer}>
                            <TextInput
                                style={[
                                    styles.input,
                                    {
                                        borderBottomLeftRadius: 0,
                                        borderBottomRightRadius: 0,
                                        marginBottom: 2
                                    }
                                ]}
                                placeholder="First and last name"
                                onChangeText={(text) => setNames(text)}
                            />
                            <TextInput
                                style={[
                                    styles.input,
                                    {
                                        borderTopLeftRadius: 0,
                                        borderTopRightRadius: 0
                                    }
                                ]}
                                placeholder="Your E-mail"
                                onChangeText={(text) => setEmail(text)}
                            />
                            <TextInput
                                style={{
                                    maxHeight: 350,
                                    height: 150,
                                    width: 290,
                                    textAlignVertical: 'top',
                                    padding: 10,
                                    marginBottom: 15,
                                    borderRadius: 7,
                                    backgroundColor: "rgba(255, 255, 255,0.95)",
                                    fontSize: 20,
                                }}
                                numberOfLines={10}
                                multiline={true}
                                placeholder="details"
                                onChangeText={(text) => setMessage(text)}
                            />
                            <TouchableOpacity
                                style={[styles.authButton, { width: 300 }]}
                                onPress={() => submitMessage()}>
                                <Text style={styles.buttonText}>
                                    Submit
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </ImageBackground>
            </View>

        </>
    );
}

const innerStyles = StyleSheet.create({
    container: {
        backgroundColor: "#222222",
        flex: 1
    },
    body: {
        width: "91%",
        height: "auto",
        backgroundColor: "rgba(18, 18, 19,0.6)",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 20,
        paddingTop: 50,
        borderBottomColor: "#d5990c",
        borderBottomWidth: 1,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,

    },
    image: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});
