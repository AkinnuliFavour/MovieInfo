import { useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowUp } from 'lucide-react';
import Button from './ui/Button';

interface PaginationProps {
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    totalMovies: number;
}

const Pagination = ({ page, setPage, totalMovies }: PaginationProps) => {
    const divRef = useRef<HTMLDivElement>(null!);

    const handleNext = () => {
        setPage(prev => prev + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    
    const handlePrevious = () => {
        if (page === 1) return;
        setPage(prev => prev - 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const scrollToBottom = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const startEntry = (page - 1) * 20 + 1;
    const endEntry = Math.min(page * 20, totalMovies);

    return (
        <div className="relative pb-12" ref={divRef}>
            <div className="flex flex-col items-center justify-center gap-4">
                <span className="text-sm text-gray-400">
                    Showing <span className="font-bold text-primary">{startEntry}</span> to <span className="font-bold text-primary">{endEntry}</span> of <span className="font-bold text-white">{totalMovies}</span> Entries
                </span>
                
                <div className="flex items-center gap-4">
                    <Button
                        variant="glass"
                        onClick={handlePrevious}
                        disabled={page === 1}
                        className="flex items-center gap-2"
                    >
                        <ChevronLeft className="h-4 w-4" />
                        Prev
                    </Button>
                    
                    <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white font-medium">
                        Page {page}
                    </div>

                    <Button
                        variant="glass"
                        onClick={handleNext}
                        disabled={endEntry >= totalMovies}
                        className="flex items-center gap-2"
                    >
                        Next
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <button
                onClick={scrollToBottom}
                className="fixed bottom-8 right-8 p-3 rounded-full bg-primary text-white shadow-glow hover:bg-primary/80 transition-all z-50 animate-fade-in-up"
                title="Scroll to Top"
            >
                <ArrowUp className="h-6 w-6" />
            </button>
        </div>
    );
};

export default Pagination;
