import * as React from "react";
import styled from "styled-components/native";
import { FlatList, ListRenderItem } from "react-native";

import { useAppDispatch, useAppSelector } from "../../../hooks/useRedux";
import { FoundUser, searchUsers } from "../../../entity/user-search";
import { UserCard } from "./UserCard";
import { EmptinessLabel, LoadIndicator } from "../../../shared/ui";

interface UserSearchSelectorProps {
	pageLimit: number;
}

export const UserSearchSelector: React.FC<UserSearchSelectorProps> = (props) => {
	const { pageLimit } = props;
	const users = useAppSelector((state) => state.userSearch.foundUsersList);
	const { total, searchLine, isFetchUsersList } = useAppSelector((state) => state.userSearch);
	const dispatch = useAppDispatch();
	const [page, setPage] = React.useState(0);

	const renderItem: ListRenderItem<FoundUser> = (data) => <UserCard { ...data } />;

	React.useEffect(() => {
		setPage(0);
	}, [searchLine]);

	React.useEffect(() => {
		if (page !== 0) {
			dispatch(searchUsers({ searchLine, offset: page * pageLimit, limit: pageLimit }));
		}
	}, [page]);

	const loadMore = () => {
		if (page + 1 <= Math.floor(total / pageLimit)) {
			setPage(page + 1);
		}
	};

	return (
		<FlatList
			contentContainerStyle={ { flexGrow: 1, paddingBottom: 6 } }
			ListEmptyComponent={
				!isFetchUsersList ? (
					<EmptinessLabelWrapper>
						<EmptinessLabel text={ "Unknown user" } />
					</EmptinessLabelWrapper>
				) : (
					<></>
				)
			}
			ListFooterComponent={ isFetchUsersList ? <LoadIndicator /> : <></> }
			data={ users }
			keyExtractor={ (item: FoundUser) => `found-user-${item.id}` }
			renderItem={ renderItem }
			showsVerticalScrollIndicator={ false }
			onEndReached={ loadMore }
			onEndReachedThreshold={ 0.5 }
		/>
	);
};

const EmptinessLabelWrapper = styled.View`
	margin-top: 30%;
`;
