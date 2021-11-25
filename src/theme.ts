import { extendTheme } from "@chakra-ui/react"
import { ThemeConfig } from "@chakra-ui/theme"

const config: ThemeConfig = {
	initialColorMode: "system",
}

const theme = extendTheme({ config })

export default theme
