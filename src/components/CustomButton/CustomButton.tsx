import React from "react";
import styled from "styled-components/native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

import { sc } from "../../helpers/sizeConverter";

type PropsType = {
	onPress: () => void;
	title: string;
	isActive: boolean;
	isLogin?: boolean;
	terminal?: boolean;
};

export const CustomButton: React.FC<PropsType> = ({
	onPress,
	title,
	isActive,
	isLogin,
	terminal,
}) => (
	<ButtonContainer onPress={ onPress } isLogin={ isLogin } isActive={ isActive }>
		{!terminal ? (
			<ButtonTextRegular isActive={ isActive }>{title}</ButtonTextRegular>
		) : (
			<ButtonTextCustom isActive={ isActive }>{title}</ButtonTextCustom>
		)}
	</ButtonContainer>
);

const ButtonContainer = styled.TouchableOpacity<{
	isActive: boolean;
	isLogin?: boolean;
}>`
	width: ${(props) => (props.isLogin ? "100%" : "auto")};
	flex: 1;
	padding: ${wp("1.86%")}px 0;
	margin: ${sc(2)}px;
	border-radius: 6px;
	${(props) => (props.isActive ? "background: #566AEC;" : "")};
	align-items: center;
	align-self: stretch;
	justify-content: center;
`;

const ButtonTextRegular = styled.Text<{ isActive: boolean }>`
	font-family: ProximaNova-Bold;
	font-size: ${wp("4.8%")}px;
	line-height: ${wp("5.6%")}px;
	color: ${(props) => (props.isActive ? "#fff" : "#03061D")};
`;

const ButtonTextCustom = styled.Text<{ isActive: boolean }>`
	font-family: ProximaNova-Bold;
	font-size: ${wp("4.8%")}px;
	line-height: ${wp("5.6%")}px;
	color: ${(props) => (props.isActive ? "#E30502" : "#252525")};
	opacity: ${(props) => (props.isActive ? 1 : 0.25)};
`;
