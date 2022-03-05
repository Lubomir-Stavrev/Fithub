import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import Header from "../components/Header";
import WeightTrackerComponent from "../screens/weightTracker/WeightTracker";

const screens = {
    WeightTracker: {
        screen: WeightTrackerComponent,
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
const weightTracker = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTintColor: "#222222",
        headerStyle: { backgroundColor: "#202020", height: 70 }
    }
});

export default createAppContainer(weightTracker);
