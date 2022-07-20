import moment from "moment";
import * as React from "react";
import styled from "styled-components/native";

import { GradientDirection, GradientText } from "../../../components/GradientText/GradientText";
import { scale, verticalScale } from "../../../helpers/sizeConverter";
import { useChatWebsocket } from "../../../hooks/useChatWebsocket";
import { useAppDispatch } from "../../../hooks/useRedux";
import { setActiveChat } from "../../../redux/chatSlice";
import { ChatType } from "../../../types/commonTypes";
import { baseUrl } from "../../../api/api-helpers";

export const ChatBox: React.FC<{
	navigation: any;
	data: ChatType;
}> = ({ navigation, data }) => {
	const [lastMessage, setLastMessage] = React.useState(data.lastMessage);
	const dispatch = useAppDispatch();

	const connection = useChatWebsocket({
		brokerUrl: `${baseUrl}stomp`,
		subs: [
			{
				dest: `/messages/${data.chatId}`,
				onMessage: (message) => {
					const messageData = JSON.parse(message.body);

					setLastMessage(messageData);
				},
				headers: {},
			},
		],
	});

	React.useEffect(() => () => {
		connection.deactivate();
	}, []);

	return (
		<Wrapper
			onPress={ () => {
				navigation.navigate("MessageScreen", { params: { chatName: data.name } });
				dispatch(setActiveChat(data));
			} }
		>
			<EmptyImageBox>
				<EmptyImageTitle>{data.name[0]}</EmptyImageTitle>
			</EmptyImageBox>
			<Col>
				<ChatName>{data.name}</ChatName>
				{lastMessage?.text && (
					<GradientText
						width={ 200 }
						height={ 17 }
						text={ lastMessage?.text }
						fontSize={ 14 }
						fontFamily={ "ProximaNova-Regular" }
						gradientColors={ [
							{ color: "#fff", offset: "98%" },
							{ color: "rgba(154, 155, 165, 1)", offset: "2%" },
						] }
						gradientDirection={ GradientDirection.HORIZONTAL }
					/>
				)}
			</Col>
			{lastMessage?.creationDate && (
				<TimeText>{moment(lastMessage.creationDate).format("LT")}</TimeText>
			)}
		</Wrapper>
	);
};

const Wrapper = styled.TouchableOpacity`
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	padding: 8px 0;
`;

const Col = styled.View`
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	margin-left: 16px;
`;

const ChatName = styled.Text`
	font-family: "ProximaNova-Regular";
	font-size: ${scale(17)}px;
	font-weight: 600;
	color: rgba(3, 6, 29, 1);
	margin-bottom: ${verticalScale(4)}px;
`;

const EmptyImageBox = styled.View`
	border-radius: 100px;
	width: ${scale(40)}px;
	height: ${scale(40)}px;
	justify-content: center;
	align-items: center;
	background-color: rgba(3, 6, 29, 0.3);
`;

const TimeText = styled.Text`
	font-family: "ProximaNova-Regular";
	font-size: ${scale(10)}px;
	font-weight: 400;
	color: rgba(89, 91, 105, 1);
	margin-left: auto;
`;

const EmptyImageTitle = styled.Text`
	color: #ffffff;
	font-size: ${scale(17)}px;
	line-height: 20px;
	font-family: Raleway;
	font-weight: bold;
`;
