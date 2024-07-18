import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Bars3Icon } from '@heroicons/react/20/solid';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { WalletIcon } from '@heroicons/react/24/outline';
import { Dialog, DialogPanel, PopoverGroup } from '@headlessui/react';

export default function Header() {
  const { user } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img alt="" src="https://logowik.com/content/uploads/images/cristiano-ronaldo.jpg" className="h-20 w-auto" />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <a href="/products" className="text-sm font-semibold leading-6 text-gray-900">
            Product
          </a>

          <a href="/features" className="text-sm font-semibold leading-6 text-gray-900">
            Features
          </a>
          <a href="/market" className="text-sm font-semibold leading-6 text-gray-900">
            Marketplace
          </a>
          <a href="/company" className="text-sm font-semibold leading-6 text-gray-900">
            Company
          </a>
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end ">
          {!user ? (<div id='LOGIN'>
            <a href="/" className="text-sm font-semibold leading-6 text-gray-900">
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
          </div>):

          <div className='justify-center align-center flex gap-4'>
            <span className="text-sm font-semibold leading-6 text-white flex gap-3 rounded bg-gray-400 p-1 justify-center items-center">
              <WalletIcon aria-hidden="true" className="h-6 w-6" />
              <span className="">900 Eth</span>

            </span>
            <span href="/profile" className="text-sm font-semibold leading-6 text-gray-900 flex justify-center items-center gap-4">
              <span className="z-10 -mr-3 rounded-full border-2 border-white">
                <img
                  className="h-[30px] w-[30px] rounded-full object-cover"
                  src="https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/avatar1.eeef2af6dfcd3ff23cb8.png"
                  alt=""
                />
              </span>
              <span>Bean tr</span>
            </span>
          </div>}
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img alt="" src="/img/logos/mark.svg?color=indigo&shade=600" className="h-8 w-auto" />
            </a>
            <button type="button" onClick={() => setMobileMenuOpen(false)} className="-m-2.5 rounded-md p-2.5 text-gray-700">
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Product
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Features
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Marketplace
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Company
                </a>
              </div>
              <div className="py-6">
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Log in
                </a>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
