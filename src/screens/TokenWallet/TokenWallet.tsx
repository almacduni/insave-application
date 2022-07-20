import React, { useState } from "react";
import Clipboard from "@react-native-clipboard/clipboard";
import styled from "styled-components/native";

import ShareIcon from "../../assets/shareBlackIcon.svg";
import { TopBar } from "../../components/TopBar/TopBar";
import { scale, verticalScale } from "../../helpers/sizeConverter";
import { TokenWalletHeader } from "./TokenWalletHeader";
import { TokenWalletBar } from "./TokenWalletBar";
import { ProgressCard } from "../../components/ProgressCard/ProgressCard";
import { progressCardsData } from "./progressCardsData";
import { useAppSelector } from "../../hooks/useRedux";
import { CustomStatusBar } from "../../processes";
import { ShareLink } from "../../features/share-link/ui";
import { WithSafeArea } from "../../shared/ui";

const TOP_COLOR = "rgba(86, 106, 236, 0.1)";
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const TokenWallet = ({ navigation }: any) => {
	const [copied, setCopied] = useState(false);
	const [isOpenSheet, setIsOpenSheet] = useState(false);
	const referralLink = useAppSelector((state) => state.user.referralLink || "");

	const handleCopy = async () => {
		setCopied(true);
		Clipboard.setString(`https://insave.io/r?ref=${referralLink}`);
		await delay(3000);
		setCopied(false);
	};
	const handleGetInvite = () => {
		setIsOpenSheet(true);
	};

	return (
		<WithSafeArea>

			<Container>
				<CustomStatusBar backgroundColor={ TOP_COLOR } />
				<TopBar
					backButtonTitle={ "Wallet" }
					navigation={ navigation }
					title={ "" }
					borderBottom={ false }
					background={ TOP_COLOR }
				>
					<ShareIconWrapper onPress={ handleGetInvite } activeOpacity={ 1 }>
						<ShareIcon width={ scale(20) } height={ verticalScale(24) } />
					</ShareIconWrapper>
				</TopBar>
				<TokenWalletHeader />
				<TokenWalletBar title="Progress" onMorePress={ () => {} } />
				<TokenWalletCards>
					{progressCardsData.map((card, index) => (
						<ProgressCard key={ index } { ...card } background={ TOP_COLOR } />
					))}
				</TokenWalletCards>
				{copied && (
					<Label>
						<LabelTitle>Copied!</LabelTitle>
					</Label>
				)}

			</Container>
			{isOpenSheet && (
				<ShareLink setIsOpenSheet={ setIsOpenSheet } onCopy={ handleCopy } title={ `https://insave.io/r?ref=${referralLink}` } name="Your personal invitation link"/>
			)}
		</WithSafeArea>
	);
};

const Container = styled.View`
	background-color: #fff;
	flex: 1;
`;

const ShareIconWrapper = styled.TouchableOpacity`
	margin-left: auto;
`;

const TokenWalletCards = styled.View`
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-between;
	padding: 0 16px;
`;

const Label = styled.View`
	position: absolute;
	bottom: 10px;
	padding: ${verticalScale(5)}px ${scale(15)}px;
	border-radius: ${scale(6)}px;
	background: #03061d;
	align-self: center;
	margin-bottom: ${verticalScale(16)}px;
`;

const LabelTitle = styled.Text`
	font-size: ${scale(14)}px;
	line-height: ${verticalScale(20)}px;
	letter-spacing: ${scale(0.25)}px;
	color: #ffffff;
`;
