
// export default function SignInPage() {
//     return (
//         <div>
//             <h1>Hello Page</h1>
//         </div>
//     );
// }


'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function SignInPage() {
    // Estado para alternar entre Login y Sign Up
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-[#ffe4e6]">
            {/* --- HEADER (Replicado de tu imagen) --- */}

            {/* --- MAIN CONTENT (Formulario) --- */}
            <main className="grow flex items-center justify-center p-6">
                <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden p-8 md:p-10">

                    {/* Título del Formulario */}
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold mb-2">
                            {isLogin ? 'Bienvenido de nuevo' : 'Únete a FunRoad'}
                        </h2>
                        <p className="text-gray-500">
                            {isLogin
                                ? 'Ingresa tus datos para continuar tu viaje.'
                                : 'Crea una cuenta y empieza la aventura.'}
                        </p>
                    </div>

                    {/* Formulario */}
                    <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>

                        {/* Campo Nombre (Solo para Sign Up) */}
                        {!isLogin && (
                            <div>
                                <label className="block text-sm font-semibold mb-2 ml-1">Nombre Completo</label>
                                <input
                                    type="text"
                                    placeholder="Ej. Juan Pérez"
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-black focus:ring-0 outline-none transition-all"
                                />
                            </div>
                        )}

                        {/* Campo Email */}
                        <div>
                            <label className="block text-sm font-semibold mb-2 ml-1">Email</label>
                            <input
                                type="email"
                                placeholder="hola@ejemplo.com"
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-black focus:ring-0 outline-none transition-all"
                            />
                        </div>

                        {/* Campo Password */}
                        <div>
                            <label className="block text-sm font-semibold mb-2 ml-1">Contraseña</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-black focus:ring-0 outline-none transition-all"
                            />
                        </div>

                        {/* Olvidé mi contraseña (Solo Login) */}
                        {isLogin && (
                            <div className="flex justify-end">
                                <Link href="/forgot-password" className="text-sm font-medium text-gray-500 hover:text-black underline decoration-dotted">
                                    ¿Olvidaste tu contraseña?
                                </Link>
                            </div>
                        )}

                        {/* Botón Principal */}
                        <button className="w-full bg-black text-white font-bold py-4 rounded-xl hover:bg-gray-800 transform hover:scale-[1.02] transition-all shadow-lg">
                            {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
                        </button>
                    </form>

                    {/* Separador */}
                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-gray-500">O continúa con</span>
                        </div>
                    </div>

                    {/* Botones Sociales */}
                    <div className="grid grid-cols-2 gap-4">
                        <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors font-medium text-sm">
                            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                            Google
                        </button>
                        <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors font-medium text-sm">
                            <img src="https://www.svgrepo.com/show/512317/github-142.svg" alt="GitHub" className="w-5 h-5" />
                            GitHub
                        </button>
                    </div>

                    {/* Toggle Link Footer */}
                    <div className="mt-8 text-center text-sm">
                        <span className="text-gray-500">
                            {isLogin ? '¿No tienes cuenta? ' : '¿Ya tienes cuenta? '}
                        </span>
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="font-bold text-black hover:underline"
                        >
                            {isLogin ? 'Regístrate gratis' : 'Inicia sesión'}
                        </button>
                    </div>

                </div>
            </main>

            {/* --- FOOTER (Replicado de tu imagen) --- */}
            <footer className="w-full py-6 text-center bg-white">
                <p className="text-sm font-medium text-gray-600 flex items-center justify-center gap-2">
                    <span className="bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">N</span>
                    2024 FunRoad. All rights reserved.
                </p>
            </footer>
        </div>
    );
}