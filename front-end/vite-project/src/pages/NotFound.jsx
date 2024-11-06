import React from 'react';
import { Link } from 'react-router-dom';
import arrowRight from '../assets/images/arrow-right.svg';

export default function NotFound() {
    return (
        <div className="flex justify-center items-center w-full h-full">
            <div className="flex justify-center items-center w-full gap-2 flex-col">
                <h1 className="title">404</h1>
                <p className='font-semibold'>La page demandée n'a pas été trouvée</p>
                <Link to="/" className="text-[#ffff00] duration-300">
                    Retourner à l'accueil
                </Link>
            </div>
        </div>
    )
}
