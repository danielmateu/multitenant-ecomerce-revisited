'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
    // Estado para simular el envío del correo
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Aquí iría tu lógica real de Supabase/Firebase/NextAuth
        setIsSubmitted(true);
    };

    return (
        <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-[#ffe4e6]">

            {/* --- HEADER (Consistente con Login) --- */}
            <header className="w-full px-6 py-4 flex items-center justify-end bg-[#ffc0cb]">
                {/* <Link href="/" className="text-3xl font-black tracking-tight hover:opacity-80 transition-opacity">
                    FunRoad
                </Link> */}

                {/* Botón simple para volver al login en móvil/desktop */}
                <Link
                    href="/sign-in"
                    className="px-5 py-2 text-sm font-semibold hover:bg-black/5 rounded-full transition-colors"
                >
                    Volver al Login
                </Link>
            </header>

            {/* --- MAIN CONTENT --- */}
            <main className="grow flex items-center justify-center p-6">
                <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden p-8 md:p-10 relative">

                    {/* Botón flotante para volver atrás (flecha) */}
                    {!isSubmitted && (
                        <Link href="/sign-in" className="absolute top-6 left-6 p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                        </Link>
                    )}

                    {!isSubmitted ? (
                        /* --- ESTADO 1: Formulario de Input --- */
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="text-center mb-8 mt-4">
                                <div className="w-16 h-16 bg-pink-100 text-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    {/* Icono de Llave/Candado */}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                                </div>
                                <h2 className="text-2xl font-bold mb-2">¿Olvidaste tu contraseña?</h2>
                                <p className="text-gray-500 text-sm">
                                    No te preocupes. Ingresa tu correo electrónico y te enviaremos las instrucciones para restablecerla.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold mb-2 ml-1">Email registrado</label>
                                    <input
                                        required
                                        type="email"
                                        placeholder="tucorreo@ejemplo.com"
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-black focus:ring-0 outline-none transition-all placeholder:text-gray-400"
                                    />
                                </div>

                                <button className="w-full bg-black text-white font-bold py-4 rounded-xl hover:bg-gray-800 transform hover:scale-[1.02] transition-all shadow-lg">
                                    Enviar instrucciones
                                </button>
                            </form>
                        </div>
                    ) : (
                        /* --- ESTADO 2: Confirmación de envío --- */
                        <div className="text-center py-8 animate-in zoom-in duration-300">
                            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                {/* Icono Check/Email enviado */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                            </div>

                            <h2 className="text-2xl font-bold mb-3">¡Correo enviado!</h2>
                            <p className="text-gray-500 mb-8 text-sm leading-relaxed">
                                Hemos enviado un enlace de recuperación a tu correo. <br />
                                Por favor revisa tu bandeja de entrada (y la carpeta de spam).
                            </p>

                            <div className="space-y-3">
                                <Link href="/sign-in" className="block w-full bg-black text-white font-bold py-3 rounded-xl hover:bg-gray-800 transition-all">
                                    Volver a Iniciar Sesión
                                </Link>

                                <button
                                    onClick={() => setIsSubmitted(false)}
                                    className="block w-full text-gray-500 font-medium py-2 text-sm hover:text-black transition-colors"
                                >
                                    ¿No recibiste el correo? Probar otra vez
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* --- FOOTER --- */}
            <footer className="w-full py-6 text-center bg-white">
                <p className="text-sm font-medium text-gray-600 flex items-center justify-center gap-2">
                    <span className="bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">N</span>
                    2024 FunRoad. All rights reserved.
                </p>
            </footer>
        </div>
    );
}