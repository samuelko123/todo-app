import styled from 'styled-components'

export const List = styled.ul.attrs({ role: 'list' })`
    border: 0 solid ${props => props.theme.border};
    border-width: 0 0 1px 1px;
    list-style: none;
    padding: 0;
    margin: 0;
`

export const ListItem = styled.li`
    border: 0 solid ${props => props.theme.border};
    border-width: 1px 1px 0 0;
    padding: 0.25rem 0.5rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: 0.25rem;
`