"use client"

import { ThemeProvider } from "next-themes"

interface UserProviderProps {
    children: React.ReactNode;
}

const ColorModeProvider: React.FC<UserProviderProps> = ({
    children
}) => {
    return (
        <ThemeProvider attribute="class">
            {children}
        </ThemeProvider>
    );
}

export default ColorModeProvider;