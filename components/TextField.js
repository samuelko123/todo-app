import { forwardRef } from 'react'
import styled from 'styled-components'
import { HiddenLabel } from './index'

const Input = styled.input`
	width: 100%;
    background-color: inherit;
    border: 2px solid ${props => props.theme.border};
    padding: 0.25rem 0.5rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: 0.25rem;

    &:focus {
        outline: none;
        box-shadow: 0px 0px 0.25rem ${props => props.theme.brand};
    }
`

export const TextField = forwardRef((props, ref) => {
	const {
		label,
		...inputProps
	} = props

	return (
		<label>
			<HiddenLabel>
				{label}
			</HiddenLabel>
			<Input
				ref={ref}
				{...inputProps}
			/>
		</label>
	)
})