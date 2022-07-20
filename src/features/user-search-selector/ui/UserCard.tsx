import * as React from "react";
import styled from "styled-components/native";

import SelectedIcon from "../../../assets/selectedIcon.svg";
import { InfoCard } from "../../../shared/ui";
import { useAppDispatch, useAppSelector } from "../../../hooks/useRedux";
import { FoundUser, setSelectedUser } from "../../../entity/user-search";

interface UserCardProps {
	index: number;
	item: FoundUser;
}

export const UserCard: React.FC<UserCardProps> = (props) => {
	const { index, item } = props;
	const selectedUserId = useAppSelector((state) => state.userSearch.selectedUser?.id);
	const dispatch = useAppDispatch();

	return (
		<DataCardWrapper
			onPress={ () => {
				dispatch(setSelectedUser({ index }));
			} }
			activeOpacity={ 1 }
		>
			<InfoCard
				data={ {
					image: {
						uri: item.avatar,
						size: 36,
					},
					title: item.username,
					subtitle: item.email,
					right: selectedUserId === item.id ? <SelectedIcon /> : <></>,
				} }
			/>
		</DataCardWrapper>
	);
};

const DataCardWrapper = styled.TouchableOpacity`
	padding: 8px;
`;
