import BottomSheet, { BottomSheetHandleProps, useBottomSheetSpringConfigs } from "@gorhom/bottom-sheet";
import React from "react";
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import styled from "styled-components/native";

import { CustomStatusBar } from "../../processes";

interface IProps {
	config?: object;
	snapPoints: Array<number | string>;
	bottomSheetRef: React.RefObject<BottomSheet>;
	handleCloseSheet: () => void;
	handleElement?: React.FC<BottomSheetHandleProps>
}

export const WithBottomSheet: React.FC<IProps> = (props) => {
	const { children, config, snapPoints, handleCloseSheet, handleElement, bottomSheetRef } = props;
	const isOpenShared = useSharedValue(1);
	const animationConfig = useBottomSheetSpringConfigs({
		damping: 80,
		overshootClamping: true,
		restDisplacementThreshold: 0.1,
		restSpeedThreshold: 0.1,
		stiffness: 500,
	});

	const onAnimateToggle = (fromIndex: number, toIndex: number) => {
		if (toIndex === -1 || toIndex === 0) {
			closeSheet();
		}
	};

	function closeSheet () {
		handleCloseSheet();
	}

	const animatedStyles = useAnimatedStyle(() => {
		const backgroundColor = interpolateColor(
			isOpenShared.value,
			[0, 1],
			["rgba(3, 6, 29, 0)", "rgba(3, 6, 29, 0.4)"],
			"RGB",
		);

		return { backgroundColor };
	});

	return (
		<Container style={ animatedStyles }>
			<CustomStatusBar translucent backgroundColorWrapper={ animatedStyles }/>
			<CloseContainer onPress={ closeSheet } />
			<BottomSheet
				ref={ bottomSheetRef }
				index={ 1 }
				animationConfigs={ config ?? animationConfig }
				onAnimate={ onAnimateToggle }
				snapPoints={ snapPoints }
				handleComponent={ handleElement ?? null }
			>
				{children}
			</BottomSheet>
		</Container>
	);
};

const Container = styled(Animated.View)`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	flex: 1;
	z-index: 100;
`;

const CloseContainer = styled.Pressable`
	flex: 1;
	height: 100%;
`;
