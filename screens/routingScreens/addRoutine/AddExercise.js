import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	TextInput,
	KeyboardAvoidingView,
	SafeAreaView
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";

export default function routines(props) {
	const [exerciseName, setExerciseName] = useState();
	const [sets, addSets] = useState();

	useEffect(async () => {
		console.log(await props);
		if (await props.exercise.exerciseName) {
			console.log(props.exercise.exerciseName)
			setExerciseName(prev => props.exercise.exerciseName)
			addSets(prev => props.exercise.sets)

		}
	}, [])

	const changeViewState = () => {
		if (exerciseName && sets) {
			saveExercises().then((res) => {
				props.onChangeState(false);
			});
		} else {
			props.onChangeState(false);
		}
	};

	const saveExercises = async () => {
		try {
			let data = JSON.parse(await AsyncStorage.getItem("exercises"));
			let arr = [];
			if (data) {
				Object.values(data).forEach((el) => {
					arr.push(el);
				});
			}
			arr.push({ exerciseName, sets, id: uuid.v4(10) });
			let obj = Object.assign({}, arr);
			await AsyncStorage.setItem("exercises", JSON.stringify(obj));
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<View style={styles.body}>
			<KeyboardAvoidingView
				keyboardShouldPersistTaps={"always"}
				behavior={Platform.OS === "ios" ? "padding" : "height"}>
				<SafeAreaView style={styles.inputContainer}>
					<TextInput
						style={styles.input}
						placeholder="Exercise Name"
						onChangeText={(text) => setExerciseName(text)}
						defaultValue={exerciseName}
					/>

					<TextInput
						style={styles.input}
						placeholder="addSets"
						keyboardType="numeric"
						onChangeText={(text) => addSets(text)}
						defaultValue={sets}
					/>

				</SafeAreaView>
			</KeyboardAvoidingView>
			<TouchableOpacity
				onPress={() => changeViewState()}
				style={styles.authButton}>
				<MaterialIcons name="done" size={24} color="white" />
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	body: {
		width: "91%",
		height: 250,
		backgroundColor: "rgba(18, 18, 19,0.6)",
		marginTop: 0,
		alignItems: "center",
		paddingTop: 30,
		marginBottom: 70
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
		top: 25,
		width: "90%",
		zIndex: 100
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
		paddingTop: 15
	}
});
