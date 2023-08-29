// import React from "react";
import Backround from "../assets/images/books.jpeg"

function Home() {
    return (
        <div
            style={ { backgroundImage: `url(${ Backround})`}}
            className="flex flex-row justify-center mx-auto bg-cover bg-fixed"
            >
                <div className="flex flex-col place-items-center h-screen">
                    <h3 className="p-5 bg-purple-600 bg-opacity-80 my-5 text-white rounded">
                        Welcome to Your Book Library Database
                    </h3>
                </div>
                
        </div>
    )
}

export default Home