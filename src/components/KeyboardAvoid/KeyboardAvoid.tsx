import React, { ReactNode } from "react";
import { Platform } from "react-native";
import styled from "styled-components/native";

import { KEYBOARD_VERTICAL_OFFSET } from "../../constants/sizes";

interface IProps {
	children: ReactNode;
	style?: object
	withoutHorizontalPadding?: boolean;
}

export const KeyboardAvoid: React.FC<IProps> = (props) => (
	<Container
		keyboardVerticalOffset={ Platform.OS === "ios" ? KEYBOARD_VERTICAL_OFFSET : 0 }
		behavior={ Platform.OS === "ios" ? "padding" : "height" }
		{ ...props }
		withoutHorizontalPadding={ props.withoutHorizontalPadding }
	>
		{props.children}
	</Container>
);

const Container = styled.KeyboardAvoidingView<{withoutHorizontalPadding?: boolean}>`
  flex: 1;
	height: 100%;
	padding: ${({ withoutHorizontalPadding }) => withoutHorizontalPadding ? "0" : "0 16px"};
	background-color: #fff;
`;
