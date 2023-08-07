import OIDCIssuerForm from "./OIDCIssuerForm";
import WebIdLoginForm from "./WebIdForm";

/**
 * Render webID and OIDCIssur login forms
 * @returns 
 */
export default function LoginForms() {
  return (
    <div className="w-full h-full py-4 bg-base drop-shadow-md rounded flex flex-col justify-between">
      {/**Login forms*/}
      {/**TODO: implement login with webID (if supported) */}
      <div className="p-1 sm:p-4 flex-none overflow-clip">
        <h3 className="text-3xl text-center">Login with your WebId</h3>
        <WebIdLoginForm />
      </div>
      <div className="inset-x-0 flex items-center">
        <hr className="flex-grow border-t border-gray-300" />
        <div className="mx-4 text-gray-500">or</div>
        <hr className="flex-grow border-t border-gray-300" />
      </div>

      <div className="p-1 sm:p-4 h-1/2 flex-auto overflow-clip">
        <h3 className="text-3xl text-center">Login with an Identity Provider</h3>
        <OIDCIssuerForm />
      </div>
    </div>
  )
}
