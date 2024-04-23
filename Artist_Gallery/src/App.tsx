import { useState } from 'react'
import PhotoRoom from './PhotoRoom';
import SearchInput from './SearchInput';

function App() {

  // Data holds a list of image urls passed from Pixabay API
  const [data, setData] = useState<{imageData:string[]}>({imageData:[]})

  const setImageData = (data:string[]) => {
    setData({imageData:data})
  }

  return (
    <div className="w-screen h-screen p-2 flex flex-col items-center overflow-hidden">
      <h1 className='text-center font-bold text-2xl m-2'>React Photo Room</h1>
      <SearchInput setImageData={setImageData}/>
      <PhotoRoom imageData={data.imageData}></PhotoRoom>
    </div>
  )
}

export default App
