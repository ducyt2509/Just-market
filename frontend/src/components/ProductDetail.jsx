'use client'

import { useEffect, useState } from 'react'
import {
  CheckIcon,
  QuestionMarkCircleIcon,
  StarIcon,
} from '@heroicons/react/20/solid'
import { Radio, RadioGroup } from '@headlessui/react'
import { ShieldCheckIcon } from '@heroicons/react/24/outline'
import OfferList from './Offerlist'
import useAxios from 'axios-hooks'
import { Routes, Route, useParams } from 'react-router-dom'
import axiosInstance from '../config/axiosInstance'
import z from 'zod'
import DynamicForm from './DynamicFormDialog'
import Loading from './Loading'
import Modal from './Modal'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'
import { API_URL } from '../config/api'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ProductDetail() {
  const { id } = useParams()
  const { user } = useAuth()

  const [offerOpen, setOfferOpen] = useState(false)
  const [modalSetting, setModalSetting] = useState({
    title: '',
    desc: '',
    isError: false,
    isOpen: false,
  })

  const formFormat = {
    amount: {
      disable: false,
      label: 'Amount',
      type: 'number',
      placeholder: 'Enter amount',
      field: 'input',
    },
  }

  const schema = z.object({
    amount: z.number().min(1, 'Amount is required'),
  })

  const defaultValues = {
    amount: 0,
  }

  if (id === undefined) {
    // Redirect to 404 page
    window.location.href = '/404'
  }

  const [{ data: getProduct, loading, error }, refetch] = useAxios({
    url: `/products/${id}`,
    axios: axiosInstance,
    method: 'GET',
  })

  useEffect(() => {
    console.log('Modal setting', modalSetting)
  })

  const handleModal = (data) => {
    console.log('Handle', data)
    setModalSetting({
      ...data,
    })
  }

  const handleOffer = () => {
    if (user) {
      setOfferOpen(true)
    } else {
      handleModal({
        loading: false,
        title: 'Login Notification',
        desc: 'Please login to make an offer',
        isError: true,
        isOpen: true,
      })
    }
  }

  const handleAddData = async (data) => {
    console.log('Data', data)
    setOfferOpen(false)
    setModalSetting({
      loading: true,
      title: 'Processing',
      desc: 'Please wait while we process your request',
      isError: false,
      isOpen: true,
    })
    try {
      const response = await axios.post(`${API_URL}/offers/${id}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })

      setModalSetting({
        loading: false,
        title: 'Success',
        desc: 'Your offer has been successfully added',
        isError: false,
        isOpen: true,
      })
    } catch (error) {
      setModalSetting({
        loading: false,
        title: 'Error',
        desc: error.response.data.errors[0].message,
        isError: true,
        isOpen: true,
      })
    }
  }

  useEffect(() => {
    refetch()
  }, [modalSetting])

  return (
    <>
      {getProduct && (
        <div className="bg-white">
          <div className="mx-auto max-w-2xl px-4 sm:px-6 sm:py-12 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            {/* Product details */}
            <div className="lg:max-w-lg lg:self-start">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  {getProduct.data.productName}
                </h1>
              </div>

              <section aria-labelledby="information-heading" className="mt-4">
                <h2 id="information-heading" className="sr-only">
                  Product information
                </h2>

                <div className="flex items-center">
                  <p className="text-lg text-gray-900 sm:text-xl">
                    Price:{' '}
                    <span className="font-semibold">
                      {getProduct.data.price} eth
                    </span>
                  </p>
                </div>

                <div className="mt-4 space-y-6">
                  <p className="text-base text-gray-500">
                    {getProduct.data.description}
                  </p>
                </div>
              </section>
            </div>

            {/* Product image */}
            <div className="lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center self-center">
              <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg self-center">
                <img
                  alt={'Product image'}
                  src={JSON.parse(getProduct.data.image)[0]}
                  className="h-3/5 w-4/5 object-cover rounded-lg object-center"
                />
              </div>
            </div>

            {/* Product form */}
            <div className="lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
              <section aria-labelledby="options-heading">
                <div className="mt-10">
                  <button
                    onClick={handleOffer}
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                  >
                    Make an offer
                  </button>
                </div>
                <div className="mt-6 text-center">
                  <a
                    href="#"
                    className="group inline-flex text-base font-medium"
                  >
                    <ShieldCheckIcon
                      aria-hidden="true"
                      className="mr-2 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                  </a>
                </div>
              </section>
            </div>
          </div>

          <div className="mx-auto w-4/5 px-4 sm:px-6 sm:py-12 ">
            <OfferList offers={getProduct.data.offers || []}></OfferList>
          </div>
        </div>
      )}

      {offerOpen && (
        <DynamicForm
          formConfig={formFormat}
          schema={schema}
          defaultValues={defaultValues}
          btn={'Offer'}
          btnCss={'bg-indigo-600 hover:bg-indigo-700'}
          title={'Make an offer'}
          url={`/offers/${id}`}
          handleClose={setOfferOpen}
          handleModal={handleModal}
          handleAddData={handleAddData}
        />
      )}

      {modalSetting.isOpen && (
        <Modal
          title={modalSetting.title}
          desc={modalSetting.desc}
          isError={modalSetting.isError}
          isOpen={modalSetting.isOpen}
          handleModal={handleModal}
        />
      )}
    </>
  )
}
