import React, { useEffect, useMemo, useRef } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import styled from "styled-components/native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

import ReportIcon from "../../assets/reportIcon.svg";
import ShareIcon from "../../assets/SharePostIcon.svg";
import { HandleIcon } from "../../components/HandleIcon/HandleIcon";
import { sc, scale, verticalScale } from "../../helpers/sizeConverter";
import { setIsOpenedModal } from "../../redux/feedSlice";
import { useAppDispatch } from "../../hooks/useRedux";

interface PostSettingsProps {
	navigation: any;
	route: any;
}

export const PostSettings: React.FC<PostSettingsProps> = ({ navigation, route }) => {
	const sheetRef = useRef<BottomSheet>(null);
	const dispatch = useAppDispatch();
	const snapPoints = useMemo(() => [-1, wp("50%")], []);
	const toggleClose = () => {
		console.log(route.params);
		navigation.goBack();

		dispatch(setIsOpenedModal(true));
	};
	const onAnimateToggle = (fromIndex: number, toIndex: number) => {
		dispatch(setIsOpenedModal(true));
		if (toIndex === -1 || toIndex === 0) toggleClose();
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			// sheetRef.current?.collapse();
		}, 4500);

		return () => clearTimeout(timer);
	}, []);

	const handleGetInvite = () => {
		navigation.goBack();
		dispatch(setIsOpenedModal(true));
		setTimeout(() => {
			navigation.navigate("InfoBottomSheetShare", {
				title: `https://insave.io/feed/${route.params.postId}`,
				name: "Post link",
				onCopy: route.params.onCopy,
			});
		}, 0);
	};

	return (
		<Container onPress={ toggleClose }>
			<BottomSheet
				ref={ sheetRef }
				index={ 1 }
				snapPoints={ snapPoints }
				animateOnMount={ true }
				onAnimate={ onAnimateToggle }
				handleComponent={ () => null }
			>
				<Wrapper>
					<HandleWrapper>
						<HandleIcon />
					</HandleWrapper>
					<ButtonWrapper>
						<Button>
							<ReportIcon />
							<ButtonTitle>Report</ButtonTitle>
						</Button>
						<Button onPress={ handleGetInvite }>
							<ShareIcon />
							<ButtonTitle>Share</ButtonTitle>
						</Button>
						<ButtonCover onPress={ toggleClose }>
							<ButtonCancel>Cancel</ButtonCancel>
						</ButtonCover>
					</ButtonWrapper>
				</Wrapper>
			</BottomSheet>
		</Container>
	);
};

const Container = styled.Pressable`
	flex: 1;
	background: rgba(3, 6, 29, 0.4);
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
`;

const ButtonWrapper = styled.View`
	padding: ${scale(0)}px 10px;
`;

const Button = styled.TouchableOpacity`
	padding: ${scale(13)}px;
	flex-direction: row;
	align-items: center;
	margin-top: ${sc(2)}px;
	margin-bottom: ${sc(5)}px;
`;

const ButtonCover = styled.TouchableOpacity`
	padding: ${scale(13)}px;
	margin-top: ${verticalScale(10)}px;
	flex-direction: row;
	align-items: center;
	border-radius: ${scale(10)}px;
	background-color: #f8f8f8;
`;

const ButtonTitle = styled.Text`
	font-family: ProximaNova-Semibold;
	font-size: ${scale(17)}px;
	line-height: ${verticalScale(20)}px;
	letter-spacing: ${scale(0.25)}px;
	color: #03061d;
	margin-left: 16px;
`;
const ButtonCancel = styled.Text`
	font-family: Montserrat-SemiBold;
	font-size: ${scale(17)}px;
	margin: 0 auto;
	color: #252525;
	background-color: #f8f8f8;
	letter-spacing: 0.25px;
`;
const Wrapper = styled.View`
	flex: 1;
	background-color: #ffffff;
	border-top-left-radius: ${scale(20)}px;
	border-top-right-radius: ${scale(20)}px;
`;
const HandleWrapper = styled.View`
	margin-top: 8px;
	margin-bottom: 8px;
	align-items: center;
`;
