import fetch from "isomorphic-unfetch"

type IndexProps = {
    data: any
}

const Index = (props: IndexProps) => (
    <div>
        <h1>Hello World!</h1>
        {JSON.stringify(props.data)}
    </div>
)

Index.getInitialProps = async function({req}) {
    const response = await fetch((req ? 'http://localhost:3000' : '') + '/api/home')
    const data = await response.json()
    return {
        data: data
    }
}

export default Index;