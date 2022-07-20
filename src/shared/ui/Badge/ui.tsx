import React, { FC } from "react";
import styled from "styled-components/native";

import { Text } from "../Text";
import { scale } from "../../../helpers/sizeConverter";
import { FontStyles, CryptoColors, Padding } from "../../model";

interface BadgeProps {
	bg?: string;
	color?: string;
	text: string;
	fontSize?: number;
	padding?: Padding;
}

export const Badge: FC<BadgeProps> = ({ padding, bg, fontSize, text, color }) => (
	<Wrapper { ...{ padding, bg } }>
		<Text size={ fontSize } fontStyle={ FontStyles.SEMI_BOLD } color={ color ?? "#fff" }>
			{text}
		</Text>
	</Wrapper>
);

const Wrapper = styled.View<{ padding?: Padding; bg?: string }>`
	padding-top: ${({ padding }) => scale(padding?.top ?? 2)}px;
	padding-right: ${({ padding }) => scale(padding?.right ?? 8)}px;
	padding-bottom: ${({ padding }) => scale(padding?.bottom ?? 2)}px;
	padding-left: ${({ padding }) => scale(padding?.left ?? 8)}px;
	background-color: ${({ bg = CryptoColors.BTC }) => bg};
	border-radius: ${scale(4)}px;
`;
