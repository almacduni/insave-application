// TODO: rewrite to reanimated
import React, { FC, useEffect, useState } from "react";
import styled from "styled-components/native";
import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import CardFlip from "react-native-card-flip";

import { scale, verticalScale } from "../../../helpers/sizeConverter";

type PropsType = {
	index: number;
	price: number;
	isSearch?: boolean;
};

export const FlipItem: FC<PropsType> = ({ index, price, isSearch }) => {
	const [rating, setRating] = useState(null as string | null);
	const [color, setColor] = useState(null as string | null);
	const [bgColor, setBgColor] = useState(null as string | null);

	useEffect(() => {
		switch (rating === null) {
		case price >= 1 && price <= 1.8:
			setRating("strong buy");
			setColor("rgba(12, 125, 90, 1.0)");
			setBgColor("rgba(16, 168, 121, 0.2)");
			break;
		case price > 1.8 && price <= 2.6:
			setRating("Buy");
			setColor("rgba(12, 125, 90, 1.0)");
			setBgColor("rgba(16, 168, 121, 0.2)");
			break;
		case price > 2.6 && price <= 3.4:
			setRating("Hold");
			setColor("rgba(3, 6, 29, 1.0)");
			setBgColor("rgba(255, 214, 0, 0.1)");
			break;
		case price > 3.4 && price <= 4.2:
			setRating("Sell");
			setColor("rgba(235, 0, 70, 1.0)");
			setBgColor("rgba(235, 0, 70, 0.15)");
			break;
		case price > 4.21 && price <= 5:
			setRating("Strong Sell");
			setColor("rgba(235, 0, 70, 1.0)");
			setBgColor("rgba(235, 0, 70, 0.15)");
			break;
		default:
			setRating("-");
			break;
		}
	}, [price, rating]);

	return (
		color && (
			<CardFlip
				style={ styles.cardContainer }
				// FIXME: fix this type error
				ref={ (card) => (this["card" + index] = card) }
			>
				<Card
					isSearch={ isSearch }
					color={ color }
					bgCol={ bgColor }
					activeOpacity={ 1 }
					onPress={ () => this["card" + index].flip() }
				>
					<Label isSearch={ isSearch } color={ color }>
						{rating}
					</Label>
				</Card>
				<Card
					isSearch={ isSearch }
					color={ color }
					activeOpacity={ 1 }
					bgCol={ bgColor }
					onPress={ () => this["card" + index].flip() }
				>
					<Label isSearch={ isSearch } color={ color }>
						{price}
					</Label>
				</Card>
			</CardFlip>
		)
	);
};

const Card = styled.TouchableOpacity<{ isSearch?: boolean; color: string; bgCol: string }>`
	justify-content: center;
	align-items: center;
	width: ${scale(82)}px;
	height: ${verticalScale(24)}px;
	line-height: ${verticalScale(14)}px;
	letter-spacing: ${scale(0.4)}px;
	background-color: ${({ bgCol }) => bgCol};
	border-radius: ${scale(3)}px;
	border-color: ${({ color }) => color};
`;

const styles = StyleSheet.create({
	cardContainer: {
		width: scale(82),
		height: verticalScale(24),
	},
});

const Label = styled.Text<{ isSearch?: boolean; color: string }>`
	font-family: ProximaNova-Regular;
	font-style: normal;
	font-weight: normal;
	line-height: ${({ isSearch }) => (isSearch ? `${wp("3.7%")}px` : `${wp("3.2%")}px`)};
	color: ${({ isSearch, color }) => (isSearch ? color : "#FFFFFF")};
	font-variant: lining-nums;
	font-size: ${scale(13)}px;
`;
