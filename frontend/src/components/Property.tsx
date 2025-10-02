import { useContext } from "react";
import { api } from "../services/api";
import { PropertiesContext } from "../context/PropertiesContext";

type PropertyType = {
    id: number
    title: string
    address: string
    status: "active" | "inactive"
}

type PropertyPropsType = {
    property: PropertyType,
}

export function Property({ property }: PropertyPropsType) {
    const { setPropertiesList, setPropertyFormData } = useContext(PropertiesContext)

    function handleDelete() {
        api.delete(`/property/${property.id}`).then((res) => {
            setPropertiesList((state) => state.filter((value) => value.id !== property.id))
            setPropertyFormData({
                id: -1,
                title: "",
                address: "",
                status: "active",
            })
            console.log(res)
        }).catch((err) => {
            console.error(err)
        })
    }

    function handleEdit() {
        setPropertyFormData(property)
    }

    return (
        <li>
            <div className="flex justify-between items-center border border-gray-200 rounded-lg p-4 hover:shadow-sm">
                <div>
                    <h3 className="text-lg font-medium">{property.title}</h3>
                    <p className="text-sm text-gray-600">{property.address}</p>
                </div>

                <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${property.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                        }`}
                >
                    {property.status === "active" ? "Active" : "Inactive"}
                </span>

                <div className="flex gap-3">
                    <button
                        className="px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50"
                        onClick={handleEdit}
                    >
                        Edit
                    </button>
                    <button
                        className="px-4 py-2 rounded-lg bg-red-500 text-white font-medium hover:bg-red-700"
                        onClick={handleDelete}>
                        Delete
                    </button>
                </div>
            </div>
        </li>
    )
}