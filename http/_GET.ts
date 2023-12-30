import { gql } from '@apollo/client'
const GET_ALL_NOTES = gql`
    query GetAllNotes{
        getAllNotes {
            active, 
            id,
            title,
            body,
            createdAt
        }
}
`
const GET_NOTE = gql`
    query GetNote($id : String!) {
        getNote(id : $id) {
            active, 
            id,
            title,
            body,
            createdAt
        }
    }
`
export { GET_ALL_NOTES, GET_NOTE }