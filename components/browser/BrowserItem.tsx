import ContainerDropdown from "./ContainerDropdown";
import ItemText from "./ItemText";

/**
 * 
 * @param props.depth number of tabs from left to indent
 * @returns component with hover-over effects 
 * If item is a container, render ContainerDropdown. 
 */
export default function BrowserItem(props: {
  IRI: string,
  depth: number,
  isContainer?: boolean,
}) {
  if (props.isContainer){
    return <ContainerDropdown 
      IRI={props.IRI}
      depth={props.depth}
    />
  }
  return (
    <div
      className="hover:cursor-pointer hover:bg-gray-100"
      style={{ paddingLeft: props.depth * 20 }}
    >
      <ItemText IRI={props.IRI} />
    </div >
  )
}

