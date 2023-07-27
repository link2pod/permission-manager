import { BsChevronRight } from "react-icons/bs"
import { ReactNode } from "react"
import { RectangleSkeleton } from "../Skeletons"


type anyfn = (..._: any[]) => any

/**
 * @param props.isOpen whether dropdown content is shown 
 * @param props.handleToggleDropdown Function called when dropdown button is clicked
 * @returns 
 */
export function DropdownButton(props: {
  isOpen: boolean,
  handleToggleDropdown: anyfn,
  children?: ReactNode,
}) {
  return (<BsChevronRight
    className={`hover:fill-primary h-full cursor-pointer my-auto ${props.isOpen ? "rotate-90" : ""} fill-gray-500`}
    onClick={props.handleToggleDropdown}
  >
    {props.children}
  </BsChevronRight>)
}

/**
 * @param props props
 * @param props.padding show left padding 
 * @param props.showLinedrop display indentation line on left when hovered
 * @param props.isLoading shows loading spinner when true 
 * @param props.isValidating shows skeleton rectangle when true (i.e. new folder/note is created)
 * @returns styled JSX component that's hidden. 
 * Content is shown when props.isOpen is true. 
 * If not loading, shows error if props.error is defined 
 * If not loading, and no error, then render props.children
 */
export function DropdownBody(props: {
  isOpen: boolean,
  children?: ReactNode
  isLoading?: boolean,
  error?: any,
  showLinedrop?: boolean,
  isValidating?: boolean,
}) {
  return (
    <div
      className={`flex h-full${props.isOpen ? "" : " hidden"}`}
    >
      <div className={`grid grid-cols-1 py-1 w-full`}>
        { // if revalidating data (i.e. adding a new folder/note), show skeleton 
          props.isLoading ? <div className="h-6 w-full"><RectangleSkeleton /></div>
            //  if error display error
            : props.error ? <div>{props.error}</div>
              //  otherwise, display data
              : props.children
        }
        {
          // if revalidating data (i.e. adding a new folder/note), show spinner
          props.isValidating && <div className="h-6 w-full"><RectangleSkeleton /></div>
        }
      </div>
    </div>
  )
}


const Dropdown = {
  Body: DropdownBody,
  Button: DropdownButton,
}

export default Dropdown
