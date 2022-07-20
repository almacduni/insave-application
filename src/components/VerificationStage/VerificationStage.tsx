import React, { FC } from "react";
import styled from "styled-components/native";

import { sc } from "../../helpers/sizeConverter";
import { CheckStage } from "./CheckStage";
import { VerifiedStage } from "./VerifiedStage";

const stages = {
	1: <CheckStage />,
	2: <VerifiedStage />,
};

export const VerificationStage: FC = () => {
	const stage = stages[2];

	return <Wrapper>{stage}</Wrapper>;
};

const Wrapper = styled.View`
	margin-right: ${sc(18)}px;
`;
