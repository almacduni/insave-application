import React, { FC } from "react";
import Animated, {
	useAnimatedStyle,
	useDerivedValue,
	interpolate,
	withTiming,
} from "react-native-reanimated";
import { Vector, ReText, round } from "react-native-redash";
import styled from "styled-components/native";

import { scale } from "../../../helpers/sizeConverter";
import { GraphType } from "../../../types/commonTypes";
import { PriceChanges } from "../../../components/PriceChanges/PriceChanges";

interface HeaderProps {
	translation: Vector<Animated.SharedValue<number>>;
	graph: GraphType;
	isActive: Animated.SharedValue<boolean>;
	size: { width: number; height: number };
	changesInCurrency: number;
	changesInPercentage: number;
}

export const Header: FC<HeaderProps> = ({
	translation,
	graph,
	isActive,
	size,
	changesInCurrency,
	changesInPercentage,
}) => {
	const price = useDerivedValue(() => {
		const p = interpolate(translation.y.value, [0, size.width], [graph?.maxPrice, graph?.minPrice]);

		return `$ ${round(p, 2)}`;
	});

	const styleChanges = useAnimatedStyle(() => ({
		opacity: withTiming(isActive.value ? 0 : 1),
	}));

	return (
		<Container>
			<Title>Performance</Title>
			<PriceContainer>
				<ReText
					style={ {
						minWidth: scale(200),
						textAlign: "right",
						fontSize: scale(21),
						fontWeigth: 700,
						fontFamily: "ProximaNova-Bold",
						lineHeight: scale(28),
						paddingTop: 0,
						paddingRight: 0,
						paddingBottom: 0,
					} }
					text={ price }
				/>
				<Animated.View style={ styleChanges }>
					<PriceChanges
						changesInCurrency={ changesInCurrency }
						changesInPercentage={ changesInPercentage }
					/>
				</Animated.View>
			</PriceContainer>
		</Container>
	);
};

const Container = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: flex-start;
`;

const Title = styled.Text`
	font-family: "ProximaNova-Bold";
	font-size: ${scale(21)}px;
`;

const PriceContainer = styled.View`
	align-items: flex-end;
`;
