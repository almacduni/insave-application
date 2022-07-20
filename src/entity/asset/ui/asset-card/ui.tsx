import React from "react";
import styled from "styled-components/native";

import { GradientDirection, GradientText } from "../../../../components/GradientText/GradientText";
import { PriceChanges } from "../../../../components/PriceChanges/PriceChanges";
import { sc, scale, verticalScale } from "../../../../helpers/sizeConverter";
import { normalizeIndicator as ni } from "../../../../helpers/normalizeIndicator";

interface IAssetCard {
	title: string;
	subtitle: string;
	logo: string;
	price: {
		current: number;
		change: number;
		changeInPercentage: number;
	};
	handleClick?: (title: string, subtitle: string) => void;
}

export const AssetCard: React.FC<IAssetCard> = (props) => {
	const { title, subtitle, logo, price, handleClick } = props;

	const toggleClick = () => {
		if (handleClick) {
			handleClick(title, subtitle);
		}
	};

	function renderAssetLogo () {
		if (logo !== "Image not found") {
			return (
				<CompanyImage
					source={ { uri: logo } }
				/>
			);
		}

		return (
			<EmptyImageBox>
				<EmptyImageTitle>{title[0]}</EmptyImageTitle>
			</EmptyImageBox>
		);
	}

	return (
		<Container onPress={ toggleClick } activeOpacity={ 0.9 }>
			<AboutContainer>
				{renderAssetLogo()}
				<Info>
					<Title>{title}</Title>
					<GradientText
						width={ scale(195) }
						fontSize={ sc(13) }
						height={ 16 }
						text={ subtitle }
						gradientDirection={ GradientDirection.HORIZONTAL }
						gradientColors={ [
							{
								color: "rgb(179, 180, 186)",
								offset: "75%",
							},
							{
								color: "#fff",
								offset: "100%",
							},
						] }
					/>
				</Info>
			</AboutContainer>
			<PriceContainer>
				<Price>
					${ni(price.current).whole}.<RestPrice>{ni(price.current).rest}</RestPrice>
				</Price>
				<PriceInfo
					changesInCurrency={ price.change }
					changesInPercentage={ price.changeInPercentage }
				/>
			</PriceContainer>
		</Container>
	);
};

const Container = styled.TouchableOpacity`
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	padding: 3px 0;
`;

const AboutContainer = styled.View`
	max-width: 65%;
	align-items: center;
	flex-direction: row;
`;

const CompanyImage = styled.Image`
	border-radius: 100px;
	width: ${scale(40)}px;
	height: ${scale(40)}px;
	resize-mode: contain;
`;

const EmptyImageBox = styled.View`
	border-radius: 100px;
	width: ${scale(40)}px;
	height: ${scale(40)}px;
	justify-content: center;
	align-items: center;
	background-color: rgba(3, 6, 29, 0.3);
`;

const EmptyImageTitle = styled.Text`
	color: #ffffff;
	font-size: ${scale(17)}px;
	line-height: 20px;
	font-family: Raleway;
	font-weight: bold;
`;

const Info = styled.View`
	justify-content: space-between;
	margin-left: ${scale(8)}px;
	flex: 1;
`;

const Title = styled.Text`
	color: rgba(3, 6, 29, 1);
	font-family: ProximaNova-Semibold;
	font-size: ${scale(17)}px;
	line-height: ${verticalScale(20)}px;
	letter-spacing: ${scale(0.15)}px;
	font-variant: lining-nums;
	margin-bottom: ${scale(4)}px;
`;

const PriceContainer = styled.View`
	max-width: 35%;
	align-items: flex-end;
`;

const Price = styled.Text`
	color: rgba(3, 6, 29, 1);
	font-variant: lining-nums;
	font-family: ProximaNova-Semibold;
	font-size: ${scale(17)}px;
	line-height: ${verticalScale(20)}px;
	letter-spacing: ${scale(0.15)}px;
`;

const PriceInfo = styled(PriceChanges)`
	margin-top: ${verticalScale(4)}px;
`;

const RestPrice = styled(Price)`
	font-size: ${scale(14)}px;
`;
