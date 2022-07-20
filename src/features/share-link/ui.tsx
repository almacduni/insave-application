import React, { FC, useMemo, useRef } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import Clipboard from "@react-native-clipboard/clipboard";
import styled from "styled-components/native";

import { ButtonBase } from "../../components/ButtonBase";
import { HandleIcon } from "../../components/HandleIcon/HandleIcon";
import { scale, verticalScale } from "../../helpers/sizeConverter";
import { WithBottomSheet } from "../../entity/bottom-sheet";

type PropsType = {
	onCopy: () => void;
	title: string;
	name: string;
	setIsOpenSheet?: (isOpenSheet: boolean) => void;
	action?: () => void;
};

export const ShareLink: FC<PropsType> = (props) => {
	const { title, name, onCopy, setIsOpenSheet } = props;
	const bottomSheetRef = useRef<BottomSheet>(null);
	const handleCopy = () => {
		onCopy();
		Clipboard.setString(title);
	};

	const snapPoints = useMemo(() => [10, verticalScale(230)], []);
	const toggleClose = () => {
		handleCopy();
		handleCloseSheet();
	};
	const handleCloseSheet = () => {
		bottomSheetRef.current?.forceClose();
		if (setIsOpenSheet) {
			setIsOpenSheet(false);
		}
	};

	return (
		<WithBottomSheet snapPoints={ snapPoints } handleCloseSheet={ handleCloseSheet } bottomSheetRef={ bottomSheetRef }>
			<Wrapper>
				<SwipeControllerIcon medium />
				<BottomSheetTitle>{name}</BottomSheetTitle>
				<PersonalLink onPress={ toggleClose }>
					<PersonalLinkTitle>{title}</PersonalLinkTitle>
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
