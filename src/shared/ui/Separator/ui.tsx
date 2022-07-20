import styled from "styled-components/native";

export const Separator = styled.View<{
	bottom?: number;
	top?: number;
	left?: number;
	right?: number;
}>`
	margin-bottom: ${({ bottom = 0 }) => bottom}px;
	margin-top: ${({ top = 0 }) => top}px;
	margin-left: ${({ left = 0 }) => left}px;
	margin-right: ${({ right = 0 }) => right}px;

`;
