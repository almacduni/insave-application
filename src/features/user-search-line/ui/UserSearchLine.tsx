import * as React from "react";
import { debounce } from "debounce";

import { useAppDispatch } from "../../../hooks/useRedux";
import { Input } from "../../../shared/ui";
import { searchUsers, setFoundUsersList, setSearchLine } from "../../../entity/user-search";

interface UserSearchLineProps {
	pageLimit: number;
}

export const UserSearchLine: React.FC<UserSearchLineProps> = (props) => {
	const { pageLimit } = props;
	const dispatch = useAppDispatch();

	const onChangeText = debounce((searchLine: string) => {
		dispatch(searchUsers({ searchLine, offset: 0, limit: pageLimit }));
		dispatch(setSearchLine(searchLine));
		if (searchLine === "") {
			dispatch(setFoundUsersList([]));
		}
	}, 500);

	return (
		<Input
			autoFocus
			autoCapitalize={ "none" }
			onChangeText={ onChangeText }
			placeholder={ "Enter username or email" }
		/>
	);
};
