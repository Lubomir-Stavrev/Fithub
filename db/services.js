import firebase from "../firebase";
import userModel, {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const usersURL =
	"https://fithub-a08eb-default-rtdb.europe-west1.firebasedatabase.app/users.json";
const db =
	"https://fithub-a08eb-default-rtdb.europe-west1.firebasedatabase.app/";

const auth = getAuth();

export default {
	async login(email, password) {
		return await signInWithEmailAndPassword(auth, email, password)
			.then(async function (data) {
				try {
					const jsonValue = JSON.stringify({
						uid: data.user.uid,
						email,
						username: "asd"
					});
					await AsyncStorage.setItem("auth", jsonValue);
					console.log(data);
				} catch (e) {
					console.log(e);
				}
			})
			.catch(async (err) => {
				let error = {};
				error.err = err;
				return await error;
			});
	},
	async register(username, email, password) {
		return await createUserWithEmailAndPassword(auth, email, password)
			.then(async function (data) {
				await fetch(usersURL, {
					method: "POST",
					body: JSON.stringify({
						email,
						username
					})
				});
			})
			.catch(async (err) => {
				let error = {};
				error.err = err;
				return await error;
			});
	},
	async isLogged() {
		try {
			const value = await AsyncStorage.getItem("auth");
			if (value !== null) {
				return true;
			} else {
				return false;
			}
		} catch (e) {
			return false;
		}
	},
	async logout() {
		try {
			const value = await AsyncStorage.removeItem("auth");
			if (value !== null) {
				return true;
			} else {
				return false;
			}
		} catch (e) {
			return false;
		}
	},
	async addRoutine(routineName, routineNotes, routineExercises) {
		return fetch(db + "routines/.json", {
			method: "POST",
			body: JSON.stringify({
				routineName,
				routineNotes,
				routineExercises,
				uid: JSON.parse(await AsyncStorage.getItem("auth")).uid
			})
		}).then((res) => res.json());
	},
	async getAllRoutines() {
		let allRoutines = [];
		let currUid = await JSON.parse(await AsyncStorage.getItem("auth")).uid;
		await fetch(db + "routines/.json")
			.then((res) => res.json())
			.then((data) => {
				Object.entries(data).forEach((el) => {
					if (el[1].uid === currUid) {
						el[1].routineId = el[0];
						allRoutines.push(el[1]);
					}
				});
			});
		let userRoutines = await Object.assign({}, allRoutines);

		return await userRoutines;
	},

	deleteRoutine(id) {
		return fetch(db + id + "/.json", {
			method: "DELETE"
		})
			.then((res) => res.json())
			.catch((err) => {
				throw new Error(err);
			});
	},

	deleteWorkout(rId, wId) {
		return fetch(db + `${rId}/allWorkouts/${wId}/.json`, {
			method: "DELETE"
		})
			.then((res) => res.json())
			.catch((err) => {
				throw new Error(err);
			});
	},

	getRoutine(id) {
		return fetch(db + id + "/.json")
			.then((res) => res.json())
			.then((data) => {
				return data;
			})
			.catch((err) => {
				throw new Error(err);
			});
	},

	setLastExercise(allExercises, note, id) {
		let exercises = { allExercises, note };
		return fetch(db + id + "/lastWorkout/.json", {
			method: "PATCH",
			body: JSON.stringify({
				exercises
			})
		})
			.then((res) => res.json())
			.then((data) => {
				return data;
			})
			.catch((err) => {
				throw new Error(err);
			});
	},
	saveExercises(exercises, note, id) {
		return fetch(db + id + "/allWorkouts/.json", {
			method: "POST",
			body: JSON.stringify({
				exercises,
				note
			})
		})
			.then((res) => res.json())
			.then((data) => {
				return data;
			})
			.catch((err) => {
				throw new Error(err);
			});
	},

	getWorkout(rID, wId) {
		return fetch(db + `${rID}/allWorkouts/` + wId + "/.json")
			.then((res) => res.json())
			.then((data) => {
				return data;
			})
			.catch((err) => {
				console.log(err);
			});
	},
	getLastWorkout(rID) {
		return fetch(db + `${rID}/lastWorkout/exercises/.json`)
			.then((res) => res.json())
			.then((data) => {
				return data;
			})
			.catch((err) => {
				console.log(err);
			});
	},
	async removeExerciseFromRoutine(exerciseId, routineId) {
		let exerciseRowToDelete = "";
		await fetch(db + routineId + "/routineExercises/.json")
			.then((res) => res.json())
			.then((data) => {
				if (data) {
					return Object.entries(data).forEach((exercise) => {
						if (exercise[1]) {
							if (exercise[1][0].id === exerciseId) {
								exerciseRowToDelete = exercise[0];
							}
						}
					});
				}
			})
			.catch((err) => {
				throw new Error(err);
			});

		console.log(exerciseRowToDelete);
		return await fetch(
			db + routineId + `/routineExercises/${exerciseRowToDelete}/0/.json`,
			{
				method: "DELETE"
			}
		)
			.then((resDel) => resDel.json())
			.then((dataDel) => {
				return dataDel;
			})
			.catch((err) => {
				throw new Error(err);
			});
	}
};
