import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	Text,
	View,
	Image,
	ImageBackground,
	SafeAreaView,
	TextInput,
	KeyboardAvoidingView,
	TouchableOpacity
} from "react-native";
const styles = require("./authStyle");

import DefaultImage from "../../assets/welcomePage.jpg";
const DEFAULT_IMAGE = Image.resolveAssetSource(DefaultImage).uri;
const image = { uri: DEFAULT_IMAGE };

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import services from "../../db/services";

const auth = getAuth();

export default function Register({ navigation }) {
	const [username, setUsername] = useState();
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [repPassword, setRepPassword] = useState();

	const registerAccount = (e) => {
		if (username && email && password) {
			services
				.register(username, email, password)
				.then((res) => {
					console.log(res);
					navigation.navigate("Login");
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
				<Text style={styles.title}>Create your account!</Text>
				<View style={styles.body}>
					<KeyboardAvoidingView
						behavior="height"
						style={{ alignItems: "center" }}>
						<SafeAreaView style={styles.inputContainer}>
							<TextInput
								style={[
									styles.input,
									{
										borderBottomLeftRadius: 0,
										borderBottomRightRadius: 0,
										marginBottom: 1
									}
								]}
								placeholder="First Name"
								onChangeText={(text) => setUsername(text)}
							/>
							<TextInput
								style={[
									styles.input,
									{
										borderTopLeftRadius: 0,
										borderTopRightRadius: 0
									}
								]}
								placeholder="Last Name"
							/>
							<TextInput
								style={styles.input}
								placeholder="E-mail"
								onChangeText={(text) => setEmail(text)}
							/>
							<TextInput
								style={styles.input}
								placeholder="Password"
								onChangeText={(text) => setPassword(text)}
								secureTextEntry={true}
							/>
							<TextInput
								style={styles.input}
								placeholder="Confirm password"
								onChangeText={(text) => setRepPassword(text)}
								secureTextEntry={true}
							/>
							<TouchableOpacity
								onPress={() => registerAccount()}
								style={[styles.authButton, { width: 300 }]}>
								<Text style={styles.buttonText}>
									CREATE ACCOUNT
								</Text>
							</TouchableOpacity>
						</SafeAreaView>
						<TouchableOpacity
							style={{
								justifyContent: "center",
								textAlign: "center",
								alignItems: "center"
							}}
							onPress={() => navigation.navigate("Login")}>
							<Text style={styles.moreInfo}>
								Already have an account? Login
							</Text>
						</TouchableOpacity>
					</KeyboardAvoidingView>
				</View>
			</ImageBackground>
		</View>
	);
}
