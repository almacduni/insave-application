import React, { FC } from "react";
import styled from "styled-components/native";

import { scale, verticalScale } from "../../helpers/sizeConverter";
import { Text } from "./TokenWalletHeader";

interface TokenWalletBarProps {
	onMorePress: () => void;
	title: string;
}

export const TokenWalletBar: FC<TokenWalletBarProps> = ({ onMorePress, title }) => (
	<Wrapper>
		<Text fontSize={ scale(25) } lineHeight={ verticalScale(32) } fontWeight={ 700 }>
			{title}
		</Text>
		<MoreButton onPress={ onMorePress }>
			<MoreText>more</MoreText>
		</MoreButton>
	</Wrapper>
);

const Wrapper = styled.View`
	padding: 24px 16px 24px 16px;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

const MoreButton = styled.TouchableOpacity``;
const MoreText = styled.Text`
	font-family: ProximaNova-Semibold;
	font-weight: 600;
	font-size: 17px;
	line-height: 20px;
	color: rgba(86, 106, 236, 1);
`;
