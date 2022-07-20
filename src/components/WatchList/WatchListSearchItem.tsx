import React, { FC } from "react";
import styled from "styled-components/native";

import { WatchListItemType } from "../../types/commonTypes";
import { sc } from "../../helpers/sizeConverter";
import { useAppSelector } from "../../hooks/useRedux";

interface Props {
	ticker: string;
	companyName: string;
	update: (tickers: WatchListItemType[] | any[], ticker?: string) => void;
	toggleOnClear: (ticker: string) => void;
}

export const WatchListSearchItem: FC<Props> = ({ ticker, companyName, update, toggleOnClear }) => {
	const tickers = useAppSelector((state) => state.chart?.watchListData?.tickers || []);

	const disabled = tickers.some(({ symbol }) => symbol === ticker);

	const addCompany = (newTicker: string) => {
		if (!disabled) update(tickers, newTicker);

		toggleOnClear(newTicker);
	};

	return (
		<ItemSearch onPress={ () => addCompany(ticker) } activeOpacity={ 0.9 }>
			<ItemShortName>{ticker}</ItemShortName>
			<ItemFullName>{companyName}</ItemFullName>
		</ItemSearch>
	);
};

const ItemSearch = styled.TouchableOpacity`
	padding-bottom: ${sc(16)}px;
`;

const ItemShortName = styled.Text`
	font-family: ProximaNova-Bold;
	font-size: ${sc(17)}px;
	line-height: ${sc(20)}px;
	font-variant: lining-nums;
	letter-spacing: ${sc(0.15)}px;
	color: #252525;
`;

const ItemFullName = styled.Text`
	font-family: ProximaNova-Semibold;
	font-size: ${sc(13)}px;
	line-height: ${16}px;
	letter-spacing: ${sc(0.4)}px;
	font-variant: lining-nums;
	color: rgba(37, 37, 37, 0.4);
	margin-top: ${sc(4)}px;
`;
