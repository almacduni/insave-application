import React from "react";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

import TerminalSearch from "../../assets/terminalSearch.svg";
import { SkeletonWatchlistItem } from "../../skeletons/SkeletonWatchlistItem";
import { adjustHelper } from "../../helpers/adjustHelper";

export const TerminalItem = ({ stateTerminal }: any) =>

// useFocusEffect(
// React.useCallback(() => {
// dispatch(getTerminalItem(stateChart.ticker ? stateChart.ticker : "AAPL"));
// const interval = setInterval(() => {
// dispatch(updateTerminalItem(stateChart.ticker ? stateChart.ticker : "AAPL"));
// }, 15000);
// return () => clearInterval(interval);
// }, [stateChart.ticker]),
// );
// useFocusEffect(() => {
// 	dispatch(getTerminalItem("AAPL"));
// 	const interval = setInterval(() => {
// 		;
// 		dispatch(updateTerminalItem("AAPL"));
// 	}, 15000);
// 	return () => clearInterval(interval);
// }, []);

	(
		<ItemCard>
			{stateTerminal?.isFetching ? (
				<SkeletonWatchlistItem />
			) : (
				stateTerminal?.item && (
					<ItemInfo>
						<ItemWrapper>
							<ItemLogo source={ { uri: stateTerminal.item.image } } />
						</ItemWrapper>
						<ItemInfoGroup>
							<ItemName>{stateTerminal.item.name}</ItemName>
							<ItemPrices>
								<ItemActivePrice>{stateTerminal.item.price}</ItemActivePrice>
								<ItemPricesChanging>
									<ItemPriceChanging isIncrease={ stateTerminal.item.change > 0 }>
										{stateTerminal.item?.change}
									</ItemPriceChanging>
									<ItemPriceChanging isIncrease={ stateTerminal.item.changesPercentage > 0 }>
										{" "}
										({stateTerminal.item.changesPercentage}
										%)
									</ItemPriceChanging>
								</ItemPricesChanging>
							</ItemPrices>
						</ItemInfoGroup>
					</ItemInfo>
				)
			)}
			<TouchableOpacity onPress={ () => {} }>
				<TerminalSearch />
			</TouchableOpacity>
		</ItemCard>
	)
;

const ItemWrapper = styled.View`
	margin-right: ${adjustHelper(8)}px;
	width: ${wp("8.53%")}px;
	height: ${wp("8.53%")}px;
`;
const ItemLogo = styled.Image`
	flex: 1%;
	resize-mode: contain;
	border-radius: 100px;
`;
const ItemCard = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	background-color: rgba(37, 37, 37, 0.03);
	padding: ${wp("4%")}px ${wp("3.73%")}px ${adjustHelper(10)}px ${wp("3.73%")}px;
	border-radius: ${adjustHelper(6)}px;
`;
const ItemInfo = styled.View`
	flex-direction: row;
	align-items: center;
`;
const ItemInfoGroup = styled.View`
	align-items: flex-start;
`;
const ItemName = styled.Text`
	font-family: Raleway-SemiBold;
	font-size: ${wp("4.26%")}px;
	line-height: ${wp("5.06%")}px;
`;

const ItemPrices = styled.View`
	flex-direction: row;
	align-items: center;
`;
const ItemPricesChanging = styled.View`
	margin-left: ${wp("2.6%")}px;
	flex-direction: row;
`;
const ItemActivePrice = styled.Text`
	font-family: Raleway-Medium;
	font-size: ${wp("3.2%")}px;
	line-height: ${wp("3.73%")}px;
	font-variant: lining-nums;
`;
const ItemPriceChanging = styled.Text<{ isIncrease: boolean }>`
	font-family: Raleway-Regular;
	color: ${({ isIncrease }) => (isIncrease ? "#0ABA85" : "#E30502")};
	font-size: ${wp("3.2%")}px;
	line-height: ${wp("3.73%")}px;
	font-variant: lining-nums;
`;
