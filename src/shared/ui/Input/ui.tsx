import React, { FC, useState } from "react";
import styled from "styled-components/native";
import { TextInputProps } from "react-native";

import { Fonts, FontStyles, Padding } from "../../model";
import { scale } from "../../../helpers/sizeConverter";

interface InputProps extends TextInputProps {
	fontSize?: number;
	padding?: Padding;
	error?: boolean;
	width?: number;
}

export const Input: FC<InputProps> = (props) => {
	const [isFocused, setIsFocused] = useState(false);

	return (
		<InputBox
			{ ...{ ...props, isFocused } }
			selectionColor="rgba(86, 106, 236, 1)"
			onFocus={ () => setIsFocused(true) }
			onBlur={ () => {
				setIsFocused(false);
			} }
		/>
	);
};

const InputBox = styled.TextInput<any>`
	font-family: ${Fonts.PROXIMA}-${FontStyles.REGULAR};
	width: ${({ width }) => (width ? scale(width) + "px" : "100%")};
	border-radius: ${scale(10)}px;
	border-width: ${1}px;
	border-color: ${({ error, isFocused }) => {
		if (error) {
			return "#EB0046";
		} else if (isFocused) {
			return "rgba(86, 106, 236, 1)";
		} else {
			return "rgba(3, 6, 29, 0.2)";
		}
	}};
	padding: 14px 16px;
	color: ${({ error }) => (error ? "#EB0046" : "#03061D")};
	font-size: ${scale(16)}px;
	line-height: ${scale(20)}px;
	letter-spacing: ${scale(0.5)}px;
`;
