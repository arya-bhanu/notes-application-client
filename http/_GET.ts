import { gql } from '@apollo/client'
const GET_ALL_NOTES = gql`
    query GetAllNotes {
        getAllNotes {
            active, 
            id,
            title,
            body,
            createdAt
        }
}
`
export { GET_ALL_NOTES }