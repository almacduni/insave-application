
import React from "react";
import styled from "styled-components/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { HomeScreenContainer } from "../screens/HomeScreen/HomeScreenContainer";
import { HomeIcon } from "../components/HomeIcon/HomeIcon";
import { ChartIcon } from "../components/ChartIcon/ChartIcon";
import { FeedIcon } from "../components/FeedIcon/FeedIcon";
import { ExploreIcon } from "../components/ExploreIcon/ExploreIcon";
import { SearchScreenContainer } from "../screens/SearchScreen/SearchScreenContainer";
import { ChartScreen } from "../screens/ChartScreen/ChartScreen";
// import { ChartScreen } from "../screens/chart";
// >>>>>>> e9bab174 (temp commit)
import { scale, verticalScale } from "../helpers/sizeConverter";
import { useAppSelector } from "../hooks/useRedux";
import { FeedStack } from "../screens/FeedStack/FeedStack";

const Tab = createBottomTabNavigator();

type PropsType = {
	navigation: any;
	route: any;
};

export const onTabPress = (navigation: any, route: any, isOpenedModal: boolean) => {
	if (navigation?.isFocused?.() && !isOpenedModal) {
		route?.params?.scrollToTop();
	}
};

export const TabRouting: React.FC<PropsType> = ({ navigation, route }) => {
	const isOpenedModal = useAppSelector((state) => state.feed.isOpenedModal);
	const listenersHandler = () => onTabPress(navigation, route, isOpenedModal);

	return (
		<Tab.Navigator
			screenOptions={
				{
					"tabBarHideOnKeyboard": true,
					"tabBarActiveTintColor": "#9A9BA5",
					"tabBarItemStyle": {
						"backgroundColor": "#FFFFFF"
					},
					"tabBarStyle": [
						{
							"display": "flex"
						},
						null
					]
				}
			}
		>
			<Tab.Screen
				name="Home"
				component={ HomeScreenContainer }
				listeners={ () => ({
					tabPress: () => listenersHandler(),
				}) }
				options={ {
					tabBarLabel: ({ focused }) => <TextWrapper focused={ focused }>Home</TextWrapper>,
					tabBarIcon: ({ focused }) => (
						<Container>
							<HomeIcon focused={ focused } />
						</Container>
					),
					header: () => null
				} }
			/>
			<Tab.Screen
				name="ChartScreen"
				component={ ChartScreen }
				listeners={ () => ({
					tabPress: () => listenersHandler(),
				}) }
				options={ {
					tabBarLabel: ({ focused }) => <TextWrapper focused={ focused }>Chart</TextWrapper>,
					tabBarIcon: ({ focused }) => (
						<Container>
							<ChartIcon focused={ focused } />
						</Container>
					),
					header: () => null
				} }
			/>
			<Tab.Screen
				name="Feed"
				component={ FeedStack }
				listeners={ () => ({
					tabPress: () => listenersHandler(),
				}) }
				options={ {
					tabBarLabel: ({ focused }) => <TextWrapper focused={ focused }>Feed</TextWrapper>,
					tabBarIcon: ({ focused }) => (
						<Container>
							<FeedIcon focused={ focused } />
						</Container>
					),
					header: () => null
				} }
			/>
			<Tab.Screen
				name="Search"
				component={ SearchScreenContainer }
				listeners={ () => ({
					tabPress: () => listenersHandler(),
				}) }
				options={ {
					tabBarLabel: ({ focused }) => <TextWrapper focused={ focused }>Explore</TextWrapper>,
					tabBarIcon: ({ focused }) => (
						<Container>
							<ExploreIcon focused={ focused } />
						</Container>
					),
					header: () => null
				} }
			/>
		</Tab.Navigator>
	);
};

const TextWrapper = styled.Text<{ focused: boolean }>`
	font-family: ProximaNova-Semibold;
	font-size: ${scale(10)}px;
	line-height: ${verticalScale(16)}px;
	letter-spacing: ${scale(0.4)}px;
	margin-top: ${verticalScale(3)}px;
	margin-bottom: ${verticalScale(3)}px;
	color: ${({ focused }) => (focused ? "#03061D" : "#9A9BA5")};
`;

const Container = styled.View`
	font-family: ProximaNova-Semibold;
	font-size: ${scale(8)}px;
	line-height: ${verticalScale(9)}px;
	margin-top: ${verticalScale(6)}px;
`;
