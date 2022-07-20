import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { ChartScreen } from "../ChartScreen/ChartScreen";
import { ChartConfiguration } from "../../features";

const Stack = createStackNavigator();

export const ChartScreenContainer: React.FC = () => (
	<Stack.Navigator initialRouteName="ChartScreen" screenOptions={ { header: () => null } }>
		<Stack.Screen name="ChartScreen" component={ ChartScreen }/>
	</Stack.Navigator>
);
