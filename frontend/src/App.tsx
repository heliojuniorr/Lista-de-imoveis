import { PropertiesList } from './components/PropertiesList';
import { PropertyForm } from './components/PropertyForm';
import { PropertiesContextProvider } from './context/PropertiesContext';

function App() {

  return (
    <div className='flex p-20 gap-15 bg-gray-0 h-screen'>
      <PropertiesContextProvider>
        <PropertyForm />
        <PropertiesList />
      </PropertiesContextProvider>
    </div>
  )
}

export default App
