import React, { useEffect } from "react";
import { Linking, SafeAreaView } from "react-native";
import styled from "styled-components/native";
import { DefaultTheme, NavigationContainer, useNavigationContainerRef } from "@react-navigation/native";
import { Provider } from "react-redux";
import SplashScreen from "react-native-splash-screen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFlipper } from "@react-navigation/devtools";

import { Routing } from "./src/routes/Routing";
import { store } from "./src/redux/redux-store";
// import { navigationRef } from "./src/routes/RootNavigation";
import { CustomStatusBar } from "./src/processes";

export default function App () {
	const MyTheme = {
		...DefaultTheme,
		colors: {
			...DefaultTheme.colors,
			background: "#FFF",
		},
	};

	const navigationRef = useNavigationContainerRef();

	useFlipper(navigationRef);

	useEffect(() => {
		SplashScreen.hide();
	}, []);

	// TODO: rewrite linking
	// const handleNavigateToLogin = () => {
	// 	navigationRef.navigate("AuthenticationStack", { screen: "LoginScreen" });
	// };

	// useEffect(() => {
	// 	Linking.addEventListener("url", handleNavigateToLogin);

	// 	return () => {
	// 		Linking.removeEventListener("url", handleNavigateToLogin);
	// 	};
	// }, []);

	return (
		<Provider store={ store }>
			<SafeAreaProvider>
				<CustomStatusBar backgroundColor="white" />
				<SafeArea>
					<Container>
						<NavigationContainer independent={ true } ref={ navigationRef } theme={ MyTheme }>
							<Routing />
						</NavigationContainer>
					</Container>
				</SafeArea>
			</SafeAreaProvider>
		</Provider>
	);
}

const Container = styled.View`
	flex: 1;
	background-color: #ffffff;
`;

const SafeArea = styled(SafeAreaView)`
	flex: 1;
`;

