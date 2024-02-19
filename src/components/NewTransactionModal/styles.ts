import * as Dialog from '@radix-ui/react-dialog';
import * as  RadioGroup from '@radix-ui/react-radio-group';
import styled from 'styled-components';

// veja que to substituindo os componentes nativos (que vem sem estilização) pelos meus próprios
// Dialog.Overlay vira base para Overlay
// Dialog.Content vira base para Content, e assim vai...

//Overlay será nossa tela opaca ao abrir o modal

/**
 * Os RadioGroups tem css "data-state" com valores checked ou unchecked, que podem ser manipulados aqui
 */
export const Overlay = styled(Dialog.Overlay)`
    position: fixed; //mesmo scrollando, vai ficar na posição fixa dele
    width: 100vw;
    height: 100vh;
    inset: 0; //inset é o mesmo que top, right, bottom, left = 0
    background-color: rgba(0,0,0,0.75); //preto com 50% de transparência

`;

//estilização do modal em si
export const Content = styled(Dialog.Content)`
    min-width: 32rem;
    border-radius: 6px;
    padding: 2.5rem 3rem;
    background: ${props => props.theme['gray-800']};

    //hack para o modal ficar centralizado
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); //eixos x e y

    form {
        margin-top: 2rem;

        display: flex;
        flex-direction: column;
        gap: 1rem;

        input {
            border-radius: 6px;
            border: 0;
            background: ${props => props.theme['gray-900']};
            color: ${props => props.theme['gray-300']};
            padding: 1rem;

            &:placeholder {
                color: ${props => props.theme['gray-500']};
            }
        }

        button[type="submit"] {
            height: 58px;
            border: 0;
            background: ${props => props.theme['green-500']};
            color: ${props => props.theme.white};
            font-weight: bold;
            padding: 0 1.25rem;
            border-radius: 6px;
            cursor: pointer;

            &:not(:disabled):hover {
                background: ${props => props.theme['green-700']};
                transition: background-color 0.2s;
            }

            &:disabled {
                opacity: 0.6;
                cursor: not-allowed;
            }
        }
    }
`;

export const CloseButton = styled(Dialog.Close)`
    position: absolute;
    background: transparent;
    border: 0;
    //deixar no canto direito superior...
    top: 1.5rem;
    right: 1.5rem;
    // ...e diminuir o tamanho (mesmo coisa que font-size: 0)
    line-height: 0; 
    cursor: pointer;
    color: ${props => props.theme['gray-500']};
`;

//o container ao redor dos botoes virou radio group root
export const TransactionType = styled(RadioGroup.Root)`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    margin-top: 0.5rem;
`;

interface TransactionTypeButtonProps {
    variant: 'income' | 'outcome';
}

//os botões agora vão ser items radio group
export const TransactionTypeButton = styled(RadioGroup.Item)<TransactionTypeButtonProps>`
    background: ${props => props.theme['gray-700']};
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    border-radius: 6px;
    cursor: pointer;
    border: 0;
    color: ${props => props.theme['gray-300']};

    //editando o icone
    svg {
        color: ${props => props.variant === 'income' ? props.theme['green-300'] : props.theme['red-300']};
    }

    &[data-state='unchecked']:hover {
        background: ${props => props.theme['gray-600']};
        transition: 0.2s;
    }

    &[data-state='checked'] {
        color: ${props => props.theme.white};
        background: ${props => props.variant === 'income' ? props.theme['green-300'] : props.theme['red-300']};

        svg {
            color: ${props => props.theme.white};
        }
    }
`;

