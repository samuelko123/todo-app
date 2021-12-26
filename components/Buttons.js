import styled from 'styled-components'

export const Button = styled.button`
  background-color: ${props => props.color ? props.theme[props.color] : props.theme.brand};
  border: 2px solid ${props => props.color ? props.theme[props.color] : props.theme.brand};
  color: ${props => props.theme.btnText};
  padding: 0.25rem 0.5rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  text-align: center;
  display: inline-block;
  transition-duration: 0.2s;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: unset;
  }

  &:hover:not(:disabled) {
    background-color: ${props => props.theme.btnText};
    color: ${props => props.color ? props.theme[props.color] : props.theme.brand};
  }
`

export const DeleteButton = (props) => {
	return <Button color='delete' {...props} />
}

export const CancelButton = (props) => {
	return <Button color='cancel' {...props} />
}