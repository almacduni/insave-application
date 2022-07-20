import * as React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components/native";

import { createOrder } from "../../../entity/chart-terminal/model/thunks";
import { scale, verticalScale } from "../../../helpers/sizeConverter";
import { useAppDispatch, useAppSelector } from "../../../hooks/useRedux";
import { CounterField } from "../../../shared/ui";
import { OrderType } from "../model/types";

export interface IFormData {
	amount: string;
	limit: string;
}
interface IProps {
	isOpenMarket: boolean;
}

export const TerminalOrder: React.FC<IProps> = (props) => {
	const { isOpenMarket } = props;
	const { ticker } = useAppSelector((state) => state.chart.currentInfo);
	const { userId } = useAppSelector((state) => state.user);

	const dispatch = useAppDispatch();
	const { control, getValues, setValue } = useForm<IFormData>();

	function handleSubmit (orderType: OrderType) {
		const values = getValues();

		if (ticker && userId) {
			const data = { amount: +values.amount, price: values.limit, firstCurrency: "ETH", secondCurrency: "BTC", isPriceSet: !!values.limit ? true : false, orderType, userId };

			dispatch(createOrder(data));

		}

	}

	function renderItemByType () {
		if (isOpenMarket) {
			return (
				<MarketPriceContainer>
					<MarketPriceText>Market price</MarketPriceText>
				</MarketPriceContainer>
			);
		}

		return (
			<CounterField placeholder="Limit price" name="limit" setValue={ setValue } getValues={ getValues } control={ control }/>
		);
	}

	return (
		<Wrapper>
			{renderItemByType()}
			<CounterField placeholder="Amount" name="amount" setValue={ setValue } getValues={ getValues } control={ control }/>
			<BtnsContainer>
				<ButtonAction onPress={ () => handleSubmit(OrderType.SELL) }>
					<BtnText>
						Sell
					</BtnText>
				</ButtonAction>
				<ButtonAction onPress={ () => handleSubmit(OrderType.BUY) } isLast={ true }>
					<BtnText>
						Buy
					</BtnText>
				</ButtonAction>
			</BtnsContainer>
		</Wrapper>
	);
};

const Wrapper = styled.View`
  margin: 24px 16px 0 16px;
`;

const MarketPriceContainer = styled.View`
  width: 100%;
  height: ${verticalScale(48)}px;
  background: #F3F2F4;
  border-radius: 12px;
	justify-content: center;
	margin-bottom: 12px;
`;

const MarketPriceText = styled.Text`
font-weight: 600;
font-size: ${scale(14)}px;
line-height: 20px;
text-align: center;
letter-spacing: 0.1px;
color: rgba(3, 6, 29, 0.4);
`;

const BtnsContainer = styled.View`
	width: 100%;
	height: ${verticalScale(48)}px;
	flex-direction: row;

`;

const ButtonAction = styled.TouchableOpacity<{isLast?: boolean}>`
	width: 49%;
	height: ${verticalScale(48)}px;
	background: #EBEBED;
	border-radius: 10px;
	align-items: center;
	justify-content: center;
	margin-left: ${({ isLast }) => isLast ? "auto" : 0}
`;

const BtnText = styled.Text`
	font-weight: 600;
	font-size: ${scale(17)}px;
	line-height: 20px;
	letter-spacing: 0.25px;
`;
