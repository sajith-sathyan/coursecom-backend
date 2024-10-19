import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
  <footer>
    <ul className='footer__categories'>
      <li><Link to="/course/categories/:Agriculture">Agriculture</Link></li>
      <li><Link to="/course/categories/:Business">Business </Link></li>
      <li><Link to="/course/categories/:ComputerScience">Computer Science </Link></li>
      <li><Link to="/course/categories/:DataScience">Data Science </Link></li>
      <li><Link to="/course/categories/:Design">Design </Link></li>
      <li><Link to="/course/categories/:Economics">Economics </Link></li>
      <li><Link to="/course/categories/:Health">Health </Link></li>
      
    </ul>
  </footer>
  )
}

export default Footer