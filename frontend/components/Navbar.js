import NavbarItem from "./NavbarItem"

export default function Navbar() {
    return (
        <div>
            <div
                className='
                    flex flex-row bg-stone-900 text-stone-100
                    h-16 px-4 border-b-2 border-white
                '
            >
                <NavbarItem className='text-2xl lowercase font-bold'>à cordes</NavbarItem>
                <div className='grow'></div>
                <NavbarItem>Products</NavbarItem>
                <NavbarItem>Cart</NavbarItem>
                <NavbarItem>My user</NavbarItem>
            </div>
        </div>
    )
}
