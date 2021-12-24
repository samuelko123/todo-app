import styled from 'styled-components'
import { HiddenLabel } from './index'
import {
	forwardRef,
} from 'react'

const Input = styled.input.attrs({
    type: 'checkbox',
})`
    border: 2px solid ${props => props.theme.primary};
    background-color: ${props => props.theme.light};
    margin: 0;
    width: 1.5em;
    height: 1.5em;
    font-size: 1rem;
    border-radius: 0.25rem;
    vertical-align: middle;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M6 10l3 3l6-6'/%3e%3c/svg%3e");
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    outline: none;
    cursor: pointer;

    &:checked {
        background-color: ${props => props.theme.primary};
    }
`

export const Checkbox = forwardRef((props, ref) => {
    const { label, ...inputProps } = props

    return (
        <label>
            <Input
                ref={ref}
                {...inputProps}
            />
            <HiddenLabel>
                {label}
            </HiddenLabel>
        </label>
    )
})