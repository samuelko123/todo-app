import styled from 'styled-components'
import { Button } from './index'
import {
	useEffect,
	useState,
} from 'react'

const DropdownContainer = styled.div`
    position: relative;
    display: inline-block;
`

const DropdownButton = styled(Button)`
    &::after{
        display: inline-block;
        width: 0;
        height: 0;
        margin-left: 0.25em;
        vertical-align: middle;
        content: "";
        border-top: 0.3em solid;
        border-right: 0.3em solid transparent;
        border-left: 0.3em solid transparent;
        border-bottom: 0;
    }
`

const DropdownContent = styled.div`
    position: absolute;
    background-color: ${props => props.theme.background};
    z-index: 9;
`

export const Dropdown = (props) => {
	const {
		label,
		children,
	} = props

	const [isOpen, setIsOpen] = useState(false)
    
	const handleClick = (e) => {
		e.stopPropagation()
		setIsOpen(!isOpen)
	}

	useEffect(() => {
		document.addEventListener('click', () => setIsOpen(false))
	}, [])

	return (
		<DropdownContainer>
			<DropdownButton onClick={handleClick}>
				{label}
			</DropdownButton>
			{
				isOpen &&
                <DropdownContent role='listbox'>
                	{children}
                </DropdownContent>
			}
		</DropdownContainer>
	)
}