import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import { Account } from "../../components/Account/Account";
import { HomeScreen } from "./HomeScreen";

const Stack = createStackNavigator();

export const HomeScreenContainer = ({ navigation }: any) => (
	<Stack.Navigator
		screenOptions={ {
			headerShown: false,
			animationEnabled: false,
		} }
	>
		<Stack.Screen name="HomeScreen">{() => <HomeScreen navigation={ navigation } />}</Stack.Screen>
		<Stack.Screen name="Account" component={ Account } />
	</Stack.Navigator>
);
