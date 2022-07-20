import React, { FC } from "react";
import styled from "styled-components/native";
import moment from "moment";

import { normalizeIndicator as ni } from "../../helpers/normalizeIndicator";
import { sc } from "../../helpers/sizeConverter";
import { smallCaps } from "../../helpers/text";
import { HistoryItemType } from "../../types/commonTypes";

interface HistoryItemProps extends HistoryItemType {
	isEmpty?: boolean;
	navigation?: any;
}

export const HistoryItem: FC<HistoryItemProps> = ({
	ticker,
	amount,
	orderType,
	orderDate,
	totalPrice,
	logoUrl,
	isEmpty,
	navigation,
}) => {
	const logoSource =
		logoUrl !== "string" ? { uri: logoUrl } : require("../../assets/companyDefault.png");

	const dataWithCheck = {
		ticker: isEmpty ? "Name" : ticker,
		amount: isEmpty ? 0 : amount,
		orderType: isEmpty ? "Buy" : smallCaps(orderType),
		price: {
			whole: ni(isEmpty ? 0.0 : totalPrice).wholeCurrency,
			rest: ni(isEmpty ? 0.0 : totalPrice).rest,
		},
		orderDate: isEmpty ? "Time" : moment(orderDate).format("hh:mm a"),
	};

	return (
		<Container>
			<InfoBlock>
				{isEmpty ? (
					<AddShare onPress={ () => navigation.navigate("Terminal") } />
				) : (
					<Logo source={ logoSource } />
				)}
				<ItemInfo>
					{isEmpty ? (
						<>
							<EmptyItem
								width={ 48 }
								height={ 16 }
								backgroundColor={ "#CDCDD2" }
								margin={ `0 0 ${sc(10)}px 0` }
							/>
							<EmptyItem width={ 32 } height={ 11 } backgroundColor={ "#E6E6E8" } />
						</>
					) : (
						<>
							<ItemTitle numberOfLines={ 1 }>{dataWithCheck.ticker}</ItemTitle>
							<ItemShares>{`${dataWithCheck.amount} ${dataWithCheck.orderType}`}</ItemShares>
						</>
					)}
				</ItemInfo>
			</InfoBlock>
			<PriceBlock>
				{isEmpty ? (
					<>
						<EmptyItem
							width={ 70 }
							height={ 16 }
							backgroundColor={ "#CDCDD2" }
							margin={ `0 0 ${sc(10)}px 0` }
						/>
						<EmptyItem width={ 51 } height={ 11 } backgroundColor={ "#E6E6E8" } />
					</>
				) : (
					<>
						<ItemPrice>
							- {dataWithCheck.price.whole}.
							<ItemRestPrice>{dataWithCheck.price.rest}</ItemRestPrice>
						</ItemPrice>
						<Time>{dataWithCheck.orderDate}</Time>
					</>
				)}
			</PriceBlock>
		</Container>
	);
};

type EmptyItemProps = {
	width: number;
	height: number;
	backgroundColor: string;
	margin?: string;
};

const EmptyItem = styled.Text<EmptyItemProps>`
	width: ${({ width }) => sc(width)}px;
	height: ${({ height }) => sc(height)}px;
	background-color: ${({ backgroundColor }) => backgroundColor};
	border-radius: ${({ height }) => sc(height / 2)}px;
	margin: ${({ margin = 0 }) => margin};
`;

const Container = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	padding: ${sc(8)}px 0;
`;
const InfoBlock = styled.View`
	max-width: 75%;
	align-items: center;
	flex-direction: row;
`;

const AddShare = styled.Pressable`
	width: ${sc(46)}px;
	height: ${sc(46)}px;
	border-radius: ${sc(23)}px;
	background: #cdcdd2;
`;

const Logo = styled.Image`
	width: ${sc(46)}px;
	height: ${sc(46)}px;
	border-radius: ${sc(23)}px;
	resize-mode: cover;
`;

const ItemInfo = styled.View`
	flex-direction: column;
	margin-left: ${sc(8)}px;
`;

const ItemTitle = styled.Text`
	font-family: ProximaNova-Semibold;
	font-size: ${sc(16)}px;
	line-height: ${sc(18.78)}px;
	font-variant: lining-nums;
`;

const ItemShares = styled.Text`
	margin-top: ${sc(4)}px;
	padding-right: 25%;
	font-family: ProximaNova-Semibold;
	font-size: ${sc(14)}px;
	line-height: ${sc(16.44)}px;
	font-variant: lining-nums;
	color: rgba(25, 25, 25, 0.4);
`;

const PriceBlock = styled.View`
	align-items: flex-end;
`;

const ItemPrice = styled.Text`
	font-variant: lining-nums;
	font-family: ProximaNova-Semibold;
	font-size: ${sc(18)}px;
`;

const ItemRestPrice = styled.Text`
	font-variant: lining-nums;
	font-family: ProximaNova-Semibold;
	font-size: ${sc(14)}px;
`;

const Time = styled.Text`
	font-family: ProximaNova-Semibold;
	font-size: ${sc(14)}px;
	color: #252525;
	opacity: 0.4;
	font-variant: lining-nums;
`;
