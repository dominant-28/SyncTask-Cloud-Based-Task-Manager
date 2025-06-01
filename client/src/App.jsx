import React from "react";
import Login from "./pages/Login";
import { Transition } from "@headlessui/react";
import { Fragment, useRef } from "react";
import Dashboard from "./pages/Dashboard";
import TaskDetails from "./pages/TaskDetails";
import Tasks from "./pages/Tasks";
import Users from "./pages/Users";
import Trash from "./pages/Trash";
import { Toaster } from "sonner";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import { useDispatch } from "react-redux";
import clsx from "clsx";
import { MdOutlineClose } from "react-icons/md";
import { setOpenSidebar } from "./redux/slices/authSlice";
function Layout() {
  const { user } = useSelector((state) => state.auth);
  const Location = useLocation();
  return user ? (
    <div className="w-full flex flex-col md:flex-row">
      <div className="md:w-1/5 w-full h-screen bg-white border-r border-teal md:sticky md:top-0 hidden md:block">
        <Sidebar />
      </div>
      <MobileSidebar />
      <div className="flex-1 ">
        <Navbar />

        <div className="p-4 2xl:px-10 ">
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/login" state={{ from: Location }} replace />
  );
}
const MobileSidebar = () => {
  const { isSidebarOpen } = useSelector((state) => state.auth);
  const mobileMenuRef = useRef(null);
  const dispatch = useDispatch();

  const closeSideBar = () => {
    dispatch(setOpenSidebar(false));
  };
  return (
    <>
      <Transition
        show={isSidebarOpen}
        as={Fragment}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        {(ref) => (
          <div
            ref={(ref = (node) => (mobileMenuRef.current = node))}
            className={clsx(
              "fixed top-0 left-0 w-full h-full bg-black/40 z-50 transition-transform duration-300",
              isSidebarOpen ? "translate-x-0" : "translate-x-full"
            )}
            onClick={() => closeSideBar()}
          >
            <div
              className="fixed top-0 left-0 gradient-bg w-3/4 h-full border border-teal"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full h-full flex  ">
                <Sidebar />
              </div>
            </div>
          </div>
        )}
      </Transition>
    </>
  );
};
export default function App() {
  return (
    <main className="w-full min-h-screen gradient-bg2">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/task/:id" element={<TaskDetails />} />
          <Route path="/completed/:status" element={<Tasks />} />
          <Route path="/in-progress/:status" element={<Tasks />} />
          <Route path="/todo/:status" element={<Tasks />} />
          <Route path="/team" element={<Users />} />
          <Route path="/trashed" element={<Trash />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
      <Toaster richColors />
    </main>
  );
}
