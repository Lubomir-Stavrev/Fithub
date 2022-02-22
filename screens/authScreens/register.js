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
import { BarPasswordStrengthDisplay } from 'react-native-password-strength-meter';

const auth = getAuth();

export default function Register({ navigation }) {
	const [username, setUsername] = useState();
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [repPassword, setRepPassword] = useState();
	const [errorMessage, setErrorMessage] = useState();

	const registerAccount = (e) => {
		if (username && email && password) {
			if (password == 0) {
				setErrorMessage(prev => "Password is required feild");
				setTimeout(() => {
					setErrorMessage(prev => null);
				}, 3000)
				return;
			} else if (password.length < 8 || password.length > 20) {
				setErrorMessage(prev => "Password should be min 8 char and max 20 char.");
				setTimeout(() => {
					setErrorMessage(prev => null);
				}, 3000)
				return;
			} else if (password !== repPassword) {
				setErrorMessage(prev => "Passwoad and confirm password should be same.");
				setTimeout(() => {
					setErrorMessage(prev => null);
				}, 3000)
				return;
			}

			if (repPassword.length == 0) {
				setErrorMessage(prev => "Confirm Password is required feild.");
				setTimeout(() => {
					setErrorMessage(prev => null);
				}, 3000)
				return;
			} else if (repPassword.length < 8 || repPassword.length > 20) {
				setErrorMessage(prev => "Password should be min 8 char and max 20 char.");
				setTimeout(() => {
					setErrorMessage(prev => null);
				}, 3000)
				return;
			}
			services
				.register(username, email, password)
				.then((res) => {
					console.log(res);
					if (res.err) {

						setErrorMessage(prev => "The email is already been taken.");
						setTimeout(() => {
							setErrorMessage(prev => null);
						}, 3000)
						return;
					} else {
						navigation.navigate("Login");
					}
				})
				.catch((err) => {
					setErrorMessage(prev => "The email is already been taken.");
					setTimeout(() => {
						setErrorMessage(prev => null);
					}, 3000)
					return
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
							{password ?
								<View style={{ marginTop: -17, marginBottom: 13 }}>
									<BarPasswordStrengthDisplay
										password={password}
										width={280}
									/>

								</View>
								: null}
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
							{errorMessage ?
								<View style={{ borderWidth: 1, padding: 10, borderColor: "#EC4226", textAlign: 'center', alignItems: 'center' }}>
									<Text style={{ fontSize: 15, color: '#EC4226', fontFamily: 'redcoat', letterSpacing: 2 }}>{errorMessage}</Text>
								</View> :
								<Text style={styles.moreInfo}>
									Already have an account? Login
								</Text>
							}

						</TouchableOpacity>
					</KeyboardAvoidingView>
				</View>
			</ImageBackground>
		</View>
	);
}
