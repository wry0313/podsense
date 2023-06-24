"use client"

import * as RadixSlider from "@radix-ui/react-slider"

const Slider = ({
    value=1,
    defaultValue,
    max,
    step,
    ariaLabel,
    sliderHeight=4,
    onChange
}: {
    value?: number;
    defaultValue: number[];
    max: number;
    step: number;
    ariaLabel: string;
    sliderHeight?: number;
    onChange?: (value:number) => void
}) => {
    const handleChange = (newValue: number[]) => {
        onChange?.(newValue[0])
    }
    return ( 
        <RadixSlider.Root
            className="group relative flex items-center select-none touch-none w-full h-4 cursor-pointer"
            defaultValue={defaultValue}
            value={[value]}
            onValueChange={handleChange}
            max={max}
            step={step}
            aria-label={ariaLabel}
        >
            <RadixSlider.Track className={`relative bg-white grow rounded-full h-[${sliderHeight}px]`}>
                <RadixSlider.Range className="absolute bg-black rounded-full h-full" />
            </RadixSlider.Track>
            <RadixSlider.Thumb className="invisible group-hover:visible block w-[10px] h-[10px] bg-amber-200 shadow-md rounded-2xl" aria-label="Volume" />
        </RadixSlider.Root>
     );
}
 
export default Slider;