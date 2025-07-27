'use client'

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            router.push('/login')
        }
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const response = await axios.post('http://localhost:3333/auth/login', {
                username: email,
                password: password,
            })

            const data = response.data;

            console.log('Resposta da API: ', data);

            localStorage.setItem('token', data.token);

            alert(`${data.message}! Token salvo.`)
            router.push('/');
        } catch (error: any) {
            console.log('Erro:', error)
            if (error.response) {
                alert(error.response.data.message || 'Credenciais inválidas')
            } else {
                alert('Erro de conexão com o servidor')
            }
        } finally {
            setIsLoading(false)
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">

            {/* Card Login */}
            <Card className="w-full max-w-md">
                {/* Header */}
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl text-center">
                        Login
                    </CardTitle>
                    <CardDescription className="text-center text-gray-500">
                        Digite o seu login e senha para acessar a plataforma
                    </CardDescription>
                </CardHeader>
                {/* Conteúdo */}
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex flex-col space-y-2">
                            {/* Campo email */}
                            <label htmlFor="email">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="seu@email.com"
                                value={email}
                                onChange={(e) => { setEmail(e.target.value) }}
                                required
                                disabled={isLoading}
                                className="border-1 border-gray-200 p-2 rounded-md focus:border-2 focus:border-blue-500"
                            />
                        </div>

                        {/* Campo senha */}
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="password">
                                Senha
                            </label>
                            <input
                                id="password"
                                type="password"
                                placeholder="senha"
                                value={password}
                                onChange={(e) => { setPassword(e.target.value) }}
                                required
                                disabled={isLoading}
                                className="border-1 border-gray-200 p-2 rounded-md focus:border-2 focus:border-blue-500"
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            ) : ('Entrar')}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}