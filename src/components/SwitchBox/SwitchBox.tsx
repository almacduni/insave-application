import React, { FC } from "react";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
	useDerivedValue,
	interpolateColor,
} from "react-native-reanimated";
import styled from "styled-components/native";

import { scale } from "../../helpers/sizeConverter";

interface SwitchBoxProps {
	isActive: Animated.SharedValue<boolean>;
	onPress: (value: Animated.SharedValue<boolean>) => void;
}

const MAX_TRANSLATE = 24;

export const SwitchBox: FC<SwitchBoxProps> = ({ isActive, onPress }) => {
	const switched = useSharedValue(isActive.value);
	const progress = useDerivedValue(() => isActive.value ? withTiming(MAX_TRANSLATE) : withTiming(0));
	const pickedColor = useSharedValue<string | number>("rgba(86, 106, 236, 1)");

	const isSwitched = useDerivedValue(() => isActive.value ? withTiming(1) : withTiming(0), []);

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ translateX: progress.value }],
	}));

	const onColorChanged = React.useCallback(
		(color: string | number) => {
			"worklet";
			pickedColor.value = color;
		},
		[pickedColor],
	);
	const rInternalPickerStyle = useAnimatedStyle(() => {
		const backgroundColor = interpolateColor(
			isSwitched.value,
			[0, 1],
			["rgba(17, 3, 32, 0.05)", "rgba(86, 106, 236, 1)"],
		);

		onColorChanged(backgroundColor);

		return {
			backgroundColor: backgroundColor,
			borderRadius: 12,
		};
	});

	return (
		<Animated.View style={ [rInternalPickerStyle] }>
			<SwitchWrapper onPress={ () => onPress(switched) }>
				<Animated.View style={ [animatedStyle] }>
					<Circle />
				</Animated.View>
			</SwitchWrapper>
		</Animated.View>
	);
};

const Circle = styled.View<{ toLeft?: boolean }>`
	width: ${scale(20)}px;
	height: ${scale(20)}px;
	border-radius: ${scale(10)}px;
	background-color: #fff;
`;

const SwitchWrapper = styled.Pressable`
	width: ${scale(48)}px;
	height: ${scale(24)}px;
	border-radius: ${scale(12)}px;
	padding: ${scale(2)}px;
	flex-direction: row;
	align-items: center;
`;
