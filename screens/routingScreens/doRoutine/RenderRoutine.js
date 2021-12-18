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
	ScrollView
} from "react-native";
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
	const [isStopwatchStart, setIsStopwatchStart] = useState(false);
	const [resetStopwatch, setResetStopwatch] = useState(false);

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
						routineNotes: lastWorkout?.note
							? lastWorkout.note
							: data?.routineNotes,
						uid: data.uid
					});

					if (await lastWorkout?.allExercises) {
						setLastExercises((prev) => lastWorkout.allExercises);
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
		let arr = data;
		if (arr[text.exerciseName]) {
			if (arr[text.exerciseName][text.set]) {
				arr[text.exerciseName][text.set][text.type] = text.value;
			} else {
				arr[text.exerciseName][text.set] = { [text.type]: text.value };
			}
		} else {
			arr[text.exerciseName] = {
				[text.set]: { [text.type]: text.value }
			};
		}
		setData((prev) => arr);
	};
	const endWorkout = (e) => {
		console.log("=====================");
		try {
			services.saveExercises(data, notes, routineId).then((res) => {
				console.log(res);

				services
					.setLastExercise(data, notes, routineId)
					.then((resp) => {
						console.log(resp);
						changeView("Routines");
					});
			});
		} catch (e) {
			console.log(e);
		}
		console.log("=====================");
	};

	return (
		<>
			<View style={styles.body}>
				<KeyboardAvoidingView
					behavior={Platform.OS === "ios" ? "padding" : "height"}>
					<SafeAreaView style={styles.inputContainer}>
						<TextInput
							style={styles.input}
							placeholder="Routine Name"
							onChangeText={(text) => setName(text)}
							defaultValue={
								routineData ? routineData.routineName : null
							}
						/>
						<TextInput
							style={styles.input}
							placeholder="Notes"
							onChangeText={(text) => setNotes(text)}
							defaultValue={
								routineData ? routineData.routineNotes : null
							}
						/>
					</SafeAreaView>
				</KeyboardAvoidingView>

				<FlatList
					data={
						exercises && (lastExercises || lastExercises == null)
							? exercises
							: null
					}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => (
						<ScrollView>
							<View style={styles.exerciseRow}>
								<Text
									style={{
										color: "rgba(225, 225, 225,0.95)",
										paddingBottom: 10,
										fontSize: 17,
										left: 15.5,
										alignSelf: "flex-start"
									}}>
									{item.exerciseName}
								</Text>
								{[...Array(Number(item.sets))].map((e, i) => {
									let weight = "0";
									let reps = "0";
									let notes = "";
									try {
										if (lastExercises) {
											if (
												lastExercises[item.exerciseName]
											) {
												if (
													lastExercises[
														item.exerciseName
													][i]
												) {
													weight = lastExercises[
														item.exerciseName
													][i].weight
														? lastExercises[
																item
																	.exerciseName
														  ][i].weight
														: "0";
													reps = lastExercises[
														item.exerciseName
													][i].reps
														? lastExercises[
																item
																	.exerciseName
														  ][i].reps
														: "";
													notes = lastExercises[
														item.exerciseName
													][i].notes
														? lastExercises[
																item
																	.exerciseName
														  ][i].notes
														: "";
												}
											}
										}
									} catch (e) {
										console.log(e);
									}

									return (
										<View style={styles.setRow}>
											<View
												style={{
													...styles.setCol,
													...styles.setColLeft
												}}>
												<TextInput
													style={styles.setInput}
													placeholder={`weight: ${weight}`}
													onChangeText={(text) =>
														addSet({
															exerciseName:
																item.exerciseName,
															value: text,
															type: "weight",
															set: i
														})
													}
												/>
											</View>
											<View style={styles.setCol}>
												<TextInput
													style={styles.setInput}
													placeholder={`reps: ${reps}`}
													onChangeText={(text) =>
														addSet({
															exerciseName:
																item.exerciseName,
															value: text,
															type: "reps",
															set: i
														})
													}
												/>
											</View>
											<View
												style={{
													...styles.setCol,
													...styles.setColRight
												}}>
												<TextInput
													style={styles.setInput}
													placeholder={`notes: ${notes}`}
													onChangeText={(text) =>
														addSet({
															exerciseName:
																item.exerciseName,
															value: text,
															type: "notes",
															set: i
														})
													}
												/>
											</View>
										</View>
									);
								})}
							</View>
						</ScrollView>
					)}
				/>

				<TouchableOpacity
					onPress={(e) => {
						setIsStopwatchStart(!isStopwatchStart);
						setResetStopwatch(false);
						if (isStopwatchStart) {
							endWorkout(e);
						}
					}}
					style={styles.authButton}>
					{isStopwatchStart ? (
						<Text style={styles.buttonText}>End Workout</Text>
					) : (
						<Text style={styles.buttonText}>Start Workout</Text>
					)}
				</TouchableOpacity>
				<View style={styles.doneButton}>
					<Text style={styles.buttonText}>
						{isStopwatchStart ? (
							<Stopwatch
								start={isStopwatchStart}
								// To start
								reset={resetStopwatch}
								// To reset
								options={options}
								// Options for the styling
							/>
						) : (
							<MaterialCommunityIcons
								name="timer-outline"
								size={30}
								color="white"
							/>
						)}
					</Text>
				</View>
			</View>
			<LinearGradient
				colors={["#d5990c", "#ffff", "#ffff"]}
				start={[0, 0]}
				end={[1, 1]}
				style={{
					marginBottom: 41,
					marginTop: -41,
					borderRadius: 1000
				}}>
				<View
					style={{
						height: 1.6,
						width: 300,
						borderRadius: 1000
					}}></View>
			</LinearGradient>
		</>
	);
}
const options = {
	container: {
		backgroundColor: "transparent",
		width: 100,
		alignItems: "center"
	},
	text: {
		fontSize: 15,
		color: "#FFF",
		marginLeft: -25,
		marginRight: 10
	}
};

