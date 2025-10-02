import { useContext, useEffect, useState } from "react"
import { api } from "../services/api";
import { Property } from "./Property";
import { PropertiesContext } from "../context/PropertiesContext";

export function PropertiesList() {
    const { propertiesList, setPropertiesList } = useContext(PropertiesContext)

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        api.get("/property").then((res) => {
            setPropertiesList(res.data)
        }).catch((err) => {
            console.error("We are currently not able to load properties information: ", err)
        }).finally(() => {
            setLoading(false)
        })
    }, [])

    if (loading) return <p className="text-gray-500">Loading...</p>;

    return (
        <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-6 md:p-10 overflow-auto">
            <h2 className="text-2xl font-semibold mb-6">Properties list</h2>

            {propertiesList.length === 0 ? (
                <p className="text-gray-500">No property found.</p>
            ) : (
                <ul className="space-y-4">
                    {propertiesList.map((value) => (
                        <Property key={value.id} property={value} />
                    ))}
                </ul>
            )}
        </div>
    )
}