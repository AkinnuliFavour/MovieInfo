import { useState } from 'react'

const Pagination = ({page, setPage, totalMovies}: {page: number, setPage:  React.Dispatch<React.SetStateAction<number>>, totalMovies: number}) => {
    const [currentEntries, setCurrentEntries] = useState<number>(0)

    const handelNext = () => {
        if(currentEntries === totalMovies) return
        setPage(prev => prev + 1)
        setCurrentEntries(prev => prev + 20)
    }
    
    const handelPrevious = () => {
        if(page === 1) return
        setPage(prev => prev - 1)
        setCurrentEntries(prev => prev - 19)
    }

  return (
    <div>
        <div className="flex flex-col items-center mb-6">
            {/* Help text */}
            <span className="text-sm text-gray-700 dark:text-gray-400">
                Showing <span className="font-semibold text-[#B91C1C]">{currentEntries + 1}</span> to <span className="font-semibold text-[#B91C1C]">{currentEntries + 20}</span> of <span className="font-semibold text-[#B91C1C]">{totalMovies}</span> Entries
            </span>
            <div className="inline-flex mt-2 xs:mt-0">
                {/* Buttons  */}
                <button 
                    className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    onClick={handelPrevious}
                >
                    <svg className="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
                    </svg>
                    Prev
                </button>
                <button 
                    className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    onClick={handelNext}
                >
                    Next
                    <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                </button>
            </div>
        </div>
    </div>
  )
}

export default Pagination
