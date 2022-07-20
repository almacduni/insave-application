import React, { FC } from "react";
import { View } from "react-native";
import Animated, {
	useDerivedValue,
	interpolate,
	useAnimatedStyle,
	withSpring,
} from "react-native-reanimated";
import { Vector, ReText, round } from "react-native-redash";
import styled from "styled-components/native";

import {
	CompanyDescriptionType,
	GraphType,
} from "../../../types/commonTypes";
import { PriceChanges } from "../../PriceChanges/PriceChanges";
import { scale } from "../../../helpers/sizeConverter";

interface HeaderProps {
	translation: Vector<Animated.SharedValue<number>>;
	graph?: GraphType;
	historycal: any;
	companyDescription: CompanyDescriptionType | null;
	isActive: Animated.SharedValue<boolean>;
	size: { width: number; height: number };
}

export const Header: FC<HeaderProps> = ({
	translation,
	graph,
	historycal,
	// FIXME:
	companyDescription: { name, symbol, image, change, changesPercentage },
	isActive,
	size,
}) => {
	const price = useDerivedValue(() => {
		const p = interpolate(translation.y.value, [0, size.height], [graph.maxPrice, graph.minPrice]);
		const d = interpolate(translation.x.value, [0, size.width], [graph.minDate, graph.maxDate]);

		const formatedDate = new Date(d).toISOString().split("T")[0];

		return `$ ${round(historycal[formatedDate] || p, 2)}`;
	});

	function renderAvatarCompany () {
		if (image) {
			return	<ImageCompany width={ scale(36) } height={ scale(36) } source={ { uri: image } } />;
		}

		return (
			<AvatarWrapper>
				<AvatarLetter>
					{name[0]}
				</AvatarLetter>
			</AvatarWrapper>
		);
	}

	const style = useAnimatedStyle(() => ({
		opacity: withSpring(isActive.value ? 0 : 1),
	}));

	return (
		<Container>
			<DescriptionContainer>
				{renderAvatarCompany()}
				<View>
					<Name numberOfLines={ 1 } ellipsizeMode="tail">
						{name}
					</Name>
					<Symbol>{symbol}</Symbol>
				</View>
			</DescriptionContainer>
			<PriceContainer>
				<Price text={ price } />
				<Animated.View style={ style }>
					<PriceChanges
						changesInCurrency={ change }
						changesInPercentage={ changesPercentage }
						style={ { textAlign: "right" } }
					/>
				</Animated.View>
			</PriceContainer>
		</Container>
	);
};

const Container = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

const DescriptionContainer = styled.View`
	flex-direction: row;
	align-items: center;
	width: 60%;
`;

const ImageCompany = styled.Image`
	width: ${scale(36)}px;
	height: ${scale(36)}px;
	margin-right: ${scale(6)}px;
	border-radius: 100px;
	resize-mode: contain;
`;

const AvatarWrapper = styled.View`
	width: ${scale(36)}px;
	height: ${scale(36)}px;
	margin-right: ${scale(6)}px;
	background: #b3b4bb;
	border-radius: 100px;
	justify-content: center;
	align-items: center;
`;

const AvatarLetter = styled.Text`
	color: #fff;
	font-size: ${scale(16)}px;
	font-weight: bold;
	text-transform: uppercase;
`;

const Name = styled.Text`
	font-family: "ProximaNova-SemiBold";
	font-size: ${scale(17)}px;
	color: #252525;
`;

const Symbol = styled.Text`
	font-family: "ProximaNova-Semibold";
	font-size: ${scale(13)}px;
	color: #a4a4a4;
`;

const PriceContainer = styled.View`
	width: 33%;
	margin-right: ${scale(8)}px;
`;

const Price = styled(ReText)`
	font-family: "ProximaNova-SemiBold";
	font-size: ${scale(17)}px;
	color: #252525;
	font-variant: lining-nums;
	text-align: right;
	padding: 0;
`;
