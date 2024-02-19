/**
 * Isso é um hook meu do React
 * Basicamente uma função contendo uma ação de cálculo que será utilizada em outro lugar
 * Para invocar, uso useSummary();
 */

import { useContext } from "react";
import { TransactionContext } from "../contexts/TransactionContext";

export function useSummary() {
    const { transactions } = useContext(TransactionContext);

    const summary = transactions.reduce(
        (acc, transaction) => {
            if (transaction.type === 'income') {
                acc.income += transaction.price;
                acc.total += transaction.price;
            } else {
                acc.outcome += transaction.price;
                acc.total -= transaction.price;
            }

            return acc
        },
        {
            income: 0,
            outcome: 0,
            total: 0
        }
    );

    return summary;
}