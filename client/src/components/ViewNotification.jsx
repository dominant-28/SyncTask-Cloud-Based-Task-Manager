import { DialogTitle } from "@headlessui/react";
import Button from "./Button";
import ModalWrapper from "./ModalWrapper";

export default function ViewNotification ({ open, setOpen,el })  {

    return (
       <>
       <ModalWrapper open={open} setOpen={setOpen}>
       <div className="py-4 w-full flex flex-col gap-4 items-center justify-center">
        <DialogTitle as="h3" className="font-semibold text-lg text-white">
        {el?.task?.title || "Notification"}
        </DialogTitle>
        <p className="text-start text-white">{el?.text || "No details available"}</p>
        <Button type="button" className="bg-white px-8 mt-3 text-sm font-semibold text-gray-900 sm:w-auto border"
        onClick={() => setOpen(false)}
        label='Ok'/>

        </div>
        </ModalWrapper>
      </> 
    )
    
}
