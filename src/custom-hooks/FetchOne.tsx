import { useState, useEffect } from "react";
import { server_calls } from "../api/server";

interface useGetOne {
    id: string,
    isbn: string,
    title?: string
}

export const useGetOne = (id: string) => {
    type Book = {
        id?: string;
        isbn?: string;
        author_first?: string;
        author_last?: string;
        title?: string;
        pages?: string;
        year?: string;
        medium?: string;
        description?: string;
    };
    const [ bookOne, setOne] = useState<Book>({

    })

    

    async function handleOneFetch(id: string ) {
        const result = await server_calls.getone(id);
        setOne(result) 
    }

    useEffect( () => {
        handleOneFetch(id);
    }, [])

    return { bookOne, getOne:handleOneFetch}
}