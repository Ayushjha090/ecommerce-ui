import { useId, type ReactNode, type LabelHTMLAttributes } from 'react';

import { Input, type InputProps } from './Input';
import { cn } from '../../../utils/cn';

export interface FieldMessageRenderProps {
    id: string;
    error?: ReactNode;
    hint?: ReactNode;
    isErrored: boolean;
}

export interface FieldProps extends InputProps {
    /** Renders a <label> above the input when provided */
    label?: ReactNode;
    /** Error message shown below the input — also sets hasError on the input */
    error?: ReactNode;
    /** Helper text shown below the input when there's no error */
    hint?: ReactNode;
    /** Extra classes for the outer field wrapper */
    fieldClassName?: string;
    /** Extra classes for the label element */
    labelClassName?: string;
    /** Extra classes for the error / hint text */
    messageClassName?: string;
    /** Pass a stable id — one is auto-generated if omitted */
    id?: string;
    /** Render prop — gives you full control over the label slot */
    renderLabel?: (htmlFor: string) => ReactNode;
    /** Render prop — full control over the message slot while preserving accessibility ids */
    renderMessage?: (props: FieldMessageRenderProps) => ReactNode;
    /** Additional props passed straight to <label> */
    labelProps?: Omit<LabelHTMLAttributes<HTMLLabelElement>, 'htmlFor' | 'className'>;
}

/**
 * Full field: label + input + error/hint message.
 * Works without a label (just omit the label prop).
 * Fully compatible with react-hook-form — spread {...register('field')} directly.
 *
 * @example — with react-hook-form
 * const { register, formState: { errors } } = useForm()
 * <Field label="Email" error={errors.email?.message} {...register('email')} />
 *
 * @example — without react-hook-form
 * <Field label="Email" value={email} onChange={e => setEmail(e.target.value)} />
 *
 * @example — no label
 * <Field placeholder="Search…" startAdornment={<Search className="w-4 h-4" />} />
 *
 * @example — custom label slot
 * <Field renderLabel={(id) => <label htmlFor={id}>Email <span>*</span></label>} />
 */
const Field = ({
    label,
    error,
    hint,
    fieldClassName,
    labelClassName,
    messageClassName,
    id: externalId,
    renderLabel,
    renderMessage,
    labelProps,
    // Input props
    hasError,
    'aria-describedby': ariaDescribedBy,
    ...inputProps
}: FieldProps) => {
    const generatedId = useId();
    const inputId = externalId ?? generatedId;
    const messageId = `${inputId}-message`;

    const isErrored = Boolean(error) || Boolean(hasError);
    const hasMessage = Boolean(error || hint) || Boolean(renderMessage);
    const describedBy = [
        ariaDescribedBy,
        hasMessage ? messageId : undefined,
    ].filter(Boolean).join(' ') || undefined;

    return (
        <div className={cn('flex flex-col gap-1.5', fieldClassName)}>
            {renderLabel ? (
                renderLabel(inputId)
            ) : label ? (
                <label
                    htmlFor={inputId}
                    className={cn(
                        'text-sm font-medium text-surface-900 dark:text-surface-50',
                        isErrored && 'text-red-500 dark:text-red-400',
                        labelClassName
                    )}
                    {...labelProps}
                >
                    {label}
                </label>
            ) : null}

            <Input
                id={inputId}
                hasError={isErrored}
                aria-describedby={describedBy}
                aria-invalid={isErrored ? true : undefined}
                {...inputProps}
            />

            {renderMessage ? (
                renderMessage({ id: messageId, error, hint, isErrored })
            ) : error ? (
                <p
                    id={messageId}
                    role="alert"
                    className={cn('text-xs text-red-500 dark:text-red-400', messageClassName)}
                >
                    {error}
                </p>
            ) : hint ? (
                <p
                    id={messageId}
                    className={cn('text-xs text-surface-400 dark:text-surface-500', messageClassName)}
                >
                    {hint}
                </p>
            ) : null}
        </div>
    );
};

Field.displayName = 'Field';

export { Field };
