import { HeaderContainer, HeaderContent, NewTransactionButton } from "./styles";
import logoImg from '../../assets/logo.svg';
import * as Dialog from '@radix-ui/react-dialog'; // Importando tudo que foi exportado e jogando no objeto chamado Dialog
import { NewTransactionModal } from "../NewTransactionModal";

/**
 * Basicamente o modal vai ser ativado ao apertar botão, então é lá que vamos usar ele
 * O Dialog.Trigger já atua como um botão, então não precisamos colocar um botão dentro dele
 * Mas para evitar de usar um css com biblioteca (styled (Dialog.Trigger``)) vamos usar a prop asChild
 * A prop asChild faz o Dialog.Trigger deixar de atuaar como botão para usar o componente filho (NewTransactionButton) como botão
 * Dialog.Portal basicamente é um portal mesmo, tudo que vc coloca nele pode ser renderizado em qualquer outro lugar da aplicação
 * O Portal é usado para renderizar o modal em qualquer lugar da aplicação (afinal ele não ta dentro de div nenhuma, so tamo configurando ele aqui pq o botão que ativa ele ta no header)
 * O Dialog.Overlay é aquele fundo opaco de quando o modal é ativado
 * O Dialog.Content é o conteudo do modal
 * Dialog.Title é o titulo do modal, anunciado inclusive em leitores de tela
 * Dialog.Description pode ser usado para descrição de informações adicionais ( não será usado)
 * Dialog.Close é o botão de fechar o modal
 * A parte de acessibilidade vem junto: enter abre o modal, esc fecha o modal, tab navega entre os elementos do modal
 */
export function Header() {
    return (
        <HeaderContainer>
            <HeaderContent>
                <img src={logoImg} alt="" />
                <Dialog.Root>
                    <Dialog.Trigger asChild>
                        <NewTransactionButton>Nova transação</NewTransactionButton>
                    </Dialog.Trigger>
                    
                    <NewTransactionModal/>
                </Dialog.Root>
            </HeaderContent>
        </HeaderContainer>
    )
}