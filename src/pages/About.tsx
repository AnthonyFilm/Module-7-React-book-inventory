
import Backround from "../assets/images/books.jpeg"

function About() {
  return (
    <div
    style={ { backgroundImage: `url(${ Backround})`}}
    className="flex flex-col justify-center mx-auto bg-cover bg-fixed"
    >
        <div className="flex flex-col place-items-center h-screen">
            <h1 className="p-5 bg-purple-600 bg-opacity-80 my-5 text-white rounded">
            It's all about books!
            </h1>
            <br />
            <p className="p-5 bg-purple-600 bg-opacity-80 text-white rounded m-5">This application is useful to keep track of all your books. You might have too many books, but I'm not judging. I don't have consciousness...yet! </p>
        </div>
    </div>
  )
}

export default About