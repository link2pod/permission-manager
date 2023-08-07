import ShowIfSession from "@/components/ShowIfSession";
import LoginForms from "@/components/forms/LoginForms";
import Link from "next/link";
import { ReactNode } from "react";

/**
 * Landing page. Render link to File permission manager and App-permission manager
 * Shows login-form if user is not logged in. 
 */
export default function Home() {
  return (
    <main className="w-full pt-8 sm:w-5/6 md:w-3/4 mx-auto">
      {/**Link to managers */}
      <div className="w-full grid md:grid-cols-2 md:space-x-2 justify-evenly sm:px-2">
        {/** TODO: Add preview images */}
        <ManagerCard
          title="Apps Manager"
          description="Control which applications can act on behalf of you, and what permissions they control"
          href="/apps"
        />
        <ManagerCard
          title="Files Manager"
          description="Manage which agents can access the data on your pod"
          href="/files"
        />
      </div>
      {/** Login form if user isn't logged in. Hidden if logged in */}
      <ShowIfSession showIfNotSession={true}>
        <div className="md:h-80 mx-auto mt-4 h-5/12 pb-4">
          <LoginForms />
        </div>
      </ShowIfSession>
    </main>
  )
}

/**
 * Card that renders the permission managers (file, app) in user-friendly fashion
 * TODO: render preview/images 
 */
function ManagerCard(props: {
  title: string,
  description: string,
  href: string,
  children?: ReactNode,
}) {
  return (
    <Link href={props.href}>
      <div className="w-full h-80 bg-base py-2 my-2 drop-shadow-md rounded">
        {/**Preview of content */}
        <div className="w-full h-4/6">{props.children}</div>
        <hr />
        <h2 className="pt-1 text-bold text-xl text-center text-primary">{props.title}</h2>
        <div className="text-justify px-1 sm:px-2">{props.description}</div>
      </div>
    </Link>
  )
}
