import * as Dialog from '@radix-ui/react-dialog';
import styled from 'styled-components';

// veja que to substituindo os componentes nativos (que vem sem estilização) pelos meus próprios
// Dialog.Overlay vira base para Overlay
// Dialog.Content vira base para Content, e assim vai...

//Overlay será nossa tela opaca ao abrir o modal
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

            &:hover {
                background: ${props => props.theme['green-700']};
                transition: background-color 0.2s;
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

