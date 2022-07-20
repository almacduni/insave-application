import React, { FC } from "react";
import styled from "styled-components/native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

import IncreaseIcon from "../../assets/increaseIcon.svg";
import DecreaseIcon from "../../assets/decreaseIcon.svg";

type PropsType = {
	amount: number;
	setAmount: (amount: (prev: number) => number) => number;
};
export const Amount: FC<PropsType> = ({ amount, setAmount }) => (
	<Container>
		<Wrapper disabled={ amount === 1 } onPress={ () => setAmount((prev) => prev - 1) }>
			<DecreaseIcon />
		</Wrapper>
		<Header>{amount}</Header>
		<Wrapper onPress={ () => setAmount((prev) => prev + 1) }>
			<IncreaseIcon />
		</Wrapper>
	</Container>
);

const Container = styled.View`
	flex-direction: row;
	background-color: rgba(37, 37, 37, 0.05);
	align-items: center;
	justify-content: space-between;
	padding: ${wp("3.46%")}px ${wp("3.73%")}px;
	margin-top: ${wp("2.6%")}px;
	border-radius: 6px;
`;

const Wrapper = styled.TouchableOpacity``;

const Header = styled.Text`
	font-family: ProximaNova-Semibold;
	font-size: ${wp("4.6%")}px;
	font-variant: lining-nums;
	color: rgba(37, 37, 37, 0.4);
`;
