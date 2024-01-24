import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/SearchForm";
import { PriceHighlight, TransactionContainer, TransactionsTable } from "./styles";

export function Transactions() {
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