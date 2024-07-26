"use client";

import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
} from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  CalendarIcon,
  ChartPieIcon,
  InboxStackIcon,
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

import { Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: HomeIcon,
    current: false,
    isOpen: false,
    isAdmin: true,
    subMenu: [
      { name: "User", href: "/dashboard/user", current: false },
      { name: "Product", href: "/dashboard/product", current: false },
    ],
  },
  {
    name: "Team",
    href: "/dashboard/user",
    icon: UsersIcon,
    current: false,
    isAdmin: true,
  },
  {
    name: "Products",
    href: "/dashboard/products",
    icon: FolderIcon,
    isAdmin: false,
    current: false,
  },
  {
    name: "Calendar",
    href: "/calendar",
    icon: CalendarIcon,
    isAdmin: true,
    current: false,
  },
  {
    name: "Documents",
    href: "/documents",
    icon: DocumentDuplicateIcon,
    isAdmin: true,
    current: false,
  },
  {
    name: "Offers",
    href: "/dashboard/offers",
    icon: InboxStackIcon,
    isAdmin: false,
    current: false,
  },
];

const userNavigation = [
  { name: "Your profile", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function SideBar() {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null); // Track the open menu
  const location = useLocation();

  const handleClick = (name) => {
    setOpenMenu((prevOpenMenu) => (prevOpenMenu === name ? null : name));
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <div>
        <Dialog
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          className="relative z-50 lg:hidden"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 flex">
            <DialogPanel
              transition
              className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
            >
              <TransitionChild>
                <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                  <button
                    type="button"
                    onClick={() => setSidebarOpen(false)}
                    className="-m-2.5 p-2.5"
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon
                      aria-hidden="true"
                      className="h-6 w-6 text-white"
                    />
                  </button>
                </div>
              </TransitionChild>
              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                <div className="flex h-16 shrink-0 items-center">
                  <img
                    alt="Your Company"
                    src="/img/logos/mark.svg?color=indigo&shade=600"
                    className="h-8 w-auto"
                  />
                </div>
                <nav className="flex flex-1 flex-col">
                  <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    {navigation.map((item) => {
                      // Kiểm tra nếu mục yêu cầu quyền admin và user không phải là admin
                      if (item.isAdmin && user?.role !== "admin") {
                        return null;
                      }
                      return (
                        <li key={item.name}>
                          <a
                            {...((item.href &&
                              !item.subMenu && { href: item.href }) ||
                              {})}
                            className={classNames(
                              isActive(item.href)
                                ? "bg-gray-50 text-indigo-600"
                                : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
                              "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                            )}
                            {...(item.subMenu && {
                              onClick: () => handleClick(item.name),
                            })}
                          >
                            <item.icon
                              aria-hidden="true"
                              className={classNames(
                                isActive(item.href)
                                  ? "text-indigo-600"
                                  : "text-gray-400 group-hover:text-indigo-600",
                                "h-6 w-6 shrink-0"
                              )}
                            />
                            {item.name}
                            {item.subMenu && (
                              <ChevronDownIcon
                                aria-hidden="true"
                                className="ml-auto h-5 w-5 text-gray-400 group-hover:text-indigo-600"
                              />
                            )}
                          </a>
                          {item.subMenu && openMenu === item.name && (
                            <ul role="list" className="mt-2 space-y-1 pl-4">
                              {item.subMenu.map((subItem) => (
                                <li key={subItem.name}>
                                  <a
                                    href={subItem.href}
                                    className={classNames(
                                      isActive(subItem.href)
                                        ? "bg-cl bg-gray-50 text-indigo-600"
                                        : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
                                      "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                                    )}
                                  >
                                    <span className="truncate">
                                      {subItem.name}
                                    </span>
                                  </a>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      );
                    })}
                    <li className="mt-auto">
                      <a
                        href="#"
                        className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                      >
                        <Cog6ToothIcon
                          aria-hidden="true"
                          className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                        />
                        Settings
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </div>
        </Dialog>

        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
            <div className="flex h-16 shrink-0 items-center">
              <img
                alt="Your Company"
                src="/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto"
              />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                {navigation.map((item) => {
                  // Kiểm tra nếu mục yêu cầu quyền admin và user không phải là admin
                  if (item.isAdmin && user?.role !== "admin") {
                    return null;
                  }
                  return (
                    <li key={item.name}>
                      <a
                        {...((item.href &&
                          !item.subMenu && { href: item.href }) ||
                          {})}
                        className={classNames(
                          isActive(item.href)
                            ? "bg-gray-50 text-indigo-600"
                            : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
                          "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                        )}
                        {...(item.subMenu && {
                          onClick: () => handleClick(item.name),
                        })}
                      >
                        <item.icon
                          aria-hidden="true"
                          className={classNames(
                            isActive(item.href)
                              ? "text-indigo-600"
                              : "text-gray-400 group-hover:text-indigo-600",
                            "h-6 w-6 shrink-0"
                          )}
                        />
                        {item.name}
                        {item.subMenu && (
                          <ChevronDownIcon
                            aria-hidden="true"
                            className="ml-auto h-5 w-5 text-gray-400 group-hover:text-indigo-600"
                          />
                        )}
                      </a>
                      {item.subMenu && openMenu === item.name && (
                        <ul role="list" className="mt-2 space-y-1 pl-4">
                          {item.subMenu.map((subItem) => (
                            <li key={subItem.name}>
                              <a
                                href={subItem.href}
                                className={classNames(
                                  isActive(subItem.href)
                                    ? "bg-cl bg-gray-50 text-indigo-600"
                                    : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
                                  "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                                )}
                              >
                                <span className="truncate">{subItem.name}</span>
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}
                <li className="mt-auto">
                  <a
                    href="#"
                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                  >
                    <Cog6ToothIcon
                      aria-hidden="true"
                      className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                    />
                    Settings
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="lg:pl-72">
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
            </button>

            <div
              aria-hidden="true"
              className="h-6 w-px bg-gray-200 lg:hidden"
            />

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <form action="#" method="GET" className="relative flex flex-1">
                <label htmlFor="search-field" className="sr-only">
                  Search
                </label>
                <MagnifyingGlassIcon
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
                />
                <input
                  id="search-field"
                  name="search"
                  type="search"
                  placeholder="Search..."
                  className="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                />
              </form>
              <div className="flex items-center gap-x-4 lg:gap-x-6">
                <button
                  type="button"
                  className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon aria-hidden="true" className="h-6 w-6" />
                </button>

                <div
                  aria-hidden="true"
                  className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200"
                />

                <Menu as="div" className="relative">
                  <MenuButton className="-m-1.5 flex items-center p-1.5">
                    <span className="sr-only">Open user menu</span>
                    <img
                      alt=""
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      className="h-8 w-8 rounded-full bg-gray-50"
                    />
                    <span className="hidden lg:flex lg:items-center">
                      <span
                        aria-hidden="true"
                        className="ml-4 text-sm font-semibold leading-6 text-gray-900"
                      >
                        Tom Cook
                      </span>
                      <ChevronDownIcon
                        aria-hidden="true"
                        className="ml-2 h-5 w-5 text-gray-400"
                      />
                    </span>
                  </MenuButton>
                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                  >
                    {userNavigation.map((item) => (
                      <MenuItem key={item.name}>
                        <a
                          href={item.href}
                          className="block px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50"
                        >
                          {item.name}
                        </a>
                      </MenuItem>
                    ))}
                  </MenuItems>
                </Menu>
              </div>
            </div>
          </div>

          <main className="py-10 bg-gray-100 min-h-[100vh]">
            <div className="px-4 sm:px-6 lg:px-8">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
