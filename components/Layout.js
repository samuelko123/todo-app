import Head from 'next/head'
import styled from 'styled-components'
import { Link } from './index'

export const Header = styled.header`
    padding: 1rem;
    background-color: ${props => props.theme.brand};
    color: ${props => props.theme.background};
    font-size: 1.25rem;
`

const Main = styled.main`
    display: grid;
    grid-template-columns: 1fr;
    grid-row-gap: 1rem;
    width: 80%;
    max-width: 100%;
    margin: 1rem auto;
`

export const Layout = (props) => {
	const {
		title,
		children,
	} = props

	return (
		<>
			<Head>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<title>
					{title}
				</title>
			</Head>
			<Header>
				<Link href='/'>{title}</Link>
			</Header>
			<Main>
				{children}
			</Main>
			<div id='modal-root' />
		</>
	)
}