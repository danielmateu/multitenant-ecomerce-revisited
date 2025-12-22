"use client"

import { Input } from "@/components/ui/input";
import UseLegacyResponse from "@/hooks/legacy-response";
import { format, parse } from "@formkit/tempo"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useState } from "react";

export default function PricingPage() {

    const { filteredProducts, setSearchTerm } = UseLegacyResponse();
    return (
        <>
            <Input placeholder="Search legacy products..." className="mb-4"
                onChange={e => setSearchTerm(e.target.value)}
            />
            {/* <pre>{JSON.stringify(formattedLegacyResponse, null, 2)}</pre> */}
            {/* <pre>{JSON.stringify(formattedLegacyResponse, null, 2)}</pre> */}
            <Table>
                {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-25">ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead className="">Created</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filteredProducts.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center">
                                    No products found.
                                </TableCell>
                            </TableRow>
                        )
                    }
                    {
                        filteredProducts.map(item => (
                            <TableRow
                                key={item.ID_PROD}
                            >
                                <TableCell>{item.ID_PROD}</TableCell>
                                <TableCell>{item.Name_Desc}</TableCell>
                                <TableCell>{item.PRICE_val}</TableCell>
                                <TableCell>
                                    {
                                        item.created_at ? format(item.created_at, "full") : "Fecha no disponible"
                                    }
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>

        </>
    );
}