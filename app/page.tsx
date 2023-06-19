import Image from 'next/image'

'use client';
import React, { useEffect, useState } from 'react'
import { Dish } from '@/components'
import { DishProps, CategoryProps } from '@/types'

const Menu = () => {

  const [dishes, setDishes] = useState<DishProps[]>([])
  const [categories, setCategories] = useState<CategoryProps[]>([])

  const fetchDishes = async () => {
    try {
      const response = await fetch('/mocks/dishes.json');
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
    <div className="w-11/12 m-auto pt-20">
    {categories.map((category) => (
      <div key={category.id}>
        <h2 className="text-2xl font-bold m-7 w-full text-center">{category.name}</h2>
        <div className="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-y-4 gap-x-4">
          {dishes
            .filter((dish) => dish.category === category.id)
            .map(({ id, name, description, image, price }) => (
              <Dish
                key={id}
                id={id}
                name={name}
                description={description}
                image={image}
                price={price}
                category={category.id}
              />
            ))}
        </div>
      </div>
    ))}
  </div>

  )
}

export default Menu;