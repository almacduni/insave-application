import React, { FC } from "react";
import styled from "styled-components/native";

import { scale } from "../../../helpers/sizeConverter";

interface CircleProps {
	size: number;
	color?: string;
	children: any;
}

export const Circle: FC<CircleProps> = (props) => {
	const { size, color, children } = props;

	return <Wrapper { ...{ size, color } }>{children}</Wrapper>;
};

const Wrapper = styled.View<{ size: number; color?: string }>`
	width: ${({ size }) => scale(size)}px;
	height: ${({ size }) => scale(size)}px;
	border-radius: ${({ size }) => scale(size) / 2}px;
	background-color: ${({ color = "rgba(17, 3, 32, 0.05)" }) => color};
	display: flex;
	justify-content: center;
	align-items: center;
`;
