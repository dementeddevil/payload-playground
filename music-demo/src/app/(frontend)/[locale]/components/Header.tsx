import Image from 'next/image'
import logo from '../assets/img/universal-logo.png'
import Link from "next/link";
import Navigation from '@/globals/Navigation/Component';


export default function Header() {
  return (
    <header className="site-header">
      <Link className="site-header__logo" href="/">
        <Image
          src={logo}
          alt="Universal Music"
          height={69}
        />
      </Link>
      <Navigation />
    </header>
  )
}
