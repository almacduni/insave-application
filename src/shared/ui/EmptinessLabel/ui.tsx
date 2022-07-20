import * as React from "react";
import styled from "styled-components/native";

import AlertIcon from "../../../assets/alertIcon.svg";
import { Text } from "../Text";

interface EmptinessLabelProps {
	text: string;
}

export const EmptinessLabel: React.FC<EmptinessLabelProps> = (props) => {
	const { text } = props;

	return (
		<Wrapper>
			<AlertIcon />
			<Text color={ "#979797" } size={ 17 }>
				{text}
			</Text>
		</Wrapper>
	);
};

const Wrapper = styled.View`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;
