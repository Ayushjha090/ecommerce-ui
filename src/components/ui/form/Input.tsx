import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';

import { cn } from '../../../utils/cn';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    /** Icon or element rendered on the left side inside the input */
    startAdornment?: ReactNode;
    /** Icon or element rendered on the right side inside the input */
    endAdornment?: ReactNode;
    /** Visual state, commonly mapped from form validation state */
    hasError?: boolean;
    /** Extra classes applied to the outer wrapper div */
    containerClassName?: string;
    /** @deprecated Use containerClassName instead. */
    wrapperClassName?: string;
    /** Extra classes applied to both adornment spans */
    adornmentClassName?: string;
    /** Extra classes applied only to the start adornment */
    startAdornmentClassName?: string;
    /** Extra classes applied only to the end adornment */
    endAdornmentClassName?: string;
}

/**
 * Bare input: no label, no error text.
 * Fully compatible with react-hook-form via {...register('field')}.
 * Use <Field> if you want label + error message bundled together.
 */
const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            startAdornment,
            endAdornment,
            hasError = false,
            containerClassName,
            wrapperClassName,
            adornmentClassName,
            startAdornmentClassName,
            endAdornmentClassName,
            className,
            disabled,
            ...props
        },
        ref
    ) => {
        const hasStart = Boolean(startAdornment);
        const hasEnd = Boolean(endAdornment);

        return (
            <div className={cn('relative flex items-center', containerClassName, wrapperClassName)}>
                {hasStart && (
                    <span
                        className={cn(
                            'pointer-events-none absolute left-3 flex items-center text-surface-400 dark:text-surface-500',
                            adornmentClassName,
                            startAdornmentClassName
                        )}
                    >
                        {startAdornment}
                    </span>
                )}

                <input
                    ref={ref}
                    disabled={disabled}
                    className={cn(
                        // Base
                        'w-full rounded-md border-2 bg-transparent p-2 text-sm transition-colors',
                        'text-surface-900 placeholder-surface-400',
                        'dark:text-surface-200 dark:placeholder-surface-500',
                        // Border
                        'border-surface-300 dark:border-surface-600',
                        // Focus
                        'focus:outline-none focus:border-brand-500 dark:focus:border-brand-500',
                        // Error
                        hasError && 'border-red-500 dark:border-red-500 focus:border-red-500',
                        // Disabled
                        'disabled:cursor-not-allowed disabled:opacity-50',
                        hasStart && 'pl-9',
                        hasEnd && 'pr-9',
                        className
                    )}
                    {...props}
                />

                {hasEnd && (
                    <span
                        className={cn(
                            'absolute right-3 flex items-center text-surface-400 dark:text-surface-500',
                            adornmentClassName,
                            endAdornmentClassName
                        )}
                    >
                        {endAdornment}
                    </span>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';

export { Input };
