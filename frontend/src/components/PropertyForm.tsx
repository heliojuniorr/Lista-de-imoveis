import { useContext, useState, type FormEvent } from "react";
import { api } from "../services/api";
import { PropertiesContext } from "../context/PropertiesContext";

export function PropertyForm() {
    const { propertyFormData, setPropertyFormData, setPropertiesList } = useContext(PropertiesContext)

    const [message, setMessage] = useState<{ text: string; type: "success" | "error" | "" }>({
        text: "",
        type: "error",
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        setPropertyFormData((state) => ({
            ...state,
            [name]: value,
        }))
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setMessage({ text: "", type: "" })

        if (!propertyFormData.title || !propertyFormData.address) {
            setMessage({ text: "Please, fill title and address.", type: "error" })
            return;
        }

        if (propertyFormData.id === -1)
            handlePost()
        else
            handleUpdate()

        handleClean()
    }

    function handlePost() {
        api.post("/property", propertyFormData).then((res) => {
            setMessage({ text: "Saved!", type: "success" })
            setPropertiesList(state => [...state, res.data])
            console.log(res)
        }).catch((err) => {
            setMessage({ text: "Error!", type: "error" })
            console.error(err)
        })
    }

    function handleUpdate() {
        api.put(`/property/${propertyFormData.id}`, propertyFormData).then((res) => {
            setMessage({ text: "Updated!", type: "success" })
            setPropertiesList(state => state.map(value => value.id === propertyFormData.id ? propertyFormData : value))
            console.log(res)
        }).catch((err) => {
            setMessage({ text: "Error!", type: "error" })
            console.error(err)
        })
    }

    function handleClean() {
        setPropertyFormData({
            id: -1,
            title: "",
            address: "",
            status: "active",
        })

        setMessage({ text: "", type: "" })
    }

    return (
        <main className="w-full max-w-xl bg-white rounded-2xl shadow-md p-6 md:p-10 mx-auto">
            <h1 className="text-2xl font-semibold mb-4">{`Property ${propertyFormData.id === -1 ? "Registration" : "Modification"}`}</h1>

            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                        Title
                    </label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        required
                        placeholder="Big house"
                        value={propertyFormData.title}
                        onChange={handleChange}
                        className="block w-full rounded-lg border border-gray-200 px-4 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
                    />
                    <p className="mt-1 text-xs text-gray-500">Short name to identify the property.</p>
                </div>

                <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                        Address
                    </label>
                    <input
                        id="address"
                        name="address"
                        type="text"
                        required
                        placeholder="Great George St, London"
                        value={propertyFormData.address}
                        onChange={handleChange}
                        className="block w-full rounded-lg border border-gray-200 px-4 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
                    />
                </div>

                <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                        Status
                    </label>
                    <div className="flex items-center gap-3">
                        <select
                            id="status"
                            name="status"
                            value={propertyFormData.status}
                            onChange={handleChange}
                            className="rounded-lg border border-gray-200 px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>

                        <div
                            className={`ml-auto inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${propertyFormData.status === "active"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                                }`}
                        >
                            {propertyFormData.status === "active" ? "Active" : "Inactive"}
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-end gap-3">
                    <button
                        type="reset"
                        onClick={handleClean}
                        className="px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50"
                    >
                        Clean
                    </button>

                    <button
                        type="submit"
                        className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    >
                        {propertyFormData.id === -1 ? "Save" : "Edit"}
                    </button>
                </div>

                {message.text && (
                    <p
                        className={`text-sm mt-2 ${message.type === "success" ? "text-green-600" : "text-red-600"
                            }`}
                    >
                        {message.text}
                    </p>
                )}
            </form>
        </main>
    );
}
