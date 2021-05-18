import React,{useEffect,
    useRef,
    useState} from "react";
import {Button,Tooltip,Box,VStack,useColorModeValue,Icon,Heading,Text,Center,Spacer,Container,Image} from '@chakra-ui/react'
import ColorSwitcher from './components/colorswitcher'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import io from "socket.io-client"

import {FaScroll,FaWrench,FaEnvelope} from 'react-icons/fa'
import Home from './App'           // componente principal App



export default function App() {

  const [state, setState] = useState({
    message: "",
    name: ""
})
const [chat, setChat] = useState([])

const socketRef = useRef()

//evento que se conecta al server y escucha el mensaje de vuelta del server
useEffect(
    () => {
        socketRef.current = io.connect("//localhost:3400")
        socketRef.current.on("message", ({
            name,
            message
        }) => {
          // recibe el mensaje del server y lo pasa al componente App
            setChat([...chat, {
                name,
                message
            }])
        })
        return () => socketRef.current.disconnect()
    },
    [chat]
)
//evento que cambia el estado del mensaje que será enviado
const onTextChange = (e) => {
    console.log({
        ...state,
        [e.target.name]: e.target.value
    })
    setState({
        ...state,
        [e.target.name]: e.target.value
    })
}
//evento que envia el mensaje a traves de socket.io hacia el server
const onMessageSubmit = (e) => {
    const {
        name,
        message
    } = state
    if (name.trim() !== '' && message.trim() !== '') {
        socketRef.current.emit("message", {
            name,
            message
        })
    }
    e.preventDefault()
    setState({
        message: "",
        name
    })
}
  return (
    <Router>
         {/* SIDEBAR */}
      <Box  float={'left'} bg={useColorModeValue('gray.600', 'gray.700')} h={'102vh'}>
     
        <VStack  as={'nav'}  spacing={6} m={2} h={'96%'}>
     
        <NavLink>
          <Link className="navbar__link" to="/"><Icon as={FaEnvelope} w={6} h={6}/></Link>
        </NavLink>
        <NavLink>
        <Link className="navbar__link" to="/about"><Icon as={FaScroll} w={6} h={6}/></Link>
        </NavLink>
        <NavLink>
        <Link className="navbar__link" to="/users"><Icon as={FaWrench} w={6} h={6}/></Link>
        </NavLink>
          
              
         
              
        <Spacer />
        <Box m={'2'}>
          <ColorSwitcher  />
        </Box>
        
        </VStack>

    </Box>
      

        {/* Rutas de la pagina. */}
        
      
      <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route>         
          <Route path="/">
            <Home onMessageSubmit={onMessageSubmit} onTextChange={onTextChange} chat={chat} state={state} />
          </Route>
          
        </Switch>
    </Router>
  );
}

// renderizador de los botones de la sidebar

const NavLink = ({ children }) => (
  <Button
    px={2}
    py={1}
    rounded={'md'}  
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('blue.200', 'white.700'),
    }}
    href={'#'}>
    {children}
  </Button>
);
// componentes dirreciones de enrutador
function About() {
  return (
    <Center p={1}>
      <Box  borderWidth="1px"   borderRadius="lg" overflow="hidden">
        <Box m="2">
          <Image w={'30rem'}src="image001.png"/>
        
        </Box>
    </Box>
    </Center>
    );
}

function Users() {
  return (
  <Container maxW="container.sm"  >
  <Box maxW={'xl'} borderWidth="1px" bg={'blue.400'} borderRadius="lg" overflow="hidden">
        <Box m="2" p={'2'}>
          <Heading m="5" mb="0" as="h4" size="md">chat <Tooltip label="libreria de javascript para desarrollo frontend" aria-label="A tooltip">
  
</Tooltip> ⚛️</Heading>
          <Text m="5" mt="0"> <Tooltip label="libreria UI basada en componentes de react" aria-label="A tooltip">
  chakra UI
</Tooltip> 🔘️ </Text>
        </Box>
    </Box>
</Container>

);

}

