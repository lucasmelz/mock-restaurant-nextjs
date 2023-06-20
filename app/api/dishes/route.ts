import { NextRequest, NextResponse } from "next/server";
import fsPromises from 'fs/promises';
import path from 'path'
import { DishProps } from "@/types";
import crypto from 'crypto';


// step 1: read the json file as string (we will use utf-8 encoding)
// step 2: convert this string into a JSON object (JSON array)
// step 3: manipulate the array (posting/patching/deleting)
// step 4: convert the JSON array back to string
// step 5: write updated JSON array (as text) to the JSON file

const dishesFilePath = path.join(process.cwd(), 'public/mocks/dishes.json')

export async function GET() {
    try {
        const dishes = await fsPromises.readFile(dishesFilePath, 'utf-8')
        const json = JSON.parse(dishes)
        return NextResponse.json(json)
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: "No dishes found!" }),
            { status: 404, headers: { 'content-type': 'application/json' } });
    }
}

export async function PATCH(req: NextRequest) {

    try {
        // Step 1: read json file
        const dishes = await fsPromises.readFile(dishesFilePath, 'utf-8')

        // Step 2: parse it into a JSON array
        const jsonArray = JSON.parse(dishes)

        // Step 3: destructure values from request body
        const { id, name, description, image, category, price } = await req.json()

        // Step 4: find the dish index of the dish to be patched
        const dishIndex = jsonArray.findIndex((dish: DishProps) => dish.id === id)

        // Step 4.1: if dish can't be found, return 404
        if (dishIndex < 0) {
            return new NextResponse(
                JSON.stringify({ message: "Dish not found!" }),
                { status: 404, headers: { 'content-type': 'application/json' } }
            );
        }

        // Step 5: get desired dish
        let desiredDish = jsonArray[dishIndex]

        // Step 6: patch Dish just with the values of the body that are not undefined
        desiredDish.name = name ? name : desiredDish.name;
        desiredDish.description = description ? description : desiredDish.description;
        desiredDish.image = image ? image : desiredDish.image;
        desiredDish.category = category ? category : desiredDish.category;
        desiredDish.price = price ? price : desiredDish.price;

        // Step 7: update the JSON array
        jsonArray[dishIndex] = desiredDish

        // Step 8: convert the JSON array back to a JSON string
        const updatedData = JSON.stringify(jsonArray);

        // Step 9: write the updated data to the JSON file
        await fsPromises.writeFile(dishesFilePath, updatedData)

        // Step 10: return response to frontend (200 ok)
        return new NextResponse(
            JSON.stringify({ message: "Dish patched successfully!" }),
            { status: 200, headers: { 'content-type': 'application/json' } },
        )

    } catch (error) {
        return new NextResponse(JSON.stringify({ message: "Error reading or parsing the JSON file!" }),
            { status: 500, headers: { 'content-type': 'application/json' } });
    }


}

export async function POST(req: NextRequest) {

    try {
        // Step 1: read json file
        const dishes = await fsPromises.readFile(dishesFilePath, 'utf-8')

        // Step 2: parse it into a JSON array
        const jsonArray = JSON.parse(dishes)

        // Step 3: destructure values from request body
        const { name, description, image, category, price } = await req.json()

        // Step 4: generate the ID for the new dish
        const id = crypto.randomBytes(16).toString('hex');

        // Step 5: add the new dish to the json array
        jsonArray.push({ id, name, description, image, category, price })

        // Step 6: convert JSON array back to string
        const updatedData = JSON.stringify(jsonArray)

        // Step 7: write the updated data to the JSON file
        await fsPromises.writeFile(dishesFilePath, updatedData)

        // Step 8: return response of a successful post (201)
        return new NextResponse(
            JSON.stringify({ message: "Dish created successfully!" }),
            { status: 201, headers: { 'content-type': 'application/json' } }
        )

    } catch (error) {
        return new NextResponse(JSON.stringify({ message: "Error reading or parsing the JSON file!" }),
            { status: 500, headers: { 'content-type': 'application/json' } });
    }

}

export async function DELETE(req: NextRequest) {

    try {

        // Step 1: extract dish ID
        const { id } = await req.json();

        // Step 2: read json file
        const dishes = await fsPromises.readFile(dishesFilePath, 'utf-8')

        // Step 3: parse it into a JSON array
        const jsonArray = JSON.parse(dishes)

        // Step 4: find the dish index of the dish to be patched
        const dishIndex = jsonArray.findIndex((dish: DishProps) => dish.id === id)

        // Step 4.1: if dish can't be found, return 404
        if (dishIndex < 0) {
            return new NextResponse(
                JSON.stringify({ message: "Dish not found!" }),
                { status: 404, headers: { 'content-type': 'application/json' } }
            );
        }

        // Step 5: remove dish from JSON array
        jsonArray.splice(dishIndex, 1);

        // Step 6: convert JSON array back to string
        const updatedData = JSON.stringify(jsonArray)

        // Step 7: write the updated data to the JSON file
        await fsPromises.writeFile(dishesFilePath, updatedData)

        return new NextResponse(
            JSON.stringify({ message: "Dish deleted successfully!" }),
            { status: 200, headers: { 'content-type': 'application/json' } }
        )

    } catch (error) {
        return new NextResponse(JSON.stringify({ message: "Error reading or parsing the JSON file!" }),
        { status: 500, headers: { 'content-type': 'application/json' } });
    }

}
