import FriendsInvitedIcon from "../../assets/frendsInviteIcon.svg";
import TransferIcon from "../../assets/transferDarkIcon.svg";
import VideoPublishedIcon from "../../assets/videoPublishedIcon.svg";
import { CardTypes } from "../../components/ProgressCard/ProgressCard";

export enum CountTypes {
	FRENDS = "friendsInvitedCount",
	TRADES = "tradesCount",
	POSTS = "postsPublishedCount",
	VIDEOS = "videosPublishedCount",
}

export const progressCardsData = [
	{
		title: "Friends",
		countType: CountTypes.FRENDS,
		Icon: FriendsInvitedIcon,
		onPress: () => {},
		buttonText: "invite",
		cardType: CardTypes.HALF_WIDTH,
	},
	{
		title: "Trades",
		countType: CountTypes.TRADES,
		Icon: TransferIcon,
		onPress: (navigation: any) => {
			navigation.push("TabRouting", { screen: "Terminal" });
		},
		buttonText: "terminal",
		cardType: CardTypes.HALF_WIDTH,
	},
	{
		title: "Videos",
		description: "Create content and earn IN10 tokens",
		Icon: VideoPublishedIcon,
		onPress: () => {},
		buttonText: "more",
		cardType: CardTypes.FULL_WIDTH,
	},
];
