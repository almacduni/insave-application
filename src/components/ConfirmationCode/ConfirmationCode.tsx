import React, { FC } from "react";
import styled from "styled-components/native";

import { sizeConverter as sz } from "../../helpers/sizeConverter";
import { ConfirmationCodeType } from "../../types/commonTypes";

export const ConfirmationCode: FC<{
	codeList: ConfirmationCodeType[];
	isFailed: boolean;
}> = ({ codeList, isFailed }) => (
	<Container>
		{codeList.map((item) => (
			<ItemWrapper key={ item.id } active={ item.active } isFailed={ isFailed }>
				<Item>{item.value}</Item>
			</ItemWrapper>
		))}
	</Container>
);

const Container = styled.View`
	justify-content: space-between;
	flex-direction: row;
	flex-wrap: wrap;
	margin-bottom: ${sz(10)}px;
`;
const ItemWrapper = styled.View<{ active?: boolean; isFailed: boolean }>`
	justify-content: center;
	align-items: center;
	padding: ${sz(16)}px;
	width: ${sz(50)}px;
	height: ${sz(48)}px;
	border-width: ${sz(1)}px;
	border-color: ${({ active, isFailed }) =>
	// FIXME:
		isFailed ? "rgba(235, 0, 70, 1)" : active ? "#566AEC" : "rgba(3, 6, 29, 0.2)"};
	border-radius: ${sz(10)}px;
`;
const Item = styled.Text`
	font-family: ProximaNova-Regular;
	font-size: ${sz(16)}px;
	line-height: ${sz(20)}px;
	letter-spacing: ${sz(0.5)}px;
	color: #03061d;
`;
