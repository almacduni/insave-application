import React from "react";
import styled from "styled-components/native";
import { scale } from "../../helpers/sizeConverter";

export const Loader = () => (
	<LoaderBox>
		<Indicator size="small" color="#000" />
	</LoaderBox>
);

const LoaderBox = styled.View`
	width: 100%;
	padding: ${scale(5)}px 0;
`;

const Indicator = styled.ActivityIndicator`
	padding: ${scale(5)}px;
	background-color: #fff;
	width: ${scale(32)}px;
	height: ${scale(32)}px;
	margin: 0 auto;
	border-radius: ${scale(16)}px;
	elevation: 2;
`;
