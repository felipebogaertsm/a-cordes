export default function FormContainer({ children, ...props }) {
    return (
        <div>
            <form {...props}>{children}</form>
        </div>
    )
}
