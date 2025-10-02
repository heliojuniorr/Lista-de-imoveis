import { createContext, useState, type ReactNode } from "react"

type PropertyType = {
    id: number,
    title: string,
    address: string,
    status: "active" | "inactive"
}

type PropertiesContexteData = {
    propertyFormData: PropertyType,
    setPropertyFormData: React.Dispatch<React.SetStateAction<PropertyType>>,
    propertiesList: PropertyType[],
    setPropertiesList: React.Dispatch<React.SetStateAction<PropertyType[]>>
}

export const PropertiesContext = createContext({} as PropertiesContexteData)

type PropertiesContextProviderProps = {
    children: ReactNode
}

export function PropertiesContextProvider({ children }: PropertiesContextProviderProps) {
    const [propertyFormData, setPropertyFormData] = useState<PropertyType>({
        id: -1,
        title: "",
        address: "",
        status: "active",
    })

    const [propertiesList, setPropertiesList] = useState<PropertyType[]>([])

    return (
        <PropertiesContext.Provider
            value={{
                propertyFormData,
                setPropertyFormData,
                propertiesList,
                setPropertiesList
            }}
        >
            {children}
        </PropertiesContext.Provider>
    )
}