import * as React from "react";
import styled from "styled-components/native";

export const LoadIndicator: React.FC = () => (
	<LoaderWrapper>
		<Loader color={ "#03061D" } />
	</LoaderWrapper>
);

const Loader = styled.ActivityIndicator``;

const LoaderWrapper = styled.View`
	width: 30px;
	height: 30px;
	border-radius: 15px;
	display: flex;
	align-items: center;
	justify-content: center;
	elevation: 5;
	background-color: #fff;
	margin: 6px auto;
`;
