import { useState } from 'react'
import Logo from '../assets/logo.png'
import { ReactComponent as Menu } from '../assets/Icons/Menu alt 4-1.svg'
import Accordion from './Accordion';

const Nav = () => {
    const [isAccordionVisible, setAccordionVisible] = useState(false);

    const toggleAccordion = () => {
        setAccordionVisible(!isAccordionVisible);
    };

  return (
    <nav className='px-8 pt-[15px] w-full flex flex-row justify-between items-center lg:hidden'>
        <img src={Logo} alt="" className=''/>

        <div className=''>
            <Menu onClick={toggleAccordion} className='bg-[#BE123C] rounded-full p-2 w-[36px] h-[36px]'/>
        </div>

        {isAccordionVisible && <Accordion toggleAccordion={toggleAccordion} />} {/* Render the Accordion component if isAccordionVisible is true */}
    </nav>
  )
}

export default Nav
