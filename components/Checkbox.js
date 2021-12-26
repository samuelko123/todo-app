import styled, { css } from 'styled-components'
import {
	HiddenCheckbox,
	HiddenLabel,
} from './index'
import {
	forwardRef,
	useState,
} from 'react'
import {
	MdOutlineCheckBox,
	MdOutlineCheckBoxOutlineBlank,
} from 'react-icons/md'

const CheckboxStyle = css`
     color: ${props => props.theme.brand};
     width: 1.5em;
     height: 1.5em;
     vertical-align: middle;
     cursor: pointer;
`
const StyledChecked = styled(MdOutlineCheckBox)`
    ${CheckboxStyle}
`

const StyledUnchecked = styled(MdOutlineCheckBoxOutlineBlank)`
    ${CheckboxStyle}
`

export const Checkbox = forwardRef((props, ref) => {
	const {
		label,
		onChange,
		defaultChecked,
		...checkboxProps
	} = props

	const [checked, setChecked] = useState(defaultChecked)

	const handleChange = () => {
		setChecked(!checked)
		onChange()
	}

	return (
		<label>
			<HiddenCheckbox
				ref={ref}
				checked={checked}
				onChange={handleChange}
				{...checkboxProps}
			/>
			{
				checked && <StyledChecked />
			}
			{
				!checked && <StyledUnchecked />
			}
			<HiddenLabel>
				{label}
			</HiddenLabel>
		</label>
	)
})