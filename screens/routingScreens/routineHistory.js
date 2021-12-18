import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";

import { LinearGradient } from "expo-linear-gradient";
export default function routineHistory() {
	return (
		<>
			<View style={styles.body}>
				<FlatList
					data={[
						{ key: "Devin" },
						{ key: "Dan" },
						{ key: "Dominic" },
						{ key: "Jackson" },
						{ key: "James" },
						{ key: "Joel" },
						{ key: "John" },
						{ key: "Jillian" },
						{ key: "Jimmy" },
						{ key: "Julie" }
					]}
					renderItem={({ item }) => (
						<Text style={styles.item}>{item.key}</Text>
					)}
				/>
			</View>
			<LinearGradient
				colors={["#d5990c", "#ffff", "#ffff"]}
				start={[1, 1]}
				end={[0, 0]}
				location={[0.25, 0.4, 1]}
				style={{
					marginBottom: 41,
					marginTop: -41,
					borderRadius: 1000
				}}>
				<View
					style={{
						height: 1.5,
						width: 300,
						borderRadius: 1000
					}}></View>
			</LinearGradient>
		</>
	);
}

const styles = StyleSheet.create({
	body: {
		borderBottomWidth: 1.5,
		borderColor: "#ccc",
		borderRadius: 20,
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
	item: {
		borderWidth: 0,
		borderBottomWidth: 0.5,
		borderColor: "#FFCC1D",
		borderRadius: 10,
		backgroundColor: "rgba(32, 32, 32,0.9)",
		color: "#ffff",
		width: 310,
		height: 70,
		zIndex: 100,
		marginTop: 10,
		fontSize: 20,
		paddingLeft: 20,
		paddingTop: 20
	}
});
