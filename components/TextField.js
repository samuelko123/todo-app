import {
    forwardRef,
    useEffect,
    useState,
} from 'react'

import { v4 as uuidv4 } from 'uuid'
import styled from 'styled-components'
import { HiddenLabel } from '.'

const Input = styled.input`
    background-color: ${props => props.theme.light};
    border: 2px solid ${props => props.theme.lightgray};
    color: ${props => props.theme.dark};
    padding: 0.25rem 0.5rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: 0.25rem;

    &:focus {
        outline: none;
        box-shadow: 0px 0px 0.25rem ${props => props.theme.primary};
    }
`

export const TextField = forwardRef((props, ref) => {
    const { label } = props
    const [id, setId] = useState(null)

    useEffect(() => {
        setId(uuidv4())
    }, [])

    return (
        <>
            <HiddenLabel htmlFor={id}>
                {label}
            </HiddenLabel>
            <Input id={id} ref={ref} placeholder={label} {...props} />
        </>
    )
})