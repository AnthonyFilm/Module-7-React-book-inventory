import { createSlice } from "@reduxjs/toolkit";

/* fields from the Flask app
  id = db.Column(db.String, primary_key = True)
    isbn = db.Column(db.String(13))
    author_first = db.Column(db.String(150))
    author_last = db.Column(db.String(150))
    title = db.Column(db.String(250))
    pages = db.Column(db.Integer)
    year = db.Column(db.Integer)
    medium = db.Column(db.String(100))
    description = db.Column(db.String(250), nullable=True)


*/
const rootSlice = createSlice ( {
    name: "root",
    initialState: {
        isbn: "ISBN",
        author_first: "Author First Name",
        author_last: "Author Last Name",
        title: "Book Title",
        pages: "Number of Pages in Book",
        year: "Year of Publication",
        medium: "Book Medium",
        description:"Description",
    },
    reducers: {
        chooseIsbn: (state, action) => {state.isbn = action.payload},
        chooseAuthorFirst: (state, action) => {state.author_first = action.payload},
        chooseAuthorLast: (state, action) => {state.author_last = action.payload},
        chooseTitle: (state, action) => {state.title = action.payload},
        choosePages: (state, action) => {state.pages = action.payload},
        chooseYear: (state, action) => {state.year = action.payload},
        chooseMedium: (state, action) => {state.medium = action.payload},
        chooseDescription: (state, action) => {state.description = action.payload},
    }
})

export const reducer = rootSlice.reducer;
export const {chooseIsbn, chooseAuthorFirst, chooseAuthorLast, chooseTitle, choosePages, chooseYear, chooseMedium, chooseDescription} = rootSlice.actions
