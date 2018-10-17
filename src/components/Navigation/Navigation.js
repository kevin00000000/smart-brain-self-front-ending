import React from 'react';
import {Link} from 'react-router-dom'
import './Navigation.css'

const Navigation = ({match}) => {
    return (
        <nav style={{display: 'flex', justifyContent:'flex-end'}}>
            <ul>
                <li className="f3 link dim black underline pa3 pointer"><Link to='/'>{match.url.includes('/home') ? 'Signout' : 'Signin'}</Link></li>
                {!match.url.includes('/home') && <li className="f3 link dim black underline pa3 pointer"><Link to='/register'>Register</Link></li>}
            </ul>
        </nav>
    )
}

export default Navigation;