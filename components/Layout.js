import Head from 'next/head'
import styled from 'styled-components'
import { Link } from '.'

export const Header = styled.header`
    padding: 1rem;
    background-color: ${props => props.theme.primary};
    color: ${props => props.theme.light};
    font-size: 1.25rem;
`

const Main = styled.main`
    width: 80%;
    max-width: 100%;
    margin: 1rem auto;
`

export const Layout = (props) => {
    const { title, children } = props

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
        </>
    )
}