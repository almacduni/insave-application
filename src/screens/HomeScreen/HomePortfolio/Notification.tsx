import React, { FC } from "react";
import styled from "styled-components/native";

import { ButtonBase } from "../../../components/ButtonBase";
import { scale, verticalScale } from "../../../helpers/sizeConverter";

interface NotificationProps {
	navigation: any;
}

export const Notification: FC<NotificationProps> = ({ navigation }) => (
	<Container>
		<Title>Oops, it looks like there is nothing</Title>
		<ButtonContainer>
			<ButtonBase onPress={ () => navigation.navigate("Terminal") } title="Open Terminal" />
		</ButtonContainer>
	</Container>
);

const Container = styled.View`
	flex: 1;
	align-items: center;
`;

const Title = styled.Text`
	font-family: ProximaNova-Semibold;
	font-size: ${scale(36)}px;
	line-height: ${verticalScale(48)}px;
	letter-spacing: ${scale(0.25)}px;
	color: #03061d;
	margin-bottom: auto;
	margin-top: ${verticalScale(222)}px;
	text-align: center;
`;

const ButtonContainer = styled.View`
	margin-bottom: ${verticalScale(24)}px;
	font-family: ProximaNova-Bold;
	font-variant: lining-nums;
	font-size: ${scale(36)}px;
	line-height: ${verticalScale(43.875)}px;
	color: #252525;
	margin-top: ${verticalScale(114)}px;
`;
