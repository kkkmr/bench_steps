export const typeDefs=` #graphql, this is a comment
  type Author {
    id: ID!
    name: String!
    books: [Book]
  }

  type Book {
    id: ID!
    title: String!
    publishedYear: Int
    author: Author
}
    type Query {
        authors: [Author]
        books: [Book]
    }

    type Mutation {
        addAuthor(name: String!, bookIds: [ID!]): Author!
        addBook(title: String!, publishedYear: Int, authorId: ID!): Book!
    }
`