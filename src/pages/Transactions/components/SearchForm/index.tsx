// criando o SearchForm dentro do Transactions porque ele é usado apenas na página de Transactions

import { MagnifyingGlass } from "phosphor-react";
import { SearchFormContainer } from "./styles";

export function SearchForm() {
    return (
        <SearchFormContainer>
            <input type="text" placeholder="Busque por transações" />
            <button type="submit">
                <MagnifyingGlass size={20}/>
            </button>
        </SearchFormContainer>
    )
}