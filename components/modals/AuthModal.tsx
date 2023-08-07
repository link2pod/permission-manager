import LoginForms from "../forms/LoginForms";
import BaseModal from "./BaseModal";

/**
 * 
 * @returns Modal with `LoginForms` rendered (i.e. OIDC + WebId forms)
 */
export default function AuthModal() {
  return (
    <div className="w-full h-full mx-1 sm:w-5/6 md:w-3/4 ">
      <BaseModal uncloseable={true} >
        <LoginForms />
      </BaseModal>
    </div>
  )
}
