'use client'
import Link from 'next/link'
import { BiMenuAltLeft } from 'react-icons/bi'
import { RiCloseLine } from 'react-icons/ri'
import { useState } from 'react'

export default function PrimaryNav() {
  const [isOpen, setOpen] = useState(false)
  const toggleMenu = () => setOpen(!isOpen)

  return (
    <nav className={isOpen ? 'primary-nav primary-nav--is-open' : 'primary-nav'}>
      <button onClick={toggleMenu} type="button" className="primary-nav__toggle">
        <BiMenuAltLeft />
        <RiCloseLine />
      </button>
      <div className="primary-nav__bg">
        <ul className="menu">
          <li className="menu__item">
            <Link className="menu__link" onClick={toggleMenu} href="/">
              Home
            </Link>
          </li>
          <li className="menu__item">
            <Link className="menu__link" onClick={toggleMenu} href="/posts">
              News
            </Link>
          </li>
          <li className="menu__item">
            <Link className="menu__link" onClick={toggleMenu} href="/artists">
              Artists
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
