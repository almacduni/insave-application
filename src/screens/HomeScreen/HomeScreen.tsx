import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView } from "react-native";
import styled from "styled-components/native";
import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack";

import { CustomButton } from "../../components/CustomButton/CustomButton";
import { HomeHeader } from "../../components/HomeHeader";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { HomeWallet } from "./HomeWallet";
import { scale } from "../../helpers/sizeConverter";
import { HomePortfolio } from "./HomePortfolio/HomePortfolio";
import { RootStackParamList } from "../../routes/Routing";
import { fetchHistory, fetchPortfolio, fetchUserBalance } from "../../redux/userSlice";
import { CustomStatusBar } from "../../processes";

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

const Stack = createStackNavigator();

type HomeScreenPropsType = {
	navigation: ProfileScreenNavigationProp;
};

export const HomeScreen: React.FC<HomeScreenPropsType> = ({ navigation }) => {
	const [focusedWallet, setFocusedWallet] = useState(true);
	const [focusedPortfolio, setFocusedPortfolio] = useState(false);
	const userId = useAppSelector((state) => state.user.userId);
	const dispatch = useAppDispatch();

	const toggleWallet = () => {
		navigation.navigate("Wallet");
		setFocusedWallet(true);
		setFocusedPortfolio(false);
	};

	const togglePortfolio = () => {
		navigation.navigate("Portfolio");
		setFocusedWallet(false);
		setFocusedPortfolio(true);
	};

	useEffect(() => {
		if (userId) {
			dispatch(fetchPortfolio(userId));
			dispatch(fetchUserBalance(userId));
			dispatch(fetchHistory(userId));
		}
	}, [userId]);

	return (
		<Container>
			{/* <CustomStatusBar backgroundColor="transparent"translucent /> */}
			<ScrollView contentContainerStyle={ contentContainerStyle.content }>
				<HomeHeader navigation={ navigation } />
				<ButtonGroup>
					<CustomButton onPress={ () => toggleWallet() } title="Wallet" isActive={ focusedWallet } />
					<CustomButton
						onPress={ () => togglePortfolio() }
						title="Portfolio"
						isActive={ focusedPortfolio }
					/>
				</ButtonGroup>
				<Stack.Navigator
					screenOptions={ {
						headerShown: false,
						animationEnabled: false,
					} }
				>
					<Stack.Screen name="Wallet" component={ HomeWallet } />
					<Stack.Screen name="Portfolio" component={ HomePortfolio } />
				</Stack.Navigator>
			</ScrollView>
		</Container>
	);
};

const contentContainerStyle = StyleSheet.create({
	content: {
		flexGrow: 1,
	},
});

const Container = styled.View`
	margin: 10px 16px 0 16px;
	height: 100%;
	/* padding-top: 25px; */
`;
const ButtonGroup = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin: ${scale(24)}px 0;
	background-color: rgba(17, 3, 32, 0.05);
	border-radius: ${scale(10)}px;
`;
