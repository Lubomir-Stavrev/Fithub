import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	Text,
	View,
	Image,
	ImageBackground,
	SafeAreaView,
	TextInput,
	TouchableOpacity,
	KeyboardAvoidingView
} from "react-native";
const styles = require("./authStyle");

import DefaultImage from "../../assets/welcomePage.jpg";
import services from "../../db/services";
const DEFAULT_IMAGE = Image.resolveAssetSource(DefaultImage).uri;
const image = { uri: DEFAULT_IMAGE };

export default function Login({ navigation }) {
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();

	const loginAccount = (e) => {
		if (email && password) {
			services
				.login(email, password)
				.then((res) => {
					navigation.navigate("Home");
				})
				.catch((err) => {
					throw new Error(err);
				});
		}
	};
	return (
		<View style={styles.container}>
			<ImageBackground
				resizeMode="cover"
				source={image}
				style={styles.image}>
				<Text style={styles.title}>Login to your account!</Text>
				<View style={[styles.body, { marginTop: "20%" }]}>
					<KeyboardAvoidingView
						behavior={Platform.OS === "ios" ? "padding" : "height"}>
						<SafeAreaView style={styles.inputContainer}>
							<TextInput
								style={styles.input}
								placeholder="E-mail"
								onChangeText={(text) => setEmail(text)}
							/>
							<TextInput
								style={styles.input}
								placeholder="Password"
								onChangeText={(text) => setPassword(text)}
							/>
							<TouchableOpacity
								onPress={() => loginAccount()}
								style={styles.authButton}>
								<Text style={styles.buttonText}>SIGN IN</Text>
							</TouchableOpacity>
						</SafeAreaView>
						<TouchableOpacity
							style={{
								justifyContent: "center",
								textAlign: "center",
								alignItems: "center"
							}}
							onPress={() => navigation.navigate("Register")}>
							<Text
								style={[
									styles.moreInfo,
									{ top: 20, fontSize: 19 }
								]}>
								Don't have an account yet?
							</Text>
						</TouchableOpacity>
					</KeyboardAvoidingView>
				</View>
			</ImageBackground>
		</View>
	);
}
