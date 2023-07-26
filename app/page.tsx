import Link from "next/link";
import { ReactNode } from "react";

export default function Home() {
  return (
    <main className="w-full pt-8">
      {/**Link to managers */}
      <div className="w-full grid md:grid-cols-2 md:space-x-2 justify-evenly sm:px-2">
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
    </main>
  )
}

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
