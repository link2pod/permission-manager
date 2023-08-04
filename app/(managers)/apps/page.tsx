import TrustedAppDisplay from "@/components/trusted-apps/TrustedAppDisplay";

export default function AppsManagerPage() {
  return (
    <div>
      <h3 className="w-full text-xl text-center my-4">Trusted Apps</h3>
      <div>
        <TrustedAppDisplay />
      </div>
    </div>
  )
}
