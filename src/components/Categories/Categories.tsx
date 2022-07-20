import * as React from "react";
import { View } from "react-native";
import styled from "styled-components/native";

import TransferIcon from "../../assets/transferFunds.svg";
import BugsAndSupport from "../../assets/bugAndSupport.svg";
import Withdraw from "../../assets/withdraw.svg";
import FundAccount from "../../assets/fundAccount.svg";
import { authenticationCheck } from "../../helpers/authenticationCheck";
import { ListItemButton } from "../../shared/ui";
import { useAppSelector, useAppDispatch } from "../../hooks/useRedux";
import { getCommonChat } from "../../redux/chatSlice";

export const Categories = ({ navigation }: any) => {
	const userId = useAppSelector((state) => state.user.userId);
	const dispatch = useAppDispatch();

	const goToSupport = React.useCallback(() => {
		if (userId === null) {
			navigation.navigate("ChatScreen", { screen: "MessageScreen" });
			dispatch(getCommonChat());
		} else {
			navigation.navigate("ChatScreen");
		}
	}, [userId]);

	return (
		<View>
			<CategoriesColumn>
				<ListItemButton
					text={ "Deposit" }
					data={ { icon: <FundAccount /> } }
					onPress={ () =>
						authenticationCheck(
							() =>
								navigation.navigate("CryptoSelector", {
									name: "Deposit",
									destination: "DepositScreen",
								}),
							null,
							navigation,
						)
					}
				/>
				<ListItemButton
					text={ "Withdraw" }
					data={ { icon: <Withdraw /> } }
					onPress={ () =>
						authenticationCheck(
							() =>
								navigation.navigate("CryptoSelector", {
									name: "Withdraw",
									destination: "WithdrawScreen",
								}),
							null,
							navigation,
						)
					}
				/>
				<ListItemButton
					text={ "Transfer" }
					data={ { icon: <TransferIcon /> } }
					onPress={ () =>
						authenticationCheck(() => navigation.navigate("UserSearchScreen"), null, navigation)
					}
				/>
				<ListItemButton
					text={ "Support" }
					data={ { icon: <BugsAndSupport /> } }
					onPress={ goToSupport }
				/>
			</CategoriesColumn>
		</View>
	);
};

const CategoriesColumn = styled.View`
	flex-direction: column;
	justify-content: space-between;
	margin-top: 9px;
	padding: 0 4px;
`;
