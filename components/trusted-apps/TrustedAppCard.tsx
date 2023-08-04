"use client"

import { 
  getSourceIri,
} from "@inrupt/solid-client"
import CheckboxList from "../access-card-elements/CheckboxList"
import { useState } from "react"
import EditableTextField from "../access-card-elements/EditableTextField"
import AppcardData from "./appcardType"

export default function TrustedAppCard(props: {
  data: AppcardData
}){
  const {dataset, appThing, access} = props.data
  const [appName, setAppName] = useState(getSourceIri(dataset))
  
  return (
    <div className="w-full h-full">
      {/** appName title */}
      <div className="w-full flex justify-center items-center h-10 md:px-2">
        <div className="font-semibold pr-2 flex-none">App: </div>
        <div className="max-h-full overflow-x-auto whitespace-nowrap">
          {props.disabled ? appName : <EditableTextField
            value={appName}
            onChange={setAppName}
          />}
        </div>
      </div>
      <hr />
      <CheckboxList
        object={props.access}
        onSubmit={handleSubmit}
        onDelete={props.hideDelete ? undefined : handleDelete}
        descriptions={accessDescription}
        disabled={isValidating || props.disabled}
      />
    </div>
  )
}
