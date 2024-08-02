import { useState } from 'react'
import DynamicForm from './DynamicFormDialog'
import { convertDateFormat } from '../config/timeConvert'

const status = {
  ACCEPTED: 'bg-green-100 ring-green-600 text-green-700',
  REJECTED: 'bg-red-100 ring-red-600 text-red-700',
  PENDING: 'bg-yellow-100 ring-yellow-600 text-yellow-700',
  CANCELLED: 'bg-gray-100 ring-gray-600 text-gray-700',
}

export default function OfferList({ offers }) {
  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8 bg-white rounded p-5">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-3xl font-semibold leading-6 text-gray-900">
              Offer List
            </h1>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      Name
                    </th>

                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Status
                    </th>

                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Offer Price
                    </th>

                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Created At
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Expired At
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {offers.length > 0 ? (
                    offers.map((offer) => (
                      <tr key={offer.email}>
                        <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                          <div className="flex items-center">
                            <div className="h-11 w-11 flex-shrink-0">
                              <img
                                alt=""
                                src={
                                  'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                                }
                                className="h-11 w-11 rounded-full"
                              />
                            </div>
                            <div className="ml-4">
                              <div className="font-medium text-gray-900">
                                {offer.user.fullName}
                              </div>
                              <div className="mt-1 text-gray-500">
                                {offer.user.email}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          <span
                            className={`${
                              status[offer.status]
                            } inline-flex items-center rounded-md px-2 py-1 text-xs font-medium  ring-1 ring-inset `}
                          >
                            {offer.status}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          <span className="inline-flex items-center rounded-md  px-2 py-1  font-medium ">
                            {offer.amount} eth
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          <span className="inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium ">
                            {convertDateFormat(offer.createdAt)}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          <span className="inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium">
                            {convertDateFormat(offer.updatedAt)}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center"
                        colSpan="5"
                      >
                        <p className="text-center">No offers yet</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
