import styled from "styled-components/native";

export const Side = styled.View`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`;

export const SpaceBetween = styled(Side)`
	justify-content: space-between;
`;

export const Left = styled(Side)`
	justify-content: flex-start;
`;

export const Right = styled(Side)`
	justify-content: flex-end;
`;
