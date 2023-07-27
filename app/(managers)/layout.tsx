
import ShowIfSession from "@/components/ShowIfSession"
import AuthModal from "@/components/modals/AuthModal"

export default function ManagerLayout(props: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className="fixed inset-0">
        {props.children}
      </div>
      <ShowIfSession showIfNotSession={true}>
        <AuthModal />
      </ShowIfSession>
    </>
  )
}
