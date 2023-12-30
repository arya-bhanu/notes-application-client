import { gql } from '@apollo/client'
const POST_ADD_USER = gql`
    mutation AddUser($input: UserData){
        addUser(input: $input)
    }
`

const POST_LOGIN_USER = gql`
    mutation LoginUser($input: UserData){
        loginUser(input: $input)
    }
`

const POST_ADD_NEW_NOTE = gql`
    mutation AddNote($input: NewNote){
        addNote(input: $input)
    }
`

export { POST_ADD_USER, POST_LOGIN_USER , POST_ADD_NEW_NOTE}