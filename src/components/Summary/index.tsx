import { useContext } from "react";
import { SummaryCard, SummaryContainer } from "./styles";
import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from 'phosphor-react';
import { TransactionContext } from "../../contexts/TransactionContext";

export function Summary() {
    // importando a lista de transações
    const { transactions } = useContext(TransactionContext);

    console.log('Console.log do Summary: ', transactions);

    // veja: tags que vão precisar de mais estilizações viram componentes (div -> SummaryCard) lá no styles.ts
    return (
        <SummaryContainer>
            <SummaryCard>
                <header>
                    <span>Entradas</span>
                    <ArrowCircleUp size={32} color="#00b37e" />
                </header>

                <strong>R$ 12.000,00</strong>
            </SummaryCard>

            <SummaryCard>
                <header>
                    <span>Saídas</span>
                    <ArrowCircleDown size={32} color="#f75a68" />
                </header>

                <strong>R$ 1.090,00</strong>
            </SummaryCard>

            <SummaryCard variant="green">
                <header>
                    <span>Total</span>
                    <CurrencyDollar size={32} color="#fff" />
                </header>

                <strong>R$ 10.910,00</strong>
            </SummaryCard>
        </SummaryContainer>
    )
}