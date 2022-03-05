import React, { useState, useEffect } from "react";
import {
    Text,
    TextInput,
    View,
    Image,
    ImageBackground,
    StyleSheet,
    TouchableOpacity

} from "react-native";

import DefaultImage from "../../assets/welcomePage.jpg";
const DEFAULT_IMAGE = Image.resolveAssetSource(DefaultImage).uri;
const image = { uri: DEFAULT_IMAGE };
const styles = require("../authScreens/authStyle");

import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';
import moment from "moment";
import { Foundation } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AnimateNumber from 'react-native-animate-number'
import * as Animatable from 'react-native-animatable';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from "@expo/vector-icons";
import services from "../../db/services";

export default function CalendarRoute({ navigation }) {

    const massage = { key: 'massage', color: 'blue', selectedDotColor: 'blue' };
    const workout = { key: 'workout', color: 'green' };
    const [markedDates, setMarkedDates] = useState({});
    const [selected, setSelected] = useState({});
    const [checkedDaysForCurrentWeek, setCheckedDaysForCurrentWeek] = useState(0);
    const [checkedDaysForCurrentMonth, setCheckedDaysForCurrentMonth] = useState(0);
    const [checkedDaysForAllTime, setCheckedDaysForAllTime] = useState(0);

    const [monthTarget, setMonthTarget] = useState(12);
    const [weekTarget, setWeekTarget] = useState(3);
    const [translation, setTranslation] = useState(0);
    const [translationRotate, setTranslationRotate] = useState(0);
    const [showIcon, setShowIcon] = useState(false);
    const [isTheGoalHitted, setIsTheGoalHitted] = useState(false);
    const [givenOpacity, setGivenOpacity] = useState(0.8)
    const [typeOfHittedGoal, setTypeOfHittedGoal] = useState("")
    const [editTargets, setEditTargets] = useState(false);

    LocaleConfig.locales['fr'] = {
        monthNames: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ],
        monthNamesShort: ['Jan.', 'Feb.', 'Mar', 'Apr', 'May', 'Jun', 'Jul.', 'Aug', 'Sept.', 'Oct.', 'Nov.', 'Dec.'],
        dayNames: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        dayNamesShort: ['Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.', 'Sun.'],
    };
    LocaleConfig.defaultLocale = 'fr';
    useEffect(async () => {
        let data = await services.getUserCalendarData();
        if (await data?.markedDates) {
            console.log(data?.markedDates?.markedDates)
            console.log("asdasd")
            setMarkedDates(prev => data?.markedDates?.markedDates);
            setCheckedDaysForCurrentWeek(prev => data?.checkedDaysForCurrentWeek);
            setCheckedDaysForCurrentMonth(prev => data?.checkedDaysForCurrentMonth);
            setCheckedDaysForAllTime(prev => data?.checkedDaysForAllTime);
            setMonthTarget(prev => data?.monthTarget);
            setWeekTarget(prev => data?.weekTarget);
        }
        return () => {
        }

    }, []);

    const onComplition = () => {

        setShowIcon(prev => false);
        setGivenOpacity(0.8);
        setIsTheGoalHitted(prev => true);
        for (let i = 0; i <= 120; i += 9) {
            setTimeout(() => {
                setTranslation(i);
            }, 2 * i);
        }
        for (let i = 0; i <= 370; i += 10) {
            setTimeout(() => {
                setTranslationRotate(i);
            }, 1 * i);
        }
        setTimeout(() => {
            setShowIcon(prev => true);
            setTimeout(() => {
                for (let i = 0; i <= 119.5; i += 10) {
                    setTimeout(() => {
                        setTranslationRotate(i);
                    }, 1 * i);
                }
            }, 800)

            setTimeout(() => {
                setGivenOpacity(0.2);
            }, 900)
            setTimeout(() => {
                setIsTheGoalHitted(prev => false);
                setTranslation(0);
                setTranslationRotate(0);
            }, 1100)
        }, 3200);


    }

    const onDayPress = (day) => {

        const weekNumber = moment().format("w");
        const monthNumber = moment().format("M");
        let weekNumberByDate = moment(day.dateString, "YYYY-MM-DD").week();
        let monthNumberByDate = moment(day.dateString, "YYYY-MM-DD").month() + 1;
        let lastCheckedDaysForCurrentMonth = checkedDaysForCurrentMonth;
        let lastCheckedDaysForCurrentWeek = checkedDaysForCurrentWeek;
        let lastCheckedDaysForAllTime = checkedDaysForAllTime;


        let checkedOrUnchecked = false;
        setMarkedDates(prev => {
            if (prev[day.dateString]?.selected) {
                prev[day.dateString] = {
                    selected: false,
                }
                setSelected({ date: day.dateString, disable: true });
                checkedOrUnchecked = false;
                return prev;
            } else {
                prev[day.dateString] = {
                    selected: true,
                }
                setSelected({ date: day.dateString, disable: false });
                checkedOrUnchecked = true;

                return prev;
            }
        })


        if (Number(weekNumber) == Number(weekNumberByDate)) {
            lastCheckedDaysForCurrentWeek = checkedOrUnchecked ? lastCheckedDaysForCurrentWeek + 1 : lastCheckedDaysForCurrentWeek - 1;
            setCheckedDaysForCurrentWeek(prev => {
                prev = checkedOrUnchecked ? prev + 1 : prev - 1;
                if (prev == weekTarget) {
                    setTypeOfHittedGoal("week");
                    onComplition();
                }
                return prev;
            })
        }
        if (Number(monthNumber) == Number(monthNumberByDate)) {
            lastCheckedDaysForCurrentMonth = checkedOrUnchecked ? lastCheckedDaysForCurrentMonth + 1 : lastCheckedDaysForCurrentMonth - 1;
            setCheckedDaysForCurrentMonth(prev => {
                prev = checkedOrUnchecked ? prev + 1 : prev - 1;
                if (prev == monthTarget) {
                    setTypeOfHittedGoal("month");
                    onComplition();

                }
                lastCheckedDaysForCurrentMonth = prev;
                return prev;
            })
        }
        lastCheckedDaysForAllTime = checkedOrUnchecked ? lastCheckedDaysForAllTime + 1 : lastCheckedDaysForAllTime - 1;
        setCheckedDaysForAllTime(prev => prev = checkedOrUnchecked ? prev + 1 : prev - 1);

        services.sendCalendarData(markedDates, lastCheckedDaysForCurrentWeek, lastCheckedDaysForCurrentMonth, lastCheckedDaysForAllTime, monthTarget,
            weekTarget).then(res => {
                console.log(res);
            }).catch(err => {
                console.log(err);
            })
    };

    return (
        <View style={styles.container}>
            <ImageBackground
                resizeMode="cover"
                source={image}
                style={styles.image}>
                {isTheGoalHitted ?
                    <View style={{
                        zIndex: 100,
                        position: 'absolute',
                        right: "2%",
                        top: "-10%",
                        transform: [
                            { translateY: translation },
                            { rotateY: `${translationRotate}deg` },
                            { rotateZ: `15deg` },
                        ],
                    }}>

                        <View style={{
                            alignItems: 'center',
                            alignContent: 'center',
                            justifyContent: 'center',
                            borderWidth: 1,
                            borderColor: "#65C18C",
                            borderRadius: 200,
                            height: 85,
                            width: 85,
                            backgroundColor: "#202020",
                            opacity: givenOpacity
                        }}>
                            {showIcon ? <Feather name="check" size={60} color="#65C18C" /> : <>
                                {typeOfHittedGoal == 'week' ? <>
                                    <Text style={styling.hittedTargetText}>Weekly</Text>
                                    <Text style={styling.hittedTargetText}>target</Text>
                                    <View style={{ flexDirection: "row", marginTop: 1, }}>
                                        <AnimateNumber style={{ color: "#FFCC1D", fontFamily: 'redcoat', fontSize: 18 }} interval={505} countBy={1} value={isTheGoalHitted ? weekTarget : 0} />
                                        <Text style={styling.hittedTargetText}>/{weekTarget}</Text>
                                    </View>
                                </>
                                    :
                                    <>
                                        <Text style={styling.hittedTargetText}>Monthly</Text>
                                        <Text style={styling.hittedTargetText}>target</Text>
                                        <View style={{ flexDirection: "row", marginTop: 1, }}>
                                            <AnimateNumber style={{ color: "#FFCC1D", fontFamily: 'redcoat', fontSize: 18 }} interval={300} countBy={1} value={isTheGoalHitted ? monthTarget : 0} />
                                            <Text style={styling.hittedTargetText}>/{monthTarget}</Text>
                                        </View>
                                    </>}

                            </>}
                        </View>
                    </View>
                    : null}
                <View style={{ position: "absolute", top: "4%", alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ letterSpacing: 3, fontFamily: 'redcoat', fontSize: 40, color: '#FFCC1D' }}>{editTargets ? "Set Targets" : " Calendar"}</Text>

                    <Calendar
                        style={{
                            borderWidth: 1,
                            borderColor: 'gray',
                            height: 355,
                            minWidth: 100,
                            width: 310,
                            backgroundColor: 'rgba(32, 32, 32,0.9)',
                            color: 'white',

                        }}
                        onPress={(key) => console.log("===> ", key)}
                        onDayPress={(day) => onDayPress(day)}
                        theme={{
                            arrowColor: '#FFCC1D',
                            monthTextColor: 'white',
                            indicatorColor: '#FFCC1D',
                            calendarBackground: 'rgba(32,32,32,0.5)',
                            textDayFontFamily: 'redcoat',
                            textMonthFontFamily: 'redcoat',
                            textDayHeaderFontFamily: 'redcoat',
                            dayTextColor: '#ffff',
                            textSectionTitleColor: '#ffff',
                            textSectionTitleDisabledColor: '#ffff',
                            textDisabledColor: "#898B8A",
                            todayTextColor: '#FFCC1D',
                            textDayFontSize: 19,
                            textMonthFontSize: 19,
                            textDayHeaderFontSize: 15,
                            selectedDayBackgroundColor: 'rgba(255, 204, 29,0.5)'

                        }}
                        markedDates={{
                            ...markedDates,

                            [selected.date]: {
                                selected: selected.disable ? false : true,
                                ...markedDates.hasOwnProperty(selected.date) ? markedDates[selected.date] : {},
                            }

                        }}
                    />
                    {editTargets ?
                        <View style={{
                            position: 'absolute',
                            justifyContant: 'center',
                            backgroundColor: 'rgba(32,32,32,0.9)',
                            height: "36%",
                            width: "90%",
                            alignItems: 'center',
                            top: "10%",
                            borderRadius: 5,
                            borderWidth: 0.8,
                            borderColor: "#FFCC1D",
                            padding: 20
                        }}>
                            <TouchableOpacity onPress={() => setEditTargets(prev => false)} style={{ position: 'absolute', right: "-5%", top: "-5%" }}>
                                <MaterialIcons name="cancel" size={37} color="#EC4226" />
                            </TouchableOpacity>
                            <Text style={{ ...styling.editTargetsText, fontSize: 24 }}>Workouts per week</Text>
                            <TextInput
                                style={styling.input}
                                keyboardType="numeric"
                                placeholder="--"
                                onChangeText={(t) => setWeekTarget(t)}
                            />
                            <Text style={{ ...styling.editTargetsText, fontSize: 23 }}>Workouts per month</Text>
                            <TextInput
                                style={styling.input}
                                placeholder="--"
                                keyboardType="numeric"
                                onChangeText={(t) => setMonthTarget(t)}
                            />
                            <TouchableOpacity
                                style={styling.authButton}>
                                <TouchableOpacity onPress={() => setEditTargets(prev => false)}>
                                    <MaterialIcons name="done" size={34} color="white" />
                                </TouchableOpacity>
                            </TouchableOpacity>
                        </View>
                        : null}
                    <View style={{
                        height: 200,
                        width: 310,
                        backgroundColor: 'rgba(32,32,32,0.5)',
                        marginTop: "3%"
                    }}>

                        <View style={{
                            justifyContent: "center",
                            flexDirection: "row",
                            height: 45,
                        }}>
                            <Text style={{ marginTop: 4, color: "#FFCC1D", fontFamily: 'redCoat-Bold', fontSize: 27 }}>
                                Workout Targets
                            </Text>
                            <Text style={{ paddingRight: 4 }}>
                                <Foundation name="target" size={17} color="white" />
                            </Text>
                        </View>
                        <View style={{ top: 0, flexDirection: 'row', justifyContent: 'center' }}>
                            <Text style={{ marginLeft: -10, marginRight: 5, marginBottom: 5, color: "white", fontFamily: 'redcoat', fontSize: 23 }}>
                                Weekly:
                            </Text>
                            <AnimateNumber style={{ color: "#FFCC1D", fontFamily: 'redcoat', fontSize: 21 }} interval={255} countBy={1} value={weekTarget} />
                            <Text style={{ marginLeft: 10, marginRight: 5, color: "white", fontFamily: 'redcoat', fontSize: 23 }}>
                                Monthly:
                            </Text>
                            <AnimateNumber style={{ color: "#FFCC1D", fontFamily: 'redcoat', fontSize: 21 }} interval={105} countBy={1} value={monthTarget} />
                            <TouchableOpacity onPress={() => setEditTargets(prev => true)}>
                                <Text style={{ marginLeft: 16, marginTop: -5, marginBottom: 10, borderColor: "#FFCC1D", borderBottomWidth: 0.5 }}>
                                    <MaterialCommunityIcons name="pencil" size={29} color="white" />
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{
                            justifyContent: "center",
                            flexDirection: "row",
                            height: 43,
                        }}>
                            <Text style={{ marginTop: 4, color: "#FFCC1D", fontFamily: 'redCoat-Bold', fontSize: 27 }}>
                                Total
                            </Text>
                        </View>
                        <View style={{ top: 0, flexDirection: 'row', justifyContent: 'center' }}>
                            <Text style={{ marginLeft: -10, marginRight: 5, marginBottom: 5, color: "white", fontFamily: 'redcoat', fontSize: 23 }}>
                                This week:
                            </Text>
                            <AnimateNumber style={{ color: "#FFCC1D", fontFamily: 'redcoat', fontSize: 21 }} interval={255} countBy={1} value={checkedDaysForCurrentWeek} />
                            <Text style={{ marginLeft: 10, marginRight: 5, color: "white", fontFamily: 'redcoat', fontSize: 23 }}>
                                This Month:
                            </Text>
                            <AnimateNumber style={{ color: "#FFCC1D", fontFamily: 'redcoat', fontSize: 21 }} interval={105} countBy={1} value={checkedDaysForCurrentMonth} />

                        </View>
                        <View style={{ top: 0, flexDirection: 'row', justifyContent: 'center' }}>
                            <Text style={{ marginLeft: 10, marginRight: 5, color: "white", fontFamily: 'redcoat', fontSize: 24 }}>
                                All time:
                            </Text>
                            <AnimateNumber style={{ color: "#FFCC1D", fontFamily: 'redcoat', fontSize: 21 }} interval={85} countBy={1} value={checkedDaysForAllTime} />

                        </View>

                    </View>
                </View>
            </ImageBackground >

        </View >
    );
}
const styling = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center"
    },
    absolute: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },
    hittedTargetText: {
        fontFamily: "redCoat-Bold",
        fontSize: 17,
        color: '#65C18C',
    },
    editTargetsText: {
        fontFamily: "redcoat",
        fontSize: 30,
        color: '#FFCC1D',
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
    authButton: {
        backgroundColor: "#FFCC1D",
        justifyContent: "center",
        textAlign: "center",
        alignItems: "center",
        borderRadius: 5,
        height: 50,
        top: 10,
        width: "40%",
        zIndex: 100
    },


});