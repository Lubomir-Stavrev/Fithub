import React, { useState, useEffect } from "react";
import {
    Text,
    TextInput,
    View,
    Image,
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    KeyboardAvoidingView,
    SafeAreaView

} from "react-native";

import {
    LineChart,
} from "react-native-chart-kit";

import DefaultImage from "../../assets/welcomePage.jpg";
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";

const DEFAULT_IMAGE = Image.resolveAssetSource(DefaultImage).uri;
const image = { uri: DEFAULT_IMAGE };
const styles = require("../authScreens/authStyle");
const screenWidth = Dimensions.get("window").width;
export default function WeightTracker({ navigation }) {

    const [menuState, setMenuState] = useState(false);
    const [date, setDate] = useState(new Date());
    const [formatedDate, setFormatedDate] = useState(moment().format('D MMMM YYYY'));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [isWeightAdded, setIsWeightAdded] = useState(false);
    const [currentWeight, setCurrentWeight] = useState(0);
    const [dates, setDates] = useState([]);
    const [loggedWeight, setLoggedWeight] = useState([]);

    const data = {
        labels: dates,
        datasets: [
            {
                data: loggedWeight // dataset
            },
            {
                data: [currentWeight != 0 ? Number(currentWeight) - 5 : 0] // min
            },
            {
                data: [currentWeight != 0 ? Number(currentWeight) + 5 : 0] // max
            },

        ]
    };

    const chartConfig = {
        backgroundGradientFrom: "#FFCC1D",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#202020",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(255, 204, 29, ${opacity})`,
        strokeWidth: 3, // optional, default 3
        barPercentage: 1,
        useShadowColorFromDataset: true // optional
    };


    const manageMenu = (operation) => {

        if (operation === "close") {
            setMenuState(prev => false);
        } else {
            setMenuState(prev => true);
        }
    }

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        let formatedDate = moment(currentDate).format('D MMMM YYYY');
        setFormatedDate(prev => formatedDate);
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const onSubmitWeight = () => {

        let otherFormat = moment(formatedDate, 'DMMMMYY').format('DD-MM');
        let currentDates = dates;
        let currentLoggedWeights = loggedWeight;
        currentLoggedWeights.push(Number(currentWeight));
        currentDates.push(otherFormat);
        setDates(prev => currentDates);
        setLoggedWeight(prev => currentLoggedWeights);
        manageMenu('close')
    }
    return (
        <View style={styles.container}>
            <ImageBackground
                resizeMode="cover"
                source={image}
                style={styles.image}>
                <View style={{
                    position: 'absolute',
                    height: '100%',
                    justifyContent: 'center',
                    alignContent: 'center',
                    width: Dimensions.get("window").width,
                    backgroundColor: 'rgba(11,11,11,0.8)',
                    flex: 1,
                }}>

                    <View style={{
                        height: '25%',
                        top: "5%",
                        position: 'absolute',
                        width: "97%",
                        alignSelf: 'center',
                        backgroundColor: 'rgba(45,45,45,0.8)',
                        borderRadius: 20,
                        flex: 1,
                        flexDirection: 'column',
                    }}>
                        <View style={{
                            alignSelf: 'center',
                            flex: 1,
                            flexDirection: 'row',
                            paddingTop: 15
                        }}>

                            <View style={{ ...styling.container, marginLeft: 0, paddingRight: 35 }}>
                                <Text style={styling.textStyleTop}>Actual</Text>
                                <Text style={styling.textStyle}>{0}kg</Text>
                            </View>
                            <View style={{
                                ...styling.container,
                                borderLeftWidth: 0.4,
                                borderColor: "#ffff",
                                paddingLeft: 20,
                                paddingRight: 22,
                            }}>
                                <Text style={styling.textStyleTop}>Change</Text>
                                <Text style={styling.textStyle}>{0}kg</Text>
                            </View>
                            <View style={{
                                ...styling.container,
                                borderLeftWidth: 0.4,
                                borderColor: "#ffff",
                                paddingLeft: 25,
                                paddingRight: 30,
                            }}>
                                <Text style={styling.textStyleTop}>Total</Text>
                                <Text style={styling.textStyle}>{0}kg</Text>
                            </View>
                        </View>
                        <View style={{ borderBottomWidth: 0.3, borderColor: '#ffff', paddingTop: 14, width: '90%', alignSelf: 'center' }}></View>
                        <View style={{
                            alignSelf: 'center',
                            flex: 1,
                            flexDirection: 'row',
                            padding: 15,
                            paddingLeft: 25
                        }}>
                            <View style={{ ...styling.container, paddingRight: 25 }}>
                                <Text style={styling.textStyleTop}>This week</Text>
                                <Text style={styling.textStyle}>{0}kg</Text>
                            </View>

                            <View style={{
                                ...styling.container,
                                borderLeftWidth: 0.4,
                                borderColor: "#ffff",
                                paddingLeft: 20
                            }}>
                                <Text style={styling.textStyleTop}>This month</Text>
                                <Text style={styling.textStyle}>{0}kg</Text>
                            </View>
                        </View>
                    </View>
                    {loggedWeight.length > 0 ? <LineChart
                        data={data}
                        width={Dimensions.get("window").width - 12} // from react-native
                        height={250}
                        xAxisInterval={0.5} // optional, defaults to 1
                        withVerticalLines={false}
                        chartConfig={{
                            backgroundGradientFrom: '#222222',
                            backgroundGradientTo: '#181818',
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: (opacity = 0) => `rgba(255, 209, 24,1)`,
                            strokeWidth: 1.8,
                            labelColor: (opacity = 0) => `#EDEDED`,
                            propsForDots: {
                                r: "2",
                                strokeWidth: "2",
                                stroke: "#ffff"
                            }, propsForBackgroundLines: {
                                stroke: 'rgba(255,204,29,0.6)',

                            },
                            propsForLabels: {
                                fontFamily: 'redcoat',
                                fontSize: 14
                            },
                        }}
                        bezier
                        style={{
                            marginVertical: 20,
                            borderRadius: 10,
                            alignSelf: 'center',
                            marginTop: 55
                        }}
                    /> :
                        <TouchableOpacity style={{
                            position: 'absolute',
                            alignSelf: 'center',
                            backgroundColor: 'rgba(32,32,32,0.7)',
                            borderRadius: 100,
                            paddingLeft: 10

                        }} onPress={() => manageMenu('open')}>
                            <Ionicons name="ios-add-circle-outline" size={140} color="#FFCC1D" />
                        </TouchableOpacity>
                    }
                    {!menuState ?
                        <View style={{
                            position: 'absolute',
                            bottom: "5%",
                            right: '5%',
                        }}>
                            <TouchableOpacity onPress={() => manageMenu('open')}>
                                <AntDesign name="pluscircle" size={60} color="#FFCC1D" />
                            </TouchableOpacity>
                        </View> :
                        <View style={{
                            position: 'absolute',
                            bottom: 0,
                            width: "100%",
                            height: "100%",
                            zIndex: 99,
                            backgroundColor: 'rgba(32,32,32,0.7)',
                        }}>
                            <View style={{
                                position: 'absolute',
                                width: '100%',
                                bottom: 0,
                                zIndex: 100,
                                backgroundColor: '#ffffff',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderTopRightRadius: 12,
                                borderTopLeftRadius: 12,
                                paddingTop: 30,
                                borderWidth: 2,
                                borderColor: '#FFCC1D',
                                borderBottomWidth: 0
                            }}>
                                <View style={{
                                    width: "100%",
                                    alignItems: 'flex-start',
                                    justifyContent: "flex-start",
                                    marginBottom: 20
                                }}>
                                    <Text style={{
                                        fontSize: 27,
                                        paddingLeft: 20,
                                        fontFamily: 'redcoat',
                                        letterSpacing: 3
                                    }}>Add a record</Text>
                                    <View style={{
                                        position: 'absolute',
                                        top: 0,
                                        right: 30
                                    }}>
                                        <TouchableOpacity onPress={() => manageMenu('close')}>
                                            <MaterialIcons name="cancel" size={29} color="black" />
                                        </TouchableOpacity>

                                    </View>
                                </View>
                                <KeyboardAvoidingView
                                    keyboardShouldPersistTaps={"always"}
                                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                                    style={{ width: '100%' }}>
                                    <SafeAreaView>
                                        <TextInput
                                            style={styling.input}
                                            placeholder={"weight: " + 0}
                                            onChangeText={(text) => setCurrentWeight(prev => text)}
                                            keyboardType="numeric"
                                        />

                                        <View style={{
                                            ...styling.input,
                                            flex: 1,
                                            flexDirection: 'row',
                                        }}>
                                            <Text style={{
                                                left: 18,
                                                top: 6,
                                                fontSize: 25,
                                                fontFamily: 'redcoat',
                                                letterSpacing: 1,
                                                position: 'absolute'
                                            }}>
                                                {formatedDate}
                                            </Text>
                                            <TouchableOpacity onPress={showDatepicker} style={{
                                                position: 'absolute',
                                                right: 14,
                                                top: 6
                                            }}>
                                                <Entypo name="calendar" size={26} color="black" />

                                            </TouchableOpacity>
                                        </View>
                                        {show && (
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                value={date}
                                                mode={mode}
                                                is24Hour={true}
                                                display="default"
                                                onChange={onChange}
                                            />
                                        )}
                                    </SafeAreaView>
                                </KeyboardAvoidingView>
                                <View style={styling.buttonContainer}>
                                    <TouchableOpacity onPress={() => manageMenu('close')}>
                                        <View style={{ ...styling.button, backgroundColor: '#202020' }}>
                                            <Text style={{ ...styling.buttonText, color: '#FFCC1D' }}>Cancel</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => onSubmitWeight()}>
                                        <View style={styling.button}><Text style={styling.buttonText}>Submit</Text></View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    }

                </View>
            </ImageBackground >

        </View >
    );
}
const styling = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: 20,
        paddingRight: 20,
    },
    textStyle: {
        fontFamily: "redcoat",
        fontSize: 17.5,
        color: '#FFCC1D',
        letterSpacing: 1
    },
    textStyleTop: {
        fontFamily: "redcoat",
        fontSize: 21,
        color: '#FFE61B',
        marginBottom: 1.5,
        letterSpacing: 1
    },
    input: {
        height: 43,
        alignSelf: 'center',
        width: "80%",
        padding: 5,
        borderRadius: 7,
        backgroundColor: "rgba(255, 255, 255,0.95)",
        fontSize: 20,
        shadowColor: "#202020",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        marginBottom: 15,
        marginTop: 5,
        elevation: 5,
        justifyContent: 'center',
        textAlign: 'center'
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        alignContent: 'space-between',
        marginBottom: 20,
        marginTop: 0
    },
    button: {
        backgroundColor: "rgba(255,209,32,0.9)",
        shadowColor: "#202020",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        marginBottom: 15,
        elevation: 5,
        padding: 10,
        paddingHorizontal: 25,
        borderRadius: 20,
        margin: 18,
        borderWidth: 0.5,
        borderBottomColor: '#202020'
    },
    buttonText: {
        color: '#202020',
        fontFamily: 'redcoat',
        fontSize: 24,
        letterSpacing: 2
    }

});
