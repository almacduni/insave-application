import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { feedAPI } from "../api/feed-api";
import {
	updateCommentsArray,
	updateCommentsCountObjectInArray,
	updateNewsObjectInArray,
	updateTweetObjectInArray,
	updateVotesObjectInArray,
} from "../helpers/object-helper";
import { Choice } from "../screens/WriteScreen/WriteScreen";
import { CommentsItemType, FeedItemsItemType } from "../types/commonTypes";

const initialState = {
	feedItems: [] as Array<FeedItemsItemType>,
	comments: [] as Array<CommentsItemType>,
	barVisible: true,
	isFetching: true,
	section: "forYou",
	setIsFirstLoad: false,
	isOpenedModal: false,
	isFirstLoad: false,
	postLink: null as string | null
};

// thunks
export const getFeedData = createAsyncThunk(
	"feed/getFeedData",
	async (payload: GetFeedDataInterface, { dispatch }) => {
		dispatch(setIsFetching(true));
		const { page, pageLimit, section, isLoadMore } = payload;

		try {
			const res = await feedAPI.getPostsData(section, page, pageLimit);

			if (isLoadMore) {
				dispatch(setFeedDataMore(res));
			} else {
				dispatch(setFeedData(res));
			}
		} catch (e) {
			console.log("Error getFeedData");
		}
		dispatch(setIsFirstLoad(true));
		dispatch(setIsFetching(false));
	},
);

export const setLikeToPost = createAsyncThunk(
	"feed/setLikeToPost",
	async (payload: SetLikeToPostInterface, { dispatch }) => {
		try {
			const { isLiked, itemId, likeCount } = payload;

			if (isLiked) {
				dispatch(setUnLike({ itemId, likeCount }));
			} else {
				dispatch(setLike({ itemId, likeCount }));
			}
			await feedAPI.setLikeToPost(itemId);
		} catch (e) {
			console.error(e);
		}
	},
);

export const setVoteToPoll = createAsyncThunk(
	"feed/setVoteTC",
	async (payload: SetVoteToPollInterface, { dispatch }) => {
		try {
			const { choiceId, postId, votes } = payload;

			await feedAPI.setVoteToPoll(postId, choiceId);
			dispatch(setVote({ postId, choiceId, votes }));
		} catch (e) {
			console.error("Error setVoteToPoll");
		}
	},
);

export const setUnLikeToPost = createAsyncThunk(
	"feed/setUnLikeTC",
	async (payload: SetLikeToPostInterface, { dispatch }) => {
		try {
			const { isLiked, itemId, likeCount } = payload;

			if (isLiked) {
				dispatch(setUnLike({ itemId, likeCount }));
			} else {
				dispatch(setLike({ itemId, likeCount }));
			}
			await feedAPI.unSetLikeToPost(itemId);
		} catch (e) {
			console.log("Error setUnLikeToPost");
		}
	},
);

export const setUnLikeToComment = createAsyncThunk(
	"feed/setUnLikeCommentTC",
	async (payload: SetLikeToPostInterface, { dispatch }) => {
		try {
			const { isLiked, itemId, likeCount } = payload;

			if (isLiked) {
				dispatch(setCommentUnLikeAC({ itemId, likeCount }));
			} else {
				dispatch(setCommentLikeAC({ itemId, likeCount }));
			}
			await feedAPI.unSetLikeToComment(itemId);
		} catch (e) {
			console.log("Error setUnLikeToComment");
		}
	},
);

export const createPost = createAsyncThunk(
	"feed/sendTweetTC",
	async (payload: CreatePostInterface, { dispatch }) => {
		try {
			await feedAPI.createPost(payload);
			dispatch(getFeedData({ section: "forYou", page: 1, pageLimit: 10 }));
		} catch (err) {
			console.error("Error createPost", err);
		}
	},
);

export const getCommentsFromPost = createAsyncThunk(
	"feed/getCommentsFromPost",
	async (payload: GetCommentsPayload, { dispatch }) => {
		try {
			dispatch(setIsFetching(true));
			const { postId } = payload;
			const response = await feedAPI.getCommentsFromPost(postId);

			dispatch(setCommentsFromPost(response));
			dispatch(setIsFetching(false));
		} catch (err) {
			console.log("Error getCommentsFromPost", err);
			dispatch(setIsFetching(false));
		}
	},
);

export const createComment = createAsyncThunk(
	"feed/createComment",
	async (payloadThunk: CreateCommentInterface, { dispatch }) => {
		try {
			console.log("payload thunk", payloadThunk);
			dispatch(setIsFetching(true));
			const { feedId, commentsCount, payload } = payloadThunk;

			await feedAPI.sendComment(feedId, payload);
			dispatch(setCountComments({ feedId, commentsCount }));
			const response = await feedAPI.getCommentsFromPost(feedId);

			dispatch(setCommentsFromPost(response));
			dispatch(setIsFetching(false));
		} catch (err) {
			console.log("Error sendCommentTC", err);
			dispatch(setIsFetching(false));
		}
	},
);

