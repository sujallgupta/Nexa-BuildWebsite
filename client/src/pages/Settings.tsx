import { AccountSettingsCards,ChangePasswordCard, DeleteAccountCard } from "@daveyplate/better-auth-ui"

const Settings = () => {
  return (
    <div className="w-full p-4 flex justify-center items-center min-h-[90vh] flex-col gap-6 py-12">
      <AccountSettingsCards 
      classNames={{card:{
        base:'bg-black/10 ring ring-indigo-950 max-w-xl mx-auto',
        footer:'bg-black/10 ring ring-indigo-950'
      }}}/>
      <div className="w-full">
            <ChangePasswordCard classNames={{
        base:'bg-black/10 ring ring-indigo-950 max-w-xl mx-auto',
        footer:'bg-black/10 ring ring-indigo-950'
      }}/>
        </div>
        <div className="w-full">
            <DeleteAccountCard classNames={{
        base:'bg-black/10 ring ring-indigo-950 max-w-xl mx-auto',
        
      }} />
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
