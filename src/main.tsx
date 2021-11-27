import React from "react"
import ReactDOM from "react-dom"
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import { ChakraProvider } from "@chakra-ui/react"

import "./index.css"
import App from "./App"
import theme from "./theme"
import WalletProvider from './context/wallet';

const queryClient = new QueryClient()

ReactDOM.render(
	<React.StrictMode>
		<ChakraProvider theme={theme}>
			<QueryClientProvider client={queryClient}>
				<WalletProvider>
					<App />
				</WalletProvider>
				<ReactQueryDevtools />
			</QueryClientProvider>
		</ChakraProvider>
	</React.StrictMode>,
	document.getElementById("root")
)
