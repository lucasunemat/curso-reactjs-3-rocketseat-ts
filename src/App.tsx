import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/default";
import { GlobalStyle } from "./styles/global";
import { Transactions } from "./pages/Transactions";
import { TransactionsProvider } from "./contexts/TransactionContext";

// sempre lembre que para usar o contexto preciso colocar o 
// o TransactionsProvider por volta dos componentes que vão usar o contexto
export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />

      <TransactionsProvider>
        <Transactions />
      </TransactionsProvider>

    </ThemeProvider>
  )
}
