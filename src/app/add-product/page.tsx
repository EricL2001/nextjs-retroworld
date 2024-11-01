import FormSubmitButton from "@/components/FormSubmitButton";
import prisma from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/auth";


// export const metadata = {
//     title: "Add Product - Flowmazon"
// }

export const metadata = {
    title: "Add Product - Retro World"
}

// this is a server action.  It will pass the addProduct function to the form action below.  Passes form data in when the function is called
async function addProduct (formData: FormData) {
    "use server";

    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/api/auth/signin?callbackUrl=/add-product");
    }

    const name = formData.get("name")?.toString();
    const description = formData.get("description")?.toString();
    const imageUrl = formData.get("imageUrl")?.toString();
    const price = Number(formData.get("price") || 0);

    if (!name || !description || !imageUrl || !price) {
        throw Error("Missing required fields")
    }

    // creates new product and adds info to the mongoDB database
    await prisma.product.create({
        data: {name, description, imageUrl, price}
    });

    redirect("/");
}

export default async function AddProductPage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/api/auth/signin?callbackUrl=/add-product");
    }

    return (
        <div>
            <h1 className="text-lg mb-3 font-bold">Add Product</h1>
            <form action={addProduct}>
                <input 
                required
                name="name"
                placeholder="Name"
                className="input input-bordered w-full mb-3"
                />
                <textarea
                required
                name="description"
                placeholder="Description"
                className="textarea textarea-bordered mb-3 w-full"
                />
                <input 
                required
                name="imageUrl"
                placeholder="Image URL"
                type="url"
                className="input input-bordered w-full mb-3"
                />
                <input 
                required
                name="price"
                placeholder="Price"
                type="number"
                className="input input-bordered w-full mb-3"
                />
                <FormSubmitButton className="btn-block">Add Product</FormSubmitButton>
            </form>
        </div>
    );
}