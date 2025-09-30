import { useState } from 'react';
import { PropertiesList } from './components/PropertiesList';
import { PropertyForm } from './components/PropertyForm';

type PropertyType = {
    id: number;
    title: string;
    address: string;
    status: "active" | "inactive";
}

function App() {
  const [propertyList, setPropertyList] = useState<PropertyType[]>([])

  return (
    <div className='flex p-20 gap-15 bg-gray-0 h-screen'>
      <PropertyForm setPropertyList={setPropertyList}/>
      <PropertiesList propertyList={propertyList} setPropertyList={setPropertyList}/>
    </div>
  )
}

export default App
