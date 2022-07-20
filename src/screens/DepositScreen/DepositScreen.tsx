import React, { FC, useState } from "react";
import styled from "styled-components/native";
import Clipboard from "@react-native-clipboard/clipboard";

import { TopBar } from "../../components/TopBar/TopBar";
import { Text, CopiedLabel, Circle } from "../../shared/ui";
import { FontStyles } from "../../shared/model";
import { delay } from "../../shared/lib";
import { useAppSelector } from "../../hooks/useRedux";
import { Currency } from "../../types/commonTypes";
import BtcFundIcon from "../../assets/bitcoin-fund-account-icon.svg";
import EthereumFundIcon from "../../assets/ethereum-fund-account-icon.svg";
import CopyAddressIcon from "../../assets/copy-fund-icon.svg";
import Dot from "../../assets/list-dot-icon.svg";
import { scale, verticalScale } from "../../helpers/sizeConverter";

const DepositData = {
	[Currency.BTC]: {
		Icon: <BtcFundIcon />,
		requirements: [
			"Coins will be deposited after 1 network confirmations.",
			"Until 2 confirmation are made, the deposited amount of your assets will be frozen for withdrawls.",
		],
		name: "Bitcoin",
	},
	[Currency.ETH]: {
		Icon: <EthereumFundIcon />,
		requirements: [
			"Coins will be deposited after 2 network confirmation.",
			"Until 2 confirmations are made, the deposited amount of your assets will be frozen for withdrawals.",
		],
		name: "Ethereum",
	},
};

export const DepositScreen: FC<any> = ({ navigation, route }) => {
	const wallet = useAppSelector((state) => state.walletNew.wallets[route.params?.walletIndex || 0]);
	const [isLabelVisible, setIsLabelVisible] = useState(false);

	const copyAddressToClipboard = async () => {
		setIsLabelVisible(true);
		Clipboard.setString(wallet.address);
		await delay(3000);
		setIsLabelVisible(false);
	};

	return (
		<>
			<TopBar
				navigation={ navigation }
				backButtonTitle={ "Back" }
				title={ DepositData[wallet.currency]?.name }
				beforeTitle={
					<CircleWrapper>
						<Circle size={ 26 } color={ "rgba(86, 106, 236, 0.1)" }>
							{DepositData[wallet.currency]?.Icon}
						</Circle>
					</CircleWrapper>
				}
			/>
			<Wrapper>
				<Title fontStyle={ FontStyles.BOLD } size={ 21 }>
					Address
				</Title>
				<AddressInput onPress={ copyAddressToClipboard }>
					<AddressValue ellipsizeMode="tail" numberOfLines={ 1 }>
						{wallet.address || "no address"}
					</AddressValue>
					<CopyAddressIcon />
				</AddressInput>
				<DepositNoticeContainer>
					<DepositNoteTitle fontStyle={ FontStyles.SEMI_BOLD }>Deposit notice</DepositNoteTitle>
					{DepositData[wallet.currency]?.requirements.map((text: string) => (
						<DepositNote key={ text }>
							<DotIcon />
							<DepositNoteInfo size={ 13 }>{text}</DepositNoteInfo>
						</DepositNote>
					))}
				</DepositNoticeContainer>
				{isLabelVisible && <CopiedLabel />}
			</Wrapper>
		</>
	);
};

const CircleWrapper = styled.View`
	margin-right: ${scale(8)}px;
`;

const Wrapper = styled.View`
	padding: 32px 16px;
	background-color: #fff;
	flex: 1;
`;

const Title = styled(Text)`
	line-height: ${verticalScale(28)}px;
	letter-spacing: ${scale(0.15)}px;
	margin-bottom: ${verticalScale(16)}px;
`;

const AddressValue = styled(Text)`
	line-height: ${verticalScale(20)}px;
	letter-spacing: ${scale(1)}px;
	width: 94%;
`;

const AddressInput = styled.TouchableOpacity`
	background: rgba(86, 106, 236, 0.1);
	padding: ${verticalScale(14)}px ${scale(16)}px;
	border-radius: ${scale(10)}px;
	flex-direction: row;
	align-items: center;
	margin-bottom: ${verticalScale(24)}px;
`;

const DepositNoticeContainer = styled.View`
	margin-bottom: auto;
`;

const DepositNoteTitle = styled(Text)`
	line-height: ${verticalScale(20)}px;
	letter-spacing: ${scale(0.1)}px;
	margin-bottom: ${verticalScale(8)}px;
`;

const DepositNote = styled.View`
	flex-direction: row;
	align-items: flex-start;
	position: relative;
	margin-bottom: ${verticalScale(8)}px;
`;

const DotIcon = styled(Dot)`
	position: absolute;
	top: ${verticalScale(6)}px;
	left: 0;
`;

const DepositNoteInfo = styled(Text)`
	line-height: ${verticalScale(16)}px;
	align-items: center;
	letter-spacing: ${scale(0.4)}px;
	margin-left: ${scale(8)}px;
`;
