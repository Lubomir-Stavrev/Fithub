import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	Image,
	Dimensions,
	TouchableOpacity,
	Linking
} from "react-native";

import { DrawerNavigatorItems } from "react-navigation-drawer";
import DefaultImage from "../assets/welcomePage.jpg";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { AdMobBanner, AdMobInterstitial } from "expo-ads-admob";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default Sidebar = (props) => {
	const [bannerAdId, setBannerAdId] = useState("ca-app-pub-7464607351320039/2455978652");

	useEffect(() => { }, []);

	const signOut = async () => {
		try {
			const value = await AsyncStorage.removeItem("auth");

			if (value === null) {
				props.navigation.navigate("Auth");
				return true;
			} else {
				console.log("asdasd");
				return false;
			}
		} catch (e) {
			console.log(e);
			return false;
		}
	};
	return (
		<View style={styles.container}>
			<View style={styles.navContainer}>
				<DrawerNavigatorItems {...props} />
			</View>
			<AdMobBanner
				style={{
					position: "absolute",
					top: "39.5%",
					left: "-7.5%"
				}}
				bannerSize="mediumRectangle"
				adUnitID={bannerAdId}
				servePersonaLizedAds={false}
			/>
			<View style={styles.bottomNav}>
				<View style={styles.socialMedia}>

					<TouchableOpacity
						onPress={() => { Linking.openURL('https://www.instagram.com/fithub_team/') }}>
						<View style={styles.optionText}>
							<Text>
								<AntDesign name="instagram" style={{ padding: 1 }} size={34} color="white" />
							</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => { Linking.openURL('https://www.facebook.com/FitHub-108132251727716/') }}>
						<View style={styles.optionText}>
							<Text>
								<AntDesign name="facebook-square" style={{ padding: 1 }} size={34} color="white" />
							</Text>
						</View>
					</TouchableOpacity>
				</View>
				<TouchableOpacity style={{
					backgroundColor: "#202020",
					height: 43,
					width: 277,
					justifyContent: "center",
					alignItems: "center",
					position: "relative",
					flexDirection: 'row',
					borderColor: "#d5990c",
					borderBottomWidth: 1
				}} onPress={() => signOut()}>
					<Text style={{ right: "5%" }}><MaterialIcons name="logout" size={24} color="white" /></Text>
					<Text style={{ fontSize: 20, color: "white" }}>Logout</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "rgba(18, 18, 19,1)",
		flex: 1
	},
	navContainer: {
		marginTop: "30%",
		height: windowWidth
	},
	bottomNav: {
		bottom: 25,
		position: "absolute",
		margin: 0,
		justifyContent: "center",
		alignItems: "center"
	},
	optionText: {
		backgroundColor: "#202020",
		height: 43,
		width: 277,
		justifyContent: "center",
		alignItems: "center",
		position: "relative",
		borderColor: "#d5990c",
		borderBottomWidth: 1,
		marginBottom: 10,
	}, socialMedia: {
		marginBottom: 20
	}
});
