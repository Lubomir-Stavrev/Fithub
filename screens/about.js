import React from "react";
import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";

import DefaultImage from "../assets/welcomePage.jpg";
const DEFAULT_IMAGE = Image.resolveAssetSource(DefaultImage).uri;
const image = { uri: DEFAULT_IMAGE };

export default function About() {
	return (
		<View style={styles.container}>
			<Text>About Page</Text>
			<ImageBackground
				resizeMode="cover"
				source={image}
				style={styles.image}>
				<View style={styles.body}></View>
			</ImageBackground>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#222222",
		flex: 1
	},
	body: {
		paddingVertical: "100%",
		paddingHorizontal: "100%",
		backgroundColor: "rgba(32, 32, 32,0.5)",
		zIndex: 100
	},
	image: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	}
});
