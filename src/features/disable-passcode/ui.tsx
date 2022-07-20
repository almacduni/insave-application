import React, { FC, useMemo, useRef } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import styled from "styled-components/native";

import { HandleIcon } from "../../components/HandleIcon/HandleIcon";
import { scale, sizeConverter as sc, verticalScale } from "../../helpers/sizeConverter";
import { Button } from "../../components/Button/Button";
import { WithBottomSheet } from "../../entity/bottom-sheet";

interface IProps {
	setIsOpenSheet: (isOpenSheet: boolean) => void;
	handleDisableCode: () => void;
}
export const DisablePasscode: FC<IProps> = (props) => {
	const { setIsOpenSheet, handleDisableCode } = props;
	const bottomSheetRef = useRef<BottomSheet>(null);
	const snapPoints = useMemo(() => [10, sc(190)], []);

	const handleCloseSheet = async () => {
		bottomSheetRef.current?.forceClose();
		setIsOpenSheet(false);
	};

	const handlePressOnClose = () => {
		handleCloseSheet();
		handleDisableCode();
	};

	return (
		<WithBottomSheet handleCloseSheet={ handleCloseSheet } snapPoints={ snapPoints }bottomSheetRef={ bottomSheetRef }>
			<Wrapper>
				<HandleWrapper>
					<HandleIcon medium />
				</HandleWrapper>
				<Items>
					<ItemWrapper>
						<Button
							title="Turn passcode Off"
							color="rgba(235, 0, 70, 1)"
							bgColor="rgba(235, 0, 70, 0.07)"
							onPress={ handlePressOnClose }
						/>
					</ItemWrapper>
					<ItemWrapper>
						<Button title="Cancel" onPress={ handleCloseSheet } />
					</ItemWrapper>
				</Items>
			</Wrapper>
		</WithBottomSheet>
	);
};

const Wrapper = styled.View`
	flex: 1;
	overflow: hidden;
	background-color: #ffffff;
	border-top-left-radius: ${scale(10)}px;
	border-top-right-radius: ${scale(10)}px;
	align-items: center;
	padding-top: 6px;
	padding: 10px 16px;
`;

const Items = styled.View`
	width: 100%;
	margin-top: ${verticalScale(24)}px;
`;

const ItemWrapper = styled.View`
	width: 100%;
	margin-bottom: ${verticalScale(8)}px;
`;

const HandleWrapper = styled.View`
	margin-top: ${verticalScale(5)}px;
	margin-bottom: ${verticalScale(5)}px;
	align-items: center;
`;
