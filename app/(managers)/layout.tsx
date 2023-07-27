
import ShowIfSession from "@/components/ShowIfSession"
import AuthModal from "@/components/modals/AuthModal"
import { SelectedResourceContextProvider } from "@/lib/contexts/SelectedResourceContext"

export default function ManagerLayout(props: {
  children: React.ReactNode
}) {
  return (
    <>
      <SelectedResourceContextProvider>
        <div className="fixed inset-0">
          {props.children}
        </div>
      </SelectedResourceContextProvider>
      <ShowIfSession showIfNotSession={true}>
        <AuthModal />
      </ShowIfSession>
    </>
  )
}
