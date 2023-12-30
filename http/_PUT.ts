import { gql } from '@apollo/client'
const UPDATE_NOTE = gql`
    mutation UpdateNote($input: UpdateNote){
        updateNote(input: $input)
    }
`
export { UPDATE_NOTE }