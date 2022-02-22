import React, { useState, useEffect } from "react";
import {
    Text,
    View,
    Image,
    ImageBackground,
} from "react-native";

import DefaultImage from "../../assets/welcomePage.jpg";
const DEFAULT_IMAGE = Image.resolveAssetSource(DefaultImage).uri;
const image = { uri: DEFAULT_IMAGE };

import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

export default function CalendarRoute({ navigation }) {

    useEffect(() => {

    }, []);

    return (
        <View>
            <Calendar
                style={{ height: 300 }}
                dayComponent={({ date, state }) => {
                    return (
                        <View>
                            <Text style={{ textAlign: 'center', color: state === 'disabled' ? 'gray' : 'black' }}>{date.day}</Text>
                        </View>
                    );
                }}
            />

        </View>
    );
}
