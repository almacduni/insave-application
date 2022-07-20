import * as React from "react";
import { StatusBar, StatusBarStyle, Platform } from "react-native";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { PlatformType } from "../../types/commonTypes";

interface BackgroundColorAnimatedStyle {
	backgroundColor: string | number;
}
interface IProps {
	backgroundColor?: string;
	backgroundColorWrapper?: BackgroundColorAnimatedStyle
	barStyle?: StatusBarStyle;
	translucent?: boolean;
}

export const CustomStatusBar: React.FC<IProps> = ({ backgroundColor, backgroundColorWrapper, barStyle = "dark-content", translucent }) => {

	const insets = useSafeAreaInsets();
	const backgroundColorStyle = {
		backgroundColor: "#ffffff"
	};
	const isBackgroundColorWrapper = backgroundColorWrapper ?? backgroundColorStyle;

	function renderStatusBar (): React.ReactElement {
		if (Platform.OS === PlatformType.IOS) {
			return (
				<Animated.View style={ [{ height: insets.top }, isBackgroundColorWrapper] }>
					<StatusBar
						backgroundColor={ backgroundColor }
						barStyle={ barStyle } />
				</Animated.View>
			);
		}

		return (
			<StatusBar
				backgroundColor={ backgroundColor }
				barStyle={ barStyle } translucent={ translucent } />
		);
	}

	return (
		<>{renderStatusBar()}</>
	);
};
