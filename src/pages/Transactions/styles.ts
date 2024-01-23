import styled from "styled-components";

export const TransactionContainer = styled.main`
    width: 100%;
    max-width: 1120px;
    margin: 4rem auto 0;
    padding: 0 1.5rem;
`; 

export const TransactionsTable = styled.table`
    width: 100%;
    //as duas linhas abaixo são para separar as linhas da tabela - sem separate não funciona
    border-collapse: separate;
    border-spacing: 0 0.5rem;
    margin-top: 1.5rem;

    td {
        padding: 1.25rem 2rem;
        background: ${props => props.theme["gray-700"]};

        &:first-child {
            //arredondar a borda da primeira coluna (lado esquerdo)
            border-top-left-radius: 6px;
            border-bottom-left-radius: 6px;
        }

        &:last-child {
            //arredondar a borda da ultima coluna (lado direito da tabela)
            border-top-right-radius: 6px;
            border-bottom-right-radius: 6px;
        }
    }
`;

interface PriceHighlightProps {
    variant: 'income' | 'outcome'
}

export const PriceHighlight = styled.span<PriceHighlightProps>`
    color: ${props => props.variant === 'income' ? props.theme["green-300"] : props.theme["red-300"]}
`; 