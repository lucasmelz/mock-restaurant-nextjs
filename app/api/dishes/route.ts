import { NextRequest, NextResponse } from "next/server";
import fsPromises from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

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
            JSON.stringify({message:"Dish created successfully!"}),
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