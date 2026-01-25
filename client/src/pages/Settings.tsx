<<<<<<< HEAD
import { AccountSettingsCards, ChangePasswordCard, DeleteAccountCard } from "@daveyplate/better-auth-ui"
import { useNavigate } from "react-router-dom"
=======
import { AccountSettingsCards,ChangePasswordCard, DeleteAccountCard } from "@daveyplate/better-auth-ui"
>>>>>>> 01bfe26bb90e50bbda4bd8c0142322382e5249b3

const Settings = () => {
  const navigate = useNavigate()

  return (
    <div className="w-full p-4 flex justify-center items-center min-h-[90vh] flex-col gap-6 py-12">

      <AccountSettingsCards 
        classNames={{card:{
          base:'bg-black/10 ring ring-indigo-950 max-w-xl mx-auto',
          footer:'bg-black/10 ring ring-indigo-950'
        }}}
      />

      <div className="w-full">
        <ChangePasswordCard 
          classNames={{
            base:'bg-black/10 ring ring-indigo-950 max-w-xl mx-auto',
            footer:'bg-black/10 ring ring-indigo-950'
          }}
        />
      </div>
       <div
        onClick={() => navigate("/support")}
        className="w-full max-w-xl mx-auto cursor-pointer rounded-2xl p-[1px]
                   "
      >
        <div className="rounded-2xl p-6 bg-black/30 backdrop-blur-md">
          <h2 className="text-xl font-semibold text-white">
            Nexa Support
          </h2>

          <p className="text-slate-400 mt-2">
            Need help, found a bug, or want to request a feature? Contact Nexa support.
          </p>

          <div className="mt-4 flex justify-end">
            <span className="px-5 py-2 rounded bg-white text-black text-sm font-medium hover:bg-slate-200 transition">
              Go to Support
            </span>
          </div>
        </div>
      </div>

      <div className="w-full">
        <DeleteAccountCard 
          classNames={{
            base:'bg-black/10 ring ring-indigo-950 max-w-xl mx-auto',
          }} 
        />
      </div>

      <div className="flex flex-col items-center gap-3 pt-4">
        <p className="text-sm text-gray-400 tracking-wide">
          Version <span className="text-gray-300 font-medium">2.2.0</span>
        </p>
      </div>

    </div>
  )
}

export default Settings

