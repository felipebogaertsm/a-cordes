export default function SmallButton1({ children, ...props }) {
    return (
        <button
            {...props}
            className="
                rounded-sm text-sm justify-center px-1 py-0.5 hover:bg-zinc-300 
                bg-opacity-20 text-zinc-700 my-auto cursor-pointer 
                transition-all duration-100 opacity-60 hover:opacity-80
            "
        >
            {children}
        </button>
    )
}
