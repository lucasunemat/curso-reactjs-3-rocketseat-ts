import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/SearchForm";
import { PriceHighlight, TransactionContainer, TransactionsTable } from "./styles";

interface Transaction {
    id: number;
    description: string;
    type: 'income' | 'outcome';
    price: number;
    category: string;
    createdAt: string;
}

export function Transactions() {

    const [transactions, setTransactions] = useState<Transaction[]>([]);


    //fazendo useEffect vigiar o carregamento da página para fazer requisição ao iniciar a página
    // fetch('http://localhost:3000/Transactions')
    // .then (response => response.json())
    // .then (data => console.log(data))
    async function loadTransactions() {
        const response = await fetch('http://localhost:3000/Transactions');
        const data = await response.json();

        setTransactions(data);
    }
    useEffect(() => {
        loadTransactions();
    }, []);

    return (
        <div>
            <Header />
            <Summary />

            <TransactionContainer>
                <SearchForm />
                <TransactionsTable>
                    <tbody>
                        {transactions.map(transaction => {
                            return (
                                <tr key={transaction.id}>
                                    <td width="50%">{transaction.description}</td>
                                    <td><PriceHighlight variant={transaction.type}>{transaction.price}</PriceHighlight></td>
                                    <td>{transaction.category}</td>
                                    <td>{transaction.createdAt}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </TransactionsTable>
            </TransactionContainer>

        </div >
    )
}