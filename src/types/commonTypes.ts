import Animated from "react-native-reanimated";
import { Path } from "react-native-redash";

import { PollType } from "../components/ArticleSmall/ArticleSmall";

export enum Indicators {
	RSI = "RSI",
	EMA = "EMA",
	MACD = "MACD",
	OBV = "OBV",
	ADX = "ADX",
	TEMA = "TEMA",
	GMMA = "GMMA",
	BB = "BB",
}

export enum PriceColors {
	BULLISH = "#0c7d6a",
	BEARISH = "#eb0046",
	CURRENT = "#252525",
}

export type ProfileType = {
	id?: number;
	firstName: string;
	secondName?: string;
	birthDay?: string;
};

export enum VerificationType {
	NOT_VERIFIED = "NOT_VERIFIED",
	PENDING = "PENDING",
	VERIFIED = "VERIFIED"
}

export enum PlatformType {
	ANDROID = "android",
	IOS = "ios"
}

export type PortfolioType = {
	performance: PerformanceType | null;
	financialAssets: FinancialAssetsType | null;
};

export type PortfolioInvestmentType = {
	logo: string;
	assetName: string;
	assetCompanyName: string;
	assetCount: number;
	assetPrice: number;
	changesPercentage: number;
	price: number;
};

export type NewsDataType = {
	title: string;
	publishedAt: string;
};

export type NewsType = {
	newsItems: Array<NewsDataType>;
	barVisible: boolean;
	isFetching: boolean;
};

export type UserType = {
	profile: {
		firstName: string | null;
	};
	wallet: WalletType | null;
	portfolio: {
		totalBalanceNow: null | number;
		totalBalancePrevDay: null | number;
	};
	isFetching: boolean;
};

export type WalletType = {
	userBalance: null | string;
	id?: number;
	amount: number | null;
	amountRest: string | null;
	currency?: string;
	payments?: Array<any>;
};

export type LoginType = {
	userId: number | null;
	username: null | string;
	firstName: string | null;
	lastName: string | null;
	userBalance: number | null;
	portfolio: PortfolioType;
	history: HistoryItemType | null;
	isLogin: boolean;
	isFetching: boolean;
	isSignUpSuccessfully: boolean;
	errorMessage: string | null;
	isLoginSuccessfully: string | null;
};

export type ChartType = {
	name: string;
	ticker: string;
	volume: number;
	livePrice: number;
	data: CandleType[] | [];
	isFetchingChart: boolean;
	isFetchingWatchlist: boolean;
	activeIndicator: string;
	current: ChartCurrentType | null;
	watchlist: WatchListType | null;
	searchResult: SearchResultsItemType[] | [];
	search: string;
	tabBarVisible: boolean;
};

export type ChartCurrentType = {
	price: number;
	volume: number;
	candle: CandleType;
};

export type CandleType = {
	open: number;
	high: number;
	low: number;
	close: number;
	volume: number;
	date: string;
};

export type SearchType = {
	searchResults: Array<SearchResultsItemType>;
	companyDescription: CompanyDescriptionType | null;
	playlists: PlaylistItemType[];
	playlistExtendedData: PlaylistExtendedDataItemType[];
	playlistExtendedDescription: string | null;
	playlistExtendedTitle: string | null;
	playlistExtendedImage: string | null;
	playlistExtendedGradientBg: string;
	financialStatement: FinancialsItemType[];
	earningSurprise: EarningSurpriseItemType[];
	companyDescriptionPlaylists: PlaylistItemDataType[] | null;
	isFetching: boolean;
};

export type EarningSurpriseItemType = {
	date: string;
	ticker: string;
	actualEarningResult: number;
	estimatedEarning: number;
};

export type PlaylistItemType = {
	playlists: PlaylistItemDataType[];
	category: string;
	page?: number;
	id: number;
};

export type PlaylistItemDataType = {
	title: string;
	id: number;
	page?: number;
	tickers: string[];
	imageURL: string;
};

export type PlaylistExtendedDataItemType = {
	company: string;
	name: string;
	amg: number;
	marketCapitalization: number | string | any;
};

export type HistoryItemType = {
	companyName?: string;
	ticker: string;
	amount: number;
	orderType: string;
	orderDate: string;
	price?: number;
	totalPrice: number;
	logoUrl: string;
};

export type HistoryType = {
	date: string;
	history: HistoryItemType[];
};

export type CompanyDescriptionType = {
	symbol: string;
	name: string;
	change: number;
	changesPercentage: number;
	price: number;
	image: string;
	amg: number;
	description: string;
	beta: number;
	volAvg: number;
	insiderOwn: number;
	instOwn: number;
	targetPrice: number;
	peRatioTTM: number;
	dividendYielPercentageTTM: number;
	returnOnAssetsTTM: number;
	returnOnEquityTTM: number;
	marketCap: number;
	eps: number;
	recom: number;
	historical: CompanyHistoricalDataType[];
	currentRatio: number;
	leverageRatio: number;
	nextEarningsDate: string;
	dividendYieldTTM: number;
};

export type CompanyHistoricalDataType = {
	close: number;
	date: string;
};

export type WatchListType = {
	watchListId?: number;
	tickers: WatchListItemType[]; //watchListData
};

export enum Exchanges {
	CRYPTO = "CRYPTO",
	NASDAQ = "NASDAQ",
}

