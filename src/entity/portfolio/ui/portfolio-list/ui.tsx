import * as React from "react";
import { ListRenderItem, FlatList } from "react-native";
import styled from "styled-components/native";
import { useDispatch } from "react-redux";

import { FinancialAssetType } from "../../../../types/commonTypes";
import { useAppSelector } from "../../../../hooks/useRedux";
import { getPortfolio } from "../../../../redux/userSlice";
import { StockItem } from "../../../../components/StockItem/StockItem";
import { SkeletonHomePortfolio } from "../../../../skeletons/SkeletonHomeWallet";

const portfolioItem: ListRenderItem<FinancialAssetType> = ({ item }) => (
	<StockItemBox>
		<StockItem
			title={ item.ticker }
			logo={ item.logoUrl }
			price={ {
				current: item.usdAmount,
				change: item.change,
				changeInPercentage: item.changesPercentage,
			} }
			subtitle={ `${item.amount} ${item.ticker}` }
		/>
	</StockItemBox>
);

export const PortfolioList = () => {
	const dispatch = useDispatch();
	const {
		portfolio: { financialAssets },
	} = useAppSelector((state) => state.user);
	const isFetching = useAppSelector((state) => state.user.isFetching);

	React.useEffect(() => {
		dispatch(getPortfolio());
	}, []);

	const extractKey = (item: FinancialAssetType) => item.name;

	return (
		<>
			{isFetching ? (
				<SkeletonHomePortfolio />
			) : (
				<Container>
					{financialAssets ? (
						<SummaryContainer>
							<FlatList
								data={ financialAssets }
								renderItem={ portfolioItem }
								keyExtractor={ extractKey }
							/>
						</SummaryContainer>
					) : (
						<></>
					)}
				</Container>
			)}
		</>
	);
};

const StockItemBox = styled.View`
	margin-bottom: 16px;
`;

const Container = styled.View`
	flex: 1;
	background-color: #fdfdfd;
`;

const SummaryContainer = styled.View``;

