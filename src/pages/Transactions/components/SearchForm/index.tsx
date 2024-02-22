// criando o SearchForm dentro do Transactions porque ele é usado apenas na página de Transactions

import { MagnifyingGlass } from "phosphor-react";
import { SearchFormContainer } from "./styles";
import { useForm } from "react-hook-form";
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'
import { TransactionContext } from "../../../../contexts/TransactionContext";
import { useContextSelector } from "use-context-selector";

//schema definido via zod
const searchFormSchema = z.object({
    query: z.string(),
})

//criando um tipo que pega automaticamente o que o zod recomenda no schema
type SearchFormInputs = z.infer<typeof searchFormSchema>

export function SearchForm() {

    const fetchTransactions = useContextSelector(TransactionContext, (context)=> {
        return context.fetchTransactions;   
    });

    // aponto o tipo SearchFormInputs dentro do useForm
    // o isSubmmiting é um boolean que indica se o formulário está sendo submetido ou não 
    const { register, handleSubmit, formState: { isSubmitting } } = useForm<SearchFormInputs>({
        //aponto o schema do zod dentro do zodResolver
        resolver: zodResolver(searchFormSchema)
    });

    // aponto o tipo SearchFormInputs para o data
    async function handleSearchTransactions(data: SearchFormInputs) {
        // espera 2s para simular requisição a API
        await fetchTransactions(data.query)
    }

    return (
        <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
            <input
                type="text"
                placeholder="Busque por transações"
                {...register('query')}
            />
            <button type="submit" disabled={isSubmitting}>
                <MagnifyingGlass size={20} />
                Buscar
            </button>
        </SearchFormContainer>
    )
}