import { useColorMode,Button } from "@chakra-ui/react";
import {FaSun,FaMoon} from 'react-icons/fa'

function ColorSwitcher() {
    const { colorMode, toggleColorMode } = useColorMode()
    return (
      <header>
        <Button onClick={toggleColorMode}>
        {colorMode === "light" ? <FaMoon/> : <FaSun/> }
        </Button>
      </header>
    )
  }

export default ColorSwitcher