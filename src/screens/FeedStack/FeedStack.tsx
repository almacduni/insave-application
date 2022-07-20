import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { FeedScreen } from "../FeedScreen/FeedScreen";

const Stack = createStackNavigator();

export const FeedStack: React.FC = () => (
	<Stack.Navigator
		screenOptions={ {
			headerShown: false,
			animationEnabled: false,
		} }
		initialRouteName="FeedScreen"
	>
		<Stack.Screen name="FeedScreen" component={ FeedScreen } />

	</Stack.Navigator>
);
