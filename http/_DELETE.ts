import { gql } from '@apollo/client'
const DELETE_NOTE = gql`
    mutation DeleteNote($input: String){
        deleteNote(input: $input)
    }
`

export { DELETE_NOTE }