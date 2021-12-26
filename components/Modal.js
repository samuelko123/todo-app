import styled from 'styled-components'
import { createPortal } from 'react-dom'

const Backdrop = styled.div`
    position: absolute;
    z-index: 9;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
`

const ModalContainer = styled.div.attrs({ role: 'dialog' })`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: ${props => props.theme.background};
    border: 1px solid ${props => props.theme.gray};
    border-radius: 0.5rem;
    min-width: 300px;
    padding: 0;
`

const ModalHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 1rem;
    border-bottom: 1px solid ${props => props.theme.border};
`

const ModalBody = styled.div`
    padding: 1rem;
`

const ModalFooter = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    column-gap: 0.25rem;
    padding: 1rem;
    border-top: 1px solid ${props => props.theme.border};
`

const ModalTitle = styled.h4`
    margin: auto 0;
    vertical-align: middle;
    display: inline-block;
`

const CloseButton = styled.button`
    background-color: inherit;
    border: 0;
    right: 0;
    top: 0;
    margin: -0.5rem -1rem -0.5rem 0;
    font-size: 1.5rem;
    height: 2rem;
    width: 2rem;
    cursor: pointer;
`

export const Modal = (props) => {
	const {
		title,
		description,
		footer,
		isOpen,
		setIsOpen,
	} = props

	const handleClose = () => setIsOpen(false)
	const handleContainerClick = (e) => {
		e.stopPropagation()
	}

	return (
		isOpen &&
        createPortal(
        	<Backdrop onClick={handleClose}>
        		<ModalContainer onClick={handleContainerClick}>
        			<ModalHeader>
        				<ModalTitle>{title}</ModalTitle>
        				<CloseButton
        					onClick={handleClose}
        					aria-label='Close'
        				>
                            &times;
        				</CloseButton>
        			</ModalHeader>
        			<ModalBody>
        				{description}
        			</ModalBody>
        			<ModalFooter>
        				{footer}
        			</ModalFooter>
        		</ModalContainer>
        	</Backdrop>
        	,
        	document.getElementById('modal-root')
        )
	)
}