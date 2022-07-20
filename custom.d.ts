declare module "*.svg" {
	const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;

	export default content;
}
declare module "@env" {
	export const POLYGON_API_KEY: string;
}
