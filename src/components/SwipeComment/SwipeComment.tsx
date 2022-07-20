import React, { FC, ReactNode, useRef } from "react";
import { Animated, StyleSheet, View, I18nManager } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";

import { scale, verticalScale } from "../../helpers/sizeConverter";
import RemoveWhatchlistIcon from "../../assets/ShareIconSwipe.svg";

type PropsType = {
	children: ReactNode;
	onPressReply: any;
};

export const SwipeComment: FC<PropsType> = ({ children, onPressReply }) => {
	const refSwipe = useRef<Swipeable>(null);

	const renderRightAction = (text: any, color: any, x: any, progress: any) => {
		const translateX = progress.interpolate({
			inputRange: [0, 1],
			outputRange: [x, 0],
			extrapolate: "clamp",
		});

		return (
			<Animated.View
				style={ {
					flex: 1,
					transform: [{ translateX }],
					justifyContent: "center",
					alignItems: "center",
					paddingTop: "90%",
					paddingRight: "20%",
				} }
			>
				<RectButton style={ [styles.rightAction] } rippleColor={ "#fff" }>
					<Animated.View
						style={ {
							height: scale(48),
							width: verticalScale(48),
						} }
					>
						<RemoveWhatchlistIcon
							// FIXME:
							onPress={ () => {
								onPressReply();
								if (refSwipe.current) {
									refSwipe.current.close();
								}
							} }
							width={ scale(48) }
							height={ verticalScale(46) }
						/>
					</Animated.View>
				</RectButton>
			</Animated.View>
		);
	};

	const renderRightActions = (progress: any) => (
		<View
			style={ {
				width: scale(64),
				flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
			} }
		>
			{renderRightAction("Remove", "#EB0046", scale(64), progress)}
		</View>
	);

	return (
		<Swipeable
			ref={ refSwipe }
			friction={ 2 }
			rightThreshold={ 40 }
			renderRightActions={ renderRightActions }
		>
			{children}
		</Swipeable>
	);
};

const styles = StyleSheet.create({
	leftAction: {
		flex: 1,
		backgroundColor: "#497AFC",
		justifyContent: "center",
	},
	rightAction: {
		alignItems: "center",
		flex: 1,
		marginLeft: scale(16),
	},
});
