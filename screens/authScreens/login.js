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
	const [errorMessage, setErrorMessage] = useState("");
	useEffect(() => {

	}, []);

	const loginAccount = (e) => {
		if (email && password) {
			services
				.login(email, password)
				.then((res) => {
					console.log(res)
					if (res?.err) {
						setErrorMessage("Wrong email or password!")
						setTimeout(() => {
							setErrorMessage(null)
						}, 3000)
						return;
					} else {
						navigation.navigate("Home");
					}
				})
				.catch((err) => {
					console.log(err);
					setErrorMessage("Wrong email or password!")
					setTimeout(() => {
						setErrorMessage(null)
					}, 3000)
					return;
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
								maxLength={45}
							/>
							<TextInput
								style={styles.input}
								placeholder="Password"
								secureTextEntry={true}
								onChangeText={(text) => setPassword(text)}
								maxLength={20}
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
							{errorMessage ?
								<View style={{ borderWidth: 1, padding: 10, borderColor: "#EC4226", borderBottomWidth: 1, borderBottomColor: "#EC4226" }}>
									<Text style={{ fontSize: 22, color: '#EC4226' }}>{errorMessage}</Text>
								</View> :
								<Text
									style={[
										styles.moreInfo,
										{ top: 20, fontSize: 19, paddingBottom: 30 }
									]}>
									Don't have an account yet?
								</Text>
							}
						</TouchableOpacity>
					</KeyboardAvoidingView>
				</View>
			</ImageBackground>
		</View>
	);
}
