// import { useSubmit } from "react-router-dom";
// import { useState } from "react";
import Button from "./Button";
import Input from "./Input";
import { useGetOne } from "../custom-hooks/FetchOne";

import { useForm } from "react-hook-form";
import { server_calls } from "../api/server";
import { useDispatch, useStore } from "react-redux";
import { chooseIsbn, chooseAuthorFirst, chooseAuthorLast, chooseYear, chooseTitle, choosePages,chooseMedium, chooseDescription } from "../redux/slices/RootSlice";


interface BookInventoryFormProps {
    isbn?: string;
    id?: any;
    author_first?: any;
    year?: any;
    onClose: () => void;
}

2
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

const BookInventoryForm = (props: BookInventoryFormProps) => {
    const { register, handleSubmit } = useForm({})
    const dispatch = useDispatch();
    const store = useStore(); 
    // const selectedBook = server_calls.getone(props.id[0])
    const { bookOne } = useGetOne(props.id[0])
    // getOne(props.id[0])
    console.log(`This is the isbn ${bookOne["isbn"]}`)
    console.log(bookOne.year, props, props.id, props.id[0]);

    const author_first = bookOne.author_first
    
    const onSubmit = (data: any, event: any) => {
        console.log(`ID: ${typeof props.id}`);
        console.log(props.id)
        console.log(data)
        if (props.id && props.id.length > 0) {
            server_calls.update(props.id[0], data) 
            console.log(`Updated: ${ data.isbn } ${ props.id}`)
            setTimeout(() => {window.location.reload()}, 1000)
            event.target.reset()
        } else {
            dispatch(chooseIsbn(data.isbn));
            dispatch(chooseAuthorFirst(data.author_first));
            dispatch(chooseAuthorLast(data.author_last));
            dispatch(chooseTitle(data.title));
            dispatch(choosePages(data.pages));
            dispatch(chooseYear(data.year));
            dispatch(chooseMedium(data.medium));
            dispatch(chooseDescription(data.description));

            server_calls.create(store.getState())
            setTimeout(() => {window.location.reload()}, 1000)
            event.target.reset()

            props.onClose()
        }
        
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                {props.id.length > 0 ? <div><h1>Book Info Update Form </h1> <p>Note: You must put info all fields.</p><br /></div>: <h1>Enter your new book info</h1>}
                
                <div>
                    <label htmlFor="isbn">Book ISBN</label>
                    <Input {...register('isbn')} name='isbn' placeholder={bookOne.isbn}   />
                </div>
                <div>
                    <label htmlFor="author_first">Book Author First Name </label>
                    <Input {...register('author_first')} name='author_first' placeholder={bookOne.author_first} defaultValue={author_first} />
                </div>
                <div>
                    <label htmlFor="author_last">Book Author Last Name</label>
                    <Input {...register('author_last')} name='author_last'  placeholder={bookOne.author_last}   />
                </div>
                <div>
                    <label htmlFor="title">Book Title</label>
                    <Input {...register('title')} name='title'  placeholder={bookOne.title} defaultValue={bookOne.title} />
                </div>
                <div>
                    <label htmlFor="pages">Number of Pages in the Book</label>
                    <Input {...register('pages')}  placeholder={bookOne.pages} defaultValue={bookOne.pages} />
                </div>
                <div>
                    <label htmlFor="year">Year of Book Publication</label>
                    <Input {...register('year')} name='year' helperText = "Must enter a year for form to be valid" placeholder={bookOne.year} defaultValue={bookOne.year} />
                </div>
                <div>
                    <label htmlFor="medium">Book Medium (ebook, paperback, hard back, etc.)</label>
                    <Input {...register('medium')} name='medium' placeholder={bookOne.medium} />
                </div>
                <div>
                    <label htmlFor="description"> Book Description</label>
                    <Input {...register('description')} name='description' placeholder={bookOne.description} />
                </div>
                <div className="flex p-1">
                    <Button className="flex justify-start m-3 bg-pink-300 p-2 rounded hover:bg-pink-800 text-white">
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default BookInventoryForm