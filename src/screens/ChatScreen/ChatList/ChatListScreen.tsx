import React, { FC } from "react";
import styled from "styled-components/native";

import { TopBar } from "../../../components/TopBar/TopBar";
import { WIDTH } from "../../../constants/sizes";
import { ChatsList } from "./ChatsList";

export const ChatListScreen: FC<any> = ({ navigation }) => (
	<ChatWrapper behavior="position">
		<TopBar title={ "Support" } backButtonTitle={ "Back" } navigation={ navigation } />
		<ChatsList navigation={ navigation } />
	</ChatWrapper>
);

const ChatWrapper = styled.KeyboardAvoidingView`
	flex: 1;
	width: ${WIDTH}px;
	background-color: #fff;
`;
