import { useEffect } from "react";
import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/SearchForm";
import { PriceHighlight, TransactionContainer, TransactionsTable } from "./styles";

export function Transactions() {
    //fazendo useEffect vigiar o carregamento da página para fazer requisição ao iniciar a página
    useEffect(() => {
        // fetch('http://localhost:3000/Transactions')
        // .then (response => response.json())
        // .then (data => console.log(data))

        async function loadTransactions() {
            const response = await fetch('http://localhost:3000/Transactions')
            const data = await response.json()

            console.log(data)
        }

        loadTransactions()
    }, []);

    return (
        <div>
            <Header />
            <Summary />

            <TransactionContainer>
                <SearchForm/>
                <TransactionsTable>
                    <tbody>
                        <tr>
                            <td width="50%">Desenvolvimento de website</td>
                            <td><PriceHighlight variant="income">R$ 12.000,00</PriceHighlight></td>
                            <td>Venda</td>
                            <td>02/04/2024</td>
                        </tr>
                        <tr>
                            <td width="50%">Alimentação</td>
                            <td><PriceHighlight variant="outcome"> -R$ 1.090,00</PriceHighlight></td>
                            <td>Venda</td>
                            <td>02/04/2024</td>
                        </tr>
                    </tbody>
                </TransactionsTable>
            </TransactionContainer>

        </div >
    )
}