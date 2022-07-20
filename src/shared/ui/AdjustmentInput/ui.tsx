import * as React from "react";
import styled from "styled-components/native";
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";

import { FontProp, FontStyles, Fonts } from "../../model";
import DarkPlusIcon from "../../assets/icons/DarkPlus.svg";
import DarkMinusIcon from "../../assets/icons/DarkMinus.svg";
import { scale } from "../../../helpers/sizeConverter";

export interface IAdjusmentInputProp {
	background?: string;
	borderRadius?: number;
	font?: FontProp;
	placeholder: string;
	onChangeValue?: (value: number) => void;
}

const defaultFont: FontProp = {
	size: 16,
	style: FontStyles.REGULAR,
	family: Fonts.PROXIMA,
};

export const AdjustmentInput: React.FC<IAdjusmentInputProp> = (props) => {
	const {
		background = "#f5f5f5",
		font = defaultFont,
		borderRadius = 4,
		placeholder,
		onChangeValue,
	} = props;

	const [value, setValue] = React.useState("");

	React.useEffect(() => {
		if (onChangeValue) onChangeValue(+value);
	}, [value]);

	function incrementValue () {
		setValue(`${+value + 1}`);
	}

	function decrementValue () {
		if (+value > 0) setValue(`${+value - 1}`);
		if (+value === 1) setValue("");
	}

	return (
		<Wrapper background={ background } borderRadius={ borderRadius }>
			<AdjustButton onPress={ decrementValue }>
				<DarkMinusIcon width={ 14 }/>
			</AdjustButton>
			<Input
				keyboardType="decimal-pad"
				value={ value }
				font={ font }
				onChangeText = { (text) => setValue(text) }
				placeholder={ placeholder }
			/>
			<AdjustButton onPress={ incrementValue }>
				<DarkPlusIcon width={ 19 } />
			</AdjustButton>
		</Wrapper>
	);
};

const Wrapper = styled.View<{ background: string, borderRadius: number }>`
  flex-direction: row;
  justify-content: space-between;
	align-items: center;
	background-color: ${({ background }) => background};
	border-radius: ${({ borderRadius }) => borderRadius}px;
  padding: 0 6px;
`;

const Input = styled.TextInput<{ font: FontProp }>`
	flex: 1;
	text-align: center;
	font-family: ${({ font: { family, style } }) => `${family}-${style}`};
	font-size: ${({ font: { size } }) => scale(size || 14)}px;
	margin: 0 10px;
`;

const AdjustButton = styled.TouchableOpacity`
	width: 20px;
`;
