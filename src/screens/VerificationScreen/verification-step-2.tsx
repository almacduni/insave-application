import React, { useRef } from "react";
import styled from "styled-components/native";
import { Control, Controller } from "react-hook-form";
import { FieldValues } from "react-hook-form/dist/types/form";
import { TextInput } from "react-native";

import { scale, verticalScale } from "../../helpers/sizeConverter";
import { TextInputField } from "../../components/TextInputField/TextInputField";
import { CONTENT_WIDTH } from "../../constants/sizes";

interface IProps {
	control: Control<FieldValues>;
	currentStep: number;
}

export const VerificationStep2: React.FC<IProps> = (props) => {
	const { control, currentStep } = props;
	const activeStep = 2;
	const isFocused = activeStep === currentStep;
	const dateInputRef = useRef<TextInput>(null as TextInput | null);

	React.useEffect(() => {
		if (isFocused) {
			dateInputRef?.current?.focus();
		}
	}, [currentStep]);

	return (
		<Container contentWidth={ CONTENT_WIDTH }>
			<StepTitle>Birth date</StepTitle>
			<Controller
				control={ control }
				name="date"
				render={ ({ onChange, onBlur, value }) => (
					<TextInputField
						handleChange={ onChange }
						handleBlur={ onBlur }
						value={ value }
						inputRef={ dateInputRef }
						placeholder="Enter your date"
					/>
				) }
				rules={ {
					required: "Required",
				} }
				defaultValue=""
			/>
		</Container>
	);
};

const Container = styled.View<{contentWidth: number}>`
	width: ${({ contentWidth }) => `${contentWidth}px`}
`;

const StepTitle = styled.Text`
	margin-top: ${verticalScale(32)}px;
	margin-bottom: ${verticalScale(24)}px;
	font-weight: bold;
	font-size: ${scale(21)}px;
	line-height: ${verticalScale(28)}px;
	letter-spacing: ${scale(0.15)}px;
	color: #03061d;
`;
