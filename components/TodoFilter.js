import styled from 'styled-components'

import { useDispatch } from 'react-redux'
import { updateStatusFilter } from '../app/slices/filterSlice'
import { STATUS_FILTER } from '../app/constants'

import {
	Dropdown,
	List,
	ListItem,
} from '../components'

const FilterOption = styled(ListItem)`
    cursor: pointer;
    text-transform: capitalize;

    &:hover {
        background-color: ${props => props.theme.brand};
        color: ${props => props.theme.background};
    } 
`

export const TodoFilter = () => {
	const dispatch = useDispatch()

	return (
		<Dropdown label='Filter'>
			<List>
				{
					Object.keys(STATUS_FILTER).map(key => {
						return (
							<FilterOption
								key={key}
								role='option'
								onClick={() => dispatch(updateStatusFilter(STATUS_FILTER[key]))}
							>
								{key.toLowerCase()}
							</FilterOption>
						)
					})
				}
			</List>
		</Dropdown>
	)

}