import React, { FC } from "react";
import styled from "styled-components/native";

import { Text } from "../Text";
import { scale, verticalScale } from "../../../helpers/sizeConverter";
import CheckboxIcon from "../../../assets/checkbox-arrow-icon.svg";

interface CheckBoxProps {
	isChecked?: boolean;
	onPress: () => void;
	label?: string;
}

export const CheckBox: FC<CheckBoxProps> = (props) => {
	const { isChecked, label, onPress } = props;

	return (
		<Wrapper onPress={ onPress }>
			<CheckboxContainer>
				<Checkbox isChecked={ isChecked }>
					<CheckboxIcon />
				</Checkbox>
				{label ? <Label>{label}</Label> : <></>}
			</CheckboxContainer>
		</Wrapper>
	);
};

const Wrapper = styled.TouchableWithoutFeedback``;

const CheckboxContainer = styled.View`
	flex-direction: row;
`;

const Checkbox = styled.View<{ isChecked?: boolean }>`
	width: ${scale(22)}px;
	height: ${scale(22)}px;
	border-width: ${1}px;
	border-color: ${({ isChecked }) => (isChecked ? "#fff" : "rgba(3, 6, 29, 0.2)")};
	align-items: center;
	justify-content: center;
	margin-right: ${scale(8)}px;
	border-radius: ${scale(4)}px;
	background-color: ${({ isChecked }) => (isChecked ? "#566AEC" : "#fff")};
`;
const Label = styled(Text)`
	line-height: ${verticalScale(20)}px;
	letter-spacing: ${scale(0.25)}px;
	color: #9a9ba5;
`;
