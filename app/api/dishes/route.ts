import { NextRequest, NextResponse } from "next/server";
import fsPromises from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import { DishProps } from "@/types";

const dishesFilePath = path.join(process.cwd(), 'public/mocks/dishes.json')
const categoriesFilePath = path.join(process.cwd(), 'public/mocks/dishes.json')

export async function GET() {
    const dishes = await fsPromises.readFile(dishesFilePath, 'utf-8')
    const json = JSON.parse(dishes)
    return NextResponse.json(json)
}

export async function POST(req: Request) {
    try {
        // Read the existing data from the JSON file
        const dishes = await fsPromises.readFile(dishesFilePath, 'utf-8')
        const jsonArray = JSON.parse(dishes)

        // Get info from the body of the post request
        const { name, description, image, category, price } = await req.json();

        // Generate ID for new dish
        const id = crypto.randomBytes(16).toString('hex');

        // Add the new dish to the json array
        jsonArray.push({ id, name, description, image, category, price })

        // Convert the jsonArray back to a JSON string
        const updatedData = JSON.stringify(jsonArray);

        // Write the updated data to the JSON file
        await fsPromises.writeFile(dishesFilePath, updatedData);

        return new NextResponse(
            JSON.stringify({ message: "Dish created successfully!" }),
            { status: 201, headers: { 'content-type': 'application/json' } },
        );
    }
    catch (error) {
        return new NextResponse(
            JSON.stringify({ message: "Error storing the dish!" }),
            { status: 500, headers: { 'content-type': 'application/json' } },
        );
    }
}

export async function PATCH(req: Request) {
    // Step 1: read json file
    const dishes = await fsPromises.readFile(dishesFilePath, 'utf-8')

    // Step 2: parse it into a json array 
    const jsonArray = JSON.parse(dishes)

    // Step 3: destructure values from request body
    const { id, name, description, image, category, price } = await req.json();

    // Step 4: find the dish index of the dish to be patched
    const dishIndex = jsonArray.findIndex((dish: DishProps) => dish.id == id);

    // Step 4.1: if dish can't be found, return 404
    if (dishIndex < 0) {
        return new NextResponse(
            JSON.stringify({ message: "Dish not found!" }),
            { status: 404, headers: { 'content-type': 'application/json' } },
        );
    }

    // Step 5: get desired dish
    let desiredDish = jsonArray[dishIndex]

    // Step 6: patch Dish just with the values of body request that are not null
    desiredDish.name = name ? name : desiredDish.name;
    desiredDish.description = description ? description : desiredDish.description;
    desiredDish.image = image ? image : desiredDish.image;
    desiredDish.category = category ? category : desiredDish.category;
    desiredDish.price = price ? price : desiredDish.price;

    // Step 7: Update the json array
    jsonArray[dishIndex] = desiredDish;

    // Step 8: Convert the jsonArray back to a JSON string
    const updatedData = JSON.stringify(jsonArray);

    // Step 9: Write the updated data to the JSON file
    await fsPromises.writeFile(dishesFilePath, updatedData);

    return new NextResponse(
        JSON.stringify({ message: "Challenge patched successfully!" }),
        { status: 200, headers: { 'content-type': 'application/json' } },
    );

}

export async function DELETE(req: Request) {

    // Step 1: extract dish ID
    const { id } = await req.json();

    // Step 2: read json file
    const dishes = await fsPromises.readFile(dishesFilePath, 'utf-8')

    // Step 3: parse it into a json array 
    const jsonArray = JSON.parse(dishes)

    // Step 4: find dish index of the dish to be deleted
    const dishIndex = jsonArray.findIndex((dish: DishProps) => dish.id == id);

    // Step 4.1: if dish can't be found, return 404
    if (dishIndex < 0) {
        return new NextResponse(
            JSON.stringify({ message: "Dish not found!" }),
            { status: 404, headers: { 'content-type': 'application/json' } },
        );
    }

    // Step 5: remove dish from json array
    jsonArray.splice(dishIndex, 1);

    // Step 6: Convert the jsonArray back to a JSON string
    const updatedData = JSON.stringify(jsonArray);

    // Steṕ 7: Write the updated data to the JSON file
    await fsPromises.writeFile(dishesFilePath, updatedData);

    return new NextResponse(
        JSON.stringify({ message: "Dish deleted successfully!" }),
        { status: 200, headers: { 'content-type': 'application/json' } },
    );

}
