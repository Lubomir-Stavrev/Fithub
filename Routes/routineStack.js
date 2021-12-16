import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import render from "../screens/routingScreens/doRoutine/RenderRoutine";

import Header from "../components/Header";
const screens = {
	RenderRoutine: {
		screen: render,
		navigationOptions: ({ navigation }) => {
			return {
				headerTitle: () => <Header navigation={navigation} />,
				headerLeft: () => null,
				headerStyle: {
					backgroundColor: "#171717",
					borderBottomWidth: 1,
					height: 55
				}
			};
		}
	}
};

const routineStack = createStackNavigator(screens);

export default createAppContainer(routineStack);
