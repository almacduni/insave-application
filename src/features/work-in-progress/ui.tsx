import React, { FC, useMemo, useRef } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import styled from "styled-components/native";

import { ButtonBase } from "../../components/ButtonBase";
import { HandleIcon } from "../../components/HandleIcon/HandleIcon";
import { scale, verticalScale } from "../../helpers/sizeConverter";
import { useAppDispatch } from "../../hooks/useRedux";
import { WithBottomSheet, setIsOpenWorkInProgress } from "../../entity/bottom-sheet";

export const WorkInProgress: FC = () => {
	const bottomSheetRef = useRef<BottomSheet>(null);
	const dispatch = useAppDispatch();
	const snapPoints = useMemo(() => [10, verticalScale(150)], []);
	const handleCloseSheet = () => {
		dispatch(setIsOpenWorkInProgress(false));
		bottomSheetRef.current?.forceClose();
	};

	return (
		<WithBottomSheet bottomSheetRef={ bottomSheetRef } snapPoints={ snapPoints } handleCloseSheet={ handleCloseSheet }>
			<Wrapper>
				<SwipeControllerIcon />
				<BottomSheetTitle>Waaaaaaaaaaait!</BottomSheetTitle>
				<ButtonBase title="okay" onPress={ handleCloseSheet } />
			</Wrapper>
		</WithBottomSheet>
	);
};

const Wrapper = styled.View`
	background-color: #ffffff;
	border-top-left-radius: ${scale(10)}px;
	border-top-right-radius: ${scale(10)}px;
	align-items: center;
	padding-top: ${verticalScale(6)}px;
`;

const SwipeControllerIcon = styled(HandleIcon)``;

const BottomSheetTitle = styled.Text`
	font-family: ProximaNova-Semibold;
	font-size: ${scale(21)}px;
	line-height: ${verticalScale(28)}px;
	letter-spacing: ${scale(0.15)}px;
	color: #252525;
	margin-top: ${verticalScale(20)}px;
	margin-bottom: ${verticalScale(24)}px;
`;
