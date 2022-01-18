import React, { useState } from "react";
import * as Font from "expo-font";
import {
	StyleSheet,
	View,
	TouchableWithoutFeedback,
	Keyboard
} from "react-native";

import Navigator from "./Routes/drawer";
import firebase from "./firebase";
import AppLoading from "expo-app-loading";
import { LogBox } from "react-native";

const getFonts = () =>
	Font.loadAsync({
		redcoat: require("./assets/fonts/POE_Redcoat_New.ttf"),
		"redCoat-Bold": require("./assets/fonts/POE_Redcoat_New_Bold.ttf")
	});

export default function App() {
	const [fontsLoaded, setFontsLoaded] = useState(false);

	const hideWarning = () => {
		LogBox.ignoreLogs([""]);
		LogBox.ignoreLogs([
			`Warning: Async Storage has been extracted from react-native core and will be removed in a future release.`
		]);
	};
	if (fontsLoaded) {
		return (
			<TouchableWithoutFeedback
				onPress={() => {
					Keyboard.dismiss();
				}}>
				<View style={styles.container}>
					<Navigator />
					{hideWarning()}
				</View>
			</TouchableWithoutFeedback>
		);
	} else {
		return (
			<AppLoading
				startAsync={getFonts}
				onFinish={() => setFontsLoaded(true)}
				onError={() => console.log("error")}
			/>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#222222",
		flex: 1
	}
});
