"use client"

import * as RadixSlider from "@radix-ui/react-slider"

const Slider = ({
    value=1,
    onChange
}: {
    value?: number;
    onChange?: (value:number) => void
}) => {
    const handleChange = (newValue: number[]) => {
        onChange?.(newValue[0])
    }
    return ( 
        <RadixSlider.Root
            className="relative flex items-center select-none touch-none w-full h-10"
            defaultValue={[1]}
            value={[value]}
            onValueChange={handleChange}
            max={1}
            step={0.05}
            aria-label="Volume slider"
        >
            <RadixSlider.Track className="relative bg-white grow rounded-full h-[3px]">
                <RadixSlider.Range className="absolute bg-black rounded-full h-full" />
            </RadixSlider.Track>


        </RadixSlider.Root>
     );
}
 
export default Slider;