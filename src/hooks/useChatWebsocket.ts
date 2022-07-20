import { useEffect } from "react";
import SockJS from "sockjs-client";
import Stomp, { Frame, SubscribeHeaders, Message, ConnectionHeaders } from "webstomp-client";

interface Sub {
	dest: ((deps: any) => string) | string;
	headers: SubscribeHeaders;
	onMessage: (message: Message) => any;
}

interface WebSocketStompParams {
	brokerUrl: string;
	subs: Sub[];
	headers?: ConnectionHeaders;
	onError?: (error: Frame | any) => any;
	onConnect?: (frame: Frame | undefined) => any;
}

export const useChatWebsocket = (
	{ brokerUrl, subs, headers, onError, onConnect }: WebSocketStompParams,
	deps: any[] = [],
) => {
	const subscriptions = new Map();
	const sock = new SockJS(brokerUrl);
	const client = Stomp.over(sock);
	const deactivate = () => {
		client.disconnect();
	};

	useEffect(() => {
		const connect = (frame: Frame | undefined) => {
			if (onConnect) {
				onConnect(frame);
			}

			subs.forEach(({ dest, headers: subscirbeHeaders, onMessage }) => {
				const destination = typeof dest === "string" ? dest : dest(deps);
				const sub = client.subscribe(destination, onMessage, subscirbeHeaders);

				subscriptions.set(dest, sub);
			});
		};

		client.connect(headers || {}, connect, onError);
	}, deps);

	return {
		deactivate,
		subscriptions,
	};
};
