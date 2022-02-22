import React, { useState, useEffect } from "react";

import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	FlatList,
	ActivityIndicator
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import services from "../../db/services";
import { Entypo } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Shadow } from 'react-native-shadow-2';

export default function routines({ changeView }) {
	const [routines, setRoutines] = useState();
	const [isWorkoutEnded, setIsWorkoutEnded] = useState(true);
	const [prevWorkoutId, setPrevWorkoutId] = useState();
	const [areRoutinesLoaded, setAreRoutinesLoaded] = useState(false);

	useEffect(() => {

		setTimeout(() => {
			setAreRoutinesLoaded(true)
		}, 1000)
		const func = async () => {
			let data = await services.getAllRoutines();
			if (await data) {
				setRoutines(Object.values(data));
			}
		};
		func();
	}, []);
	useEffect(async () => {
		if (prevWorkout) {

			let prevRoutineId = await prevWorkout?.routineId;
			let allRoutines = await services.getAllRoutines();
			let isTheRoutineStillAvailable = false;

			Object.values(await allRoutines).forEach(r => {
				if (prevRoutineId === r?.routineId) {
					isTheRoutineStillAvailable = true;
				}
			})
			if (await prevWorkout, isTheRoutineStillAvailable) {
				setPrevWorkoutId(prev => prevWorkout?.routineId);
				setIsWorkoutEnded(false);
			}
		}
	}, [])

	const onRoutineCick = (routineId) => {

		changeView("RenderRoutines", routineId);
	};
	const deleteRoutineFromList = (routineId) => {

		services.deleteRoutine(routineId).then(res => {
			const func = async () => {
				let data = await services.getAllRoutines();
				if (await data) {
					setRoutines(Object.values(data));
				}
			};
			func();
			console.log(res);
		})
	}
	return (
		<>
			<View style={styles.body}>
				{routines?.length > 0 ?
					<FlatList
						data={routines ? routines : null}
						keyExtractor={(item) => item.routineId}
						renderItem={({ item }) => (
							<TouchableOpacity
								onPress={() => onRoutineCick(item.routineId)}>
								<View style={styles.item}>
									<Text
										style={{
											color: "white",
											fontSize: 19,
											position: "absolute",
											left: 15,
											top: 20
										}}>
										{item.routineName}
									</Text>
									<TouchableOpacity
										onPress={(e) => deleteRoutineFromList(item.routineId)}
										style={{
											width: 40,
											height: 67.2,
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
					: <View style={{
						position: "absolute", bottom: "90%", alignItems: 'center', justifyContent: 'center', shadowColor: "#000",
						shadowOffset: {
							width: 0,
							height: 10,
						},
						shadowOpacity: 0.53,
						shadowRadius: 13.97,
						elevation: 21,
					}}>
						{areRoutinesLoaded ?
							<>
								<Text style={{
									color: "#FFCC1D",
									fontFamily: "redCoat-Bold", fontSize: 35
								}}>
									No routines added
								</Text>
								<Shadow distance={1.2} startColor="#696969" finalColor="#FFCC1D" size={[240, 1]} offset={[0, 0]} radius={10}>
								</Shadow>
							</>
							: <View style={styles.loadingSpinner}>
								<ActivityIndicator size="large" color="#ffff" />
							</View>}

					</View>}
			</View>
			<LinearGradient
				colors={["#d5990c", "#ffff", "#ffff"]}
				start={[0, 0]}
				end={[0.65, 0.91]}
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
				: null
			}

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
