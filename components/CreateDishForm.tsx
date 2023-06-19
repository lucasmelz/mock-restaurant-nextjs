import React, { useState } from 'react'
import { CategoryProps } from '@/types';
import CustomButton from './CustomButton';
import Spinner from './Spinner';
import Processing from './Processing';

interface CreateDishFormProps {
    categories: CategoryProps[];
    setCreate: Function;
    fetchDishes: Function;
}

const CreateDishForm = ({ categories, setCreate, fetchDishes }: CreateDishFormProps) => {
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [image, setImage] = useState<string>("");
    const [price, setPrice] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value);
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
        console.log('Form data:', { name, description, category, image, price });

        let requestOptions: RequestInit = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, description, category, image, price }),
        };

        setLoading(true);

        let response = await fetch("/api/dishes", requestOptions);

        setLoading(false);

        if (!response.ok) {
            console.log("Error creating dish.");
            console.log(response);
            return;
        }

        //success
        console.log(response);
        setCreate(false);
        fetchDishes();

        // Reset form fields
        setName('');
        setDescription('');
        setCategory('');
        setImage('');
        setPrice(null);
    };


    return (

        <div className="max-w-sm rounded overflow-hidden shadow-2xl place-self-center w-80 mt-24">


            <form onSubmit={handleSubmit} className="px-6 py-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={name}
                        onChange={handleNameChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                        Description
                    </label>
                    <textarea
                        id="description"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={description}
                        onChange={handleDescriptionChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                        Category
                    </label>
                    <select
                        id="category"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={category}
                        onChange={handleCategoryChange}
                        required
                    >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                        Image URL
                    </label>
                    <input
                        type="text"
                        id="image"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={image}
                        onChange={handleImageChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                        Price
                    </label>
                    <input
                        type="number"
                        id="price"
                        step="any"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={price ?? ''}
                        onChange={handlePriceChange}
                        required
                    />
                </div>

                <div className='flex justify-center'>
                    {loading ?
                         <Processing/>
                        :
                        <>
                            <CustomButton
                                title='Cancel'
                                containerStyles='w-28 py-[16px] rounded-lg bg-carnal-red mx-2'
                                textStyles='text-white text-[14px] leading-[17px] font-bold'
                                handleClick={() => { setCreate(false) }}
                            />

                            <CustomButton
                                title='Create'
                                btnType='submit'
                                containerStyles='w-28 py-[16px] rounded-lg bg-orange-600 mx-2'
                                textStyles='text-white text-[14px] leading-[17px] font-bold'
                            />
                        </>
                    }



                </div>


            </form>




        </div>

    )
}

export default CreateDishForm