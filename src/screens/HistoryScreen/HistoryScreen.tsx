import React, { FC, useEffect, useState } from "react";
import styled from "styled-components/native";
import { StackNavigationProp } from "@react-navigation/stack";
import moment from "moment";

import { scale, verticalScale } from "../../helpers/sizeConverter";
import { RootStackParamList } from "../../routes/Routing";
import { HistoryItemType } from "../../types/commonTypes";
import { HistoryItem } from "../../components/HistoryItem/HistoryItem";
import { SkeletonHistoryScreen } from "../../skeletons/SkeletonHistoryScreen";
import { data } from "../../components/History/dummy-data";
import { ButtonBack } from "../../shared/ui";

type HistoryScreenNavigationPropsType = StackNavigationProp<RootStackParamList>;

type HistoryScreenPropsType = {
	navigation: HistoryScreenNavigationPropsType;
};

const history = data
	.map((item: any, i: number) => ({
		date: item.date,
		history: i === 0 ? item.history.slice(1) : item.history,
	}))
	.filter((item: any) => item.history.length);

export const HistoryScreen: FC<HistoryScreenPropsType> = ({ navigation }) => {
	// const state = useAppSelector((state) => state.user);
	const [isFetch, setIsFetch] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setIsFetch(false);
		}, 900);
	}, []);

	return (
		<>
			{isFetch ? (
				<SkeletonHistoryScreen />
			) : (
				<Container>
					<ButtonBack onPress={ navigation.goBack } title="Back"/>
					<HistoryList>
						{history.map((item: any, index) => {
							const isDate = moment(item.date, "YYYY-MM-DD", true).isValid();

							return (
								<Block key={ index }>
									<Date fontSize={ isDate ? 14 : 16 }>
										{isDate ? moment(item.date).format("DD MMMM YYYY") : item.date}
									</Date>
									<InnerBlock>
										{item.history.map((itemHistory: HistoryItemType, idx: number) => (
											<HistoryItem { ...itemHistory } key={ idx }/>
										))}
									</InnerBlock>
								</Block>
							);
						})}
					</HistoryList>
				</Container>
			)}
		</>
	);
};

const Container = styled.View`
	background-color: #fff;
	height: 100%;
	padding: 12px 0;
`;

const HistoryList = styled.ScrollView`
	padding: 0px 16px;
`;

const Block = styled.View`
	margin-bottom: ${verticalScale(24)}px;
`;

const Date = styled.Text<{ fontSize?: number }>`
	font-family: "ProximaNova-Semibold";
	font-size: ${({ fontSize = 14 }) => scale(fontSize)}px;
	color: #9a9ba5;
`;

const InnerBlock = styled.View`
	margin-top: ${verticalScale(16)}px;
`;
