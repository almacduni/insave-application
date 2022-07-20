import React, { FC } from "react";
import { TextProps as AdditionalTextProps } from "react-native";
import styled from "styled-components/native";

import { scale } from "../../../helpers/sizeConverter";
import { Fonts, FontStyles } from "../../model";

interface TextProps extends AdditionalTextProps {
	children: any;
	size?: number;
	color?: string;
	fontStyle?: FontStyles;
	font?: Fonts;
}

export const Text: FC<TextProps> = (props) => {
	const { size, color, fontStyle, font, children, ...other } = props;

	return <Wrapper { ...{ size, color, fontStyle, font, ...other } }>{children}</Wrapper>;
};

const Wrapper = styled.Text<
{ size?: number; color?: string; fontStyle?: string; font?: string } & any
>`
	font-family: ${({ font = Fonts.PROXIMA, fontStyle = FontStyles.REGULAR }) =>
		`${font}-${fontStyle}`};
	font-size: ${({ size = 14 }) => scale(size)}px;
	color: ${({ color = "#03061D" }) => color};
`;
