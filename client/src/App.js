import React from "react"

import RenderChat from './components/renderChat'
import {
    Box,
    FormControl,
  
    FormLabel,
    Input,
    Textarea,
    Button,
    Flex,
    Icon,
    Center
} from "@chakra-ui/react"

import {
    AiFillRightCircle,
    AiOutlineMessage
} from 'react-icons/ai'

//recibe props desde login, para poder comunicarse con socket.io hacia el server
function App({onMessageSubmit,onTextChange,state,chat}) {
    

    return (
        <Flex direction='column'>
			
			<Box m={'2'}h={'45vh'} p={4} bg={'whiteAlpha.100'}  boxShadow={'2xl'} >
		<Box pb={4}>
				<Icon as={AiOutlineMessage} w={8} h={8} />
				</Box >
				<Box overflow={'auto'} h={'30vh'}>
		{/*componente que renderiza los mensajes de los usuarios */}
		{<RenderChat chat={chat} />}
				</Box>
	</Box>

		{/* caja de texto para enviar mensaje */}
		<Center  m={'2'}   p={1} bg={'whiteAlpha.100'} boxShadow={'2xl'}>
		
			<form onSubmit={onMessageSubmit}>
				
				<FormControl>
				<FormLabel>nombre</FormLabel>
			
					<Input  name="name" onChange={(e) => onTextChange(e)} value={state.name}   label="Name" />
	
				
				
				<FormLabel>mensaje</FormLabel>
			
					<Textarea colorScheme={'facebook'}
					variant={'outline'}
						name="message"
						onChange={(e) => onTextChange(e)}
						value={state.message}
						id="outlined-multiline-static"
						label="Message"
            
					/>
				
				
        <Button 
		type="submit" 
		colorScheme="teal" 
		rightIcon={<AiFillRightCircle />}
		>
			Send
		</Button>
        
		</FormControl>
			</form>
			
		</Center>

		

	</Flex>
    )
}

export default App