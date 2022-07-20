import axios from "axios";

import { baseUrl, linkInterceptorsHelper } from "./api-helpers";
import { updateToken } from "./auth-api";

const settings = {};

const instance = axios.create({
	baseURL: baseUrl,
	...settings,
});

const guestInstance = axios.create({
	baseURL: baseUrl,
});

linkInterceptorsHelper(instance, updateToken);

//api

export const feedAPI = {
	async getPostsData (section: string, page: number, pageLimit: number) {
		const response = await guestInstance.get(`posts/${section}?page=${page}&pageLimit=${pageLimit}`);

		return response.data.posts;
	},
	async getTrendingGifs () {
		const response = await instance.get("gifs/trending");

		return response.data;
	},
	async getGifsByName (gifName: string) {
		try {
			const response = await instance.get(`gifs/${gifName}`);

			return response.data;
		} catch (e) {
			console.log("Error:", e);
		}
	},
	async setLikeToPost (postId: number) {
		try {
			const response = await instance.post(`posts/like?postId=${postId}`);

			return response.data;
		} catch (err) {
			console.log("Error setLikeToPost");
		}
	},
	async unSetLikeToPost (postId: number) {
		try {
			const response = await instance.post(`posts/dislike?postId=${postId}`);

			return response.data;
		} catch (err) {
			console.log("Error unSetLikeToPost");
		}
	},
	async unSetLikeToComment (commentId: number) {
		try {
			const response = await instance.put(`posts/comment/dislike?commentId=${commentId}`);

			return response.data;
		} catch (err) {
			console.log("Error unSetLikeToComment");
		}
	},
	async setVoteToPoll (postId: number, choiceId: string) {
		try {
			const response = await instance.put(`posts/${postId}/poll/vote?choiceId=${choiceId}`);

			return response.data;
		} catch (err) {
			console.log("Error setVote");
		}
	},
	async createPost (post: { text: string; pictures: string[] }) {

		const response = await instance.post("posts", { post }, {
			headers: {
				"Content-Type": "multipart/form-data",
				Accept: "*/*",
			},
		});

		console.log("response +>>", response);

		return response.data;
	},
	async getCommentsFromPost (postId: number) {
		try {
			const response = await guestInstance.get(`posts/${postId}/comments`);

			return response.data;
		} catch (err) {
			console.log("Error getCommentsFromPost", err);
		}
	},
	async sendComment (
		feedId: number,
		payload: {
			text: string;
			gifsList?: string;
			replyUser?: string;
		},
	) {
		const { text, replyUser, gifsList } = payload;
		const response = await instance.post("posts/comment", {
			postId: feedId,
			isReply: true,
			text,
			gifUrl: gifsList,
			replyTo: replyUser,
		});

		console.log("response =>>>", response.data);

		return response.data;
	},
	async setLikeToComment (commentId: number) {
		try {
			const response = await instance.put(`posts/comment/like?commentId=${commentId}`);

			return response.data;
		} catch (err) {
			console.log("Error setLikeToComment");
		}
	},
};
