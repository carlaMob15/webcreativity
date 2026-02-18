import PropTypes from 'prop-types'
import SanityImage from './SanityImage'
import { HiMagnifyingGlass } from 'react-icons/hi2'

/**
 * Wraps SanityImage with hover overlay, magnifier icon, scale-up, and click-to-open-lightbox.
 * Used on Sanity project detail pages for hero, imageSection, and imageGridSection.
 * Preserves intrinsic layout (no fill/object-cover).
 */
function ZoomableSanityImage({
  image,
  alt = '',
  index,
  onImageClick,
  priority = false,
  className = 'w-full h-auto rounded-2xl',
  wrapperClassName = '',
  roundedClass = 'rounded-2xl',
}) {
  if (!image?.asset) return null

  return (
    <button
      type="button"
      onClick={() => onImageClick(index)}
      className={`
        relative group overflow-hidden cursor-pointer block w-full text-left
        ${roundedClass}
        ${wrapperClassName}
      `}
      aria-label={`View image ${index + 1} in gallery`}
    >
      <div className="relative overflow-hidden rounded-[inherit]">
        <SanityImage
          image={image}
          alt={alt}
          priority={priority}
          className={`${className} transition-transform duration-500 ease-out transform-gpu group-hover:scale-[1.03] rounded-[inherit]`}
        />
        {/* Subtle gradient overlay — only above the image, no grey background */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/35 via-black/10 to-transparent rounded-[inherit]"
          aria-hidden
        />
        {/* Centred magnifier icon */}
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-[inherit]"
          aria-hidden
        >
          <div className="opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition duration-300 bg-white/10 backdrop-blur-sm p-4 rounded-full border border-white/10">
            <HiMagnifyingGlass className="w-8 h-8 text-white" />
          </div>
        </div>
      </div>
    </button>
  )
}

ZoomableSanityImage.propTypes = {
  image: PropTypes.shape({
    asset: PropTypes.object,
  }),
  alt: PropTypes.string,
  index: PropTypes.number.isRequired,
  onImageClick: PropTypes.func.isRequired,
  priority: PropTypes.bool,
  className: PropTypes.string,
  wrapperClassName: PropTypes.string,
  roundedClass: PropTypes.string,
}

export default ZoomableSanityImage
