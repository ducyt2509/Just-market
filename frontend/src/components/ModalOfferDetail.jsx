'use client'

import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { XMarkIcon ,ArrowTrendingUpIcon ,  ArrowTrendingDownIcon} from '@heroicons/react/24/outline'
import { convertDateFormat } from './../config/timeConvert';


const status = {
  ACTIVE: "bg-green-100 ring-green-600 text-green-700",
  INACTIVE: "bg-gray-100 ring-gray-600 text-gray-700",
  DELETED: "bg-red-100 ring-red-600 text-red-700",
  IN_REVIEW: "bg-yellow-100 ring-yellow-600 text-yellow-700",
  ACCEPTED: "bg-green-100 ring-green-600 text-green-700",
  REJECTED: "bg-red-100 ring-red-600 text-red-700",
  CANCELLED: "bg-gray-100 ring-gray-600 text-gray-700",
  SUCCESS: "bg-green-100 ring-green-600 text-green-700",
  FAILED: "bg-red-100 ring-red-600 text-red-700",
  PENDING: "bg-yellow-100 ring-yellow-600 text-yellow-700",
};

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ModalOfferDetail({ open, handleClose, offer }) {
  return (
    <Dialog open={open} onClose={handleClose} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-3 hidden bg-gray-500 bg-opacity-85 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in md:block"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
          <DialogPanel
            transition
            className="flex w-full transform text-left text-base transition data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in md:my-8 md:max-w-2xl md:px-4 data-[closed]:md:translate-y-0 data-[closed]:md:scale-95 lg:max-w-4xl"
          >
            <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
              <button
                type="button"
                onClick={handleClose}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
              >
                <span className="sr-only">Close</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>

              <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                <div className="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                  <img alt={offer.product.productName} src={JSON.parse(offer.product.image[0])[0]} className="object-cover object-center" />
                </div>
                <div className="sm:col-span-8 lg:col-span-7">
                  <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">Offer for {offer.product.productName}</h2>

                  <section aria-labelledby="information-heading" className="mt-2">
                    <h3 id="information-heading" className="sr-only">
                      Offer information
                    </h3>

                    <p className="mt-3 text-base text-gray-500">Product Price: {offer.product.price} ETH</p>
                    <p className="mt-3 text-base text-gray-500 flex justify-start items-center gap-3">Offer Amount:  {offer.amount} ETH  <span>{offer.product.price - offer.amount > 0 ?   <ArrowTrendingDownIcon aria-hidden="true" className="h-6 w-6 text-red-500" />  :  <ArrowTrendingUpIcon aria-hidden="true" className="h-6 w-6 text-green-500" />  }</span></p>
                    <p className="mt-3 text-base text-gray-500">From User: {offer.user.fullName} - {offer.user.email}</p>

                    <p className={`mt-3 text-base text-gray-500`}>Status: <span className={`${status[offer.status]} inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset`}>{offer.status}</span></p>
                    <p className='mt-3 text-base text-gray-500'>Created At: {convertDateFormat(offer.createdAt)}</p>
                    <p className='mt-3 text-base text-gray-500'>Expired At: {convertDateFormat(offer.expiredAt)}</p>

                  </section>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}