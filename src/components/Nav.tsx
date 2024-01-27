import Logo from '../assets/logo.png'
import { ReactComponent as Menu } from '../assets/Icons/Menu alt 4-1.svg'

const Nav = () => {
  return (
    <nav className='px-8 pt-[15px] w-full flex flex-row justify-between items-center lg:hidden'>
        <img src={Logo} alt="" className=''/>

        <div className=''>
            <Menu className='bg-[#BE123C] rounded-full p-2 w-[36px] h-[36px]'/>
        </div>
    </nav>
  )
}

export default Nav
