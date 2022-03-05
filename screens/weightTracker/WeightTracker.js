import React, { useState, useEffect } from "react";
import {
    Text,
    TextInput,
    View,
    Image,
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
    Dimensions

} from "react-native";

import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";

import DefaultImage from "../../assets/welcomePage.jpg";
import { AntDesign } from '@expo/vector-icons';

const DEFAULT_IMAGE = Image.resolveAssetSource(DefaultImage).uri;
const image = { uri: DEFAULT_IMAGE };
const styles = require("../authScreens/authStyle");
const screenWidth = Dimensions.get("window").width;
export default function WeightTracker({ navigation }) {
    const data = {
        labels: ["23.02", "24.02", "25.02", "26.02", "27.02", "28.02"],
        datasets: [
            {
                data: [73, 74, 75, 76, 71, 72, 72.5],
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // optional
                strokeWidth: 2 // optional
            }
        ],
        legend: ["Weight"] // optional
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

                            <View style={{ ...styling.container, marginLeft: 13, paddingRight: 35 }}>
                                <Text style={styling.textStyleTop}>Actual</Text>
                                <Text style={styling.textStyle}>78kg</Text>
                            </View>
                            <View style={{
                                ...styling.container,
                                borderLeftWidth: 0.4,
                                borderRightWidth: 0.4,
                                borderColor: "#ffff",
                                paddingLeft: 30,
                                paddingRight: 30,
                            }}>
                                <Text style={styling.textStyleTop}>Change</Text>
                                <Text style={styling.textStyle}>2kg</Text>
                            </View>
                        </View>
                        <View style={{ borderBottomWidth: 0.3, borderColor: '#ffff', paddingTop: 14, width: '90%', alignSelf: 'center' }}></View>
                        <View style={{
                            alignSelf: 'center',
                            flex: 1,
                            flexDirection: 'row',
                            padding: 15
                        }}>
                            <View style={styling.container}>
                                <Text style={styling.textStyleTop}>This week</Text>
                                <Text style={styling.textStyle}>0.5kg</Text>
                            </View>
                            <View style={{
                                ...styling.container,
                                borderLeftWidth: 0.4,
                                borderRightWidth: 0.4,
                                borderColor: "#ffff",
                                paddingRight: 15,
                                paddingLeft: 15,
                            }}>
                                <Text style={styling.textStyleTop}>This month</Text>
                                <Text style={styling.textStyle}>2kg</Text>
                            </View>
                            <View style={{ ...styling.container, marginRight: 15 }}>
                                <Text style={{ ...styling.textStyleTop }}>Total</Text>
                                <Text style={{ ...styling.textStyle, }}>3kg</Text>
                            </View>
                        </View>
                    </View>

                    <LineChart
                        data={{
                            labels: ["21-02", "22-02", "23-02", "24-02", "25-02", "26-02"],
                            datasets: [
                                {
                                    data: [
                                        73.5, 74, 78,
                                        75, 76, 77,
                                        81, 79, 77,
                                    ]
                                }
                            ]
                        }}
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
                    />

                    <View style={{
                        position: 'absolute',
                        bottom: "5%",
                        right: '5%',
                    }}>
                        <AntDesign name="pluscircle" size={60} color="#FFCC1D" />
                    </View>
                </View>
            </ImageBackground >

        </View >
    );
}
const styling = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: 22,
        paddingRight: 22,
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
        width: 70,
        padding: 5,
        borderRadius: 7,
        backgroundColor: "rgba(255, 255, 255,0.95)",
        fontSize: 20,
        shadowColor: "#ffff",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        marginBottom: 5,
        marginTop: 5,
        elevation: 5,
        justifyContent: 'center',
        textAlign: 'center'
    },
});