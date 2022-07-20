import React from "react";
import styled from "styled-components/native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

import { adjustHelper } from "../../helpers/adjustHelper";

export const ModalReport = ({ navigation }: any) => (
	<Container>
		<ModalWrapper>
			<ButtonWrapper isTopAlign>
				<Title>Report post</Title>
			</ButtonWrapper>
			<ButtonWrapper onPress={ () => navigation.goBack() }>
				<Title isRed>Cancel</Title>
			</ButtonWrapper>
		</ModalWrapper>
	</Container>
);

const Container = styled.View`
	flex: 1;
	padding: 0 16px;
	justify-content: center;
	align-items: center;
	background-color: rgba(0, 0, 0, 0.3);
`;
const ModalWrapper = styled.View`
	width: 100%;
	background-color: #ffffff;
	border-radius: ${adjustHelper(10)}px;
`;
const Title = styled.Text<{ isRed?: boolean }>`
	color: ${({ isRed }) => (isRed ? "#E30502" : "#252525")};
	font-family: ProximaNova-SemiBold;
	font-size: ${wp("4.53%")}px;
	line-height: ${wp("5.86%")}px;
	font-variant: lining-nums;
`;
const ButtonWrapper = styled.TouchableOpacity<{ isTopAlign?: boolean }>`
	flex: 1;
	padding: ${({ isTopAlign }) =>
		isTopAlign ? ` ${wp("5.3%")}px 0  ${wp("3.2%")}px 0` : ` ${wp("3.2%")}px 0  ${wp("5.3%")}px 0`};
	justify-content: center;
	align-items: center;
	border-top-color: #252525;
	border-top-width: ${adjustHelper(0.1)}px;
	${({ isTopAlign }) =>
		isTopAlign
			? `border-bottom-color: #252525; border-bottom-width:  ${adjustHelper(0.05)}px`
			: `border-top-color: #252525; border-top-width:  ${adjustHelper(0.05)}px`}
`;
