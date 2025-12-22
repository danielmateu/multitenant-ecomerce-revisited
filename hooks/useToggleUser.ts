import { mockToggleUserMutation } from "@/utils/api";
import { useRef, useState } from "react";
import { toast } from "sonner"

const useToggleUser = (initialStatus: boolean, userId: string) => {

    const [isActive, setIsActive] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const [isSincing, setIsSincing] = useState<boolean>(false);

    const previousStatus = useRef(initialStatus)

    const toggleStatus = async () => {
        previousStatus.current = isActive;

        const newStatus = !isActive;
        setIsActive(newStatus);
        setError(null)
        setIsSincing(true);

        try {
            // Simular llamada a API
            await mockToggleUserMutation(userId, newStatus)
            setIsSincing(false);
            toast.success("User status updated successfully", { description: "success" })
        } catch (error) {
            setIsActive(previousStatus.current);
            setError(error as Error);
            setIsSincing(false);
            toast("Error updating user status", { description: "error" })
        }
    }

    return {
        isActive,
        error,
        isSincing,
        toggleStatus
    }
}

export default useToggleUser;