import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    TextInput,
    KeyboardAvoidingView,
    SafeAreaView,
    Keyboard,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import moment from "moment";
import { LinearGradient } from "expo-linear-gradient";
import services from "../../../db/services";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Stopwatch } from "react-native-stopwatch-timer";

export default function renderRoutine({ routineId, changeView }) {
    const [exercises, setExercises] = useState();
    const [routineData, setRoutineData] = useState();
    const [data, setData] = useState({});
    const [notes, setNotes] = useState();
    const [lastExercises, setLastExercises] = useState();
    const [prevExercises, setPrevExercises] = useState({});
    const [isStopwatchStart, setIsStopwatchStart] = useState(false);
    const [resetStopwatch, setResetStopwatch] = useState(false);
    const [time, setTime] = useState();
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const [isNoteActivated, setIsNoteActivated] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            "keyboardDidShow",
            (e) => {
                setKeyboardVisible(true);
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            "keyboardDidHide",
            (e) => {
                setKeyboardVisible(false);
            }
        );

        return () => {
            setIsStopwatchStart((prev) => {
                console.log('asd')
                if (prev) {
                    try {
                        let lastNotes;
                        let lastTime;
                        let lastRoutineData;
                        let lastExerciseData;
                        let lastPrevExercises;
                        setNotes((prev) => {
                            lastNotes = prev;
                            return prev;
                        });
                        setTime((prev) => {
                            lastTime = prev;
                            return prev;
                        });
                        setRoutineData((prev) => {
                            lastRoutineData = prev;
                            return prev;
                        });
                        setData((prev) => {
                            lastExerciseData = prev;
                            return prev;
                        })
                        setPrevExercises(prev => {
                            lastPrevExercises = prev
                            return;
                        })

                        AsyncStorage.setItem(
                            "prevWorkout",
                            JSON.stringify({

                                routineExercises: Object.keys(lastPrevExercises).length !== 0 ? lastPrevExercises : lastExerciseData,
                                notes: lastNotes,
                                routineId: routineId,
                                time: lastTime,
                                routineData: lastRoutineData,
                            })
                        );
                    } catch (err) {
                        console.log(err);
                    }
                }
                return prev;
            });
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    useEffect(async () => {
        console.log("<===> Hello World <===>");

        async function getRoutineData() {
            if (routineId) {
                let data = await services.getRoutine(routineId);

                let lastWorkout = await services.getLastWorkout(routineId);

                if (await data) {
                    setExercises((prev) => data?.routineExercises);

                    setRoutineData({
                        routineName: data.routineName ? data.routineName : "",
                        routineNotes: lastWorkout?.note ?
                            lastWorkout.note :
                            data?.routineNotes,
                        uid: data.uid,
                    });

                    if (await lastWorkout?.allExercises) {
                        setLastExercises((prev) => lastWorkout?.allExercises);
                    }
                    let prevName;
                    try {
                        prevName = await JSON.parse(await AsyncStorage.getItem("prevWorkout"))?.routineData;

                    } catch (e) {
                        console.log(e)
                    }


                    if ((await AsyncStorage.getItem("prevWorkout") &&
                        await prevName?.routineName === data?.routineName)) {
                        try {
                            let exercises = await JSON.parse(
                                await AsyncStorage.getItem("prevWorkout")
                            )?.routineExercises;

                            let time = await JSON.parse(
                                await AsyncStorage.getItem("prevWorkout")
                            )?.time;
                            if (time) {
                                let convertedTimeInMilliseconds =
                                    Number(time.split(":")[0]) * 60 * 60 * 1000 +
                                    Number(time.split(":")[1]) * 60 * 1000 +
                                    Number(time.split(":")[2]) * 1000;

                                setTime((prev) => convertedTimeInMilliseconds);
                                setIsStopwatchStart(true);
                            }

                            let notes = await JSON.parse(
                                await AsyncStorage.getItem("prevWorkout")
                            )?.notes;
                            if (notes) {

                                setNotes(prev => notes);
                                setRoutineData((prev) => {
                                    prev.routineNotes = notes;

                                    return prev;
                                });

                            }
                            setPrevExercises((prev) => exercises);

                        } catch (err) {
                            console.log(err);
                        }
                    }
                }
            }
        }
        try {
            await getRoutineData();
        } catch (e) {
            console.log(e);
        }
    }, []);
    const addSet = (text) => {
        let arr;
        setPrevExercises(prev => {
            arr = prev;
            return prev
        })



        if (arr[text.exerciseName]) {
            if (arr[text.exerciseName][text.set]) {
                arr[text.exerciseName][text.set][text.type] = text.value;
            } else {
                arr[text.exerciseName][text.set] = {
                    [text.type]: text.value
                };
            }
        } else {
            arr[text.exerciseName] = {
                [text.set]: {
                    [text.type]: text.value
                },
            };
        }
    };
    const endWorkout = (e) => {
        var today = new Date();
        let date =
            today.getDate() +
            "." +
            (today.getMonth() + 1) +
            "." +
            today.getFullYear().toString().slice(-2);

        let fullDate = moment().format("YYYY-MM-DD HH:mm:ss");

        try {
            console.log(notes);
            services
                .saveExercises(prevExercises, notes, routineId, time, date, fullDate)
                .then((res) => {
                    services.setLastExercise(prevExercises, notes, routineId).then((resp) => {
                        changeView("Routines");
                    });
                });
        } catch (e) {
            console.log(e);
        }
        AsyncStorage.removeItem("prevWorkout");
    };
    const getFormattedTime = (time) => {

        setTime((prev) => {
            return time;
        });
    };
    return (<>
        <View style={{ ...styles.body, paddingBottom: isKeyboardVisible ? 0 : 90, marginBottom: isKeyboardVisible ? 0 : 40 }}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                {!isKeyboardVisible || isNoteActivated ?
                    <SafeAreaView style={styles.inputContainer}>

                        <TextInput onSubmitEditing={Keyboard.dismiss}
                            style={styles.input}
                            placeholder="Routine Name"
                            editable={false}
                            defaultValue={routineData ? routineData?.routineName : null}
                        />
                        <TextInput style={styles.input}
                            onSubmitEditing={Keyboard.dismiss}
                            placeholder="Notes"
                            onPressIn={() => setIsNoteActivated(true)}
                            onChangeText={
                                (text) => setNotes(prev => text)
                            }
                            defaultValue={routineData ? routineData?.routineNotes : null}
                            maxLength={20}
                        />

                    </SafeAreaView> : null}
            </KeyboardAvoidingView>

            <FlatList removeClippedSubviews={false}
                keyboardDismissMode="none"
                data={exercises !== null && (lastExercises !== null) ?
                    exercises : null}

                keyExtractor={(item) => item.id}

                renderItem={
                    ({ item }) => (
                        <View style={styles.exerciseRow}>
                            <Text style={{
                                color: "rgba(225, 225, 225,0.95)",
                                paddingBottom: 10,
                                fontSize: 17,
                                left: 5,
                                alignSelf: "flex-start",
                            }}>
                                {item.exerciseName}
                            </Text>

                            {[...Array(Number(item.sets))].map((e, i) => {

                                let weight = "0";
                                let reps = "0";
                                let notes = "";
                                let defaultWeight;
                                let defaultReps;
                                let defaultNotes;

                                try {
                                    if (lastExercises) {
                                        if (lastExercises[item.exerciseName]) {
                                            if (lastExercises[item.exerciseName][i]) {
                                                weight = lastExercises[item.exerciseName][i].weight ?
                                                    lastExercises[item.exerciseName][i].weight :
                                                    "0";
                                                reps = lastExercises[item.exerciseName][i].reps ?
                                                    lastExercises[item.exerciseName][i].reps :
                                                    "";
                                                notes = lastExercises[item.exerciseName][i].notes ?
                                                    lastExercises[item.exerciseName][i].notes :
                                                    "";
                                            }
                                        }
                                    }
                                    if (prevExercises) {
                                        if (prevExercises[item.exerciseName]) {

                                            if (prevExercises[item.exerciseName][i]) {
                                                defaultWeight = prevExercises[item.exerciseName][i]
                                                    .weight ?
                                                    prevExercises[item.exerciseName][i].weight :
                                                    null;
                                                defaultReps = prevExercises[item.exerciseName][i].reps ?
                                                    prevExercises[item.exerciseName][i].reps :
                                                    null;
                                                defaultNotes = prevExercises[item.exerciseName][i].notes ?
                                                    prevExercises[item.exerciseName][i].notes :
                                                    null;
                                            }
                                        }
                                    }
                                } catch (e) {
                                    console.log(e);
                                }

                                return (
                                    <View style={styles.setRow}>
                                        <View style={{
                                            borderColor: "white",
                                            borderWidth: 1,
                                            borderRadius: 300,
                                            paddingLeft: 5.9,
                                            paddingRight: 5.9,
                                            paddingBottom: 0.9,
                                            paddingTop: 0.9,
                                            color: "white",
                                            marginRight: 4,
                                        }}>
                                            <Text style={{ color: "white", fontSize: 12 }}>
                                                {i + 1}
                                            </Text>
                                        </View>
                                        <View style={{
                                            ...styles.setCol,
                                            ...styles.setColLeft,
                                        }}>

                                            <TextInput onSubmitEditing={Keyboard.dismiss}
                                                style={styles.setInput}
                                                defaultValue={defaultWeight}
                                                placeholder={`weight: ${weight}`}
                                                onChangeText={
                                                    (text) =>
                                                        addSet({
                                                            exerciseName: item.exerciseName,
                                                            value: text,
                                                            type: "weight",
                                                            set: i,
                                                        })
                                                }
                                                onPressIn={() => isNoteActivated ? setIsNoteActivated(false) : null}
                                                maxLength={5}
                                            />

                                        </View>

                                        <View style={styles.setCol}>
                                            <TextInput onSubmitEditing={Keyboard.dismiss}
                                                style={styles.setInput}
                                                defaultValue={defaultReps}
                                                placeholder={`reps: ${reps}`}
                                                onChangeText={(text) =>
                                                    addSet({
                                                        exerciseName: item.exerciseName,
                                                        value: text,
                                                        type: "reps",
                                                        set: i,
                                                    })}
                                                maxLength={4}
                                                onPressIn={() => isNoteActivated ? setIsNoteActivated(false) : null}
                                            />
                                        </View>

                                        <View style={{ ...styles.setCol, ...styles.setColRight, }}>

                                            <TextInput onSubmitEditing={Keyboard.dismiss}
                                                style={styles.setInput}
                                                defaultValue={defaultNotes}
                                                placeholder={`notes: ${notes}`}
                                                onChangeText={(text) =>
                                                    addSet({
                                                        exerciseName: item.exerciseName,
                                                        value: text,
                                                        type: "notes",
                                                        set: i,
                                                    })}
                                                maxLength={10}
                                                onPressIn={() => isNoteActivated ? setIsNoteActivated(false) : null}
                                            />
                                        </View>

                                    </View>
                                );
                            })}
                        </View>
                    )
                }
            />
            <View style={{
                width: "90%",
                bottom: 10,
                position: "absolute",
            }}>
                {!isKeyboardVisible ? (
                    <TouchableOpacity onPress={(e) => {
                        setIsStopwatchStart(!isStopwatchStart);
                        setResetStopwatch(false);
                        if (isStopwatchStart) {
                            endWorkout(e);
                        }
                    }} style={styles.authButton}>
                        {
                            isStopwatchStart ?
                                <Text style={styles.buttonText}>End Workout</Text> :
                                <Text style={styles.buttonText}>Start Workout</Text>
                        }
                    </TouchableOpacity>
                ) : null}

                <View style={
                    {
                        ...styles.doneButton,
                        borderBottomRightRadius: isKeyboardVisible ? 20 : 5,
                        borderTopRightRadius: isKeyboardVisible ? 20 : 5,
                        borderRadius: isKeyboardVisible ? 20 : 0,
                        right: isKeyboardVisible ? -25 : 0,
                    }
                }>
                    <Text style={{ ...styles.buttonText, }}>
                        {
                            isStopwatchStart ?
                                <Stopwatch startTime={time ? time : 0}
                                    start={isStopwatchStart}
                                    reset={resetStopwatch}
                                    options={options}
                                    getTime={
                                        (e) => getFormattedTime(e)
                                    } />
                                : <MaterialCommunityIcons name="timer-outline"
                                    size={30}
                                    color="white" />
                        }
                    </Text>
                </View>
            </View>
        </View>
        {!isKeyboardVisible ?
            <LinearGradient colors={["#d5990c", "#ffff", "#ffff"]}
                start={[0, 0]}
                end={[1, 1]}
                style={{
                    marginBottom: 41,
                    marginTop: -41,
                    borderRadius: 1000,
                }}>

                <View style={{
                    height: 1.6,
                    width: 300,
                    borderRadius: 1000,
                }}>

                </View>
            </LinearGradient> : null}
    </>
    );
}
const options = {
    container: {
        backgroundColor: "transparent",
        width: 100,
        alignItems: "center",
    },
    text: {
        fontSize: 15,
        color: "#FFF",
        marginLeft: -25,
        marginRight: 10,
    },
};

const styles = StyleSheet.create({
    body: {
        width: "91%",
        height: "83%",
        backgroundColor: "rgba(18, 18, 19,0.6)",
        marginTop: 0,
        alignItems: "center",
        paddingTop: 10,
    },
    input: {
        height: 43,
        width: 290,
        padding: 5,
        marginBottom: 15,
        borderRadius: 7,
        backgroundColor: "rgba(225, 225, 225,0.95)",
        fontSize: 20,
        shadowColor: "#ffff",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    inputContainer: {
        textAlign: "center",
        alignItems: "center",
        top: 0,
        borderBottomWidth: 1.5,
        borderColor: "#FFCC1D",
    },
    authButton: {
        backgroundColor: "#FFCC1D",
        justifyContent: "center",
        textAlign: "center",
        alignItems: "center",
        borderRadius: 5,
        height: 50,
        bottom: 0,
        width: "77%",
        position: "absolute",
        left: 0,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
    },
    doneButton: {
        backgroundColor: "#FFCC1D",
        justifyContent: "center",
        textAlign: "center",
        alignItems: "center",
        width: "22%",
        height: 50,
        bottom: 0,
        position: "absolute",
        right: 0,
    },
    buttonText: {
        color: "#ffff",
        letterSpacing: 3,
        fontFamily: "redCoat-Bold",
        fontSize: 18,
    },
    exerciseRow: {
        borderWidth: 0,
        borderBottomWidth: 0.1,
        borderColor: "#FFCC1D",
        borderRadius: 10,
        backgroundColor: "rgba(32, 32, 32,0.9)",
        color: "#ffff",
        width: 300,
        height: "auto",
        zIndex: 100,
        marginTop: 10,
        marginBottom: 10,
        fontSize: 20,
        padding: 8,
        paddingBottom: "auto",
        alignItems: "center",
    },
    setRow: {
        position: "relative",
        flexDirection: "row",
        borderWidth: 0,
        borderBottomWidth: 0.1,
        borderColor: "#FFCC1D",
        borderRadius: 6,
        backgroundColor: "rgba(62, 62, 62,0.9)",
        color: "#ffff",
        width: 282,
        height: 45,
        padding: 4,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 5,
    },
    setCol: {
        padding: 5,
        backgroundColor: "rgba(225, 225, 225,0.95)",
        width: 80,
    },
    setColLeft: {
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        borderRightWidth: 2,
        borderRightColor: "#00000000",
    },
    setColRight: {
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        borderLeftWidth: 2,
        borderLeftColor: "#00000000",
        width: 90,
    },
});