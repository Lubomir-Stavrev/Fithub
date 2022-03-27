import React from "react";
import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import DefaultImage from "../assets/welcomePage.jpg";
const DEFAULT_IMAGE = Image.resolveAssetSource(DefaultImage).uri;
const image = { uri: DEFAULT_IMAGE };

export default function About() {
	return (
		<>
			<View style={styles.container}>
				<ImageBackground
					resizeMode="cover"
					source={image}
					style={styles.image}>

					<ScrollView style={styles.firstChapter}>

						<View style={{ borderColor: '#d5990c', borderLeftWidth: 4, paddingLeft: 15, marginLeft: 10, marginBottom: 20 }}>
							<Text style={{ color: "#ffffff", fontSize: 45, fontFamily: 'redcoat', letterSpacing: 2 }}>
								About us
							</Text>
						</View>
						<View style={{ justifyContent: "center", borderRadius: 5, borderTopWidth: 1, borderColor: "#d5990c", backgroundColor: "rgba(32, 32, 32,0.9)", padding: 15, paddingBottom: 100 }}>

							<Text style={{ color: "white", fontSize: 29, fontFamily: 'redcoat', letterSpacing: 2.5 }}>
								{""}So you would like to know who is the master mind behind this fitness app?{"\n"}
								{"  "}
								{"\n"}Well that will remain a mystery just for now,though i'm going to share with you what
								our goals are!{"\n"}
								{"\n"}
								Alright then, we are aiming to create a highly competetive fitness
								app, that rivals all other existing apps in terms of functioning,
								interface and interactions!
								{"\n"}
								{"\n"}The best part of our project is that it's absolutely
								free! Since we are a bit new to the whole thing we would greatly appriciate feedback,
								so we can improve our app to fit your expectations as a customer!
								{"\n"}
								{"\n"}With that being said
								i hope you have a nice day and workout! Stay strong!
							</Text>
						</View>
					</ScrollView>

				</ImageBackground>
			</View>

		</>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#222222",
		flex: 1
	},
	body: {
		width: "91%",
		height: "83%",
		backgroundColor: "rgba(18, 18, 19,0.6)",
		marginTop: 0,
		marginBottom: 40,
		justifyContent: "center",
		alignItems: "center",
		paddingBottom: 20,
		paddingTop: 10
	},
	image: {
		flex: 1,
		justifyContent: "center",
		alignItems: "flex-start"
	}, firstChapter: {
		paddingTop: 40
	}
});
