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
import services from "../../db/services";
import { MaterialIcons } from "@expo/vector-icons";

export default function ViewWorkout({ ids, changeView }) {
	const [exercises, setExercises] = useState();
	const [routineData, setRoutineData] = useState();
	const [lastExercises, setLastExercises] = useState();

	useEffect(async () => {
		console.log("<===> Hello World <===>");

		async function getRoutineData() {
			if (ids?.wId && ids?.rId) {
				let data = await services.getRoutine(ids.rId);
				let workout = await services.getWorkout(ids.rId, ids.wId);

				if (await data) {
					setExercises((prev) => data?.routineExercises);

					setRoutineData({
						routineName: data.routineName ? data.routineName : "",
						routineNotes: workout?.note
							? workout.note
							: data?.routineNotes,
						uid: data.uid,
						time: workout.time ? workout.time : "00:00:00"
					});

					if (await workout?.exercises) {
						setLastExercises((prev) => workout.exercises);
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

	return (
		<>
			<View style={styles.body}>
				<KeyboardAvoidingView
					behavior={Platform.OS === "ios" ? "padding" : "height"}>
					<SafeAreaView style={styles.inputContainer}>
						<TextInput
							style={styles.input}
							placeholder="Routine Name"
							defaultValue={
								routineData ? routineData.routineName : null
							}
							editable={false}
						/>
						<TextInput
							style={styles.input}
							placeholder="Notes"
							defaultValue={
								routineData ? routineData.routineNotes : null
							}
							selectTextOnFocus={false}
							editable={false}
						/>
					</SafeAreaView>
				</KeyboardAvoidingView>

				<FlatList
					removeClippedSubviews={false}
					keyboardDismissMode="none"
					data={
						exercises && (lastExercises || lastExercises == null)
							? exercises
							: null
					}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => (
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
										if (lastExercises[item.exerciseName]) {
											if (
												lastExercises[
													item.exerciseName
												][i]
											) {
												weight = lastExercises[
													item.exerciseName
												][i].weight
													? lastExercises[
															item.exerciseName
													  ][i].weight
													: "0";
												reps = lastExercises[
													item.exerciseName
												][i].reps
													? lastExercises[
															item.exerciseName
													  ][i].reps
													: "";
												notes = lastExercises[
													item.exerciseName
												][i].notes
													? lastExercises[
															item.exerciseName
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
												value={`weight: ${weight}`}
												editable={false}
											/>
										</View>
										<View style={styles.setCol}>
											<TextInput
												style={styles.setInput}
												value={`reps: ${reps}`}
												editable={false}
											/>
										</View>
										<View
											style={{
												...styles.setCol,
												...styles.setColRight
											}}>
											<TextInput
												style={styles.setInput}
												value={`notes: ${notes}`}
												editable={false}
												selectTextOnFocus={false}
											/>
										</View>
									</View>
								);
							})}
						</View>
					)}
				/>
				<>
					<TouchableOpacity style={styles.authButton}>
						{routineData ? (
							<Text style={styles.buttonText}>
								The workout last {routineData?.time}
							</Text>
						) : null}
					</TouchableOpacity>
					<View style={styles.doneButton}>
						<Text style={styles.buttonText}>
							<TouchableOpacity>
								<MaterialIcons
									name="done"
									size={30}
									color="white"
								/>
							</TouchableOpacity>
						</Text>
					</View>
				</>
			</View>
			<LinearGradient
				colors={["#ffff", "#ffff", "#d5990c"]}
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
		fontFamily: "redCoat-Bold",
		textAlign: "center"
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
