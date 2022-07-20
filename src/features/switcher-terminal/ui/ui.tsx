import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Animated, { interpolateColor, useAnimatedStyle, withTiming } from "react-native-reanimated";
import styled from "styled-components/native";

import { scale, verticalScale } from "../../../helpers/sizeConverter";

interface IProps {
	isOpenMarketShared: Animated.SharedValue<number>;
	setIsOpenMarket: (isOpenMarket: boolean) => void;
}

export const SwitcherTerminal: React.FC<IProps> = (props) => {
	const { isOpenMarketShared, setIsOpenMarket } = props;
	const marketAnimateStyle = useAnimatedStyle(() => {
		const backgroundColor = interpolateColor(
			isOpenMarketShared.value,
			[0, 1],
			["rgb(243, 242, 244)", "rgb(255, 255, 255)"]
		);

		return {
			backgroundColor,
			borderTopRightRadius: isOpenMarketShared.value ? 24 : withTiming(0),
			borderBottomRightRadius: isOpenMarketShared.value ? 0 : 24
		};
	});

	const LimitAnimateStyle = useAnimatedStyle(() => {
		const backgroundColor = interpolateColor(
			isOpenMarketShared.value,
			[0, 1],
			["#ffffff", "#F3F2F4"],
			"RGB",
		);

		return {
			backgroundColor,
			borderBottomLeftRadius: isOpenMarketShared.value ? 18 : 0,
		};

	});

	const marketTextAnimateStyle = useAnimatedStyle(() => {
		const color = interpolateColor(
			isOpenMarketShared.value,
			[0, 1],
			["rgba(3, 6, 29, 0.4)", "rgba(3, 6, 29, 1)"],
			"RGB",
		);

		return { color };
	});

	const limitTextAnimateStyle = useAnimatedStyle(() => {
		const color = interpolateColor(
			isOpenMarketShared.value,
			[0, 1],
			["rgba(3, 6, 29, 1)", "rgba(3, 6, 29, 0.4)"],
			"RGB",
		);

		return { color };
	});

	function handlePressMarket () {
		setIsOpenMarket(true);
		isOpenMarketShared.value = 1;
	}
	function handlePressLimit () {
		setIsOpenMarket(false);
		isOpenMarketShared.value = 0;
	}

	return (
		<Wrapper>
			<MarketWrapper>

				<MarketBtn onPress={ handlePressMarket }>
					<Animated.View style={ [marketAnimateStyle, styles.switchWrapper ] }>
						<Animated.Text style={ [styles.switchText, marketTextAnimateStyle] }>Market</Animated.Text>
					</Animated.View>
				</MarketBtn>
			</MarketWrapper>

			<LimitWrapper>
				<TouchableOpacity onPress={ handlePressLimit }>

					<Animated.View style={ [LimitAnimateStyle, styles.switchWrapperLimit ] } >
						<Animated.Text style={ [styles.switchText, limitTextAnimateStyle] }>Limit</Animated.Text>

					</Animated.View>
				</TouchableOpacity>

			</LimitWrapper>

		</Wrapper>
	);

};

const styles = StyleSheet.create({
	switchWrapper: {
		width: "100%",
		height: verticalScale(40),
		borderTopLeftRadius: 11,
		borderTopRightRadius: 11,
		alignItems: "center",
		justifyContent: "center"
	},
	switchWrapperLimit: {
		width: "50%",
		height: verticalScale(40),
		borderTopLeftRadius: 11,
		borderTopRightRadius: 21,
		alignItems: "center",
		justifyContent: "center"
	},
	switchText: {
		fontWeight: "bold",
		fontSize: scale(14),
		lineHeight: 20,
	}
});

const Wrapper = styled.View`
  flex-direction: row;
  width: 100%;
  height: ${verticalScale(40)}px;
  borderTopLeftRadius: 11px;
  borderTopRightRadius: 11px;
  background-color: #F3F2F4;
`;

const LimitWrapper = styled.View`
  width: 100%;
  height: ${verticalScale(40)}px;
  borderTopLeftRadius: 11px;
  borderTopRightRadius: 11px;
  background-color: #fff;
`;
const MarketBtn = styled.TouchableOpacity`
  width: 100%;
  height: 100%;
  align-items: center;
`;
const MarketWrapper = styled.View`
  width: 50%;
  height: ${verticalScale(40)}px;
  borderTopLeftRadius: 11px;
  borderTopRightRadius: 11px;
  background-color: #fff;
  align-items: center;

`;

const SwitchText = styled.Text`
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #03061D;
`;
