import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faUser, faStore, faHouse} from '@fortawesome/free-solid-svg-icons'; 

const Navbar = () => {
  return (
    <nav className='navbar'>
        <a className='menu-link' href='/'><FontAwesomeIcon icon={faHouse}/> INICIO</a>
        <ul className='menu'>
        <li><a className='menu-link' href='/clients'><FontAwesomeIcon icon={faUser} /> Clientes</a></li>
        <li><a className='menu-link' href='/branches'><FontAwesomeIcon icon={faStore}/> Sucursales</a></li>
        </ul>
    </nav>
  )
}

export default Navbar