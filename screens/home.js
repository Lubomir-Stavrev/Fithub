import React, { useState, useEffect } from "react";

import { useRoute } from "react-navigation";
import {
	StyleSheet,
	View,
	Image,
	ImageBackground,
	TouchableOpacity,
	BackHandler,
	Alert,
	Text,
	Keyboard
} from "react-native";

import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";

import DefaultImage from "../assets/welcomePage.jpg";
const DEFAULT_IMAGE = Image.resolveAssetSource(DefaultImage).uri;
const image = { uri: DEFAULT_IMAGE };

import Routines from "./routingScreens/routines";
import RoutineHistory from "./routingScreens/routineHistory";
import AddRoutine from "./routingScreens/addRoutine/AddRouter";
import RenderRoutine from "./routingScreens/doRoutine/RenderRoutine";
import ViewWorkout from "./routingScreens/ViewWorkout";

import * as Animatable from 'react-native-animatable';
import services from "../db/services";

export default function Home({ navigation }) {
	const [routines, setRoutines] = useState(true);
	const [history, setHistory] = useState(false);
	const [addRoutine, setAddRoutine] = useState(false);
	const [renderRoutine, setRenderRoutine] = useState(false);
	const [viewWorkout, setViewWorkout] = useState(false);
	const [areThereRoutines, setAreThereRoutines] = useState(false);

	const [renderRoutineId, setRoutineId] = useState();
	const [renderWorkoutId, setWorkoutId] = useState();
	const [isKeyboardVisible, setKeyboardVisible] = useState(false);

	useEffect(() => {
		const keyboardDidShowListener = Keyboard.addListener(
			"keyboardDidShow",
			() => {
				setKeyboardVisible(true);
			}
		);
		const keyboardDidHideListener = Keyboard.addListener(
			"keyboardDidHide",
			() => {
				setKeyboardVisible(false);
			}
		);

		return () => {
			keyboardDidHideListener.remove();
			keyboardDidShowListener.remove();
		};
	}, []);

	const changeView = (viewState, param) => {
		if (viewState === "history") {
			setRoutines((prev) => false);
			setHistory((prev) => true);
			setAddRoutine((prev) => false);
			setRenderRoutine((prev) => false);
			setViewWorkout((prev) => false);
		} else if (viewState === "addRoutine") {
			setRoutines((prev) => false);
			setHistory((prev) => false);
			setAddRoutine((prev) => true);
			setRenderRoutine((prev) => false);
			setViewWorkout((prev) => false);
		} else if (viewState === "RenderRoutines") {
			setRoutines((prev) => false);
			setHistory((prev) => false);
			setAddRoutine((prev) => false);
			setViewWorkout((prev) => false);
			setRenderRoutine((prev) => true);
			setRoutineId((prev) => param);
		} else if (viewState === "ViewWorkout") {
			setRoutines((prev) => false);
			setHistory((prev) => false);
			setAddRoutine((prev) => false);
			setRenderRoutine((prev) => false);
			setViewWorkout((prev) => true);
			setRoutineId((prev) => param.routineId);
			setWorkoutId((prev) => param.workoutId);
		} else {
			setRoutines((prev) => true);
			setHistory((prev) => false);
			setAddRoutine((prev) => false);
			setRenderRoutine((prev) => false);
			setViewWorkout((prev) => false);
		}
	};

	useEffect(() => {
		services.getAllRoutines().then(res => {
			if (Object.keys(res).length === 0
				&& Object.getPrototypeOf(res) === Object.prototype) {
				setAreThereRoutines(prev => false);

			} else {
				setAreThereRoutines(prev => true);

			}
		})
		const backAction = () => {
			Alert.alert("Hold on!", "Are you sure you want to go back?", [
				{
					text: "Cancel",
					onPress: () => null,
					style: "cancel"
				},
				{ text: "YES", onPress: () => BackHandler.exitApp() }
			]);
			return true;
		};

		const backHandler = BackHandler.addEventListener(
			"hardwareBackPress",
			backAction
		);

		return () => backHandler.remove();
	}, []);

	return (
		<View style={styles.container}>
			<ImageBackground
				resizeMode="cover"
				source={image}
				style={styles.image}>
				{routines ? (
					<Routines changeView={changeView}></Routines>
				) : null}
				{history ? (
					<RoutineHistory
						changeView={changeView}
						navigation={navigation}
					/>
				) : null}
				{addRoutine ? <AddRoutine changeView={changeView} /> : null}
				{renderRoutine ? (
					<RenderRoutine
						changeView={changeView}
						routineId={renderRoutineId ? renderRoutineId : null}
						navigation={navigation}
					/>
				) : null}
				{viewWorkout ? (
					<ViewWorkout
						ids={
							renderRoutineId && renderWorkoutId
								? { rId: renderRoutineId, wId: renderWorkoutId }
								: null
						} changeView={changeView}></ViewWorkout>
				) : null}
				{!isKeyboardVisible ?
					<View style={styles.footer}>
						<View>
							<TouchableOpacity onPress={() => changeView("routes")}>
								<FontAwesome5
									name="dumbbell"
									style={{ marginTop: 2.5, marginRight: 21 }}
									size={34}
									color={
										routines || renderRoutine
											? "#d5990c"
											: "#ccc"
									}
								/>
								<Text style={{
									fontSize: 14, color:
										routines || renderRoutine
											? "#d5990c"
											: "#ccc",
									left: '-13%'
								}}>Routines</Text>
							</TouchableOpacity>
						</View>
						<TouchableOpacity
							onPress={() => changeView("addRoutine")}
							style={styles.routineButton}>
							{
								!areThereRoutines ?
									<Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite" style={{ textAlign: 'center' }}>

										<SimpleLineIcons
											name="plus"
											size={35}
											style={{ marginTop: -7 }}
											color={addRoutine ? "#d5990c" : "#ccc"}
										/>
										<Text style={{
											fontSize: 13, color:
												addRoutine ? "#d5990c" : "#ccc",
											position: 'absolute',
											width: 78,
											top: 30,
											right: -26

										}}>Add Routine</Text>

									</Animatable.View>
									: <>
										<SimpleLineIcons
											name="plus"
											size={35}
											style={{ marginTop: -7 }}
											color={addRoutine ? "#d5990c" : "#ccc"}
										/>
										<Text style={{
											fontSize: 13, color:
												addRoutine ? "#d5990c" : "#ccc",
											position: 'absolute',
											width: 78,
											top: 30,
											right: -26

										}}>Add Routine</Text>
									</>
							}

						</TouchableOpacity>
						<View>
							<TouchableOpacity onPress={() => changeView("history")}>
								<FontAwesome
									name="pencil"
									style={{
										marginTop: 5,
										marginLeft: 30,
										marginRight: 5
									}}
									size={34}
									color={
										history || viewWorkout ? "#d5990c" : "#ccc"
									}
								/>
								<Text style={{
									fontSize: 13, color: history || viewWorkout ? "#d5990c" : "#ccc",
									right: "-40%"
								}}>Logs</Text>
							</TouchableOpacity>
						</View>
					</View>
					: null}
			</ImageBackground>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#222222",
		flex: 1
	},
	item: {
		borderWidth: 0,
		borderBottomWidth: 1.5,
		borderColor: "#FFCC1D",
		borderRadius: 10,
		backgroundColor: "rgba(32, 32, 32,0.9)",
		color: "#ffff",
		width: 310,
		height: 75,
		zIndex: 100,
		marginTop: 10,
		fontSize: 20,
		paddingLeft: 20,
		paddingTop: 20
	},
	footer: {
		width: "100%",
		bottom: 0,
		height: 60,
		backgroundColor: "rgba(32, 32, 32,0.4)",
		position: "absolute",
		flex: 1,
		marginTop: 30,
		flexDirection: "row",
		justifyContent: "space-evenly"
	},
	image: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	routineButton: {
		position: "relative",
		marginTop: 10
	}
});
