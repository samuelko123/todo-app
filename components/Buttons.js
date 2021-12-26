import styled from 'styled-components'

export const Button = styled.button`
  background-color: ${props => props.theme.primary};
  border: 2px solid ${props => props.theme.primary};
  color: ${props => props.theme.light};
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
    background-color: ${props => props.theme.light};
    color: ${props => props.theme.primary};
  }
`

export const DeleteButton = styled(Button)`
  background-color: ${props => props.theme.danger};
  border-color: ${props => props.theme.danger};
  color: ${props => props.theme.light};

  &:hover:not(:disabled) {
    background-color: ${props => props.theme.light};
    color: ${props => props.theme.danger};
  }
`

export const CancelButton = styled(Button)`
  background-color: ${props => props.theme.gray};
  border-color: ${props => props.theme.gray};
  color: ${props => props.theme.light};

  &:hover:not(:disabled) {
    background-color: ${props => props.theme.light};
    color: ${props => props.theme.gray};
  }
`