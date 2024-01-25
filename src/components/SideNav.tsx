import { Link } from 'react-router-dom'
import Logo from '../assets/logo-dark-text.png'
import { linkStyle } from '../lib/utils'

const SideNav = () => {
  return (
    <nav className="border-r min-h-screen border-black border-opacity-30 rounded-r-3xl w-1/6 py-10 hidden lg:flex flex-col justify-between fixed top-0 left-0">
        <div className='px-[20px]'>
          <img src={Logo} alt="" className='w-[186px] h-[50px]'/>
        </div>
        <ul className='h-[300px] w-full flex flex-col justify-between'>
          <li className=''><Link to='/' className={linkStyle}>Home</Link></li>
          <li><Link to='/now-playing' className={linkStyle}>Now Playing</Link></li>
          <li><Link to='/top-rated' className={linkStyle}>Top Rated</Link></li>
          <li><Link to='/upcoming' className={linkStyle}>Upcoming</Link></li>
        </ul>
        <div>
            <p></p>
        </div>
        <p className='px-[20px]'>Log out</p>
    </nav>
  )
}

export default SideNav
