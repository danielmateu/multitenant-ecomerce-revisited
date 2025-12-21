import { RefObject } from "react";

export const useDropdownPosition = (ref: React.RefObject<HTMLDivElement | null> | RefObject<HTMLDivElement | null>) => {

    const getDropdownPosition = () => {
        if (!ref.current) return { top: 0, left: 0 };

        const rect = ref.current.getBoundingClientRect();
        const dropdownWidth = 240; // Assume a fixed width for the dropdown

        // Calculate the initial position
        let left = rect.left + window.scrollX;
        const top = rect.bottom + window.scrollY + 8; // 8px offset below the button

        // Check if dropdown would go off the right edge of the viewport
        if (left + dropdownWidth > window.innerWidth) {
            left = rect.right + window.scrollX - dropdownWidth // 16px margin from the edge
        }

        if (left < 0) {
            left = window.innerWidth - dropdownWidth - 16; // 16px margin from the edge
        }

        // Ensure dropdown dosnt go of left edge
        if (left < 0) {
            left = 16; // 16px margin from the edge
        }

        return { top, left };
    }

    return { getDropdownPosition };
}