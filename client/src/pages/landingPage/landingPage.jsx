import React from 'react'
import { Link } from 'react-router-dom'

const landingPage = () => {
    return (
        <div>
           <div>
            <Link to="/home">
                <button>
                    <span>Bienvendido</span>
                </button>
                </Link>
           </div>
        </div>
      )
    }


export default landingPage