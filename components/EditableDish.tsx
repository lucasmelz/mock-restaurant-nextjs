'use client';

import React, { useState } from 'react'
import { DishProps } from '@/types'
import { CategoryProps } from '@/types'
import CustomButton from './CustomButton';
import Processing from './Processing';

interface EditableDishProps {
    dishProps: DishProps;
    categories: CategoryProps[];
    fetchDishes: Function;
}

const EditableDish = ({ dishProps, categories, fetchDishes }: EditableDishProps) => {

    const { id, name, description, image, price, category } = dishProps;

    const [beingEdited, setBeingEdited] = useState<boolean>(false);
    const [newName, setName] = useState<string>(name);
    const [newDescription, setDescription] = useState<string>(description);
    const [newCategory, setCategory] = useState<string>(category);
    const [newImage, setImage] = useState<string>(image);
    const [newPrice, setPrice] = useState<number | null>(price);
    const [loading, setLoading] = useState<boolean>(false);
    const [isDeletePromptVisible, setDeletePromptVisible] = useState<boolean>(false);

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value);
        console.log(newCategory);
    };

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(event.target.value);
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setImage(event.target.value);
    };

    const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(event.target.value);
        setPrice(isNaN(value) ? null : value);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log('Form data:', { id, newName, newDescription, newCategory, newImage, newPrice });

        let requestOptions: RequestInit = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: id, name: newName, description: newDescription, category: newCategory, image: newImage, price: newPrice }),
        };

        setLoading(true);

        let response = await fetch("/api/dishes", requestOptions);

        setLoading(false);

        if (!response.ok) {
            console.log("Error patching dish.");
            console.log(response);
            return;
        }

        //success
        console.log(response);
        setBeingEdited(false);
        fetchDishes();
    };

    const deleteDish = async () => {

        let requestOptions: RequestInit = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: id}),
        };

        let response = await fetch("/api/dishes", requestOptions);

        if (!response.ok) {
            console.log("Error deleting dish.");
            console.log(response);
            return;
        }
        
        //success
        console.log(response);
        fetchDishes();
    }

    function categoryName(id: string) {
        let found = categories.find(category => category.id === id)
        if (found)
            return found.name
        return "undefined"
    }

    function showDeletePrompt() {
        setDeletePromptVisible(true);
    }


    return (

        beingEdited ?
            <div className="max-w-sm rounded overflow-hidden shadow-lg place-self-center" style={{ height: "413px", width: "384px" }}>
                <form onSubmit={handleSubmit} className="px-6 py-4">
                    <div className="mb-2">
                        <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="name">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={newName}
                            onChange={handleNameChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="description">
                            Description
                        </label>
                        <textarea
                            id="description"
                            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={newDescription}
                            onChange={handleDescriptionChange}
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="category">
                            Category
                        </label>
                        <select
                            id="category"
                            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            onChange={handleCategoryChange}
                            defaultValue={newCategory}
                            required
                        >
                            {categories.map((category) => (
                                <option key={category.id} value={category.id} >
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-2">
                        <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="image">
                            Image URL
                        </label>
                        <input
                            type="text"
                            id="image"
                            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={newImage}
                            onChange={handleImageChange}
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="price">
                            Price
                        </label>
                        <input
                            type="number"
                            id="price"
                            step="any"
                            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={newPrice ?? ''}
                            onChange={handlePriceChange}
                            required
                        />
                    </div>

                    <div className='flex justify-center pt-4 w-'>
                        {loading ?
                            <Processing />
                            :
                            <>
                                <CustomButton
                                    title='Cancel'
                                    containerStyles='w-28 py-[16px] rounded-lg bg-carnal-red mx-2'
                                    textStyles='text-white text-[14px] leading-[17px] font-bold'
                                    handleClick={() => { setBeingEdited(false) }}
                                />

                                <CustomButton
                                    title='Save'
                                    btnType='submit'
                                    containerStyles='w-28 py-[16px] rounded-lg bg-green-700 mx-2'
                                    textStyles='text-white text-[14px] leading-[17px] font-bold'
                                />
                            </>
                        }

                    </div>


                </form>

            </div>
            :
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
                    Category: {categoryName(category)}
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
                        handleClick={() => showDeletePrompt()}
                    />
                </div>


                {isDeletePromptVisible &&
                    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-50 px-4 py-5 bg-orange-300 border-8 border-carnal-red text-center z-20">
                        <p className="w-95 mx-auto mt-4">Are you sure you want to delete {newName}?</p>
                        <div className='flex justify-center mt-12 pb-4'>

                            <CustomButton
                                title='Cancel'
                                containerStyles='w-28 py-[16px] rounded-lg bg-orange-600 mx-2'
                                textStyles='text-white text-[14px] leading-[17px] font-bold'
                                handleClick={() => setDeletePromptVisible(false)}
                            />
                            <CustomButton
                                title='Delete'
                                containerStyles='w-28 py-[16px] rounded-lg bg-carnal-red mx-2'
                                textStyles='text-white text-[14px] leading-[17px] font-bold'
                                handleClick={() => deleteDish()}
                            />
                        </div>
                    </div>
                }


            </div>
    )

}

export default EditableDish