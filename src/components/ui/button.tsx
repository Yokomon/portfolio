import * as React from 'react'

import { cn } from '@/utils/cn'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface BaseButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  children: React.ReactNode
}

type ButtonAsButton = BaseButtonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { as?: 'button' }

type ButtonAsAnchor = BaseButtonProps & React.AnchorHTMLAttributes<HTMLAnchorElement> & { as: 'a' }

type ButtonProps = ButtonAsButton | ButtonAsAnchor

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-[linear-gradient(135deg,#f97316,#ef4444)] text-white shadow-[0_18px_40px_-20px_rgba(249,115,22,0.55)] hover:shadow-[0_22px_50px_-18px_rgba(239,68,68,0.5)]',
  secondary:
    'bg-slate-900/90 text-white dark:bg-white/10 dark:text-white shadow-[0_18px_40px_-20px_rgba(15,23,42,0.45)] hover:bg-slate-900 dark:hover:bg-white/20',
  outline:
    'bg-transparent border border-slate-200/70 dark:border-slate-700/80 text-slate-900 dark:text-slate-100 hover:bg-slate-900/5 dark:hover:bg-white/10',
  ghost:
    'bg-transparent text-slate-900 dark:text-slate-100 hover:bg-slate-900/5 dark:hover:bg-white/10',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-10 px-4 text-sm rounded-xl',
  md: 'h-12 px-5 text-base rounded-2xl',
  lg: 'h-14 px-6 text-lg rounded-3xl',
}

const baseStyles =
  'group relative inline-flex items-center justify-center gap-2 font-semibold tracking-tight transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/80 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950'

const hoverOverlayStyles =
  'pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100'

const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, as, children, ...rest }, ref) => {
    const composedClasses = cn(baseStyles, sizeStyles[size], variantStyles[variant], className)

    if (as === 'a') {
      const anchorProps = rest as React.AnchorHTMLAttributes<HTMLAnchorElement>

      return (
        <a ref={ref as React.Ref<HTMLAnchorElement>} className={composedClasses} {...anchorProps}>
          <span className='relative z-10 flex items-center gap-2'>{children}</span>
          {variant === 'primary' ? (
            <span className={cn(hoverOverlayStyles, 'bg-white/20 blur-[2px]')} />
          ) : (
            <span className={cn(hoverOverlayStyles, 'bg-white/10 dark:bg-white/20')} />
          )}
        </a>
      )
    }

    const { type, ...buttonProps } = rest as React.ButtonHTMLAttributes<HTMLButtonElement>

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={composedClasses}
        type={type ?? 'button'}
        {...buttonProps}
      >
        <span className='relative z-10 flex items-center gap-2'>{children}</span>
        {variant === 'primary' ? (
          <span className={cn(hoverOverlayStyles, 'bg-white/20 blur-[2px]')} />
        ) : (
          <span className={cn(hoverOverlayStyles, 'bg-white/10 dark:bg-white/20')} />
        )}
      </button>
    )
  },
)

Button.displayName = 'Button'

export { Button }
