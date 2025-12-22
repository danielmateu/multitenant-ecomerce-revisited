import { LegacyResponse } from "@/types/legacy-response";
import { useMemo, useState } from "react";


export default function UseLegacyResponse() {

    const legacyResponse: LegacyResponse[] = useMemo(() => [
        { ID_PROD: 101, Name_Desc: "super widget", PRICE_val: "20.50", created_at: "2023-01-15T00:00:00" },
        { ID_PROD: 102, Name_Desc: "MEGA Widget", PRICE_val: "45.00", created_at: "2023-02-10T00:00:00" },
        { ID_PROD: 103, Name_Desc: "mini tool", PRICE_val: "12.99", created_at: null }, // Fecha null
        { ID_PROD: 104, Name_Desc: "POWER DRILL", PRICE_val: null, created_at: "2023-03-05T00:00:00" }, // Precio null
    ], []);

    // Adaptamos los datos a nuestro formato, Los nombres deben ser Capitalizados, el precio debe ser número (o 0 si es null), y la fecha debe ser legible.
    const formattedLegacyResponse: LegacyResponse[] = useMemo(() => legacyResponse.map(item => ({
        ID_PROD: item.ID_PROD,
        Name_Desc: item.Name_Desc.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' '),
        PRICE_val: item.PRICE_val ? parseFloat(item.PRICE_val).toFixed(2) : null,
        created_at: item.created_at ? new Date(item.created_at) : null,
    })), [legacyResponse]);

    const [searchTerm, setSearchTerm] = useState('');

    // USEMEMO: Punto clave para un perfil Mid.
    // Optimizamos el filtrado para que no corra en cada re-render si 'products' o 'searchTerm' no cambian.
    const filteredProducts = useMemo(() => {
        return formattedLegacyResponse.filter(product =>
            product.Name_Desc.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [formattedLegacyResponse, searchTerm]);

    return {
        legacyResponse,
        formattedLegacyResponse,
        filteredProducts,
        setSearchTerm,
        searchTerm
    }
}
