export default function message({ children, ...props }) {
    return (
        <div
            children='
                font-bold px-4 py-2 bg-red-500
            '
        >
            {children}
        </div>
    )
}
