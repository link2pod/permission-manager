
import ShowIfSession from "@/components/ShowIfSession"
import AuthModal from "@/components/modals/AuthModal"

export default function ManagerLayout(props: {
  children: React.ReactNode
}) {
  return (
    <>
      {props.children}
      <ShowIfSession showIfNotSession={true}>
        <AuthModal />
      </ShowIfSession>
    </>
  )
}
