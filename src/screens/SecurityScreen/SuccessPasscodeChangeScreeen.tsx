import React, { FC } from "react";
import styled from "styled-components/native";

import { TopBar } from "../../components/TopBar/TopBar";
import { scale, verticalScale } from "../../helpers/sizeConverter";
import InfoCircleIcon from "../../assets/InfoCircleIcon.svg";
import { WithSafeArea } from "../../shared/ui";

interface SuccessPasscodeChangeScreenProps {
	navigation: any;
}

// FIXME: fix naming
export const SuccessPasscodeChangeScreen: FC<SuccessPasscodeChangeScreenProps> = ({
	navigation,
}) => (
	<WithSafeArea>
		<TopBar navigation={ navigation } title={ "Passcode Lock" } backButtonTitle={ "" } />
		<Wrapper>
			<WrapperIcon>
				<InfoCircleIcon />
				<Title>New password is set successfully</Title>
			</WrapperIcon>
			<SubmitBtn
				onPress={ () => {
					navigation.push("SecurityScreen");
				} }
			>
				<SubmitTitle>Go to secutity</SubmitTitle>
			</SubmitBtn>
		</Wrapper>
	</WithSafeArea>
);

const Wrapper = styled.View`
	position: relative;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin-bottom: 15px;
	margin-left: 16px;
	margin-right: 16px;
	flex: 1;
`;

const Title = styled.Text`
	max-width: ${scale(300)}px;
	font-family: ProximaNova-Bold;
	font-size: ${scale(21)}px;
	line-height: ${verticalScale(28)}px;
	letter-spacing: ${scale(0.15)}px;
	text-align: center;
	margin-top: ${verticalScale(5)}px;
`;
const WrapperIcon = styled.View`
	margin-top: auto;
	flex-direction: column;
	align-items: center;
`;

const SubmitBtn = styled.TouchableOpacity<{
	disabled?: boolean;
}>`
	height: ${verticalScale(48)}px;
	align-items: center;
	margin-top: auto;
	width: 100%;
	justify-content: center;
	border-radius: ${scale(10)}px;
	background-color: ${({ disabled }) =>
		disabled ? "rgba(86, 106, 236, 0.5)" : "rgba(86, 106, 236, 1)"};
`;

const SubmitTitle = styled.Text`
	font-family: ProximaNova-Semibold;
	font-style: normal;
	font-weight: 600;
	font-size: ${scale(17)}px;
	line-height: ${verticalScale(20)}px;
	letter-spacing: ${scale(0.25)}px;
	color: #fff;
`;
