import { DialogTitle } from "@headlessui/react";
import React from "react";
import Button from "./Button";
import ModalWrapper from "./ModalWrapper";
import { useForm } from "react-hook-form";
import Loading from "./Loading";
import Textbox from "./Textbox";
import { toast } from "sonner";
import { useChangePasswordMutation } from "../redux/slices/api/userApiSlice";

export default function ChangePaaaword({ open, setOpen }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const handleOnSubmit = async (data) => {
    if (data.password !== data.cpass) {
      toast.warning("Password doesn't match");
      return;
    }
    try {
      const result = await changePassword(data).unwrap();
      toast.success("Password changed successfully");
      setTimeout(() => {
        setOpen(false);
      }, 1500);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(handleOnSubmit)} className="">
          <DialogTitle
            as="h2"
            className="text-base font-bold leading-6 text-white mb-4"
          >
            Change Password
          </DialogTitle>
          <div className="mt-2 flex flex-col gap-6">
            <Textbox
              placeholder="New Password"
              type="password"
              name="password"
              label="New Password"
              className="w-full rounded"
              register={register("password", {
                required: "New Password is required",
              })}
              error={errors.password ? errors.password.message : ""}
            />
            <Textbox
              label="Confirm New Password"
              type="password"
              name="cpass"
              placeholder="Confirm New Password"
              className="w-full rounded"
              register={register("cpass", {
                required: "Confirm New Password is required",
              })}
              error={errors.password ? errors.password.message : ""}
            />
            {isLoading ? (
              <div className="py-5">
                <Loading />
              </div>
            ) : (
              <div className="py-3 mt-4 sm:flex sm:flex-row-reverse">
                <Button
                  type="submit"
                  className="bg-blue-900 px-8 text-sm font-semibold text-white hover:bg-blue-500 sm:w-auto"
                  label="Save"
                />
                <button
                  type="button"
                  className="bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto "
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </form>
      </ModalWrapper>
    </>
  );
}
