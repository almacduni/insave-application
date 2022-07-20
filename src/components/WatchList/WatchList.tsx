import React, { useEffect, useState, FC, useRef } from "react";
import { ScrollView, StyleSheet } from "react-native";
import styled from "styled-components/native";
import { useDispatch } from "react-redux";
import DraggableFlatList from "react-native-draggable-flatlist";
import Animated, { useSharedValue } from "react-native-reanimated";
import { useStore } from "effector-react";

import { WatchListItemType } from "../../types/commonTypes";
import { SkeletonWatchlistItem } from "../../skeletons/SkeletonWatchlistItem";
import { sc, scale } from "../../helpers/sizeConverter";
import {
	getWatchListData,
	updateWatchListData,
	setWatchListData,
} from "../../redux/chartSlice";
import { WatchListHeader } from "./WatchListHeader";
import { WatchListSearch } from "./WatchListSearch";
import { WatchListItem } from "./WatchListItem";
import { NAV_BAR_HEIGHT, Scrollable } from "../Scrollable/Scrollable";
import { HEIGHT } from "../../constants/sizes";
import { useAppSelector } from "../../hooks/useRedux";
import { ChartModel } from "../../entity/chart";

const MAX_HEIGHT = HEIGHT - NAV_BAR_HEIGHT - sc(66);

interface WatchlistProps {
	onScroll: (y: number) => void;
}

export const WatchList: FC<WatchlistProps> = ({ onScroll }) => {
	const dispatch = useDispatch();
	const userId = useAppSelector((state) => state.user.userId);
	const watchListData = useAppSelector((state) => state.chart.watchListData);
	const isFetchingWatchListData = useAppSelector((state) => state.chart.isFetchingWatchListData);
	const { assetInfo, timeFrame } = useStore(ChartModel.$chartData);
	const [modalVisible, setModalVisible] = useState(false);
	const [beginYPosition, setBeginPosition] = useState(-1);
	// const [isChanged, change] = useState(false);
	const enabled = useSharedValue(true);
	const scrollRef = useRef();
	const [skeletons, setSkeletons] = useState(
		watchListData?.tickers?.map((_, index) => index + 1) || [1, 2, 3, 4],
	);
	const [height, setHeight] = useState(sc((watchListData?.tickers?.length || 1) * 45));
	const maxScrollY = height >= MAX_HEIGHT ? height : MAX_HEIGHT;

	const handleUpdateWatchlist = (
		tickers: WatchListItemType[],
		ticker?: string,
		withLoader = true,
	) => {
		if (!watchListData) return;
		const filteredTickers = tickers.filter((tickerItem) => !!tickerItem);
		const tickerNames = filteredTickers.length ? filteredTickers.map(({ symbol }) => symbol) : [];
		const updatedTickers = ticker ? [...tickerNames, ticker] : tickerNames;
		const watchListId = watchListData.watchListId;

		if (!ticker)
			dispatch(
				setWatchListData({
					tickers: filteredTickers,
					watchListId: watchListId,
				}),
			);

		setSkeletons(filteredTickers.map((_, index) => index + 1));
		setHeight(sc((updatedTickers.length || 1) * 65));
		dispatch(
			updateWatchListData({
				tickers: updatedTickers,
				watchListId: watchListId || 0,
				withLoader
			})
		);
		dispatch(getWatchListData({ userId: userId, withLoader }));
	};

	const removeCompany = (symbol: string) => {
		if (watchListData) {
			const tickers = watchListData.tickers.filter((ticker) => ticker.symbol !== symbol);

			dispatch(
				setWatchListData({
					watchListId: watchListData.watchListId,
					tickers,
				}),
			);
			handleUpdateWatchlist(tickers, "", false);
		}
	};

	const handlerSelectCompany = (ticker: string): void => {
		if (watchListData) {
			const order = watchListData.tickers.findIndex(({ symbol }) => symbol === ticker);

			if (order >= 0) {
				const beginYPositionAfterTickerSelect = order * sc(65);

				setBeginPosition(
					beginYPositionAfterTickerSelect === beginYPosition ? beginYPosition : order * sc(65),
				);
			} else if (ticker) {
				setBeginPosition(watchListData.tickers.length * sc(65));
				setSkeletons([...skeletons, skeletons[skeletons.length] + 1]);
			} else setBeginPosition(-1);
		}
	};

	const toggleClickToRow = (assetTicker: string, assetName: string) => {
		if (assetInfo?.assetTicker !== assetTicker && timeFrame) {
			ChartModel.fetchCandleDataFx({ assetTicker, assetName, timeFrame });
			setBeginPosition(-1);
		}
		setModalVisible(false);
	};

	const handleDragEnd = ({ data }: { data: WatchListItemType[] }) => {

		if (watchListData) handleUpdateWatchlist(data, "", false);

		enabled.value = true;
	};

	const handleSearch = () => {
		setModalVisible(true);
	};

	useEffect(() => {
		dispatch(getWatchListData({ userId: userId }));
	}, [userId]);

	useEffect(() => {
		setSkeletons(
			watchListData?.tickers ? watchListData?.tickers.map((_, index) => index + 1) : [1, 2, 3, 4],
		);
		setHeight(sc((watchListData?.tickers?.length || 1) * 65));
	}, [watchListData?.tickers]);

	const overlay = modalVisible && <Overlay style={ StyleSheet.absoluteFill } />;

	const watchlistItem = ({ item, drag, isActive, index }: any) => (
		<WatchListItem
			{ ...item }
			isSelected={ beginYPosition >= 0 && index === Math.floor(beginYPosition / sc(65)) }
			onDrag={ drag }
			onRemove={ () => removeCompany(item.symbol) }
			isActive={ isActive }
			toggleClickToRow={ toggleClickToRow }
		/>
	);

	const scrollHeader = {
		zIndex: 1000,
		backgroundColor: "#fff",
	};

	const draggableFlatListKeyExtractor = (item: WatchListItemType) => item.symbol;

	return (
		<Scrollable
			scrollRef={ scrollRef }
			enabled={ enabled }
			beginYPosition={ -beginYPosition }
			onScroll={ onScroll }
			height={ maxScrollY }
			header={
				<Animated.View style={ scrollHeader }>
					<WatchListHeader onPress={ handleSearch } />
				</Animated.View>
			}
		>
			<WatchListContainer>
				{isFetchingWatchListData ? (
					skeletons.map((skeleton) => <SkeletonWatchlistItem key={ skeleton } />)
				) : (
					<ScrollView showsVerticalScrollIndicator={ false }>
						<DraggableFlatList
							scrollEnabled={ false }
							initialNumToRender={ 5 }
							simultaneousHandlers={ scrollRef }
							keyExtractor={ draggableFlatListKeyExtractor }
							data={ watchListData?.tickers || [] }
							renderItem={ watchlistItem }
							onDragBegin={ () => (enabled.value = false) }
							onDragEnd={ handleDragEnd }
							getItemLayout={ (data, index) => ({
								length: scale(65),
								offset: scale(65) * index,
								index,
							}) }
						/>
					</ScrollView>
				)}
				{overlay}
				<WatchListSearch
					visible={ modalVisible }
					hide={ () => setModalVisible(false) }
					update={ handleUpdateWatchlist }
					onSelect={ handlerSelectCompany }
				/>
			</WatchListContainer>
		</Scrollable>
	);
};

const WatchListContainer = styled.View`
	padding-bottom: 24px;
`;

const Overlay = styled.View`
	background: #fff;
`;
