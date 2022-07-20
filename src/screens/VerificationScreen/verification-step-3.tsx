import React, { useRef } from "react";
import { Control, Controller } from "react-hook-form";
import { FieldValues } from "react-hook-form/dist/types/form";
import styled from "styled-components/native";
import { TextInput } from "react-native";

import { scale, verticalScale } from "../../helpers/sizeConverter";
import { TextInputField } from "../../components/TextInputField/TextInputField";
import { CONTENT_WIDTH } from "../../constants/sizes";

interface IProps {
	control: Control<FieldValues>;
	currentStep: number;
}

export const VerificationStep3: React.FC<IProps> = (props) => {
	const { control, currentStep } = props;
	const addressInputRef = useRef<TextInput>(null as TextInput | null);
	const activeStep = 3;
	const isFocused = currentStep === activeStep;

	React.useEffect(() => {
		if (isFocused) {
			addressInputRef?.current?.focus();
		}
	}, [currentStep]);

	return (
		<Container contentWidth={ CONTENT_WIDTH }>
			<StepTitle>Address</StepTitle>
			<Controller
				control={ control }
				name="streetAddress"
				render={ ({ onChange, onBlur, value }) => (
					<TextInputField
						handleChange={ onChange }
						handleBlur={ onBlur }
						value={ value }
						inputRef={ addressInputRef }
						placeholder="Street Address"
					/>
				) }
				rules={ {
					required: "Required",
				} }
				defaultValue=""
			/>
			<Controller
				control={ control }
				name="postalCode"
				render={ ({ onChange, onBlur, value }) => (
					<TextInputField
						handleChange={ onChange }
						handleBlur={ onBlur }
						value={ value }
						placeholder="Postal code"
					/>
				) }
				rules={ {
					required: "Required",
				} }
				defaultValue=""
			/>
			<Controller
				control={ control }
				name="city"
				render={ ({ onChange, onBlur, value }) => (
					<TextInputField
						handleChange={ onChange }
						handleBlur={ onBlur }
						value={ value }
						placeholder="City"
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
