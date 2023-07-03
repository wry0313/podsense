import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
    className,
    children,
    disabled,
    type = "button",
    ...props
}, ref) => {
    return (
        <button
        aria-label='button'
        type={type} 
        className={twMerge(`w-full 
        rounded-xl 
        bg-neutral-100
        dark:bg-dark-100
        border 
        border-transparent 
        px-3 
        py-3
        disabled:cursor-not-allowed 
        disabled:opacity-75
        font-bold
        transition
        `, className)}
        disabled={disabled}
        ref={ref}
        {...props}
        >
            { children}
        </button>
    )
})

Button.displayName = "Button"
 
export default Button;