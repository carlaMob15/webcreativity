import Link from 'next/link'
import clsx from 'clsx'

const variantStyles = {
  primary:
    'rounded-md bg-primary-600 font-semibold text-white hover:bg-primary-500 active:bg-primary-700 active:text-white/90 dark:bg-primary-500 dark:hover:bg-primary-400 dark:active:bg-primary-600 dark:active:text-white/90 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900 hover:scale-105 active:scale-95',
  secondary:
    'rounded-md bg-neutral-100 font-medium text-neutral-900 hover:bg-neutral-200 active:bg-neutral-300 active:text-neutral-900/80 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700 dark:active:bg-neutral-600 dark:active:text-neutral-100/80 focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900 hover:scale-105 active:scale-95',
  outline:
    'rounded-md border border-neutral-300 bg-transparent font-medium text-neutral-700 hover:bg-neutral-50 active:bg-neutral-100 active:text-neutral-900/60 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800/50 dark:hover:text-neutral-50 dark:active:bg-neutral-800 dark:active:text-neutral-50/70 focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900 hover:scale-105 active:scale-95',
  headerContact:
    'rounded-full bg-[#6366f1] font-medium text-white hover:bg-[#4f46e5] active:bg-[#4338ca] active:text-white/90 transition-colors duration-200 ease-in-out focus:ring-2 focus:ring-[#6366f1] focus:ring-offset-2 dark:focus:ring-offset-neutral-900',
}

export function Button({ variant = 'primary', className, href, children, ...props }) {
  className = clsx(
    'inline-flex items-center gap-2 justify-center py-2 px-5 text-sm outline-offset-2 focus:outline-none',
    variant === 'headerContact' ? 'transition-colors duration-300 ease-in-out' : 'transition-all duration-300 ease-in-out',
    variantStyles[variant],
    className
  )

  return href ? (
    <Link href={href} className={className} {...props}>
      {children}
    </Link>
  ) : (
    <button className={className} {...props}>
      {children}
    </button>
  )
}
