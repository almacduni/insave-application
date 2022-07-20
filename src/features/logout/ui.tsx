import React, { FC, useMemo, useRef } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

import { HandleIcon } from "../../components/HandleIcon/HandleIcon";
import { scale, sizeConverter as sz, verticalScale } from "../../helpers/sizeConverter";
import { WithBottomSheet } from "../../entity/bottom-sheet";
import { useAppDispatch } from "../../hooks/useRedux";
import { logOut, setStatusLogin } from "../../redux/userSlice";

interface IProps {
	setIsOpenSheet: (isOpenSheet: boolean) => void;
}

export const LogOut: FC<IProps> = (props) => {
	const { setIsOpenSheet } = props;
	const bottomSheetRef = useRef<BottomSheet>(null);
	const dispatch = useAppDispatch();
	const navigation = useNavigation();
	const snapPoints = useMemo(() => [10, sz(230)], []);

	function handleLogOut () {
		dispatch(logOut());
		dispatch(setStatusLogin(false));
		handleCloseSheet();
		navigation.navigate("TabRouting");
	}

	function handleCloseSheet () {
		bottomSheetRef.current?.forceClose();
		setIsOpenSheet(false);
	}

	return (
		<WithBottomSheet snapPoints={ snapPoints } handleCloseSheet={ handleCloseSheet } bottomSheetRef={ bottomSheetRef }>
			<Wrapper>
				<SwipeControllerIcon medium />
				<BottomSheetTitle>Are you sure you want to log out?</BottomSheetTitle>
				<LogOutTitle>
					The password will be reset and you will have to install a new one
				</LogOutTitle>

				<ButtonLogOut onPress={ handleLogOut }>
					<ButtonLogOutText>Log out</ButtonLogOutText>
				</ButtonLogOut>
				<ButtonCancel onPress={ handleCloseSheet }>
					<ButtonCancelTitle>Cancel</ButtonCancelTitle>
				</ButtonCancel>
			</Wrapper>
		</WithBottomSheet>

	);
};

const Wrapper = styled.View`
	flex: 1;
	background-color: #ffffff;
	border-top-left-radius: ${scale(10)}px;
	border-top-right-radius: ${scale(10)}px;
	align-items: center;
	padding-top: ${sz(6)}px;
	padding-bottom: ${16}px;
`;

const SwipeControllerIcon = styled(HandleIcon)``;

const BottomSheetTitle = styled.Text`
	font-family: ProximaNova-Semibold;
	font-size: ${scale(17)}px;
	line-height: ${verticalScale(20)}px;
	text-align: center;
	letter-spacing: 0.25px;
	color: #03061d;
	margin-top: 24px;
	margin-bottom: 16px;
`;

const LogOutTitle = styled.Text`
	font-family: Proxima Nova;
	font-size: ${scale(14)}px;
	line-height: ${verticalScale(20)}px;
	text-align: center;
	letter-spacing: 0.25px;
	color: #03061d;
	margin: 0 16px 20px 16px;
`;

const ButtonLogOut = styled.TouchableOpacity`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: 10px;
	width: ${scale(343)}px;
	height: ${verticalScale(48)}px;

	display: flex;
	align-items: center;
	text-align: center;
	margin: 0px 10px;
	background: rgba(235, 0, 70, 0.07);
	border-radius: ${scale(10)}px;
`;

const ButtonLogOutText = styled.Text`
	font-family: ProximaNova-Semibold;
	font-size: ${scale(17)}px;
	color: #eb0046;
	line-height: ${verticalScale(20)}px;
`;
const ButtonCancel = styled.TouchableOpacity`
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: ${scale(10)}px;
	margin-top: 8px;
	width: ${scale(343)}px;
	height: ${verticalScale(48)}px;
	background: rgba(17, 3, 32, 0.05);
	border-radius: ${scale(10)}px;
`;

const ButtonCancelTitle = styled.Text`
	font-family: ProximaNova-Semibold;
	font-size: 17px;
	line-height: 20px;
	text-align: center;
	letter-spacing: 0.25px;
	color: #03061d;
	margin: 0px 10px;
`;