export type WatchListItemType = {
	symbol: string;
	name: string;
	image: string;
	exchange: Exchanges;
	price: number;
	change: number;
	changesPercentage: number;
};

export type SearchResultsItemType = {
	ticker: string;
	companyName: string;
	itemType: string;
};

export type RegistrationFormType = {
	email: string;
	password: string;
};

export type ConfirmationCodeType = {
	id: number;
	value: number | string;
	active: boolean;
};

export type FeedType = {
	feedItems: Array<FeedItemsItemType>;
	commentsItems: Array<CommentsItemType> | null;
	barVisible: boolean;
	isFetching: boolean;
};

export type FeedItemsItemType = {
	tweet?: FeedItemsTweetType;
	news?: FeedItemsNewsType;
	post: FeedItemsPostType;
};

export type FeedItemsTweetType = {
	id: number;
	userLogo: string;
	content: string;
	publishedAt: string;
	username: string;
	liked: boolean;
	likesCount: number;
};

export type FeedItemsNewsType = {
	id: number;
	type: string;
	publishedAt: string;
	title: string;
	about: Array<string>;
	keyPoints: Array<string>;
	likes: null;
	likeCount: number;
	liked: boolean;
	logoLink: string;
};

export type FeedItemsPostType = {
	commentsCount: number;
	date: string;
	id: number;
	likesCount: number;
	isLiked: boolean;
	poll?: { choices: PollType[] };
	pictures?: string[];
	text: string;
	userFirstName: string;
	userId: number;
	userLastName: string;
	userLogo: string;
	username: string;
	videoUrl: string;
};

export type CommentsItemType = {
	id: number;
	firstName: string;
	username: string;
	lastName: string;
	content: string;
	publishedAt: string;
	likeCount: number;
	liked: boolean;
};
export type FinancialsItemType = {
	title: string;
	current: number;
	qq: number;
	yy: number;
	date: string | null;
};

export type TerminalType = {
	item: TerminalItemType | null;
	isFetching: boolean;
};

export type TerminalItemType = {
	ticker: string;
	itemName: string;
	logo: string;
	price: number;
	change: number;
	changesPercentage: number;
};

export type TerminalItemUpdateType = {
	price: number;
	change: number;
	changesPercentage: number;
};

export type TerminalFinancialRequestItem = {
	companyName: string;
	ticker: string;
	amount: number;
	orderType: "BUY" | "SELL";
	orderDate: string;
	price: number;
	logoUrl: string;
};

export type GraphType = {
	pathArea: Path;
	pathLine: Path;
	minDate: number;
	maxDate: number;
	minPrice: number;
	maxPrice: number;
};

export type FinancialAssetType = {
	amount: number;
	usdAmount: number;
	change: number;
	changesPercentage: number;
	logoUrl: string;
	name: string;
	ticker: string;
};

export type PerformanceHistoryItemType = {
	date: string;
	price: number;
};

export type PerformanceType = {
	id: number;
	value: number;
	change: number;
	changesPercentage: number;
	history: PerformanceHistoryItemType[];
};

export type FinancialAssetsType = FinancialAssetType[];

export type ChartHookArgs = {
	height: number;
	candleWidth: number;
	data: CandleType[];
};

export type ChartHookResult = {
	translateX: Animated.SharedValue<number>;
	translateXLongPress: Animated.SharedValue<number>;
	translateXLongPressLabel: Animated.SharedValue<number>;
	translateYLongPress: Animated.SharedValue<number>;
	opacityLongPress: Animated.SharedValue<number>;
	zoom: Animated.SharedValue<number>;
	zoomOffsetX: Animated.SharedValue<number>;
	domain: Animated.SharedValue<[number, number]>;
	range: Animated.SharedValue<[number, number]>;
	gestureActive: boolean;
	onGestureEventSlide: (args: any) => any;
	onGestureEventPanLongPress: (args: any) => any;
	onGestureEventPinch: (args: any) => any;
	checkActiveEvent: (args: any) => any;
	onLongPress: (args: any) => void;
};

export type ChartHook = (chartHookArgs: ChartHookArgs) => ChartHookResult;
export interface CandleProps {
	candle: CandleType;
	index: number;
	width: number;
	domain: [number, number];
}

export interface UsersSearchResult {
	id: number;
	username: string;
	email: string;
	avatar: string;
}

export enum Currency {
	BTC = "BTC",
	ETH = "ETH",
	CLSH = "CLSH",
}

export interface TransferData {
	amount: string;
	cryptoCurrency: Currency;
	recipientId: number;
	senderId: number;
}

export interface WalletData {
	id: string;
	currency: Currency;
	customerId: string;
	xpub: string;
	balance: {
		accountBalance: number;
		availableBalance: number;
	};
	frozen: boolean;
	active: boolean;
	address: string;
}

export interface Member {
	avatarLink: string | null;
	userId: number;
	username: string;
}

export interface ChatType {
	chatId: number;
	creationDate: Date;
	creatorId: number;
	members: Member[];
	name: string;
	lastMessage: Message;
}

export interface Message {
	text: string;
	userId: number;
	creationDate: Date;
	files: string[];
}

export interface ILoginResponse {
	token: string;
	tokenType: string;
}

export interface IAssetInfo {
	assetName: string;
	assetTicker: string;
	livePrice: number;
}
