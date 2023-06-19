'use client';

import React, { useState } from 'react'
import { DishProps } from '@/types'
import { CustomButtonProps } from '@/types'
import CustomButton from './CustomButton';

const EditableDish = ({ id, name, description, image, price, category }: DishProps) => {

    const [beingEdited, setBeingEdited] = useState<boolean>(false);

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
            <div className='float-left mx-5 my-3'>
                Category: {category}
            </div>
            <div className='float-right mx-5 my-3'>
                $ {price}
            </div>
            <div className='flex justify-center mt-12 pb-4'>

                <CustomButton
                    title='Edit'
                    containerStyles='w-28 py-[16px] rounded-lg bg-orange-600 mx-2'
                    textStyles='text-white text-[14px] leading-[17px] font-bold'
                    // rightIcon='/right-arrow.svg'
                    handleClick={() => setBeingEdited(true)}
                />
                <CustomButton
                    title='Delete'
                    containerStyles='w-28 py-[16px] rounded-lg bg-carnal-red mx-2'
                    textStyles='text-white text-[14px] leading-[17px] font-bold'
                    // rightIcon='/right-arrow.svg'
                    handleClick={() => setBeingEdited(true)}
                />
            </div>

        </div>
    )
}

export default EditableDish