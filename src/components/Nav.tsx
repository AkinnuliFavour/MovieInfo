import { useState } from 'react'
import Logo from '../assets/logo.png'
import { ReactComponent as Menu } from '../assets/Icons/Menu alt 4-1.svg'
import Accordion from './Accordion';

const Nav = ({hidden}: {hidden: boolean}) => {
    const [isAccordionVisible, setAccordionVisible] = useState(false);

    const toggleAccordion = () => {
        setAccordionVisible(!isAccordionVisible);
    };

  return (
    <nav className={`px-8 pt-[15px] w-full flex flex-row justify-between items-center ${hidden && 'lg:hidden'}`}>
        <img src={Logo} alt="" className=''/>

        <input type="search" name="" id="" className='md:w-1/3 w-full h-[36px] mt-[7px] px-2 hidden md:block bg-transparent border border-white outline-none rounded-lg'/>

        <div className=''>
            <Menu onClick={toggleAccordion} className='bg-[#BE123C] rounded-full p-2 w-[36px] h-[36px]'/>
        </div>

        {isAccordionVisible && <Accordion toggleAccordion={toggleAccordion} />} {/* Render the Accordion component if isAccordionVisible is true */}
    </nav>
  )
}

export default Nav
