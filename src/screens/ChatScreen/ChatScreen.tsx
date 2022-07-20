import React, { FC } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import styled from "styled-components/native";
import { StatusBar } from "react-native";

import { ChatListScreen } from "./ChatList/ChatListScreen";
import { MessagesScreen } from "./Messages/MessagesScreen";
import { ImageGallery } from "./ImageGallery";

const Stack = createStackNavigator();

export const ChatScreen: FC<any> = () => (
	<Wrapper>
		<StatusBar backgroundColor={ "#fff" } barStyle={ "dark-content" } />
		<Stack.Navigator
			initialRouteName={ "ChatListScreen" }
			screenOptions={ {
				headerShown: false,
			} }
		>
			<Stack.Screen name="ChatListScreen" component={ ChatListScreen } />
			<Stack.Screen name="MessageScreen" component={ MessagesScreen } />
			<Stack.Screen name="ImagesScreen" component={ ImageGallery } />
		</Stack.Navigator>
	</Wrapper>
);

const Wrapper = styled.View`
	background-color: #fff;
	flex: 1;
`;
