import * as Dialog from "@radix-ui/react-dialog";
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from "./styles";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";
import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { TransactionContext } from "../../contexts/TransactionContext";
import { useContextSelector } from "use-context-selector";

/**
 * Controlled: cada digitação é armazenada e monitorada
 * Uncontrolled: não é monitorado, não é armazenado, só capto info ao submeter o form
 */

const newTransactionFormSchema = z.object({
    description: z.string(),
    price: z.number(),
    category: z.string(),
    type: z.enum(['income', 'outcome']) //enum = valor entre duas opções
})

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>;

//aqui pegou tudo que é dentro do Dialog.Portal 
export function NewTransactionModal() {

    // mesmo se outra info do contexto mudar (ex: transactions), esse componente vai ser renderizado de novo
    // porque ele está escutando o contexto
    // para isso estou usando context selector aqui, para monitorar só o createTransaction
    // assim o modal só renderiza de novo se essa info mudar
    // feito isso, não precisa mais desestruturar, só deixar const createTransaction;
    const createTransaction = useContextSelector(TransactionContext, (context) => {
        return context.createTransaction; //info que quero monitorar
    })

    const {
        control, //para usar o form controlled para inputs não nativos do html
        register,
        handleSubmit,
        formState: { isSubmitting },
        reset,
    } = useForm<NewTransactionFormInputs>({
        resolver: zodResolver(newTransactionFormSchema),
        defaultValues: {
            type: 'income'
        }
    })

    async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
        // await new Promise(resolve => setTimeout(resolve, 2000));
        const { category, description, price, type} = data;

        await createTransaction({
            description,
            price,
            category,
            type
        })

        reset();
    }

    return (
        <Dialog.Portal>
            <Overlay />

            <Content>
                <Dialog.Title>Nova transação</Dialog.Title>

                <CloseButton>
                    <X size={24} />
                </CloseButton>

                <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
                    <input
                        type="text"
                        placeholder="Descrição"
                        required
                        {...register('description')} />
                    <input
                        type="number"
                        placeholder="Preço"
                        required
                        {...register('price', { valueAsNumber: true })} />
                    <input
                        type="text"
                        placeholder="Categoria"
                        required
                        {...register('category')} />

                    {/* 
                      * Controlando botões que não são nativos do React 
                      * Veja que basicamente temos um componente Controller que recebe a prop control que tirei do useForm
                      * name com o nome do campo que quero controlar (vem do type NewTransactionFormInputs)
                      * render que é uma função que retorna o html, no caso, os botões ali (lembre que TransactionType é um styled component que fizemos no styles.tsx)
                      * Na render eu tenho varias props, como field, formState (conjunto de info sobre estado do form), fieldState (conjunto de info sobre o campo, se houve 
                      * erro, se já foi alterado, etc)
                      * Sobre o field, temos as funções onChange(que salvam os valores novos no formulario), onBlur (que salva o campo como tocado), value (valor atual do campo)
                      * Para ver todas essas props, você vai precisar dar console.log(props)
                      */}

                      {
                        /*
                         * Pelo que entendi, ao haver mudança de valor no botão, chamo o onValueChange que é a função onChange do field
                         * E peço para essa função por sua vez chamar o field.onChange, que é a função onChange do field
                         * value={field.value} serve para passar o valor atual do campo para o styled component, que vem por padrão o 'income'
                         */
                      }
                    <Controller
                        control={control}
                        name="type"
                        render={({field}) => {
                            //console.log(field)
                            
                            return (
                                <TransactionType onValueChange={field.onChange} value={field.value}>
                                    <TransactionTypeButton variant="income" value="income">
                                        <ArrowCircleUp size={24} />
                                        Entrada
                                    </TransactionTypeButton>
                                    { /* segundo botao (RadioGroup.Item) */}
                                    <TransactionTypeButton variant="outcome" value="outcome">
                                        <ArrowCircleDown size={24} />
                                        Saída
                                    </TransactionTypeButton>

                                </TransactionType>
                            )
                        }}
                    />

                    <button type="submit" disabled={isSubmitting}>
                        Cadastrar
                    </button>
                </form>

            </Content>
        </Dialog.Portal >
    );
}