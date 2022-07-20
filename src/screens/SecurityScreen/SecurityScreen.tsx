import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { SuccessPasscodeChangeScreen } from "./SuccessPasscodeChangeScreeen";
import { SecurityScreenMenu } from "./SecurityScreenMenu";
import { ChangeEmailScreen } from "./ChangeEmailScreen";
import { OldPasswordScreen } from "./OldPasswordScreen";
import { NewPasswordScreen } from "./NewPasswordScreen";
import { ChangeEmailCodeScreen } from "./ChangeEmailCodeScreen";
import { PasscodeLockScreen } from "./PasscodeLockScreen";
import { SecurityPasswordScreen } from "./SecurityPasswordScreen";
import { SecurityScreens } from "../../shared/model";

const Stack = createStackNavigator();

export const SecurityScreen = () => (
	<Stack.Navigator
		initialRouteName={ SecurityScreens.MENU }
		screenOptions={ {
			animationEnabled: false,
			headerShown: false
		} }
	>
		<Stack.Screen name={ SecurityScreens.MENU } component={ SecurityScreenMenu } />
		<Stack.Screen name={ SecurityScreens.EMAIL } component={ ChangeEmailScreen } />
		<Stack.Screen name={ SecurityScreens.OLD_PASSWORD } component={ OldPasswordScreen } />
		<Stack.Screen name={ SecurityScreens.NEW_PASSWORD } component={ NewPasswordScreen } />
		<Stack.Screen name={ SecurityScreens.EMAIL_CODE } component={ ChangeEmailCodeScreen } />
		<Stack.Screen name={ SecurityScreens.SECURITY_PASSWORD } component={ SecurityPasswordScreen } />
		<Stack.Screen name={ SecurityScreens.TWO_STEP_VERIFICATION } component={ () => <></> } />
		<Stack.Screen name={ SecurityScreens.PASSCODE_LOCK } component={ PasscodeLockScreen } />
		<Stack.Screen name={ SecurityScreens.SUCCESS_CHANGE } component={ SuccessPasscodeChangeScreen } />
	</Stack.Navigator>
);
