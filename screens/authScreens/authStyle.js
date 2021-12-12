"use strict";
import { StyleSheet } from "react-native";

module.exports = StyleSheet.create({
	container: {
		backgroundColor: "#222222",
		flex: 1
	},
	body: {
		borderRadius: 20,
		width: "80%",
		height: "60%",
		marginTop: "10%",
		alignItems: "center",
		textAlign: "center"
	},
	title: {
		textAlign: "center",
		fontSize: 45,
		color: "#ffff",
		letterSpacing: 4,
		top: 15,
		position: "relative"
	},
	image: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	input: {
		height: 53,
		width: 290,
		padding: 5,
		marginBottom: 20,
		borderRadius: 7,
		backgroundColor: "rgba(255, 255, 255,0.95)",
		fontSize: 20,
		shadowColor: "#ffff",
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,

		elevation: 5
	},
	inputContainer: {
		textAlign: "center",
		alignItems: "center"
	},
	authButton: {
		backgroundColor: "#01a3ea",
		justifyContent: "center",
		textAlign: "center",
		alignItems: "center",
		borderRadius: 5,
		height: 50,
		marginBottom: 20,
		width: "100%"
	},
	buttonText: {
		color: "#ffff",
		letterSpacing: 3,
		fontSize: 18,
		fontWeight: "700"
	},
	moreInfo: {
		color: "#ffff",
		fontSize: 20,
		textDecorationLine: "underline"
	}
});
