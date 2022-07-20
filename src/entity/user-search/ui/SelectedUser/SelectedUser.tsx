import * as React from "react";
import styled from "styled-components/native";

import { useAppSelector } from "../../../../hooks/useRedux";
import { InfoCard } from "../../../../shared/ui";

export const SelectedUser: React.FC = () => {
	const selectedUser = useAppSelector((state) => state.userSearch.selectedUser);

	return (
		<Wrapper>
			<InfoCard
				data={ {
					image: {
						uri: selectedUser?.avatar,
						size: 36,
					},
					title: selectedUser?.username,
					subtitle: selectedUser?.email,
				} }
			/>
		</Wrapper>
	);
};

const Wrapper = styled.View`
	padding: 16px;
	background-color: #f8f8f8;
	border-radius: 10px;
	margin-bottom: 12px;
`;
