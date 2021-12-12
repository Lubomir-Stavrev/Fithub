import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Home from "../screens/home";
import Welcome from "../screens/welcome";
import Header from "../components/Header";

const screens = {
	Wecome: {
		screen: Welcome,
		navigationOptions: {
			headerShown: null,
			footerShow: null
		}
	},
	Home: {
		screen: Home,
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

const homeStack = createStackNavigator(screens, {
	defaultNavigationOptions: {
		headerTintColor: "#171717",
		headerStyle: {
			backgroundColor: "#171717",
			height: 75,
			borderBottomWidth: 1,
			borderColor: "black",
			borderRadius: 20
		}
	}
});

export default createAppContainer(homeStack);
