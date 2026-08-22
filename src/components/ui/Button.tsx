import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';

import { cn } from '../../utils/cn';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    fullWidth?: boolean;
    isLoading?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
    primary: 'bg-brand-600 text-surface-50 hover:bg-brand-500 focus-visible:ring-brand-500',
    secondary: 'bg-surface-100 text-surface-900 hover:bg-surface-200 dark:bg-surface-700 dark:text-surface-50 dark:hover:bg-surface-600 focus-visible:ring-surface-400',
    outline: 'border-2 border-surface-300 text-surface-900 hover:border-brand-500 hover:text-brand-600 dark:border-surface-600 dark:text-surface-50 dark:hover:border-brand-500 dark:hover:text-brand-400 focus-visible:ring-brand-500',
    ghost: 'text-surface-900 hover:bg-surface-100 dark:text-surface-50 dark:hover:bg-surface-800 focus-visible:ring-surface-400',
    danger: 'bg-error-500 text-white hover:bg-error-600 focus-visible:ring-error-500',
};

const sizeClasses: Record<ButtonSize, string> = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-5 text-base',
    icon: 'h-10 w-10 p-0',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            variant = 'primary',
            size = 'md',
            fullWidth = false,
            isLoading = false,
            leftIcon,
            rightIcon,
            disabled,
            className,
            children,
            type = 'button',
            ...props
        },
        ref
    ) => {
        const isDisabled = disabled || isLoading;

        return (
            <button
                ref={ref}
                type={type}
                disabled={isDisabled}
                aria-busy={isLoading || undefined}
                className={cn(
                    'inline-flex cursor-pointer items-center justify-center gap-2 rounded-md font-medium transition-colors',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-50 dark:focus-visible:ring-offset-surface-900',
                    'disabled:cursor-not-allowed disabled:opacity-50',
                    variantClasses[variant],
                    sizeClasses[size],
                    fullWidth && 'w-full',
                    className
                )}
                {...props}
            >
                {leftIcon}
                {children}
                {rightIcon}
            </button>
        );
    }
);

Button.displayName = 'Button';

export { Button };
