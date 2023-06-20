'use client';

import { DishProps, CategoryProps } from '@/types';
import React, { useEffect, useState } from 'react'
import { CustomButton, EditableDish, CreateDishForm } from '@/components';

const Admin = () => {

    const [dishes, setDishes] = useState<DishProps[]>([])
    const [categories, setCategories] = useState<CategoryProps[]>([])
    const [create, setCreate] = useState<boolean>(false);

    const fetchDishes = async () => {
        try {
            // const response = await fetch('/mocks/dishes.json');
            const response = await fetch('/api/dishes');
            const data = await response.json();
            setDishes(data);
        } catch (error) {
            console.error('Error fetching dishes:', error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await fetch('/mocks/categories.json');
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    useEffect(() => {
        fetchDishes();
        fetchCategories();
    }, [])


    return (
        <>
            {!create &&
                <div className="w-full pt-24 flex justify-center">
                    <CustomButton
                        title='Create new dish'
                        containerStyles='w-36 py-[16px] rounded bg-orange-600 mx-2'
                        textStyles='text-white text-[14px] leading-[17px] font-bold'
                        // rightIcon='/right-arrow.svg'
                        handleClick={() => setCreate(!create)}
                    />

                </div>}


            {create &&
                <div className='w-full flex justify-center'>
                    <CreateDishForm categories={categories} setCreate={setCreate} fetchDishes={fetchDishes} />
                </div>
            }


            <div className="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-y-4 gap-x-4 pt-4">

                {dishes.map(({ id, name, description, image, category, price }) => {
                    return (
                        <EditableDish
                            key={id}
                            dishProps={{ id, name, description, image, category, price }}
                            categories={categories}
                            fetchDishes={fetchDishes}
                        />
                    );
                })}


            </div>
        </>
    )
}

export default Admin;