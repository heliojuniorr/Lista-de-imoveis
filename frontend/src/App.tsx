import { PropertiesList } from './components/PropertiesList';
import { PropertyForm } from './components/PropertyForm';

function App() {

  return (
    <div className='flex p-20 gap-15 bg-gray-0 h-screen'>
      <PropertyForm />
      <PropertiesList/>
    </div>
  )
}

export default App
