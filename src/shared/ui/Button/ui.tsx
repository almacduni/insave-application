import React, { FC } from "react";
import styled from "styled-components/native";

import { Text } from "../Text";
import { scale, verticalScale } from "../../../helpers/sizeConverter";
import { FontStyles, IButtonColors, ISize, SizeType } from "../../model";

interface ButtonProps {
	text: string;
	disabled?: boolean;
	size?: ISize;
	colors?: IButtonColors;
	onPress?: () => void;
}

const defaultSize: ISize = {
	width: "100%",
	height: "auto",
	fontSize: 17,
};

const defaultColors: IButtonColors = {
	text: "#fff",
	background: "#566aec",
	disabledBackground: "rgba(86, 106, 236, 0.5)",
};

export const Button: FC<ButtonProps> = (props) => {
	const { text, disabled, onPress } = props;

	const colors = React.useMemo(() => ({ ...defaultColors, ...props.colors }), [props.colors]);
	const size = React.useMemo(() => ({ ...defaultSize, ...props.size }), [props.size]);

	return (
		<Wrapper
			width={ size.width }
			height={ size.height }
			disabled={ disabled }
			background={ colors.background }
			disabledBackground={ colors.disabledBackground }
			onPress={ onPress }
		>
			<Title
				size={ size.fontSize }
				color={ colors.text }
				fontStyle={ FontStyles.SEMI_BOLD }
			>
				{text}
			</Title>
		</Wrapper>
	);
};

const Wrapper = styled.TouchableOpacity<{
	disabled: boolean,
	width: SizeType,
	height: SizeType,
	background: string,
	disabledBackground: string,
} & any>`
	width: ${({ width }) => typeof width === "number" ? scale(width) : width};
	height: ${({ height }) => typeof height === "number" ? verticalScale(height) : height};
	background: ${({ disabled, background, disabledBackground }) => (disabled ? disabledBackground : background)};
	border-radius: ${scale(10)}px;
	padding: ${verticalScale(14)}px 0;
	align-items: center;
	justify-content: center;
`;
const Title = styled(Text)`
	line-height: ${verticalScale(20)}px;
	letter-spacing: ${scale(0.25)}px;
`;
