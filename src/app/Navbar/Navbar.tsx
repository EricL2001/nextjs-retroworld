import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo.png"
import { redirect } from "next/navigation";
import ShoppingCartButton from "./ShoppingCartButton";
import { getCart } from "@/lib/db/cart";
import UserMenuButton from "./UserMenuButton";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/auth";

async function searchProducts(formData: FormData) {
    "use server";

    const searchQuery = formData.get("searchQuery")?.toString();

    if (searchQuery) {
        redirect("/search?query=" + searchQuery);
    }
}

export default async function Navbar() {
    const session = await getServerSession(authOptions);
    const cart = await getCart();

    return(
        <div className="bg-base-100">
            <div className="navbar max-w-7xl m-auto flex-col sm:flex-row gap-2">
                <div className="flex-1">
                    <Link href="/" className="btn btn-ghost text-xl">
                       <Image src={logo} height={40} width={40} alt="Retro World logo" /> 
                       Retro World
                    </Link>
                </div>
                <div className="flex-non gap-2">
                    <form action={searchProducts}>
                        <div className="form control">
                            <input 
                                name="searchQuery"
                                placeholder="Search"
                                className="input input-bordered w-full min-w-[100]"
                            />
                        </div>
                    </form>
                    <ShoppingCartButton cart={cart} />
                    <UserMenuButton session={session} />
                </div>
            </div>
        </div>
    )
}