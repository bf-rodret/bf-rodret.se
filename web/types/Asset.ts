import {SanityImageSource, SanityImageMetadata} from "@sanity/asset-utils";

export type AssetType = SanityImageSource & {
	metadata?: SanityImageMetadata;
}