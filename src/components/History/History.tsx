import React, { FC } from "react";
import { Pressable } from "react-native";
import Animated from "react-native-reanimated";
import styled from "styled-components/native";

import { sc } from "../../helpers/sizeConverter";
import { HistoryItem } from "../HistoryItem/HistoryItem";

interface HistoryProps {
	isHistoryOpen: Animated.SharedValue<boolean>;
	navigation: any;
}

export const History: FC<HistoryProps> = ({ navigation }) => {
	const history: any[] = [];
	const handleArrowClick = () => {
		if (history.length) {
			navigation.navigate("HistoryScreen");
		}
	};

	return (
		<Container>
			<Header>
				<Title>History</Title>

				<Pressable onPress={ handleArrowClick }>
					<PressableTitle>more</PressableTitle>
				</Pressable>
			</Header>
			<CurrentItem>
				{history.length ? (
					<HistoryItem { ...history[0].history[0] } />
				) : (
					<HistoryItem { ...history[0]?.history[0] } isEmpty={ true } navigation={ navigation } />
				)}
			</CurrentItem>
		</Container>
	);
};

const PressableTitle = styled.Text`
	font-family: ProximaNova-Regular;
	color: #566aec;
`;

const Container = styled.View`
	margin-top: ${sc(24)}px;
`;

const Header = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

const Title = styled.Text`
	font-family: "ProximaNova-Semibold";
	text-transform: uppercase;
	font-size: ${sc(14)}px;
	color: rgba(25, 25, 25, 0.4);
`;

const CurrentItem = styled.View`
	margin-top: ${sc(8)}px;
`;

