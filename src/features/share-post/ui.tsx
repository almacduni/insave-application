import React, { FC, useMemo, useRef } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import Clipboard from "@react-native-clipboard/clipboard";
import styled from "styled-components/native";

import { ButtonBase } from "../../components/ButtonBase";
import { HandleIcon } from "../../components/HandleIcon/HandleIcon";
import { scale, verticalScale } from "../../helpers/sizeConverter";
import { setIsOpenSharePost, WithBottomSheet } from "../../entity/bottom-sheet";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";

export const SharePost: React.FC = () => {
	const dispatch = useAppDispatch();
	const bottomSheetRef = useRef<BottomSheet>(null);
	const { postLink } = useAppSelector(state => state.feed);
	const handleCopy = async () => {
		if (postLink) {
			Clipboard.setString(postLink);
		}
	};
	const snapPoints = useMemo(() => [10, "26%"], []);
	const toggleClose = () => {
		handleCopy();
		handleCloseSheet();
	};
	const handleCloseSheet = () => {
		bottomSheetRef.current?.forceClose();
		dispatch(setIsOpenSharePost(false));
	};

	return (
		<WithBottomSheet snapPoints={ snapPoints } handleCloseSheet={ handleCloseSheet } bottomSheetRef={ bottomSheetRef }>
			<Wrapper>
				<SwipeControllerIcon medium />
				<BottomSheetTitle>Post link</BottomSheetTitle>
				<PersonalLink onPress={ toggleClose }>
					<PersonalLinkTitle>{postLink}</PersonalLinkTitle>
				</PersonalLink>
				<ButtonBase title="Copy" onPress={ toggleClose } background={ "rgba(3, 6, 29, 1)" } />
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
	padding-bottom: 16px;
`;

const SwipeControllerIcon = styled(HandleIcon)``;

const BottomSheetTitle = styled.Text`
	font-family: ProximaNova-Semibold;
	font-size: ${scale(21)}px;
	line-height: ${verticalScale(28)}px;
	letter-spacing: ${scale(0.15)}px;
	color: #252525;
	margin-top: ${verticalScale(20)}px;
	margin-bottom: ${verticalScale(16)}px;
`;

const PersonalLink = styled.TouchableOpacity`
	margin-bottom: 40px;
`;
const PersonalLinkTitle = styled.Text`
	font-family: ProximaNova-Regular;
	font-size: ${scale(16)}px;
	line-height: ${verticalScale(20)}px;
	letter-spacing: ${scale(0.5)}px;
	color: #566aec;
`;
