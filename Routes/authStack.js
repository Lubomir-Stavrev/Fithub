import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import Login from "../screens/authScreens/login";
import Register from "../screens/authScreens/register";

const screens = {
	Login: {
		screen: Login,
		navigationOptions: {
			headerShown: null,
			footerShow: null
		}
	},
	Register: {
		screen: Register,
		navigationOptions: {
			headerShown: null,
			footerShow: null
		}
	}
};

const loginStack = createStackNavigator(screens);

export default createAppContainer(loginStack);
