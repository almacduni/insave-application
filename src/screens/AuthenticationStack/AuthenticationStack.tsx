import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { ResetPasswordScreen } from "../ResetPasswordScreen/ResetPasswordScreen";
import { LoginScreen } from "../LoginScreen/LoginScreen";
import { RegistrationScreen } from "../RegistrationScreen/RegistrationScreen";
import { PersonalLinkScreen } from "../PersonalLinkScreen/PersonalLinkScreen";
import { RecoveryPasswordScreen } from "../RecoveryPasswordScreen/RecoveryPasswordScreen";
import { ReferralCodeScreen } from "../ReferralCodeScreen/ReferralCodeScreen";

const Stack = createStackNavigator();

export const AuthenticationStack = () => (
	<Stack.Navigator
		initialRouteName="LoginScreen"
		screenOptions={ {
			headerShown: false,
			presentation: "transparentModal",
		} }
	>
		<Stack.Screen name="LoginScreen" component={ LoginScreen } />
		<Stack.Screen name="ReferralCodeScreen" component={ ReferralCodeScreen } />
		<Stack.Screen name="ResetPasswordScreen" component={ ResetPasswordScreen } />
		<Stack.Screen name="PersonalLinkScreen" component={ PersonalLinkScreen } />
		<Stack.Screen name="RegistrationScreen" component={ RegistrationScreen } />
		<Stack.Screen
			name="RecoveryPasswordScreen"
			component={ RecoveryPasswordScreen }
		/>
	</Stack.Navigator>
);
