import {getImageDimensions} from "@sanity/asset-utils";
import Image, {ImageProps} from "next/image";
import {urlFor} from "client";
import {AssetType} from 'types/Asset';

type Props = Omit<ImageProps, "src" | "height"> & {
  width?: number;
  height?: number;
  image: AssetType;
};

export default function SanityImage({width, height, image, ...props}: Props) {
  const {layout} = props;
  const scaling = 2; // Get Sanity image at 2x size for retina scaling
  let componentProps;
  let imageUrl;

  // Get the correct URL for Sanity
  if (image && image.asset) {
    imageUrl = (image.asset._ref).replace("image-", "").replace("-jpg", ".jpg").replace("-png", ".png").replace("-tif", ".tif");
    if (height && width) {
      // Later used in image-loader.ts
      imageUrl += "?ratio=" + width/height;
    }
  }

  // Make sure to keep aspect ratio if width or height props are missing
  const calculatedHeight = height
    ? height
    : width
    ? width / getImageDimensions(image).aspectRatio
    : undefined;
  const calculatedWidth = width
    ? width
    : height
    ? height * getImageDimensions(image).aspectRatio
    : undefined;
  const calculatedWidthString = calculatedWidth
    ? calculatedWidth.toString()
    : "";
  const calculatedHeightString = calculatedHeight
    ? calculatedHeight.toString()
    : "";

  // If we don't have an Image URL at this point, return an empty component
  if (!imageUrl) return null;

  if (layout && layout == "fill") {
    // Width and Height should be opmitted if using layout fill
    componentProps = {
      src: imageUrl,
      itemProp: "url contentUrl",
      ...props
    };
  } else {
    componentProps = {
      width: calculatedWidth,
      height: calculatedHeight,
      itemProp: "url contentUrl",
      src: imageUrl,
      ...props
    };
  }

  if (image.metadata && image.metadata.lqip) {
    componentProps.placeholder = "blur";
    componentProps.blurDataURL = image.metadata.lqip
  }

  return (
    <figure
      itemProp="image"
      itemScope
      itemType="https://schema.org/ImageObject"
    >
      <Image {...componentProps} />
      <meta itemProp="width" content={calculatedWidthString} />
      <meta itemProp="height" content={calculatedHeightString} />
    </figure>
  );
};
