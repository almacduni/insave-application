import React, { FC } from "react";
import styled from "styled-components/native";

import { scale } from "../../helpers/sizeConverter";

type PropsType = {
	width: number;
	height: number;
	username: string | null;
	fontSize?: number;
};

export const RandomAvatar: FC<PropsType> = ({ width, height, username, fontSize }) => (
	<Circle width={ width } height={ height }>
		<UsernameLetter fontSize={ fontSize }>{username ? username.substr(0, 1) : "E"}</UsernameLetter>
	</Circle>
);

const Circle = styled.View<{ width: number; height: number }>`
	width: ${({ width }) => scale(width)};
	height: ${({ height }) => scale(height)};
	flex-direction: row;
	justify-content: center;
	border-radius: ${({ width }) => scale(width / 2)}px;
	align-items: center;
	background: #b3b4bb;
	text-transform: uppercase;
`;
const UsernameLetter = styled.Text<{ fontSize?: number }>`
	font-size: ${({ fontSize }) => (fontSize ? scale(fontSize) : scale(17))}px;
	color: #ffffff;
	font-weight: bold;
	text-transform: uppercase;
`;
