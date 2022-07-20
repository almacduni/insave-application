import styled from "styled-components/native";

import { sc } from "../../helpers/sizeConverter";

export const Title = styled.Text<{
	color: string;
}>`
	font-family: ProximaNova-Regular;
	font-size: ${sc(16)}px;
	letter-spacing: ${sc(0.5)}px;
	line-height: ${sc(20)}px;
	color: ${({ color }) => color};
`;
