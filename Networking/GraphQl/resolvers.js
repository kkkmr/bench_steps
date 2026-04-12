// this is where database calls would be made in a real application. 
// For this example, we are returning hardcoded data.
const database = {
    authors: [
        {  id: '0', name: 'P. Kesava Reddy', bookIds: ['100']},
        {  id: '1', name: 'J.K. Rowling', bookIds: ['101', '103']},
        {  id: '2', name: 'George R.R. Martin', bookIds: ['102']}
    ],
    books: [
        {  id: '100', title: 'Muugavani Pillanagrovi', publishedYear: 1993, authorId: '0'},
        {  id: '101', title: 'Harry Potter and the Sorcerer\'s Stone', publishedYear: 1997, authorId: '1'},
        {  id: '102', title: 'A Game of Thrones', publishedYear: 1996, authorId: '2'},
        {  id: '103', title: 'Harry Potter and the Chamber of Secrets', publishedYear: 1998, authorId: '1'}
    ]
};


export const resolvers = {
    // Custom resolver for the Author type. 
    // This resolver will be called when the author field of a Book type is queried.
    Book:{
        author:(parent, args, context, info)=>{
            // parent is the Book object that is being resolved.
            // We can use the authorId field of the Book object to find the corresponding Author object.
            return database.authors.find(author => author.id === parent.authorId);
        }
    },
    Author:{
        books:(parent, args, context, info)=>{
            // parent is the Author object that is being resolved.
            // We can use the bookIds field of the Author object to find the corresponding Book objects.
            return database.books.filter(book => parent.bookIds.includes(book.id));
        }
    },
    Query:{
        // authors and books are the two queries defined in the typeDefs.js file.
        // We need to provide resolver functions for these queries. 
        // The resolver functions will fetch the data for the respective queries.
        authors: (parent, args, context, info) =>{
            return database.authors;
        },
        books: (parent, args, context, info) =>{
            return database.books;
        }
    },
    Mutation:{
        addBook: (parent, args, context, info) =>{
            const newBook = {
                id: String(database.books.length + 100), // Generate a new ID for the book
                title: args.title,
                publishedYear: args.publishedYear,
                authorId: args.authorId
            };
            database.books.push(newBook);  
            return newBook; 
    },     addAuthor: (parent, args, context, info) =>{
            const newAuthor = {
                id: String(database.authors.length), // Generate a new ID for the author
                name: args.name,
                bookIds: args.bookIds || []
            };
            database.authors.push(newAuthor);
            return newAuthor;
        }
    }
}