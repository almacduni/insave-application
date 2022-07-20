import React, { FC } from "react";
import styled from "styled-components/native";

import { sizeConverter as sz } from "../../helpers/sizeConverter";
import KeyboardDeleteIcon from "../../assets/keyboard-delete-icon.svg";

const keyboardCharacters = [
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
		value: null,
		component: () => <></>,
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

export const CustomKeyboard: FC<{
	onConfirmationCodeChange: any;
	onConfirmationCodeDelete: any;
}> = ({ onConfirmationCodeChange, onConfirmationCodeDelete }: any) => {
	const onPressExecutor = (value: string | null | number) => {
		switch (value) {
		case "remove":
			onConfirmationCodeDelete();

			return;
		case null:
			return;
		default:
			onConfirmationCodeChange(value);

			return;
		}
	};

	return (
		<Container>
			<KeyBoardWrapper>
				{keyboardCharacters.map((keyboard, idx) => (
					<KeyBoardButton
						key={ keyboard.id }
						prelast={ keyboard.prelast }
						everyThird={ keyboard.everyThird }
						backspace={ keyboard.backspace }
						onPress={
							() => onPressExecutor(keyboard.value)
							// keyboard.value === "remove"
							// 	? () => onConfirmationCodeDelete()
							// 	: keyboard.value === null
							// 	? () => {}
							// 	: () => onConfirmationCodeChange(keyboard.value)
						}
					>
						{keyboard.component()}
					</KeyBoardButton>
				))}
			</KeyBoardWrapper>
		</Container>
	);
};

const Container = styled.View`
	justify-content: center;
	align-items: center;
`;

const KeyBoardWrapper = styled.View`
	width: ${sz(343)}px;
	height: ${sz(250)}px;
	align-items: center;
	justify-content: space-between;
	flex-direction: row;
	flex-wrap: wrap;
`;
const KeyBoardButton = styled.TouchableOpacity<{
	backspace?: boolean;
	everyThird?: boolean;
	prelast?: boolean;
}>`
	background-color: ${({ backspace }) => (backspace ? "transparent" : "rgba(17, 3, 32, 0.05)")};
	width: ${sz(108)}px;
	height: ${sz(56)}px;
	border-radius: ${sz(10)}px;
	align-items: center;
	justify-content: center;
	margin-bottom: ${sz(8)}px;
	/*margin-right: ${({ everyThird }) => (everyThird ? 0 : sz(8))}px;*/
`;

const KeyBoardChar = styled.Text`
	font-family: ProximaNova-Regular;
	font-size: ${sz(25)}px;
	color: #03061d;
`;
