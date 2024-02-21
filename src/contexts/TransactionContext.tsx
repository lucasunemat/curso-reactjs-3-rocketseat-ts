// Aqui pense: adicionar essa funcionalidade aqui vai ser útil para outros componentes?

import React, { createContext, useEffect, useState } from "react";
import { api } from "../lib/axios";

// Tipagem do input que será passado para a função createTransaction
// Isso evita a gente ficar dependente do modal para criar novas transações
interface CreateTransactionInput {
    description: string;
    price: number;
    category: string;
    type: 'income' | 'outcome';
}

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
    transactions: Transaction[];
    fetchTransactions: (query?: string) => Promise<void>;
    createTransaction: (data: CreateTransactionInput) => Promise<void>;
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

    async function fetchTransactions(query?: string) {
        /*
         * No axios você pode usar a const api exportada 
         * passar um método get
         * e depois um objeto contendo os parâmetros (ex: ?) da requisição
        */
        const response = await api.get('/transactions', {
            params: {
                _sort: 'createdAt',
                _order: 'desc',
                q: query
            }
        })

        // const url = new URL('http://localhost:3000/transactions');

        // //se eu tiver enviado query...
        // if (query) {
        //     // o 'q' é o '?' na url
        //     // esse parâmetro 'q' é suportado pelo json-server ^0.17.1 apenas. Tive que mudar no packtage.json e usar 'npm install'
        //     url.searchParams.append('q', query);
        // }

        // const response = await fetch(url);
        // const data = await response.json();

        // veja que ele usa o setTransactions para atualizar o estado
        // isso afeta o summary, pois a variável transactions vai ser atualizada e os valores do summary vão mudar
        setTransactions(response.data);
    }

    //fazendo useEffect vigiar o carregamento da página para fazer requisição ao iniciar a página
    useEffect(() => {
        fetchTransactions();
    }, []);

    async function createTransaction(data: CreateTransactionInput) {
        const { description, price, category, type } = data;
        const response = await api.post('transactions', {
            description,
            category,
            price,
            type,
            createdAt: new Date(),
        })

        //copiando todas as transações e inserindo a nova primeiro (ordme descrecente)
        setTransactions(state => [response.data, ...state])

    }

    // transactions : é a variável que armazena a lista de transações que quero disponibilizar
    // para os outros componentes
    return (
        //Aqui é o código da linha 22 em uso, eu tô retornando o conteudo da página disponibilizando a var transactions
        <TransactionContext.Provider value={{ transactions, fetchTransactions, createTransaction }}>
            {children}
        </TransactionContext.Provider>
    )
}