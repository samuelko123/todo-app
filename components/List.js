import styled from 'styled-components'

export const List = styled.ul.attrs({ role: 'list' })`
    list-style: none;
    padding: 0;
    margin: 0;
`

export const ListItem = styled.li`
    border-color: ${props => props.theme.border};
    border-style: solid;
    border-width: 0px 1px 1px 1px;
    padding: 0.25rem 0.5rem;
    font-size: 1rem;
    line-height: 1.5;

    &:first-child {
        border-top-width: 1px;
        border-top-left-radius: 0.25rem;
        border-top-right-radius: 0.25rem;
    }

    &:last-child {
        border-bottom-left-radius: 0.25rem;
        border-bottom-right-radius: 0.25rem;
    }
`