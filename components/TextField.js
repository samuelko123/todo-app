import {
    forwardRef,
    useEffect,
    useState,
} from 'react'

import { v4 as uuidv4 } from 'uuid'

export const TextField = forwardRef((props, ref) => {
    const { label } = props
    const [id, setId] = useState(null)

    useEffect(() => {
        setId(uuidv4())
    }, [])

    return (
        <>
            <label htmlFor={id}>{label}</label>
            <input id={id} ref={ref} {...props} />
        </>
    )
})