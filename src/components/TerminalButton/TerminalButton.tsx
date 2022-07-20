import React from "react";
import styled from "styled-components/native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

type PropsType = {
	onPress: () => void;
	title: string;
	isSell?: boolean;
};

export const TerminalButton: React.FC<PropsType> = ({ onPress, title, isSell }) => (
	<ButtonContainer onPress={ onPress } isSell={ isSell }>
		<ButtonText>{title}</ButtonText>
	</ButtonContainer>
);

const ButtonContainer = styled.TouchableOpacity<{ isSell?: boolean }>`
	width: 100%;
	padding: ${wp("1.86%")}px 0;
	margin-top: ${wp("4%")}px;
	border-radius: ${wp("1.6%")}px;
	background: ${(props) => (props.isSell ? "#E30502" : "#344CD3")};
	align-items: center;
	justify-content: center;
	align-self: stretch;
`;
const ButtonText = styled.Text`
	font-family: ProximaNova-Bold;
	font-size: ${wp("4.8%")}px;
	line-height: ${wp("5.6%")}px;
	color: #ffffff;
`;
