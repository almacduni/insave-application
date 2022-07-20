import React, { FC } from "react";
import styled from "styled-components/native";
import { BottomSheetHandleProps } from "@gorhom/bottom-sheet";

import { adjustHelper } from "../../helpers/adjustHelper";

type HandleProps = BottomSheetHandleProps
export const CustomDragHandler: FC<HandleProps> = () => (
	<WrapperHandler>
		<DragHandler />
	</WrapperHandler>
);

const WrapperHandler = styled.View`
	align-items: center;
	min-height: ${adjustHelper(8)}px;
	background-color: rgba(37, 37, 37, 0.06);
	border-top-right-radius: ${adjustHelper(10)}px;
	border-top-left-radius: ${adjustHelper(10)}px;
`;
const DragHandler = styled.View`
	margin: ${adjustHelper(10)}px 0;
	width: ${adjustHelper(51)}px;
	height: ${adjustHelper(4)}px;
	background-color: #ffffff;
	border-radius: ${adjustHelper(3)}px;
`;
