import { OrderType } from "../../features/terminal-order/model/types";
import { Fonts, FontStyles } from "./fonts";
import { HEIGHT, WIDTH } from "../../constants/sizes";
import { sc } from "../../helpers/sizeConverter";

export type UnixDate = number;

export type Padding = {
	top?: number;
	right?: number;
	bottom?: number;
	left?: number;
};

export type FontProp = {
	size?: number,
	style?: FontStyles,
	family?: Fonts,
};

export type CurrencyPair = {
	basic: string;
	quoted: string;
};

export enum TimeFrame {
	FIVE_MINUTES = "FIVE_MINUTES",
	THIRTY_MINUTES = "THIRTY_MINUTES",
	ONE_HOUR = "ONE_HOUR",
	FOUR_HOUR = "FOUR_HOUR",
}

export enum OrderTypes {
	BUY = "BUY",
	SELL = "SELL",
}

export enum LimitType {
	LIMIT = "Limit",
	MARKET = "Market",
}

export enum Currencies {
	BTC = "BTC",
	ETH = "ETH",
	USDT = "USDT",
}

export enum Exchanges {
	NASDAQ = "NASDAQ",
	CRYPTO = "CRYPTO",
}

export interface Order {
	companyName?: string;
	ticker: string;
	amount: number;
	orderType: OrderTypes;
	orderDate: string;
	price?: number;
	totalPrice: number;
	logoUrl: string;
}

export interface CryptoOrder {
	amount: number;
	firstCurrency: string;
	isPriceSet?: boolean;
	orderType: OrderType;
	price: string;
	secondCurrency: string;
	userId: number;
}

export interface IMarketDataRequest {
	ticker: string;
	timeFrame: string;
	to: UnixDate;
}
export type SizeType = number | string;

export interface ISize {
	width?: SizeType;
	height?: SizeType;
	fontSize?: number;
}

export interface IButtonColors {
	text?: string;
	background?: string;
	disabledBackground?: string;
}
// TODO: move to proper place
const HANDLE_SIZE = sc(20);

export enum Direction {
	TO_TOP = HEIGHT - HANDLE_SIZE,
	TO_BOTTOM = -HEIGHT + HANDLE_SIZE,
	TO_LEFT = WIDTH - HANDLE_SIZE,
	TO_RIGHT = -WIDTH + HANDLE_SIZE,
}

export enum SecurityScreens {
	MENU = "SecurityMenu",
	EMAIL = "EmailScreen",
	EMAIL_CODE = "EmailCodeScreen",
	OLD_PASSWORD = "OldPasswordScreen",
	NEW_PASSWORD = "NewPasswordScreen",
	SECURITY_PASSWORD = "SecurityPasswordScreen",
	TWO_STEP_VERIFICATION = "TwoStepVerifcationScreen",
	SUCCESS_CHANGE = "SuccessChangeScreen",
	PASSCODE_LOCK = "PasscodeLockScreen",
}
