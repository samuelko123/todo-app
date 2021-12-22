import Head from 'next/head'

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
            <nav>
                {title}
            </nav>
            <main>
                {children}
            </main>
        </>
    )
}