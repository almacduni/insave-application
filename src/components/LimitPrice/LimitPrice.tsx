import React, { FC, useState } from "react";
import styled from "styled-components/native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

import IncreaseIcon from "../../assets/increaseIcon.svg";
import DecreaseIcon from "../../assets/decreaseIcon.svg";
import { adjustHelper } from "../../helpers/adjustHelper";

type PropsType = {
	walletValue: number;
};

export const LimitPrice: FC<PropsType> = ({ walletValue }) => {
	const [value, setValue] = useState(walletValue);

	return (
		<Container>
			<DecreaseIcon onPress={ () => setValue((prev) => prev - 0.01) } />
			<Header>{value.toFixed(2)}</Header>
			<IncreaseIcon onPress={ () => setValue((prev) => prev + 0.01) } />
		</Container>
	);
};

const Container = styled.View`
	flex-direction: row;
	background-color: rgba(37, 37, 37, 0.05);
	align-items: center;
	justify-content: space-between;
	padding: ${wp("3.46%")}px ${wp("3.7%")}px;
	margin-top: ${wp("2.6%")}px;
	border-radius: ${adjustHelper(6)}px;
`;
const Header = styled.Text`
	font-family: Raleway-Medium;
	font-size: ${wp("4.8%")}px;
	font-variant: lining-nums;
	color: rgba(37, 37, 37, 0.4);
`;
