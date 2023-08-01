"use client"

import { ReactNode, useState } from 'react'
import { Dialog } from '@headlessui/react'
import { IoCloseCircleOutline } from 'react-icons/io5'

export default function BaseModal(props: {
  children: ReactNode,
  title?: string,
  uncloseable?: boolean
}) {
  const [isOpen, setIsOpen] = useState(true)

  const handleClose = () => setIsOpen(false)

  return (
    <Dialog
      open={props.uncloseable ? true : isOpen}
      onClose={handleClose}
      className="relative z-50"
    >
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        {/* The actual dialog panel  */}
        <Dialog.Panel className="flex flex-col rounded bg-white sm:w-5/6 md:w-3/4 h-full sm:h-3/4">
          <div className='relative h-10 w-full'>
            <Dialog.Title>
              <div className='text-center'>{props.title}</div>
            </Dialog.Title>
            {!props.uncloseable && <div
              className='absolute right-0 mr-2 py-1 h-full flex items-center justify-center hover:text-primary'
              onClick={handleClose}
            >
              <IoCloseCircleOutline className="w-full h-full" />
            </div>}
          </div>
          {(props.title || !props.uncloseable) && <hr />}
          <div className='w-full h-full overflow-auto'>
            {props.children}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}
