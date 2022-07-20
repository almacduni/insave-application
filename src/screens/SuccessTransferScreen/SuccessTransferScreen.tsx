import * as React from "react";
import styled from "styled-components/native";

import { Button, Text } from "../../shared/ui";
import { FontStyles } from "../../shared/model";
import InfoIcon from "../../assets/InfoCircleIcon.svg";

export const SuccessTransferScreen: React.FC<any> = ({ navigation }) => {
	const goToWallet = () => {
		navigation.navigate("TabRouting");
	};

	return (
		<Wrapper>
			<Text fontStyle={ FontStyles.SEMI_BOLD } size={ 16 }>
				Transfer
			</Text>
			<InfoWrapper>
				<InfoIcon />
				<Text size={ 17 }>Success</Text>
			</InfoWrapper>
			<ButtonWrapper>
				<Button text="Go to wallet" onPress={ goToWallet } />
			</ButtonWrapper>
		</Wrapper>
	);
};

const Wrapper = styled.View`
	padding: 16px;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	background-color: #fff;
	flex: 1;
`;

const ButtonWrapper = styled.View`
	width: 100%;
	margin-top: auto;
`;

const InfoWrapper = styled.View`
	flex-direction: column;
	align-items: center;
	justify-content: center;
	flex: 1;
`;
