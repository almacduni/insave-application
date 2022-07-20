import React from "react";
import styled from "styled-components/native";
import { Control, Controller } from "react-hook-form";

import PlusIcon from "../../assets/icons/DarkPlus.svg";
import MinusIcon from "../../assets/icons/DarkMinus.svg";
import { verticalScale } from "../../../helpers/sizeConverter";
import { IFormData } from "../../../features/terminal-order/ui";

interface IProps {
	placeholder: string;
	name: keyof IFormData;
	control: Control<IFormData>;
	setValue: (key: keyof IFormData, value: string) => void;
	getValues: () => IFormData;
}

export const CounterField: React.FC<IProps> = (props) => {
	const { placeholder, setValue, name, control, getValues } = props;

	function handleIncreaseValue () {
		const values = getValues();
		const fieldValue = values[name];

		if (!fieldValue) {
			setValue(name, "1");

			return;
		}
		setValue(name, `${+fieldValue + 1}`);
	}
	function handleDecreaseValue () {
		const values = getValues();
		const fieldValue = values[name];

		if (!fieldValue || +fieldValue === 0) {
			return;
		}
		setValue(name, `${+fieldValue - 1}`);
	}

	return (
		<Wrapper>
			<CounterBtn onPress={ handleDecreaseValue } isRight={ false }>
				<MinusIcon />
			</CounterBtn>
			<Controller
				control={ control }
				render={ ({ onChange, onBlur, value }) => (
					<CounterTextInput
						onBlur={ onBlur }
						onChangeText={ onChange }
						value={ value }
						placeholder={ placeholder }
						keyboardType="numeric"
					/>
				) }
				name={ name }
			/>
			<CounterBtn onPress={ handleIncreaseValue } isRight={ true }>
				<PlusIcon />
			</CounterBtn>
		</Wrapper>

	);
};

const Wrapper = styled.View`
  width: 100%;
  height: ${verticalScale(48)}px;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	border: 1px solid #EAEAEA;
	border-radius: 12px;
	position: relative;
	margin-bottom: 12px;
`;

const CounterTextInput = styled.TextInput`
width: 100%;
	height: ${verticalScale(48)}px;
	padding: 0 40px;
	text-align: center;
`;

const CounterBtn = styled.TouchableOpacity<{isRight: boolean}>`
	position: absolute;
	${({ isRight }) => isRight ? "right: 10px" : "left: 10px" };
	z-index: 100;
`;
