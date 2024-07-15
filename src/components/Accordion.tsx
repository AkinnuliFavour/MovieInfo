import { Link, useNavigate } from "react-router-dom"
import { useState } from 'react'
import { ReactComponent as Search } from '../assets/Icons/Search-1.svg'


const Accordion = ({ toggleAccordion }: { toggleAccordion: () => void }) => {

    const [title, setTitle] = useState('');

    const navigate = useNavigate()

    return (
        <nav className="w-screen h-screen fixed bg-[#BE123C] top-0 left-0 z-50 text-white">
            <button
                className="absolute top-0 right-0 text-3xl mr-4 p-4 font-bold"
                onClick={toggleAccordion}
            >
                X
            </button>
            <ul className="h-full flex justify-center items-center flex-col gap-12">
                <li className="relative w-5/6 mt-[7px] lg:hidden">
                    <input
                        type="text"
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
                </li>
                <li className="text-3xl font-bold">
                    <Link to="/" onClick={toggleAccordion}>
                        Home
                    </Link>
                </li>
                <li className="text-3xl font-bold">
                    <Link to="/top-rated" onClick={toggleAccordion}>
                        Top Rated
                    </Link>
                </li>
                <li className="text-3xl font-bold">
                    <Link to="/now-playing" onClick={toggleAccordion}>
                        Now Playing
                    </Link>
                </li>
                <li className="text-3xl font-bold">
                    <Link to="/upcoming" onClick={toggleAccordion}>
                        Upcoming
                    </Link>
                </li>
                <li className="text-3xl font-bold border-2 border-white p-3 hover:bg-white hover:text-gray-700 transition-colors">
                    <Link to="/login" onClick={toggleAccordion}>
                        Ready For More Fun?
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default Accordion
