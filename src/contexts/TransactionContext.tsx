// Aqui pense: adicionar essa funcionalidade aqui vai ser útil para outros componentes?

import React, { createContext, useEffect, useState } from "react";

// 1. tipagem de uma transaction
interface Transaction {
    id: number;
    description: string;
    type: 'income' | 'outcome';
    price: number;
    category: string;
    createdAt: string;
}

// 2. tipagem do contexto (que será um array de transactions)
interface TransactionContextType {
    transactions: Transaction[]
}

// 3. criação do contexto
// você usa o as TransactionContextType para dizer que o createContext
// vai retornar um objeto do tipo TransactionContextType
// assim você não precisa inicializar com nenhum valor por enquanto
export const TransactionContext = createContext({} as TransactionContextType);

// 4. Tipagem do {chidren}, componente que representa conteúdo que o provider pode
// envolver (no caso, é o <Transactions/> do App.tsx)
interface TransactionsProviderProps {
    children: React.ReactNode;
}

// 5. criação do provider com o children tipado e o valor inicial do contexto
// O TransactionContext.Provider é o componente que é tipado com o TransactionContextType
// Por isso posso tirar lá de dentro um valor transactions : [] que batem com o TransactionContextType
// Em suma, TransactionsProvider é o componente que vai retornar o provider do contexto tipado com o TransactionContextType
// bem como as funções e estados que estão dentro dele (dentro do componente)
export function TransactionsProvider({ children }: TransactionsProviderProps) {

    const [transactions, setTransactions] = useState<Transaction[]>([]);

    async function loadTransactions() {
        const response = await fetch('http://localhost:3000/Transactions');
        const data = await response.json();

        setTransactions(data);
    }

    //fazendo useEffect vigiar o carregamento da página para fazer requisição ao iniciar a página
    useEffect(() => {
        loadTransactions();
    }, []);

    // transactions : é a variável que armazena a lista de transações que quero disponibilizar
    // para os outros componentes
    return (
        //Aqui é o código da linha 22 em uso, eu tô retornando o conteudo da página disponibilizando a var transactions
        <TransactionContext.Provider value={{ transactions }}>
            {children}
        </TransactionContext.Provider>)
}