import React from "react";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";
import { StyleSheet, Text, View } from "react-native";

import HomeStack from "./homeStack";
import AuthStack from "./authStack";
import AboutStack from "./aboutStack";
import ContactStack from "./contactStack";
import CalendarStack from "./calendarStack";
import WeightTrackerStack from "./weightTrackerStack";

import SideBar from "../components/SideBar";
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

const RootDrawerNavigator = createDrawerNavigator(
	{
		Home: { screen: HomeStack },
		"Weight Tracker": { screen: WeightTrackerStack },
		Calendar: { screen: CalendarStack },
		About: { screen: AboutStack },
		Auth: { screen: AuthStack },
		"Contact Us": { screen: ContactStack }
	},
	{
		contentComponent: (props) => (
			<>
				<SideBar

					{...props}
					style={{ backgroundColor: "#ffff" }}
					getLabel={(scene) => {
						return (props.getLabel(scene) != "Auth"
							?
							<>
								<View style={{ ...styles.container, marginTop: scene.index == 3 ? "12%" : 8 }}>
									{props.getLabel(scene) == "Home" ? <AntDesign name="home" style={styles.iconStyle} size={24} color="white" /> : null}
									{props.getLabel(scene) == "Calendar" ? <MaterialCommunityIcons name="calendar-edit" style={styles.iconStyle} size={24} color="white" /> : null}
									{props.getLabel(scene) == "Weight Tracker" ? <FontAwesome5 name="weight" size={24} style={styles.iconStyle} color="white" /> : null}
									{props.getLabel(scene) == "About" ? <AntDesign name="infocirlceo" style={styles.iconStyle} size={24} color="white" /> : null}
									{props.getLabel(scene) == "Contact Us" ? <AntDesign name="questioncircleo" style={styles.iconStyle} size={24} color="white" /> : null}

									<Text style={styles.optionText}>
										{props.getLabel(scene)}
									</Text>
								</View>
							</>
							: null)
					}}
				/>


			</>
		)
	}
);

const styles = StyleSheet.create({
	container: {
		backgroundColor: "rgba(32, 32, 32, 1)",
		height: 40,
		width: 270,
		marginTop: 10,
		justifyContent: "center",
		alignItems: "center",
		position: "relative",
		flex: 1,
		flexDirection: 'row',
		borderColor: "#d5990c",
		borderBottomWidth: 1
	},
	optionText: {
		color: "white",
		fontSize: 21,
		fontFamily: "redcoat",
		letterSpacing: 3
	}, iconStyle: {
		left: "8%", position: "absolute"
	}
});

export default createAppContainer(RootDrawerNavigator);
