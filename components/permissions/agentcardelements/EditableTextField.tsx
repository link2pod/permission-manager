export default function EditableTextField(props: {
  value: string, 
  onChange: (text: string) => any,
}){
  return (
    <input 
      className="focus:outline-none focus:border-primary hover:border w-80 full rounded"
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)}
    />
  )
}
