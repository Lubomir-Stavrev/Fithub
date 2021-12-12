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

export default function renderRoutine({ onChangeState, changeView }) {
	useEffect(() => {
		console.log("<===> Hello World <===>");
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
							onChangeText={(text) => setName(text)}
							defaultValue="Workout B"
						/>
						<TextInput
							style={styles.input}
							placeholder="Notes"
							onChangeText={(text) => setNotes(text)}
							defaultValue="easy"
						/>
					</SafeAreaView>
				</KeyboardAvoidingView>
				<FlatList
					data={[
						{
							name: "Workout A",
							sets: 2
						},
						{
							name: "Push",
							sets: 3
						},
						{
							name: "Pull",
							sets: 4
						}
					]}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => (
						<>
							<View style={styles.exerciseRow}>
								<Text
									style={{
										color: "rgba(225, 225, 225,0.95)",
										paddingBottom: 10,
										fontSize: 17,
										left: 15.5,
										alignSelf: "flex-start"
									}}>
									{item.name}
								</Text>
								{[...Array(item.sets)].map((e, i) => {
									return (
										<View style={styles.setRow}>
											<View
												style={{
													...styles.setCol,
													...styles.setColLeft
												}}>
												<TextInput
													style={styles.setInput}
													placeholder="kg: 12"
												/>
											</View>
											<View style={styles.setCol}>
												<TextInput
													style={styles.setInput}
													placeholder="reps: 10"
												/>
											</View>
											<View
												style={{
													...styles.setCol,
													...styles.setColRight
												}}>
												<TextInput
													style={styles.setInput}
													placeholder="notes: easy"
												/>
											</View>
										</View>
									);
								})}
							</View>
						</>
					)}
				/>
				<TouchableOpacity
					onPress={() => changeViewState()}
					style={styles.authButton}>
					<Text style={styles.buttonText}>Start Workout</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.doneButton}>
					<Text style={styles.buttonText}>02:23</Text>
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
						width: 300,
						borderRadius: 1000
					}}></View>
			</LinearGradient>
		</>
	);
}

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
