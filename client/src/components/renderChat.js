import { Box,Text,Flex,Avatar } from "@chakra-ui/react"
//componente que renderiza los mensajes de los
// recibe una props que vienen desde router a App y luego hacia aqui
const RenderChat = ({chat}) => {
    console.log(chat)
    return chat.map(({ name, message }, index) => (
        <Flex m='2' key={index}>
        <Avatar 
        src="https://picsum.photos/300"
        pos={'relative'}
        _after={{
            content: '""',
            w: 4,
            h: 4,
            bg: 'green.300',
            border: '2px solid white',
            rounded: 'full',
            pos: 'absolute',
            bottom: 0,
            right: -1,
          }} 
        
        />
        <Box ml="3">
          <Text fontWeight="bold">
          {name}
            
          </Text>
          <Text fontSize="sm">{message}</Text>
        </Box>
      </Flex>
        
    ))
}

export default RenderChat