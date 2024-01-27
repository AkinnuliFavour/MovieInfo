import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from '../assets/logo.png'
import { ReactComponent as Menu } from '../assets/Icons/Menu alt 4-1.svg'
import { ReactComponent as Search } from '../assets/Icons/Search-1.svg'
import Accordion from './Accordion';

const Nav = ({hidden}: {hidden: boolean}) => {
    const [isAccordionVisible, setAccordionVisible] = useState(false);
    const [title, setTitle] = useState('');

    const navigate = useNavigate()

    const toggleAccordion = () => {
        setAccordionVisible(!isAccordionVisible);
    };

  return (
    <nav className={`px-8 pt-[15px] w-full flex flex-row justify-between items-center ${hidden && 'lg:hidden'}`}>
        <img src={Logo} alt="" className=''/>

        <div className="relative md:w-1/3 w-full mt-[7px] hidden lg:block">
          <input
            type="search"
            name="" 
            id="" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='h-[36px] px-2 w-full bg-transparent border border-white outline-none rounded-lg pr-10'
          />
          <Search 
            onClick={() => navigate(`/search/${title}`)}
            className='absolute top-1/2 transform -translate-y-1/2 right-2 h-5 w-5 text-white' 
          />
        </div>

        <div className=''>
            <Menu onClick={toggleAccordion} className='bg-[#BE123C] rounded-full p-2 w-[36px] h-[36px]'/>
        </div>

        {isAccordionVisible && <Accordion toggleAccordion={toggleAccordion} />} {/* Render the Accordion component if isAccordionVisible is true */}
    </nav>
  )
}

export default Nav
