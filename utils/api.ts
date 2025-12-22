// SImulamos una llamada a una base de datos graphql externa
export const mockToggleUserMutation = async (userId: string, isActive: boolean) => {

    return new Promise<{ success: boolean; userId: string; isActive: boolean }>((resolve, reject) => {
        setTimeout(() => {

            const shouldFail = Math.random() < 0.50; // 50% de probabilidad de fallo

            if (shouldFail) {
                // throw new Error("Simulated API failure");
                reject(new Error("Simulated API failure"));
                return;
            }

            resolve({ success: true, userId, isActive });
        }, 1500); // Simula un retraso de 1500ms
    });
}