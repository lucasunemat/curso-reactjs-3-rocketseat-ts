import styled from "styled-components";

export const HeaderContainer = styled.header`
    background: ${props => props.theme["gray-900"]};
    padding: 2.5rem 0 7.5rem;
`;

export const HeaderContent = styled.div`
    width: 100%; //ocupar 100% do container
    max-width: 1120px; //se for menor, ainda tomará a largura
    margin: 0 auto; //centralizar o conteúdo
    padding: 0 1.5rem; //espaçamento interno para não deixar conteudo colado em telas menores

    display: flex;
    justify-content: space-between;
    align-items: center;

`;

export const NewTransactionButton = styled.button`
    height: 50px;
    border: 0;
    background: ${props => props.theme["green-500"]}; 
    color: ${props => props.theme["white"]};
    font-weight: bold;
    padding: 0 1.25rem;
    border-radius: 6px;
    cursor: pointer;

    &:hover {
        background: ${props => props.theme["green-700"]};
    }
`;