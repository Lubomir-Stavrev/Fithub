import { initializeApp } from "firebase/app";
import auth from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyCH_yWbb_RtopstAGkfFi9Fc5TI2mq5ToQ",
	authDomain: "fithub-a08eb.firebaseapp.com",
	projectId: "fithub-a08eb",
	storageBucket: "fithub-a08eb.appspot.com",
	messagingSenderId: "351623702583",
	appId: "1:351623702583:web:ae10824d18fae986d8b7b2",
	measurementId: "G-QY2N363EN4"
};
initializeApp(firebaseConfig);

export default { auth };
