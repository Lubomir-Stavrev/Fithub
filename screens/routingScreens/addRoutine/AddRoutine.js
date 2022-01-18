import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	FlatList,
	TextInput,
	KeyboardAvoidingView,
	SafeAreaView
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import services from "../../../db/services";

export default function routines({ onChangeState, changeView }) {
	const [exercises, setExercises] = useState({});

	const [name, setName] = useState();
	const [notes, setNotes] = useState();

	useEffect(async () => {
		let data = await setExercisesData();

		if (await data) {
			setExercises(await data);
		}
	}, []);

	const setExercisesData = async () => {
		try {
			let exercises = await JSON.parse(
				await AsyncStorage.getItem("exercises")
			);
			let routine = await JSON.parse(
				await AsyncStorage.getItem("routineInfo")
			);

			if (await routine) {
				setNotes((prev) => routine.notes);
				setName((prev) => routine.name);
			}
			let obj = null;
			if (exercises) {
				obj = Object.values(exercises);
			}
			return await obj;
		} catch (err) {
			console.log(err);
		}
	};

	const changeViewState = async () => {
		if (name || notes) {
			try {
				await AsyncStorage.setItem(
					"routineInfo",
					JSON.stringify({
						name: name,
						notes: notes
					})
				).then((res) => {});
			} catch (error) {
				console.log(error);
			}
		}
		onChangeState({
			state: true
		});
	};

	const deleteExercise = async (itemId) => {
		try {
			let data = await exercises;

			let newData = Object.values(data).filter((el) => {
				return el.id !== itemId;
			});

			await AsyncStorage.setItem("exercises", JSON.stringify(newData));
			setExercises((prev) => {
				return newData;
			});
		} catch (error) {
			console.log(error);
		}
	};

	const pushRoutines = async () => {
		try {
			if (name && exercises) {
				let res = await services.addRoutine(name, notes, exercises);
				console.log(res);
			}
			changeView("routes");
		} catch (error) {
			console.log(error);
		}
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
							defaultValue={name ? name : null}
						/>
						<TextInput
							style={styles.input}
							placeholder="Notes"
							onChangeText={(text) => setNotes(text)}
							defaultValue={notes ? notes : null}
						/>
					</SafeAreaView>
				</KeyboardAvoidingView>
				<FlatList
					data={exercises ? exercises : null}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => (
						<>
							<View style={styles.item}>
								<Text
									style={{
										color: "white",
										fontSize: 20,
										position: "absolute",
										left: 15,
										top: 15
									}}>
									{item.exerciseName}
								</Text>
								<Text
									style={{
										color: "white",
										position: "absolute",
										right: 90,
										top: 17,
										fontSize: 20
									}}>
									{item.sets}
								</Text>
								<FontAwesome5
									name="dumbbell"
									style={{
										position: "absolute",
										right: 60,
										top: 20
									}}
									size={20}
									color={routines ? "#d5990c" : "#ccc"}
								/>
								<TouchableOpacity
									onPress={() => deleteExercise(item.id)}
									style={{
										width: 40,
										height: 60.2,
										backgroundColor: "#EC4226",
										right: 0,
										margin: 0,
										position: "absolute",
										borderBottomRightRadius: 10,
										borderTopRightRadius: 10
									}}>
									<View>
										<AntDesign
											name="delete"
											size={24}
											color="white"
											style={{
												top: 18,
												right: 0,
												left: 7
											}}
										/>
									</View>
								</TouchableOpacity>
							</View>
						</>
					)}
				/>
				<TouchableOpacity
					onPress={() => changeViewState()}
					style={styles.authButton}>
					<Text style={styles.buttonText}>Add Exercises</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.doneButton}
					onPress={() => pushRoutines()}>
					<Ionicons
						name="checkmark-done-circle-outline"
						size={34}
						color="white"
					/>
				</TouchableOpacity>
			</View>
			<LinearGradient
				colors={["#ffff", "#d5990c", "#ffff"]}
				start={[0.25, 0.25]}
				end={[0.8, 0.8]}
				style={{
					marginBottom: 41,
					marginTop: -41,
					borderRadius: 1000
				}}>
				<View
					style={{
						height: 1.6,
						width: 330,
						borderRadius: 1000
					}}></View>
			</LinearGradient>
		</>
	);
}

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
		fontFamily: "redCoat-Bold"
	},
	item: {
		borderWidth: 0,
		borderBottomWidth: 0.1,
		borderColor: "#FFCC1D",
		borderRadius: 10,
		backgroundColor: "rgba(32, 32, 32,0.9)",
		color: "#ffff",
		width: 300,
		height: 60,
		zIndex: 100,
		marginTop: 10,
		fontSize: 20,
		paddingLeft: 20,
		paddingRight: 50,
		paddingTop: 15,
		flexDirection: "row"
	}
});
