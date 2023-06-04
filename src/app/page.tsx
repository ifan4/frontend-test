'use client'
import Image from 'next/image'
import ProductCard from './product-card'
import useSWR from 'swr'
import { feature } from '../../types/interfaces'
import { useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";

const fetcher = (url:string) => fetch(url).then(r => r.json())

export default function Home() {
  const ref = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref); // Now we pass the reference to the useDraggable hook:
  const {data ,isLoading} = useSWR('/api/features', fetcher)



  return (
    <main 
    className="flex lg:flex-row flex-col flex-nowrap min-h-screen w-full overflow-x-scroll overflow-y-hidden no-scrollbar" 
    {...events}
    ref={ref}
    >
      <div className='relative flex justify-center min-h-full min-w-full'>
          <Image 
          className='lg:absolute bottom-0 lg:w-[400px]'
          src={'/untukmu-aigirl.png'} 
          width={626} 
          height={973} 
          alt={'dewi-untukmu-aigirl'}
          priority={true}
          />
      </div>
      <div className='flex lg:flex-row flex-col flex-nowrap items-center space-x-11 min-h-full'>
          {
            data?.map((data:feature,key:string)=>(
              <ProductCard 
              key={key}
              image={data.image} 
              title={data.title} 
              description={data.description} 
              />
            ))
          }
      </div>
    </main>
  )
}
