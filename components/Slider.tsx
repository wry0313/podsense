"use client"

import * as RadixSlider from "@radix-ui/react-slider"

const Slider = ({
    value=1,
    defaultValue,
    max,
    step,
    ariaLabel,
    onChange,
    onCommit,
    isLoading=false
}: {
    value?: number;
    defaultValue: number[];
    max: number;
    step: number;
    ariaLabel: string;
    onChange?: (value:number) => void
    onCommit?: (value:number) => void
    isLoading?: boolean
}) => {
    const handleChange = (newValue: number[]) => {
        onChange?.(newValue[0])
    }
    const handleCommit = (newValue: number[]) => {
        onCommit?.(newValue[0])
    }
    const barColor = isLoading ? 'animate-pulse' : ''
    return ( 
        <RadixSlider.Root
            className="group relative flex items-center select-none touch-none w-full h-4 cursor-pointer"
            defaultValue={defaultValue}
            value={[value]}
            onValueChange={handleChange}
            onValueCommit={handleCommit}
            max={max}
            step={step}
            aria-label={ariaLabel}
        >
            <RadixSlider.Track className={`relative grow rounded-full h-[4px] bg-white dark:bg-neutral-500`}>
                <RadixSlider.Range className={"absolute bg-black dark:bg-white rounded-full h-full " + barColor} />
            </RadixSlider.Track>
            <RadixSlider.Thumb className="invisible group-hover:visible block w-[10px] h-[10px] bg-amber-200 shadow-md rounded-2xl" aria-label="Volume" />
        </RadixSlider.Root>
     );
}
 
export default Slider;