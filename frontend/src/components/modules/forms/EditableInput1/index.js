import { useState, useRef, useEffect } from "react"

// Components:
import { SmallButton1 } from "components/elements/buttons"

// Styles:
import styles from "./EditableInput1.module.css"

export default function EditableInput1({
    onSubmit,
    defaultValue = "",
    ...props
}) {
    const [initialValue] = useState(defaultValue)
    const [text, setText] = useState(defaultValue)
    const [enabled, setEnabled] = useState(false)

    const inputRef = useRef(null)

    useEffect(() => {
        if (enabled) {
            const end = text.length
            inputRef.current.setSelectionRange(end, end)
            inputRef.current.focus()
        }
    }, [enabled])

    return (
        <div className={styles.container}>
            <input
                ref={inputRef}
                {...props}
                defaultValue={text}
                value={text}
                className={styles.input}
                disabled={!enabled}
                onChange={(e) => setText(e.target.value)}
            ></input>
            <div className={styles.btnContainer}>
                {!enabled && (
                    <SmallButton1
                        onClick={() => setEnabled(true)}
                        type="button"
                    >
                        Edit
                    </SmallButton1>
                )}
                {enabled && (
                    <>
                        <SmallButton1
                            type="submit"
                            onClick={() => onSubmit(text)}
                        >
                            Approve
                        </SmallButton1>
                        <SmallButton1
                            type="button"
                            onClick={() => {
                                setEnabled(false)
                                setText(initialValue)
                            }}
                        >
                            Cancel
                        </SmallButton1>
                    </>
                )}
            </div>
        </div>
    )
}
