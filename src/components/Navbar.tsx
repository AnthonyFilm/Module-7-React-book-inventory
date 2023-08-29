import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import { useAuth0 } from "@auth0/auth0-react";

function Navbar() {
    const [isVisible, setIsVisible] = useState(false);
    const { isAuthenticated, loginWithRedirect, logout} = useAuth0();

    const signOutOnClick = () => {
        logout();
    };

    const signInOnClick = () => {
        loginWithRedirect();
    };

    const dropDown = () => {
        setIsVisible(!isVisible)
    }

    const clicked = () => {
        setIsVisible(false);
    };

  return (
    <nav className="flex items-center justify-between flex-wrap bg-purple-500 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
            <Link to='/' className="font-semibold text-xl tracking-tight">Book Inventory</Link>
            
        </div>
        <div className="block">
            <Button onClick={dropDown} className="flex items-center px-3 py-2 text-purple-200 border rounded border-purple-400 hover:text-white hover:border-white">
                <i className="fa-solid fa-bars"></i>
                </Button> 
        </div>
        { isVisible ? (
            <div className="w-full block flex-grow items-center">
                <div className="text-sm lg:flex-grow">
                    <Button className="p-3 m-5 bg-purple-400 justify-center rounded">
                        <div>
                            <Link to="/" onClick={ clicked } className="flex place-items-center mt-4 lg:inline-block lg:mt-0 text-white hover:text-purple-900 mr-4">
                                Home
                            </Link>
                        </div>
                    </Button>
                    <Button className="p-3 m-5 bg-purple-400 justify-center rounded">
                        <div>
                            <Link to="/about" onClick={ clicked} className="flex place-items-center mt-4 lg:inline-block lg:mt-0 text-white hover:text-purple-900 mr-4">
                                About
                            </Link>
                        </div>
                    </Button>

                    {
                        !isAuthenticated ?
                        <Button className="p-3 m-5 bg-purple-400 justify-center">
                            <div>
                                <Link to="/" onClick={signInOnClick} className='flex place-items-center mt-4 lg:inline-block lg:mt-0 text-white hover:text-purple-900'>
                                    Login 
                                </Link>
                            </div>
                        </Button>
                        :
                        <>
                        <Button className="p-3 m-5 bg-purple-400 justify-center">
                            <div>
                                <Link to="/" onClick={signOutOnClick} className="flex place-items-center mt-4 lg:inline-block lg:mt-0 text-white hover:text-purple-900">
                                    Sign Out
                                </Link>
                            </div>
                        </Button>  
                        <Button className="p-3 m-5 bg-purple-400 rounded justify-center">
                        <div>
                            <Link to="/dashboard" onClick={ clicked} className="flex place-items-center mt-4 lg:inline-block lg:mt-0 text-white hover:text-purple-900 mr-4">
                                Dashboard
                            </Link>
                        </div>
                        </Button> 
                        </>
                    }
                </div>
            </div>
        ) : (
            <></>
        )}
        </nav>
  )
}

export default Navbar