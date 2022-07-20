import { useNavigation } from "@react-navigation/native";
import React, { FC } from "react";
import styled from "styled-components/native";

import { sc, scale, verticalScale } from "../../helpers/sizeConverter";
import { useAppSelector } from "../../hooks/useRedux";
import { CountTypes } from "../../screens/TokenWallet/progressCardsData";
import { Text, Separator } from "../../screens/TokenWallet/TokenWalletHeader";

export enum CardTypes {
	FULL_WIDTH,
	HALF_WIDTH,
}

type CardType = CardTypes.FULL_WIDTH | CardTypes.HALF_WIDTH;

interface ProgressCardProps {
	title: string;
	countType?: CountTypes.FRENDS | CountTypes.POSTS | CountTypes.VIDEOS | CountTypes.TRADES;
	description?: string;
	Icon: FC<any>;
	onPress: (args: any) => any;
	buttonText: string;
	cardType: CardType;
	background: string;
}

export const ProgressCard: FC<ProgressCardProps> = ({
	title,
	countType,
	description,
	Icon,
	onPress,
	buttonText,
	cardType,
	background,
}) => {
	const token = useAppSelector((state) => state.token);
	const navigation = useNavigation();

	return (
		<Card { ...{ background, cardType } }>
			<Row justifyContent={ description ? "flex-start" : "center" }>
				<Icon />
				<Separator left={ scale(16) } />
				<Text fontWeight={ 700 }>{title}</Text>
			</Row>
			{description && (
				<>
					<Separator top={ verticalScale(16) } />
					<Text fontSize={ 14 } lineHeight={ 20 } fontType={ "Regular" } fontWeight={ 400 }>
						{description}
					</Text>
					<Separator top={ 24 } />
				</>
			)}
			{countType && (
				<>
					<Separator top={ 24 } />
					<Row>
						<Text fontSize={ 36 } lineHeight={ 48 } fontWeight={ 400 } fontType={ "Regular" }>
							{token[countType] || 0}
						</Text>
					</Row>
					<Separator top={ 16 } />
				</>
			)}
			<Button onPress={ () => onPress(navigation) } activeOpacity={ 0.9 }>
				<ButtonText>{buttonText}</ButtonText>
			</Button>
		</Card>
	);
};

const Card = styled.View<{
	background: string;
	cardType: CardType;
}>`
	width: ${({ cardType }) => {
		switch (cardType) {
		case CardTypes.HALF_WIDTH:
			return `${sc(164)}px`;
		case CardTypes.FULL_WIDTH:
			return "100%";
		}
	}};
	padding: ${scale(25)}px;
	background-color: ${({ background }) => background};
	border-radius: 10px;
	margin-bottom: 16px;
`;

const Row = styled.View<{
	justifyContent?: "center" | "flex-start";
}>`
	width: auto;
	flex-direction: row;
	align-items: center;
	justify-content: ${({ justifyContent = "center" }) => justifyContent};
`;

const Button = styled.TouchableOpacity`
	max-width: ${scale(114)}px;
	padding: 8px;
	background: rgba(37, 37, 37, 1);
	border-radius: 6px;
`;

const ButtonText = styled.Text`
	font-family: ProximaNova-Semibold;
	font-weight: 600;
	font-size: ${scale(14)}px;
	line-height: ${verticalScale(20)}px;
	color: #ffffff;
	letter-spacing: 0.1px;
	margin: 0 auto;
`;
