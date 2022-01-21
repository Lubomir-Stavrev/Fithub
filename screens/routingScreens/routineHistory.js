import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	Text,
	View,
	FlatList,
	TouchableOpacity
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import services from "../../db/services";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import moment from "moment";
import { Entypo } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function routineHistory({ changeView, navigation }) {
	const [routines, setRoutines] = useState();
	const [isWorkoutEnded, setIsWorkoutEnded] = useState(true);
	const [prevWorkoutId, setPrevWorkoutId] = useState();

	useEffect(() => {
		const getRoutines = async () => {

			let data = await services.getAllRoutines();
			if (await data) {
				let workouts = [];

				Object.entries(data).forEach((el) => {
					if (el[1].allWorkouts) {
						Object.entries(el[1].allWorkouts).forEach((nel) => {
							let name = el[1].routineName;

							let workoutId = nel[0];
							let routineId = el[1].routineId;
							let date = nel[1].date;
							let fullDate = nel[1].fullDate;
							workouts.push({
								name,
								workoutId,
								routineId,
								date: date ? date : null,
								fullDate: fullDate ? fullDate : null
							});
						});
					}
				});
				if (await workouts) {

					console.log("==========");
					console.log(workouts);
					console.log("==========");
					let workoutsSortedByDate = await workouts.sort(function (
						a,
						b
					) {
						let dateA = a.fullDate.split(" ").join("T");

						let dateB = b.fullDate.split(" ").join("T");

						return new Date(dateB) - new Date(dateA);
					});
					setRoutines(Object.values(await workoutsSortedByDate));
				}
			}
		};
		getRoutines();
	}, []);
	useEffect(async () => {
		try {

			let prevWorkout = await JSON.parse(await AsyncStorage.getItem('prevWorkout'));

			if (await prevWorkout) {
				setPrevWorkoutId(prev => prevWorkout.routineId)
				setIsWorkoutEnded(false);
			}
		} catch (err) {
			console.log(err);

		}
	}, [])

	const openRoutine = ({ wId, rId }) => {
		changeView("ViewWorkout", { routineId: rId, workoutId: wId });
	};

	const deleteWorkout = (rId, wId) => {
		services.deleteWorkout(rId, wId).then(async (res) => {
			let data = await routines;

			let newData = Object.values(data).filter((el) => {
				return el.workoutId !== wId;
			});

			setRoutines((prev) => newData);
		});
	};
	const onRoutineCick = (routineId) => {

		changeView("RenderRoutines", routineId);
	};
	return (
		<>
			<View style={styles.body}>
				<FlatList
					data={routines ? routines : null}
					keyExtractor={(item) => item.workoutId}
					renderItem={({ item }) => (
						<TouchableOpacity
							onPress={() =>
								openRoutine({
									wId: item.workoutId,
									rId: item.routineId
								})
							}>
							<View style={styles.item}>
								<Text
									style={{
										color: "white",
										fontSize: 19,
										position: "absolute",
										left: 15,
										top: 20
									}}>
									{item.name}
								</Text>

								<Fontisto
									name="date"
									size={20}
									color="white"
									style={{
										right: "41%",
										top: 22,
										position: "absolute"
									}}
								/>
								<Text
									style={{
										color: "white",
										fontSize: 18,
										position: "absolute",
										right: 55,
										top: 20
									}}>
									{item.date}
								</Text>
								<TouchableOpacity
									style={{
										width: 40,
										height: 67.2,
										backgroundColor: "#EC4226",
										right: 0,
										margin: 0,
										position: "absolute",
										borderBottomRightRadius: 10,
										borderTopRightRadius: 10,
									}}
									onPress={() =>
										deleteWorkout(
											item.routineId,
											item.workoutId
										)
									}>
									<View>
										<AntDesign
											name="delete"
											size={24}
											color="white"
											style={{
												top: 20,
												right: 0,
												left: 7
											}}
										/>
									</View>
								</TouchableOpacity>
							</View>
						</TouchableOpacity>
					)}
				/>
			</View>
			<LinearGradient
				colors={["#d5990c", "#ffff", "#ffff"]}
				start={[1, 1]}
				end={[0, 0]}
				location={[0.25, 0.4, 1]}
				style={{
					marginBottom: 41,
					marginTop: -41,
					borderRadius: 1000
				}}>
				<View
					style={{
						height: 1.5,
						width: 330,
						borderRadius: 1000
					}}></View>
			</LinearGradient>
			{!isWorkoutEnded ?
				<TouchableOpacity
					onPress={(e) => onRoutineCick(prevWorkoutId)}
					style={{
						backgroundColor: "rgba(255, 204, 29,0.7)",
						padding: 7,
						position: "absolute",
						bottom: '14%',
						right: '7%',
						borderRadius: 24
					}}>
					<View>
						<Entypo name="back-in-time" size={38} color="rgba(255, 255, 255,0.7)" />
					</View>
				</TouchableOpacity>
				: null}
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
		justifyContent: "center",
		alignItems: "center",
		paddingBottom: 20,
		paddingTop: 10
	},
	item: {
		borderWidth: 0,
		borderBottomWidth: 0.5,
		borderColor: "#FFCC1D",
		borderRadius: 10,
		backgroundColor: "rgba(32, 32, 32,0.9)",
		color: "#ffff",
		width: 310,
		height: 67,
		zIndex: 100,
		marginTop: 10,
		fontSize: 20,
		paddingLeft: 20,
		paddingTop: 20
	}
});
