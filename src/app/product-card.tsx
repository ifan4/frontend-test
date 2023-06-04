'use client'
import Image from 'next/image'
import { Comfortaa } from 'next/font/google'
import { useState } from 'react'
import { feature } from '../../types/interfaces'

const comfortaa = Comfortaa({ subsets: ['latin'] })

const Product_card = ({title,description, image, status,}:feature) => {
    const [hovered, setHovered] = useState<boolean>(false);


    return(
        <div 
        className="lg:w-96 h-[500px] lg:h-[500px] text-center p-14 lg:p-0 flex flex-col justify-center"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        >
            <div className="flex justify-center h-32 lg:h-52 mb-10"
            >
                <Image 
                className={`transition ease-in-out duration-1000 object-contain w-auto h-auto ${hovered ? 'scale-150 opacity-100' : 'opacity-50'}`}
                src={`/${image}`}  
                width={170} 
                height={170} 
                priority={false}
                alt={title}
                />
            </div>
            <div className={`relative transition ease-in-out duration-1000 ${hovered ? 'opacity-100 translate-y-12' : 'opacity-50'}`}>
                <h3 className={`${comfortaa.className} text-2xl font-bold mb-4`}>{title}</h3>
                <p className='text-md'>{description}</p>
            </div>
        </div>
    )
}

export default Product_card;