import React from "react";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";
import { StyleSheet, Text, View } from "react-native";

import HomeStack from "./homeStack";
import AuthStack from "./authStack";
import AboutStack from "./aboutStack";

import SideBar from "../components/SideBar";

const RootDrawerNavigator = createDrawerNavigator(
	{
		Home: { screen: HomeStack },
		About: { screen: AboutStack },
		Auth: { screen: AuthStack }
	},
	{
		contentComponent: (props) => (
			<SideBar
				{...props}
				style={{ backgroundColor: "#ffff" }}
				getLabel={(scene) => (
					<View style={styles.container}>
						<Text style={styles.optionText}>
							{props.getLabel(scene)}
						</Text>
					</View>
				)}
			/>
		)
	}
);

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#d5990c",
		height: 40,
		width: 277,
		marginTop: 15,
		justifyContent: "center",
		alignItems: "center",
		position: "relative"
	},
	optionText: {
		color: "#202020",
		fontSize: 21,
		fontFamily: "redcoat",
		letterSpacing: 3
	}
});

export default createAppContainer(RootDrawerNavigator);
