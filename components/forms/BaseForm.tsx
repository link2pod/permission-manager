"use client"

import { useRef, useState } from "react"
import { BiError } from "react-icons/bi"

export function BaseForm(props: {
  handleLogin: (value: string | undefined) => any,
  defaultValue?: string,
  name: string,
  label: string,
}) {
  const [value, setValue] = useState(props.defaultValue)
  const [error, setError] = useState(undefined as undefined | string)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async () => {
    try {
      await props.handleLogin(value)
    } catch (err: any) {
      const errmessage = err?.message
      const message = typeof errmessage === 'string'
        ? err.message       // custom err.message if it exists
        : 'Failed to login' // default message
      inputRef.current?.focus()
      setError(message) // show error emssage
    }
  }

  return (
    <div className="w-full h-full ">
      <form
        className="w-full flex"
        onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}
      >
        <label
          className="flex-none pr-1 text-lg"
          htmlFor={props.name}
        >
          {props.label}
        </label>
        <div className="relative w-full">
          <input
            className="w-full pl-1 border rounded"
            name={props.name}
            value={value}
            onChange={(e) => {
              setValue(e.target.value)
              // clear error message
              inputRef.current?.setCustomValidity('')
              setError(undefined)
            }}
            ref={inputRef}
          />
          {
            error && <div className="z-10 absolute w-full h-20 border border-error rounded flex">
              <BiError className="fill-error" /> 
              <div className="overflow-auto">
                {error}
              </div>
            </div>
          }
        </div>
      </form>
    </div >
  )
}
