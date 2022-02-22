import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import Header from "../components/Header";
import ContactUs from "../screens/contactUs";

const screens = {
    ContactUs: {
        screen: ContactUs,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header navigation={navigation} />,
                headerLeft: null,
                headerStyle: {
                    backgroundColor: "#171717",
                    borderBottomWidth: 1,
                    height: 55
                }
            };
        }
    }
}
const contactUs = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTintColor: "#222222",
        headerStyle: { backgroundColor: "#202020", height: 70 }
    }
});

export default createAppContainer(contactUs);
