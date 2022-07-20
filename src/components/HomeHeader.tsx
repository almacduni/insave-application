import React, { FC } from "react";
import styled from "styled-components/native";

import { sc } from "../helpers/sizeConverter";
import Notification from "../assets/notification.svg";
import Personal from "../assets/personal.svg";
import Logo from "../assets/logo.svg";
import { authenticationCheck } from "../helpers/authenticationCheck";
import { useAppDispatch } from "../hooks/useRedux";
import { setIsOpenWorkInProgress } from "../entity/bottom-sheet";

type PropsType = {
	navigation: any;
};

export const HomeHeader: FC<PropsType> = ({ navigation }) => {

	const dispatch = useAppDispatch();
	const handlePressNotification = () => {
		dispatch(setIsOpenWorkInProgress(true));
	};

	return	(
		<Group>
			<Title
				onPress={ () =>
					authenticationCheck(() => navigation.navigate("TokenWallet"), null, navigation)
				}
			>
				<Logo />
			</Title>
			<Icons>
				<IconWrapper
					margin={ `0 ${sc(16)}px 0 0` }
					onPress={ () =>
						authenticationCheck(
							() => navigation.navigate("Account"),
							"Notification",
							navigation,
							"LoginScreen",
						)
					}
				>
					<Personal />
				</IconWrapper>
				<IconWrapper onPress={ () => authenticationCheck(handlePressNotification, 	"Notification",
					navigation,
					"LoginScreen",) }>
					<Notification />
				</IconWrapper>
			</Icons>
		</Group>
	);
};

const Group = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;
const Icons = styled.View`
	flex-direction: row;
	align-items: center;
`;
const IconWrapper = styled.TouchableOpacity<{ margin?: string }>`
	margin: ${({ margin = 0 }) => margin};
`;
const Title = styled.Pressable``;
