import React from "react";
import styled from "styled-components/native";
import Animated, { useAnimatedStyle, interpolateColor } from "react-native-reanimated";

import { scale } from "../../../helpers/sizeConverter";

type PropTypes = {
	handler: () => void;
	last?: boolean;
	progress: Readonly<Animated.SharedValue<number>>;
};

export const PlaylistButton: React.FC<PropTypes> = ({ handler, last, progress, children }) => {
	const headerButtonAnimatedStyles = useAnimatedStyle(() => {
		const backgroundColor = interpolateColor(
			progress.value,
			[0, 1],
			["rgba(179, 180, 187, 0.5)", "#fff"],
		);

		return {
			backgroundColor,
		};
	});

	return (
		<ButtonWrapper style={ headerButtonAnimatedStyles } last={ last }>
			<Button onPress={ handler }>{children}</Button>
		</ButtonWrapper>
	);
};

const ButtonWrapper = styled(Animated.View)<{ last?: boolean }>`
	width: ${scale(32)}px;
	height: ${scale(32)}px;
	border-radius: ${scale(16)}px;
	margin-left: ${({ last }) => (last ? `${scale(16)}px` : "0px")};
`;

const Button = styled.TouchableOpacity`
	width: 100%;
	height: 100%;
	border-radius: ${scale(16)}px;
	display: flex;
	align-items: center;
	justify-content: center;
`;
