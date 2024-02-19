import styled, { css } from "styled-components";

export const SummaryContainer = styled.section`
    width: 100%; //ocupar 100% do container
    max-width: 1120px; //se for menor, ainda tomará a largura
    margin: 0 auto; //centralizar o conteúdo
    padding: 0 1.5rem; //espaçamento interno para não deixar conteudo colado em telas menores

    display: grid;
    grid-template-columns: repeat(3, 1fr); //3 colunas com largura igual
    gap: 2rem; //espaçamento entre os elementos
    margin-top: -5rem;
`;

interface SummaryCardProps {
    variant?: 'green'; //se existir, o valor PODE SER 'green'
}

// aqui aconteceu mágica!!
// lembre que para tipar um styled component, basta passar o tipo como parâmetro dentro de <>
export const SummaryCard = styled.div<SummaryCardProps>`
    background: ${props => props.theme["gray-600"]};
    border-radius: 6px;
    padding: 2rem;

    header{
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: ${props => props.theme["gray-300"]};
    }

    strong {
        display: block; //por padrão é inline e não consigo aplicar margem vertical
        margin-top: 1rem;
        font-size: 2rem;
    }

    // se a prop variant existir e for green, adicione o css abaixo (no caso, fundo verde)
    ${props => props.variant === 'green' && css`
        background: ${props.theme["green-500"]}; 
    `}
`;