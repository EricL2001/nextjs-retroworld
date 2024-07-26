"use server";

import { createCart, getCart } from "@/lib/db/cart";
import prisma from '@/lib/db/prisma';
import { revalidatePath } from "next/cache";

export async function incrementProductQuantity(productID: string) {
    const cart = await getCart() ?? await createCart();

    const articleInCart = cart.items.find(item => item.productID === productID)

    if (articleInCart) {
        await prisma.cartItem.update({
            where: { id: articleInCart.id },
            data: { quantity: { increment: 1 } }
        })
    }   else {
        await prisma.cartItem.create({
            data: {
                cartID: cart.id,
                productID,
                quantity: 1,
            },
        });
    }

    revalidatePath("/products/[id]");
}