import Image from 'next/image'
import PropTypes from 'prop-types'
import { urlFor } from '../../lib/sanity'

/**
 * Intrinsic-layout image for Sanity assets. Uses width/height from asset metadata;
 * no fill, no object-cover, no aspect-ratio wrappers. Sharp, stable rendering.
 * Used on Sanity project pages and homepage featured projects.
 */
function SanityImage({ image, alt = '', priority = false, className = 'w-full h-auto rounded-2xl', ...props }) {
  if (!image?.asset) return null

  const dimensions = image?.asset?.metadata?.dimensions
  const width = dimensions?.width ?? 1200
  const height = dimensions?.height ?? 900

  const src = urlFor(image).width(width).quality(85).auto('format').url()

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      loading={priority ? 'eager' : 'lazy'}
      quality={85}
      {...props}
    />
  )
}

SanityImage.propTypes = {
  image: PropTypes.shape({
    asset: PropTypes.shape({
      metadata: PropTypes.shape({
        dimensions: PropTypes.shape({
          width: PropTypes.number,
          height: PropTypes.number,
        }),
      }),
    }),
  }),
  alt: PropTypes.string,
  priority: PropTypes.bool,
  className: PropTypes.string,
}

export default SanityImage