const styles = StyleSheet.create({
	body: {
		borderBottomWidth: 1.5,
		borderColor: "#ccc",
		borderRadius: 20,
		width: "91%",
		height: "83%",
		backgroundColor: "rgba(18, 18, 19,0.6)",
		marginTop: 0,
		marginBottom: 40,
		alignItems: "center",
		paddingBottom: 90,
		paddingTop: 10
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
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,

		elevation: 5
	},
	inputContainer: {
		textAlign: "center",
		alignItems: "center",
		top: 0,
		borderBottomWidth: 1.5,
		borderColor: "#FFCC1D"
	},
	authButton: {
		backgroundColor: "#FFCC1D",
		justifyContent: "center",
		textAlign: "center",
		alignItems: "center",
		borderRadius: 5,
		height: 50,
		bottom: 20,
		width: "70%",
		position: "absolute",
		left: 15,
		borderTopRightRadius: 0,
		borderBottomRightRadius: 0
	},
	doneButton: {
		backgroundColor: "#FFCC1D",
		justifyContent: "center",
		textAlign: "center",
		alignItems: "center",
		borderRadius: 5,
		height: 50,
		bottom: 20,
		width: "20%",
		position: "absolute",
		right: 15,
		borderTopLeftRadius: 0,
		borderBottomLeftRadius: 0
	},
	buttonText: {
		color: "#ffff",
		letterSpacing: 3,
		fontSize: 18,
		fontFamily: "redCoat-Bold"
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
		paddingBottom: 10,
		alignItems: "center"
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
		width: 270,
		height: 45,
		padding: 4,
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 5
	},
	setCol: {
		padding: 5,
		backgroundColor: "rgba(225, 225, 225,0.95)",
		width: 85
	},
	setColLeft: {
		borderTopLeftRadius: 5,
		borderBottomLeftRadius: 5,
		borderRightWidth: 2,
		borderRightColor: "#00000000"
	},
	setColRight: {
		borderTopRightRadius: 5,
		borderBottomRightRadius: 5,
		borderLeftWidth: 2,
		borderLeftColor: "#00000000",
		width: 90
	}
});
