import React, { FC } from "react";
import styled from "styled-components/native";

import { verticalScale } from "../../../helpers/sizeConverter";
import ArrowRight from "../../../assets/ArrowRight.svg";
import { Side } from "../Side";
import { Circle } from "../Circle";
import { Text } from "../Text";
import { FontStyles } from "../../model";

interface ListItemButtonProps {
	colors?: {
		text?: string;
		circle?: string;
	};
	text?: string;
	data?: {
		icon?: any;
		left?: any;
		right?: any;
	};
	onPress?: () => void;
}

export const ListItemButton: FC<ListItemButtonProps> = (props) => {
	const { colors, text, data, onPress } = props;

	return (
		<Wrapper onPress={ onPress }>
			<Side.Left>
				<Circle size={ 48 } color={ colors?.circle }>
					{data?.icon}
				</Circle>
				<TextWrapper>
					<Text size={ 17 } color={ colors?.text } fontStyle={ FontStyles.SEMI_BOLD }>
						{text}
					</Text>
				</TextWrapper>
				{data?.left}
			</Side.Left>
			<Side.Right>
				{data?.right}
				<ArrowRight />
			</Side.Right>
		</Wrapper>
	);
};

const Wrapper = styled.TouchableOpacity`
	width: 100%;
	padding: ${verticalScale(8)}px 0;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

const TextWrapper = styled.View`
	margin-left: 16px;
`;
