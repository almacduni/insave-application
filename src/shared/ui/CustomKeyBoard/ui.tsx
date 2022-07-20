import React, { FC } from "react";
import styled from "styled-components/native";

import { sizeConverter as sz } from "../../../helpers/sizeConverter";
import KeyboardDeleteIcon from "../../../assets/keyboard-delete-icon.svg";
import { keyboardCharacters } from "../../lib";

interface IProps {
	value: string;
	setValue: (value: string) => void;
	withDot?: boolean;
}

export const CustomKeyboard: React.FC<IProps> = (props) => {
	const { value, setValue, withDot } = props;

	function handleOnPressDelete () {
		if (value) {
			setValue(value.substring(0, value.length - 1));
		}
	}
	function handleOnPressDot () {
		if (value && value.slice(-1) !== ".") {
			setValue(`${value}.`);
		}
	}
	function handleOnPressNumber (btnValue: number | string) {
		setValue(`${value}${btnValue}`);
	}
	const onPressExecutor = (btnValue: string | null | number) => {
		switch (btnValue) {
		case "remove":
			handleOnPressDelete();

			return;
		case ".":
			handleOnPressDot();
		case null:
			return;
		default:
			handleOnPressNumber(btnValue);

			return;
		}
	};

	return (
		<Container>
			<KeyBoardWrapper>
				{keyboardCharacters(withDot).map((keyboard, idx) => (
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
