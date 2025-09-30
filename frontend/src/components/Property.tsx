import { useState } from "react";
import { api } from "../services/api";
import { PropertyForm } from "./PropertyForm";

type PropertyType = {
    id: number
    title: string
    address: string
    status: "active" | "inactive"
}

type PropertyInfoType = {
    title: string
    address: string
    status: "active" | "inactive"
}

type PropertyPropsType = {
    property: PropertyType,
    onDelete: (id: number) => void
    onEdit: (property: PropertyType) => void
}

export function Property( props: PropertyPropsType) {
    const [showEditForm, setShowEditForm] = useState(false)

    function handleDelete(id: number) {
        api.delete(`/property/${id}`).then((res) => {
            props.onDelete(id)
            console.log(res)
        }).catch((err) => {
            console.error(err)
        })
    }

    function handleEdit() {
        setShowEditForm(state => !state)
    }

    function onEdit(propertyInfo: PropertyInfoType) {
        console.log("chegou")
        props.onEdit({id: props.property.id, ...propertyInfo})
    }

    function editForm() {
        if(showEditForm)
            return <PropertyForm id={props.property.id} property={{...props.property}} onEdit={onEdit}/> 
    }

    return (
        <li>
            <div className="flex justify-between items-center border border-gray-200 rounded-lg p-4 hover:shadow-sm">
                <div>
                    <h3 className="text-lg font-medium">{props.property.title}</h3>
                    <p className="text-sm text-gray-600">{props.property.address}</p>
                </div>

                <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${props.property.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                        }`}
                >
                    {props.property.status === "active" ? "Active" : "Inactive"}
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
                        onClick={() => {
                            handleDelete(props.property.id)
                        }}>
                        Delete
                    </button>
                </div>
            </div>

            {showEditForm && editForm()}
        </li>
    )
}