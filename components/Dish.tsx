import React from 'react'
import { DishProps } from '@/types'

const Dish = ({id, name, description, image, price, category} : DishProps) => {
  return (
        
    <div className="max-w-sm rounded overflow-hidden shadow-lg place-self-center">

      <div className="w-full h-48">
        <img className="w-full h-full object-cover" src={image} alt={name} />
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{name}</div>
        <p className="text-gray-700 text-base">
            {description}
        </p>
      </div>
      <div className='float-right mx-5 my-3'>
        $ {price}
      </div>
     
    </div>

  )
}

export default Dish