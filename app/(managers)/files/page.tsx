import Browser from '@/components/browser/Browser'
import ContentPreview from '@/components/ContentPreview'
import ResourcePermissionsDisplay from '@/components/permissions/wac/ResourcePermissionsDisplay'
import SelectedResourceIRI from '@/components/SelectedResourceIRI'

export default function Home() {


  return (
    <main className="h-full w-full flex flex-col lg:flex-row">
      {/** resizeable div for browser */}
      <div className=' w-full h-1/2 flex-none lg:h-full lg:w-1/3 overflow-y-auto'>
        <Browser />
      </div>
      {/** fill rest of screen*/}
      <div className='bg-gray-500 h-full w-full flex-auto flex flex-col overflow-auto lg:overflow-clip'>
        <div className='h-12 flex-none'><SelectedResourceIRI/></div>
        <div className='bg-base flex-auto overflow-auto lg:border lg:h-full'><ResourcePermissionsDisplay /></div>
        <div className='bg-black flex-auto'><ContentPreview /></div>
      </div>
    </main>
  )
}
