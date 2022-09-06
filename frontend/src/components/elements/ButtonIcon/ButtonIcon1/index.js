export default function ButtonIcon1({ ...props }) {
    return (
        <img
            className="
                h-10 w-10 p-2 cursor-pointer hover:scale-105 transition-all 
                duration-500 ease-out opacity-80 hover:opacity-100
            "
            {...props}
        ></img>
    )
}
