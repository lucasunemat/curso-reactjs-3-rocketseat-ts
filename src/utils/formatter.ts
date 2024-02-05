// aqui temos formatador de data com API Intl (nativa do JS)
export const dateFormatter = new Intl.DateTimeFormat('pt-BR');

// aqui temos formatador de moeda com API Intl (nativa do JS)
// passamos um objeto para detalhar o formato da moeda
// para formatar você usa: priceFormatter.format(valor)
export const priceFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
})