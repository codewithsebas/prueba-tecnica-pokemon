import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { BackButtonProps } from '../types/types';

const BackButton = ({ title, link }: BackButtonProps) => {
    return (
        <Link
            href={link}
            className="w-fit absolute -top-12 left-0 text-gray-600 p-1.5 px-3 ps-1 rounded-md cursor-pointer flex items-center gap-1 duration-200 bg-white hover:bg-white/90"
        >
            <ChevronLeft />
            {title}
        </Link>
    );
};

export default BackButton;