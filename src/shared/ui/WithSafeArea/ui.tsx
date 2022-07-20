import * as React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const WithSafeArea: React.FC = ({ children }) => {

	const insets = useSafeAreaInsets();

	return (
		<View style={ { paddingTop: insets.top, flex: 1 } }>
			{children}
		</View>
	);
};
