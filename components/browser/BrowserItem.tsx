import ContainerDropdown from "./ContainerDropdown";
import ItemText from "./ItemText";

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

