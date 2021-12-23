import styled from 'styled-components'

export const ListItem = styled.li`
    background-color: ${props => props.theme.light};
    border: 1px solid ${props => props.theme.lightgray};
    color: ${props => props.theme.dark};
    padding: 0.25rem 0.5rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: 0.25rem;
`