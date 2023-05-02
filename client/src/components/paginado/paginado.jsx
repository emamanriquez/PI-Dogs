import React from 'react'
import '../paginado/paginado.css';
const Paginacion = ({ dogs, couPerPage, paginado }) => {
    const pageNumber = [];

	for (let i = 1; i <= Math.ceil(dogs / couPerPage); i++) {
		pageNumber.push(i);
	}

    return (
        <nav className='nav'>
				<ul className='ul'>
					{pageNumber &&
						pageNumber.map((n) => (
							<li key={n}className='li'>
								<span className='span' onClick={() => paginado(n)}>{n}</span>
								
							</li>
						))}
				</ul>
			</nav>
  )
}

export default Paginacion;