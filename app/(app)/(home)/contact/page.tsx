"use client"

import useToggleUser from "@/hooks/useToggleUser";
import { mockToggleUserMutation } from "@/utils/api";

export default function ContactPage() {

    const { isActive, error, isSincing, toggleStatus } = useToggleUser(true, "user-123");

    return (
        // <h1>Contact Page</h1>
        <>
            <h1>Contact Page</h1>
            <p>User is {isActive ? "Active" : "Inactive"}</p>
            <button
                onClick={toggleStatus}
                disabled={isSincing}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            >
                {isSincing ? "Updating..." : "Toggle User Status"}
            </button>
            {error && <p className="text-red-500 mt-2">Error: {error.message}</p>}

        </>
    );
}