import React, { useState, useEffect } from "react";

import AddExercise from "./AddExercise";
import AddRoutine from "./AddRoutine";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AddRouter({ changeView }) {
	const [isExercise, setIsExercise] = useState(false);
	const [exercise, setExercise] = useState(false);
	const [sets, setSets] = useState();
	const [exerciseName, setExerciseName] = useState();

	useEffect(() => {

		return async () => {
			try {
				await AsyncStorage.removeItem("routineInfo");
				return await AsyncStorage.removeItem("exercises");
			} catch (err) {
				console.log(err);
			}
		};
	}, []);
	const handleChange = async (props) => {
		if (await props) {
			let data = { exerciseName: props.exerciseName, sets: props.sets };
			console.log(await data);
			setExercise(prev => data);

		}
		setIsExercise(props.state);
	};
	return (
		<>
			{isExercise ? (
				<AddExercise onChangeState={handleChange} exercise={exercise} />
			) : (
				<AddRoutine
					onChangeState={handleChange}
					changeView={changeView}
					exercise={exercise}
				/>
			)}
		</>
	);
}
