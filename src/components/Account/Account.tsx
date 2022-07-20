import React, { useState } from "react";
import styled from "styled-components/native";
import GestureRecognizer from "react-native-swipe-gestures";

import { scale, verticalScale } from "../../helpers/sizeConverter";
import { useAppSelector } from "../../hooks/useRedux";
import ArrowRight from "../../assets/ArrowRight.svg";
import VerificationIcon from "../../assets/VerificationIcon.svg";
import NotVerifiedIcon from "../../assets/NotVerifiedIcon.svg";
import { RoundButton } from "../RoundButton/RoundButton";
import { VerificationStage } from "../VerificationStage/VerificationStage";
import { TopBar } from "../TopBar/TopBar";
import LockIcon from "../../assets/lockIcon.svg";
import LogoutIcon from "../../assets/logoutIcon.svg";
import { RandomAvatar } from "../RandomAvatar/RandomAvatar";
import { LogOut } from "../../features/logout/ui";
import { VerificationType } from "../../types/commonTypes";
import { WithSafeArea } from "../../shared/ui";

export const Account = ({ navigation }: any) => {
	const [isOpenSheet, setIsOpenSheet] = useState(false);

	const handleClickLogOut = () => {
		setIsOpenSheet(true);
	};

	const { username, bio, avatar, statusVerification } = useAppSelector((state) => state.user);

	function renderUserAvatar () {
		if (avatar) {
			return (
				<AccountImageWrapper>
					<ImageBox width={ scale(90) } height={ scale(90) } rounded source={ { uri: avatar } } />
				</AccountImageWrapper>
			);
		}

		return (
			<AccountImageWrapper>
				<RandomAvatar username={ username } width={ 92 } height={ 92 } fontSize={ 36 } />
			</AccountImageWrapper>

		);
	}
	function renderVerificationBtn () {
		switch (statusVerification) {
		case VerificationType.NOT_VERIFIED:
			return (
				<RoundButton
					title={ "Verification" }
					icon={ <VerificationIcon /> }
					onPress={ () => {
						navigation.navigate("VerificationScreen");
					} }
				>
					<NotVerifiedIcon />
					<NotVerifiedText>not verified</NotVerifiedText>
					<ArrowRight />
				</RoundButton>
			);
		case VerificationType.PENDING:
			return (
				<RoundButton isVerified={ true } title={ "Verification" } icon={ <VerificationIcon /> }>
					<NotVerifiedText>on review</NotVerifiedText>
					<ArrowRight />
				</RoundButton>
			);
		case VerificationType.VERIFIED:
			return (
				<RoundButton isVerified={ true } title={ "Verification" } icon={ <VerificationIcon /> }>
					<VerificationStage />
					<ArrowRight />
				</RoundButton>
			);
		}
	}
	const config = {
		velocityThreshold: 0.3,
		directionalOffsetThreshold: 80,
	};

	return (
		<WithSafeArea>
			<GestureRecognizer
				onSwipeRight={ () => navigation.push("TabRouting") }
				config={ config }
				style={ {
					flex: 1,
				} }
			>
				<TopBar
					navigation={ navigation }
					title={ "" }
					backButtonTitle={ "Wallet" }
					goBack={ () => {
						navigation.push("TabRouting");
					} }
				>
					<HeaderText onPress={ () => navigation.navigate("AccountEdit") }>Edit</HeaderText>
				</TopBar>
				<Container>
					<Wrapper>
						<AccountInfo>
							{renderUserAvatar()}
							<AccountNickname>{username}</AccountNickname>
							<AccountBio>{bio}</AccountBio>
						</AccountInfo>
						{renderVerificationBtn()}
						<RoundButton
							title={ "Security" }
							onPress={ () => {
								navigation.navigate("SecurityScreen");
							} }
							icon={ <LockIcon /> }
						>
							<ArrowRight />
						</RoundButton>
						<RoundButton
							title={ "Log out" }
							backgroundColor={ "rgba(235, 0, 70, 0.07)" }
							color={ "rgba(235, 0, 70, 1)" }
							icon={ <LogoutIcon style={ { marginLeft: scale(4) } } /> }
							onPress={ handleClickLogOut }
						>
							<ArrowRight />
						</RoundButton>
					</Wrapper>
				</Container>
			</GestureRecognizer>
			{isOpenSheet && (
				<LogOut setIsOpenSheet={ setIsOpenSheet }/>
			)}
		</WithSafeArea>
	);
};
const Container = styled.View`
	flex: 1;
	background-color: white;
	padding: 16px;
`;
const Wrapper = styled.View`
	height: 100%;
	width: 100%;
`;
const HeaderText = styled.Text`
	font-family: ProximaNova-Semibold;
	font-size: ${scale(17)}px;
	line-height: ${verticalScale(20)}px;
	letter-spacing: ${scale(0.25)}px;
	color: #03061d;
	margin-left: auto;
`;

const AccountInfo = styled.View`
	width: 100%;
	justify-content: center;
	align-items: center;
	margin-bottom: 30px;
`;
const AccountImageWrapper = styled.View`
	height: ${scale(90)}px;
	width: ${scale(90)}px;
	align-items: center;
	margin-bottom: ${verticalScale(16)}px;
`;
const NotVerifiedText = styled.Text`
	font-family: Proxima Nova;
	font-size: ${scale(16)}px;
	line-height: ${verticalScale(20)}px;
	margin-left: ${scale(6)}px;
	margin-right: ${scale(8)}px;
	letter-spacing: 0.5px;
	color: #9a9ba5;
`;

const ImageBox = styled.Image<{
	width: number;
	height: number;
	rounded: boolean;
}>`
	width: ${({ width }) => scale(width)}px;
	height: ${({ height }) => scale(height)}px;
	border-radius: ${({ rounded, height }) => (rounded ? verticalScale(height / 2) : 0)}px;
`;

const AccountNickname = styled.Text`
	font-family: ProximaNova-Semibold;
	font-size: ${scale(25)}px;
	line-height: ${verticalScale(36)}px;
	color: #03061d;
`;

const AccountBio = styled.Text`
	font-family: Proxima Nova;
	font-size: ${scale(16)}px;
	line-height: ${verticalScale(20)}px;
	letter-spacing: 0.5px;
	color: rgba(3, 6, 29, 0.4);
`;
