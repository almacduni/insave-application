import React from "react";
import styled from "styled-components/native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

import { scale, verticalScale } from "../../helpers/sizeConverter";
import SuccessfullyIcon from "../../assets/SuccessfullyIcon.svg";

export const SuccessVerificationScreen: React.FC = ({ navigation }: any) => (
	<Container>
		<HeaderBlock>
			<BackTitle>Verification</BackTitle>
		</HeaderBlock>
		<SuccessfullContent>
			<SuccessfullyIcon />
			<SuccessFullyTitle>Your form is successfully submitted</SuccessFullyTitle>
		</SuccessfullContent>
		<SubmitBtn onPress={ () => navigation.navigate("Account") }>
			<SubmitTitle primary>Go to account</SubmitTitle>
		</SubmitBtn>
	</Container>
);

const Container = styled.View`
	background: #ffffff;
	height: 100%;
	padding: ${wp("2.13%")}px 16px 0 16px;
`;

const BackTitle = styled.Text`
	font-family: ProximaNova-Semibold;
	font-size: ${scale(16)}px;
	left: ${scale(70)}px;
	position: absolute;
	transform: translateY(2px);
	margin-left: ${scale(59)}px;
`;

const HeaderBlock = styled.View`
	align-items: center;
	flex-direction: row;
	margin-top: ${verticalScale(12)}px;
	margin-bottom: ${wp("2.6%")}px;
`;

const SuccessfullContent = styled.View`
	padding-top: 230px;
	flex-direction: column;
	align-items: center;
	max-width: ${scale(292)}px;
	margin: 0 auto;
`;

const SuccessFullyTitle = styled.Text`
	font-family: Proxima Nova;
	font-weight: bold;
	font-size: ${scale(21)}px;
	line-height: ${verticalScale(28)}px;
	display: flex;
	align-items: center;
	text-align: center;
	letter-spacing: 0.15px;
	color: #03061d;
`;

const ButtonWrapper = styled.Text`
	font-family: ProximaNova-Semibold;
	font-style: normal;
	font-weight: 600;
	font-size: ${scale(17)}px;
	line-height: ${scale(20)}px;
	letter-spacing: ${scale(0.25)}px;
	color: rgba(3, 6, 29, 0.4);
`;

const SubmitBtn = styled.TouchableOpacity`
	height: ${verticalScale(48)}px;
	align-items: center;
	justify-content: center;
	border-radius: ${scale(10)}px;
	background-color: #566aec;
	margin-bottom: ${verticalScale(16)}px;
	margin-top: auto;
`;

const SubmitTitle = styled(ButtonWrapper)<{
	primary?: boolean;
	secondary?: boolean;
}>`
	/* FIXME: */
	color: ${({ primary, secondary }) => (primary ? "#FFFFFF" : secondary ? "#03061D" : "#000000")};
`;
