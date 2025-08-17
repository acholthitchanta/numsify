import {Link} from "react-router-dom"

export function Nav(){
    return(
        <>
        <nav>

            <p id="logo">numsify</p>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/search">Search</Link></li>

            </ul>
        </nav>
        </>


    )
}