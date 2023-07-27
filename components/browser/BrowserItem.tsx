import ContainerDropdown from "./ContainerDropdown";
import getUrlPostfix from "@/lib/utilities/getUrlPostfix";

export default function BrowserItem(props: {
  resourceIRI: string,
  depth: number,
  isContainer?: boolean,
}) {
  return (
    <div >
      {
        props.isContainer
          ? <ContainerDropdown
            containerIRI={props.resourceIRI}
            depth={props.depth}
          />
          : <div
            className="hover:bg-gray-100 hover:cursor-pointer hover:text-primary"
            style={{ paddingLeft: props.depth * 20 }}
          >
            {getUrlPostfix(props.resourceIRI).substring(1)}
          </div>
      }
    </div>
  )
}

