import React, { FC } from "react";
import styled from "styled-components/native";

import { Direction } from "./Curtain";
import { sc } from "../../helpers/sizeConverter";
import { WIDTH, HEIGHT } from "../../constants/sizes";

interface Props {
	direction: Direction;
}

export const Handle: FC<Props> = ({ direction }) => <Line { ...{ direction } } />;

const Line = styled.View<Props>`
	position: absolute;
	z-index: 1000;
	${({ direction }) => {
		switch (direction) {
		case Direction.TO_BOTTOM:
			return `top: ${HEIGHT - sc(12)}px`;
		case Direction.TO_TOP:
			return `top: ${sc(5)}px`;
		case Direction.TO_LEFT:
			return `
          top: ${HEIGHT / 2 - sc(25)}px;
          left: ${-sc(16)}px;
          transform: rotate(90deg);
        `;
		case Direction.TO_RIGHT:
			return `
          top: ${HEIGHT / 2 - sc(25)}px;
          left: ${WIDTH - sc(34)}px;
          transform: rotate(90deg);
        `;
		}
	}}
	width: ${sc(50)}px;
	height: ${sc(4)}px;
	border-radius: ${sc(2)}px;
	align-self: center;
	background-color: rgba(3, 6, 29, 1);
`;
