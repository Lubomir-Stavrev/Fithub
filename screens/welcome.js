import React, { useEffect } from "react";
import {
	StyleSheet,
	View,
	ImageBackground,
	Image,
	ActivityIndicator
} from "react-native";

import DefaultImage from "../assets/welcomePage.jpg";
const DEFAULT_IMAGE = Image.resolveAssetSource(DefaultImage).uri;

const image = { uri: DEFAULT_IMAGE };
import services from "../db/services";

export default function Welcome({ navigation }) {
	useEffect(() => {
		setTimeout(async function () {
			let isLogged = services.isLogged();
			if (await isLogged) {
				navigation.navigate("Home");
			} else {
				navigation.navigate("Auth");
			}
		}, 1000);
	}, []);
	return (
		<View
			onPress={() => navigation.navigate("Home")}
			style={styles.container}>
			<ImageBackground
				resizeMode="cover"
				source={image}
				style={styles.image}>
				<View style={styles.loadingSpinner}>
					<ActivityIndicator size="large" color="#ffff" />
				</View>
			</ImageBackground>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignContent: "center"
	},
	image: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	loadingSpinner: {
		top: "11%"
	},
	navButton: {
		backgroundColor: "#d5990c",
		padding: 10,
		paddingHorizontal: 20,
		marginTop: "38%",
		borderWidth: 1,
		borderRadius: 5
	}
});
