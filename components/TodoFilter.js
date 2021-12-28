import styled from 'styled-components'

import {
	useDispatch,
	useSelector,
} from 'react-redux'
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
	background-color: ${props => props.active ? props.theme.brand : 'inherit'};
	color: ${props => props.active ? props.theme.btnText : 'inherit'};

    &:hover {
        background-color: ${props => props.active ? props.theme.brand : props.theme.hover};
    } 
`

export const TodoFilter = () => {
	const dispatch = useDispatch()
	const currentFilter = useSelector(state => state.filter.status)

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
								active={STATUS_FILTER[key] === currentFilter}
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