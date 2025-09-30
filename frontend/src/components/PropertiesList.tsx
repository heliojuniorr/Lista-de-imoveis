import { useEffect, useState } from "react"
import { api } from "../services/api";
import { Property } from "./Property";

type PropertyType = {
    id: number;
    title: string;
    address: string;
    status: "active" | "inactive";
};

export function PropertiesList() {
    const [propertyList, setPropertyList] = useState<PropertyType[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        api.get("/property").then((res) => {
            setPropertyList(res.data)
        }).catch((err) => {
            console.error("We are currently not able to load properties information: ", err)
        }).finally(() => {
            setLoading(false)
        })
    }, [])

    function removeProperty(id: number) {
        setPropertyList((state) => state.filter((value) => value.id !== id))
    }

    function editProperty(property: PropertyType) {
        console.log("chegou")
        setPropertyList(state => state.map(value => value.id === property.id ? property : value))
    }

    if (loading) return <p className="text-gray-500">Loading...</p>;

    return (
        <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-6 md:p-10 overflow-auto">
            <h2 className="text-2xl font-semibold mb-6">Properties list</h2>

            {propertyList.length === 0 ? (
                <p className="text-gray-500">No property found.</p>
            ) : (
                <ul className="space-y-4">
                    {propertyList.map((property) => (
                        <Property key={property.id} property={property} onDelete={removeProperty} onEdit={editProperty}/>
                    ))}
                </ul>
            )}
        </div>
    )
}