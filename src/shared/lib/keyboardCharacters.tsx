import React from "react";
import styled from "styled-components/native";

import KeyboardDeleteIcon from "../../assets/keyboard-delete-icon.svg";
import { scale } from "../../helpers/sizeConverter";

export const keyboardCharacters = (withDot?: boolean) => [
	{
		id: 0,
		value: 1,
		component: () => <KeyBoardChar>1</KeyBoardChar>,
	},
	{
		id: 1,
		value: 2,
		component: () => <KeyBoardChar>2</KeyBoardChar>,
	},
	{
		id: 2,
		value: 3,
		component: () => <KeyBoardChar>3</KeyBoardChar>,
	},
	{
		id: 3,
		value: 4,
		component: () => <KeyBoardChar>4</KeyBoardChar>,
	},
	{
		id: 4,
		value: 5,
		component: () => <KeyBoardChar>5</KeyBoardChar>,
	},
	{
		id: 5,
		value: 6,
		component: () => <KeyBoardChar>6</KeyBoardChar>,
	},
	{
		id: 6,
		value: 7,
		component: () => <KeyBoardChar>7</KeyBoardChar>,
	},
	{
		id: 7,
		value: 8,
		component: () => <KeyBoardChar>8</KeyBoardChar>,
	},
	{
		id: 8,
		value: 9,
		component: () => <KeyBoardChar>9</KeyBoardChar>,
	},
	{
		id: 9,
		value: withDot ? "." : null,
		component: () => withDot ? <KeyBoardChar>.</KeyBoardChar> : <></>,
		backspace: true,
	},
	{
		id: 10,
		value: 0,
		component: () => <KeyBoardChar>0</KeyBoardChar>,
		prelast: true,
	},
	{
		id: 11,
		value: "remove",
		component: () => (
			<KeyBoardChar>
				<KeyboardDeleteIcon />
			</KeyBoardChar>
		),
		everyThird: true,
		backspace: true,
	},
];

const KeyBoardChar = styled.Text`
	font-family: ProximaNova-Regular;
	font-size: ${scale(25)}px;
	color: #03061d;
`;
