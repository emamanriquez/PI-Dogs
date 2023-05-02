import React from 'react'
import { Link } from 'react-router-dom'
import landing3 from './img/landing3.jpg'

import './landingPage.css';


const styles = {
    backgroundImage: `url(${landing3})`,
    backgroundSize: '100% 100%' ,
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    backgroundAttachment: 'fixed',
    position: 'relative',
    zIndex:'0,', 
  };


const landingPage = () => {
    return (
        <div>
        <div style={styles}>
           <div>
            {/* <img src={ img } alt='img de landing'/> */}
                <h1 className="h1">Universe of Dogs</h1>
            <Link to="/home">
                <button className="button">
                HOME
                </button>
                </Link>
           </div>
        </div>
        </div>
      )
    }


export default landingPage;