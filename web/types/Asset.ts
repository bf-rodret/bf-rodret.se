import {SanityImageSource, SanityImageMetadata, SanityReference} from "@sanity/asset-utils";

export type AssetType = SanityImageSource & {
	metadata?: SanityImageMetadata;
	asset?: SanityReference;
}