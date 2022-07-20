import React from "react";
import styled from "styled-components/native";

import { sc } from "../../helpers/sizeConverter";
import VerifiedIcon from "../../assets/VerifiedIcon.svg";
import { Title } from "./Title";

export const VerifiedStage = () => (
	<Wrapper>
		<VerifiedIcon style={ { marginRight: sc(4) } } />
		<Title color="rgba(16, 168, 121, 1)">verified</Title>
	</Wrapper>
);

const Wrapper = styled.View`
	flex-direction: row;
	align-items: center;
`;
