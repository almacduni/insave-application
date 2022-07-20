import * as React from "react";
import styled from "styled-components/native";

import { TopBar } from "../../components/TopBar/TopBar";
import { UserSearchLine } from "../../features/user-search-line";
import { UserSearchSelector } from "../../features/user-search-selector";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { Button } from "../../shared/ui";
import {
	setSearchLine,
	setTotal,
	setFoundUsersList,
	removeSelectedUser,
} from "../../entity/user-search";

const USERS_PER_PAGE = 10;

export const UserSearchScreen: React.FC<any> = ({ navigation }) => {
	const dispatch = useAppDispatch();
	const selectedUser = useAppSelector((state) => state.userSearch.selectedUser);

	React.useEffect(() => function clear () {
		dispatch(setSearchLine(""));
		dispatch(setTotal(0));
		dispatch(setFoundUsersList([]));
		dispatch(removeSelectedUser());
	}, []);

	function goToCryptoSelector () {
		navigation.navigate("CryptoSelector", {
			name: "Transfer",
			destination: "TransferScreen",
		});
	}

	return (
		<>
			<TopBar navigation={ navigation } backButtonTitle={ "Back" } title={ "Transfer" } />
			<Wrapper>
				<UserSearchLine pageLimit={ USERS_PER_PAGE } />
				<UserSearchSelector pageLimit={ USERS_PER_PAGE } />
				<ButtonWrapper>
					<Button
						text="Next"
						disabled={ !selectedUser }
						onPress={ goToCryptoSelector }
					/>
				</ButtonWrapper>
			</Wrapper>
		</>
	);
};

const Wrapper = styled.View`
	flex: 1;
	padding: 24px 16px;
	background-color: #fff;
`;

const ButtonWrapper = styled.View`
	margin-top: auto;
`;
