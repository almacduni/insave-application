import { SearchState } from "../redux/searchSlice";
import { PlaylistItemDataType } from "../types/commonTypes";

export const updateNewsObjectInArray = (
	feedArray: any,
	itemId: number,
	objectPropName: any,
	newObjectProps: any,
) => feedArray.map((item: any) => {
	if (item.id === itemId) {
		item.isLiked = newObjectProps.liked;
		item.likesCount = newObjectProps.likeCount;

		return item;
	} else return item;
});
export const updateCommentsCountObjectInArray = (
	feedArray: any,
	feedId: number,
	objectPropName: any,
	newObjectProps: any,
) => feedArray.map((item: any) => {
	if (item.id === feedId) {
		item.commentsCount = newObjectProps.commentsCount;

		return item;
	} else return item;
});

export const updateVotesObjectInArray = (
	feedArray: any,
	postId: number,
	choiceId: string | number,
	newObjectProps: any,
) => feedArray.map((item: any) => {
	if (item.id === postId) {
		const choices = item.poll.choices.map(
			(choice: { id: string; isVoted: boolean; title: string; votes: number }) => {
				if (choiceId === choice.id) {
					choice.isVoted = newObjectProps.isVoted;
					choice.votes = newObjectProps.votes;

					return choice;
				} else return choice;
			},
		);

		return { ...item, choices };
	} else return item;
});

export const updateTweetObjectInArray = (
	feedArray: any,
	itemId: number,
	objectPropName: any,
	newObjectProps: any,
) => feedArray.map((item: any) => {
	if (item.tweet && item.tweet[objectPropName] === itemId)
		return {
			news: item.news,
			tweet: { ...item.tweet, ...newObjectProps },
		};

	return { news: item.news, tweet: item.tweet ? item.tweet : null };
});

export const updateCommentsArray = (
	commentsArray: any,
	itemId: number,
	objectPropName: any,
	newObjectProps: any,
) => commentsArray.map((item: any) => {
	if (item.id === itemId) {
		item.isLiked = newObjectProps.isLiked;
		item.likesCount = newObjectProps.likeCount;

		return item;
	} else return item;
});

export const isObject = (object: any) => {
	try {
		Object.getPrototypeOf(object);

		return true;
	} catch (e) {
		return false;
	}
};

export const isJSON = (str: string) => {
	try {
		return !!JSON.parse(str) && !!str;
	} catch (e) {
		return false;
	}
};

export const updatePlaylistsInCategory = (
	searchState: SearchState,
	newPlaylists: PlaylistItemDataType[],
	id: number,
	page: number,
) => searchState.playlists.map((item) => {
	if (item.id === id) {
		item.page = page;
		item.playlists = [...item.playlists, ...newPlaylists];

		return item;
	} else return item;
});
