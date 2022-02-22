import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Dimensions } from "react-native";
const { height, width } = Dimensions.get("window");

export default function Header({ navigation }) {
	const openMenu = () => {
		navigation.openDrawer();
	};
	return (
		<View style={styles.header}>
			<TouchableOpacity style={{ zIndex: 100, width: 50, height: 60, paddingBottom: 50 }} onPress={() => openMenu()}>
				<View style={styles.menuBar}>
					<View style={styles.bar}></View>
					<View style={styles.bar}></View>
					<View style={styles.bar}></View>
				</View>
			</TouchableOpacity>

			<Text style={styles.title}>FitHub</Text>
		</View>
	);
}

const width_proportion = width > height ? height : width + 10;
const height_proportion = "100%";

const styles = StyleSheet.create({
	header: {
		alignSelf: "center",
		justifyContent: "center",
		width: width_proportion,
		height: height_proportion,
		backgroundColor: "#171717",
		borderRadius: 23,
		paddingBottom: 10,
		fontFamily: "redCoat-Bold",
	},
	menuBar: {
		backgroundColor: "#171717",
		marginLeft: 20,
		marginTop: 30,
		zIndex: 100
	},
	bar: {
		width: 32,
		height: 5,
		backgroundColor: "#d5990c",
		marginBottom: 4,
		borderWidth: 1,
		borderRadius: 20,
		zIndex: 100
	},
	title: {
		right: 20,
		top: 28,
		position: "absolute",
		fontSize: 25,
		color: "rgba(213, 153, 12,1)",
		shadowColor: "black",
		shadowOffset: {
			width: 50,
			height: 10
		},
		textShadowColor: "black",
		textShadowRadius: 2,
		fontFamily: "redCoat-Bold"
	}
});
