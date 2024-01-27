import { Link } from "react-router-dom"

const Accordion = ({toggleAccordion}: {toggleAccordion: () => void}) => {
  return (
    <nav className="w-screen h-screen fixed bg-[#BE123C] top-0 left-0 z-50 text-white">
        <p 
            className="absolute top-0 right-0 text-3xl mr-4 p-4 font-bold"
            onClick={toggleAccordion}
        >
            X
        </p>
        <ul className="h-full flex justify-center items-center flex-col gap-12">
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
        </ul>
    </nav>
  )
}

export default Accordion
