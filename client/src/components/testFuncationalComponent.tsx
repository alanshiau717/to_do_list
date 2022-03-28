import { useQuery } from "@apollo/client";
import { GetUsersDocument } from "../generated";

export default function Test() {
    const {loading, error, data} = useQuery(GetUsersDocument)
    if (loading) return <p>Loading....</p>
    return <h1>Hello {data?.getUsers[1].id}</h1>
}