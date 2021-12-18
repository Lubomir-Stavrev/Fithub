import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	Image,
	Dimensions,
	TouchableOpacity
} from "react-native";

import { DrawerNavigatorItems } from "react-navigation-drawer";
import DefaultImage from "../assets/welcomePage.jpg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import services from "../db/services";

const DEFAULT_IMAGE = Image.resolveAssetSource(DefaultImage).uri;
const image = { uri: DEFAULT_IMAGE };
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default Sidebar = (props) => {
	useEffect(() => {}, []);

	const signOut = async () => {
		try {
			const value = await AsyncStorage.removeItem("auth");

			if (value === null) {
				props.navigation.navigate("Auth");
				return true;
			} else {
				console.log("asdasd");
				return false;
			}
		} catch (e) {
			console.log(e);
			return false;
		}
	};
	return (
		<View style={styles.container}>
			<View style={styles.navContainer}>
				<DrawerNavigatorItems {...props} />
			</View>

			<TouchableOpacity
				style={styles.bottomNav}
				onPress={() => signOut()}>
				<View>
					<Text style={styles.optionText}>Logout</Text>
				</View>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "rgba(18, 18, 19,1)",
		flex: 1
	},
	navContainer: {
		marginTop: "30%",
		height: windowWidth
	},
	bottomNav: {
		bottom: 25,
		position: "absolute",
		margin: 0,
		backgroundColor: "#d5990c",
		height: 40,
		width: 277,
		justifyContent: "center",
		alignItems: "center"
	},
	optionText: {
		color: "#202020",
		fontSize: 17,
		fontFamily: "redCoat-Bold"
	}
});
