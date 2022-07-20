import React, { RefObject } from "react";
import { KeyboardTypeOptions, ReturnKeyTypeOptions, TextInput } from "react-native";

import { verticalScale } from "../../helpers/sizeConverter";

interface IProps {
	inputRef: RefObject<TextInput>;
	onChangeText: (text: string) => void;
	autoFocus?: boolean;
	value: string;
	maxLength: number;
	returnKeyType: ReturnKeyTypeOptions;
	keyboardType: KeyboardTypeOptions;
	onSubmitEditing: () => void;
}

export const HiddenInput: React.FC<IProps> = (props) => {
	const { inputRef } = props;

	return (
		<TextInput
			style={ { width: "1000%", height: verticalScale(50), zIndex: 1000, opacity: 0, position: "absolute" } }
			ref={ inputRef }
			blurOnSubmit={ false }
			{ ...props }/>
	);
};
