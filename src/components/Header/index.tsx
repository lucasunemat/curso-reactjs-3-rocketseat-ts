import { HeaderContainer, HeaderContent, NewTransactionButton } from "./styles";
import logoImg from '../../assets/logo.svg';
import * as Dialog from '@radix-ui/react-dialog'; // Importando tudo que foi exportado e jogando no objeto chamado Dialog
import { NewTransactionModal } from "../NewTransactionModal";

/**
 * Basicamente o modal vai ser ativado ao apertar botão, então é lá que vamos usar ele
 * O Dialog.Trigger já atua como um botão, então não precisamos colocar um botão dentro dele
 * Mas para evitar de usar um css com biblioteca (styled (Dialog.Trigger``)) vamos usar a prop asChild
 * A prop asChild faz o Dialog.Trigger deixar de atuaar como botão para usar o componente filho (NewTransactionButton) como botão
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