export const setLikeToComment = createAsyncThunk(
	"feed/setLikeToComment",
	async (payload: SetLikeToCommentInterface, { dispatch }) => {
		try {
			const { isLiked, itemId, likeCount } = payload;

			if (isLiked) {
				dispatch(setCommentUnLikeAC({ itemId, likeCount }));
			} else {
				dispatch(setCommentLikeAC({ itemId, likeCount }));
			}
			await feedAPI.setLikeToComment(itemId);
		} catch (err) {
			console.log("Error send");
		}
	},
);

export const feedSlice = createSlice({
	name: "feed",
	initialState,
	reducers: {
		toggleBarVisibleAC: (state, action) => (state.barVisible = action.payload.tabBarVisible),
		setLike: (state, action) => {
			state.feedItems = updateNewsObjectInArray(state.feedItems, action.payload.itemId, "id", {
				liked: true,
				likeCount: action.payload.likeCount + 1,
			});
		},
		setUnLike: (state, action) => {
			state.feedItems = updateNewsObjectInArray(state.feedItems, action.payload.itemId, "id", {
				liked: false,
				likeCount: action.payload.likeCount === 0 ? 0 : action.payload.likeCount - 1,
			});
		},
		setCountComments: (state, action) => {
			state.feedItems = updateCommentsCountObjectInArray(
				state.feedItems,
				action.payload.feedId,
				"id",
				{
					commentsCount: action.payload.commentsCount + 1,
				},
			);
		},
		setVote: (state, action) => {
			state.feedItems = updateVotesObjectInArray(
				state.feedItems,
				action.payload.postId,
				action.payload.choiceId,
				{
					isVoted: true,
					votes: action.payload.votes + 1,
				},
			);
		},
		setSection: (state, action) => {
			state.section = action.payload;
		},
		setTweetLike: (state, action) => {
			state.feedItems = updateTweetObjectInArray(state.feedItems, action.payload.itemId, "id", {
				liked: true,
				likesCount: action.payload.likesCount + 1,
			});
		},
		setTweetUnLike: (state, action) => {
			state.feedItems = updateTweetObjectInArray(state.feedItems, action.payload.itemId, "id", {
				liked: false,
				likesCount: action.payload.likesCount === 0 ? 0 : action.payload.likesCount - 1,
			});
		},
		setFeedData: (state, action) => {
			state.feedItems = [...action.payload];
		},
		setFeedDataMore: (state, action) => {
			state.feedItems = [...state.feedItems, ...action.payload];
		},
		setFeedLatestData: (state, action) => {
			state.feedItems = [...action.payload];
		},
		setFeedForYouData: (state, action) => {
			state.feedItems = [...action.payload];
		},
		resetFeedData: (state, action) => {
			state.feedItems = [...action.payload];
		},
		setCommentsFromPost: (state, action) => {
			state.comments = action.payload;
		},
		setCommentLikeAC: (state, action) => {
			state.comments = updateCommentsArray(state.comments, action.payload.itemId, "id", {
				isLiked: true,
				likeCount: action.payload.likeCount + 1,
			});
		},
		setCommentUnLikeAC: (state, action) => {
			state.comments = updateCommentsArray(state.comments, action.payload.itemId, "id", {
				isLiked: false,
				likeCount: action.payload.likeCount - 1,
			});
		},
		setIsFetching: (state, action) => {
			state.isFetching = action.payload;
		},
		setIsOpenedModal: (state, action) => {
			state.isOpenedModal = action.payload;
		},
		setIsFirstLoad: (state, action) => {
			state.isFirstLoad = action.payload;
		},
		setPostLink: (state, { payload }) => {
			state.postLink = payload;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(getFeedData.rejected, (): void => {
			throw Error("No data");
		});
		builder.addCase(getCommentsFromPost.rejected, (): void => {
			throw Error("Error with getComments");
		});
		builder.addCase(createComment.rejected, (): void => {
			throw Error("Error with sendComment");
		});
	},
});

//Interfaces

export const feedPostsType = typeof initialState;
interface GetFeedDataInterface {
	section: string;
	page: number;
	pageLimit: number;
	isLoadMore?: boolean;
}
interface CreatePostInterface {
	text: string;
	poll: Choice[];
	pictures: string[];
}
interface SetLikeToPostInterface {
	itemId: number;
	likeCount: number;
	isLiked: boolean;
}

interface SetVoteToPollInterface {
	choiceId: string;
	postId: number;
	votes: number;
}

interface GetCommentsPayload {
	postId: number;
}
interface CreateCommentInterface {
	feedId: number;
	commentsCount: number;
	payload: {
		text: string;
		isReply: boolean;
		gifsList: string;
		replyUser?: string;
	};
}
interface SetLikeToCommentInterface {
	itemId: number;
	likeCount: number;
	isLiked: boolean;
}

export const {
	toggleBarVisibleAC,
	setLike,
	setUnLike,
	setVote,
	setTweetLike,
	setFeedDataMore,
	setTweetUnLike,
	setFeedData,
	setSection,
	setFeedLatestData,
	setCountComments,
	setFeedForYouData,
	resetFeedData,
	setCommentsFromPost,
	setCommentLikeAC,
	setCommentUnLikeAC,
	setIsFetching,
	setIsOpenedModal,
	setIsFirstLoad,
	setPostLink
} = feedSlice.actions;
