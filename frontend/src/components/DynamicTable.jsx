import { useEffect, useState } from 'react'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline'
import {
  EyeIcon,
  TrashIcon,
  PencilIcon,
  HandThumbUpIcon,
  HandThumbDownIcon,
} from '@heroicons/react/24/outline'
import axiosInstance from '../config/axiosInstance'
import DialogCustom from './DialogCustom'
import useAxios from 'axios-hooks'
import Loading from './Loading'
import Modal from './Modal'
import DynamicForm from './DynamicFormDialog'
import { useAuth } from '../context/AuthContext'
import Pagination from './Pagination'
import { convertDateFormat } from './../config/timeConvert'
import ModalProductDetail from './ModalProductDetail'
import ModalOfferDetail from './ModalOfferDetail'
import { descConvert } from '../config/descConvert'
import DynamicFormUpdate from './DynamicUpdateForm'
import axios from 'axios'
import { API_URL } from './../config/api'

function DropdownMenu({
  handleView,
  handleUpdate,
  handleDelete,
  data,
  isConfirmed = false,
  isAction = false,
  handleConfirmed = () => {},
}) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="flex items-center p-2 text-gray-500 hover:text-gray-700">
          <EllipsisVerticalIcon className="w-5 h-5" />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 w-32 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {!isConfirmed ? (
            <div className="py-1">
              <Menu.Item className="flex gap-3 justify-start">
                {({ active }) => (
                  <div
                    className={`${
                      active ? 'bg-gray-100' : ''
                    } block px-4 py-2 text-sm text-gray-700`}
                    onClick={() => handleView(data)}
                  >
                    <span>
                      <EyeIcon className="w-5 h-5" />
                    </span>
                    View
                  </div>
                )}
              </Menu.Item>
              <Menu.Item className="flex gap-3 justify-start">
                {({ active }) => (
                  <div
                    onClick={() => handleDelete(data)}
                    className={`${
                      active ? 'bg-gray-100' : ''
                    } block px-4 py-2 text-sm text-gray-700`}
                  >
                    <span>
                      <TrashIcon className="w-5 h-5" />
                    </span>
                    Delete
                  </div>
                )}
              </Menu.Item>
              <Menu.Item className="flex gap-3 justify-start">
                {({ active }) => (
                  <div
                    onClick={() => handleUpdate(data)}
                    className={`${
                      active ? 'bg-gray-100' : ''
                    } block px-4 py-2 text-sm text-gray-700`}
                  >
                    <span>
                      <PencilIcon className="w-5 h-5" />
                    </span>
                    Edit
                  </div>
                )}
              </Menu.Item>
            </div>
          ) : (
            <div className="py-1">
              <Menu.Item className="flex gap-3 justify-start">
                {({ active }) => (
                  <div
                    className={`${
                      active ? 'bg-gray-100' : ''
                    } block px-4 py-2 text-sm text-gray-700`}
                    onClick={() => handleView(data)}
                  >
                    <span>
                      <EyeIcon className="w-5 h-5" />
                    </span>
                    View
                  </div>
                )}
              </Menu.Item>
              {!isAction && (
                <Menu.Item className="flex gap-3 justify-start">
                  {({ active }) => (
                    <div
                      onClick={() => {
                        handleConfirmed('accepted', data)
                      }}
                      className={`${
                        active ? 'bg-gray-100' : ''
                      } block px-4 py-2 text-sm text-gray-700`}
                    >
                      <span>
                        <HandThumbUpIcon className="w-5 h-5" />
                      </span>
                      Accept
                    </div>
                  )}
                </Menu.Item>
              )}
              {!isAction && (
                <Menu.Item className="flex gap-3 justify-start">
                  {({ active }) => (
                    <div
                      onClick={() => handleConfirmed('rejected', data)}
                      className={`${
                        active ? 'bg-gray-100' : ''
                      } block px-4 py-2 text-sm text-gray-700`}
                    >
                      <span>
                        <HandThumbDownIcon className="w-5 h-5" />
                      </span>
                      Reject
                    </div>
                  )}
                </Menu.Item>
              )}
            </div>
          )}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

const status = {
  ACTIVE: 'bg-green-100 ring-green-600 text-green-700',
  INACTIVE: 'bg-gray-100 ring-gray-600 text-gray-700',
  DELETED: 'bg-red-100 ring-red-600 text-red-700',
  IN_REVIEW: 'bg-yellow-100 ring-yellow-600 text-yellow-700',
  ACCEPTED: 'bg-green-100 ring-green-600 text-green-700',
  REJECTED: 'bg-red-100 ring-red-600 text-red-700',
  CANCELLED: 'bg-gray-100 ring-gray-600 text-gray-700',
  SUCCESS: 'bg-green-100 ring-green-600 text-green-700',
  FAILED: 'bg-red-100 ring-red-600 text-red-700',
  PENDING: 'bg-yellow-100 ring-yellow-600 text-yellow-700',
}

export default function DynamicTable({
  columns,
  url,
  title,
  desc,
  fieldDetails = null,
  isConfirmed = false,
  query = {},
  btnAdd = null,
  formConfig = null,
  schema = null,
  defaultValues = null,
  btnForm = null,
  btnCssForm = null,
  titleForm = null,
  schemaUpdate = null,
  fieldUpdate = [],
}) {
  const [selectData, setSelectData] = useState({
    id: 1,
  })

  const [commonLoading, setCommonLoading] = useState(false)

  const [modalUpdate, setModalUpdate] = useState(false)

  const [formOpen, setFormOpen] = useState(false)
  const [dialogSettings, setDialogSettings] = useState({
    isOpen: false,
    title: 'Delete user ... ',
    desc: 'When you click to delete user will be deleted in database',
    btn: 'Delete',
    btnCss: 'bg-indigo-600',
    action: 'delete',
  })

  const [modalSetting, setModalSetting] = useState({
    title: '',
    desc: '',
    isError: false,
    isOpen: false,
  })

  const [modalProductDetail, setModalProductDetail] = useState(false)
  const [modalOfferDetail, setModalOfferDetail] = useState(false)

  const handleModal = (data) => {
    setModalSetting({
      ...data,
    })
  }

  const [pageSetting, setPageSetting] = useState({
    page: 1,
    perPage: 10,
  })

  const [initialDataUpdate, setInitialDataUpdate] = useState({})

  const [{ data: findMany, loading, error: findManyError }, handleFindMany] =
    useAxios({
      url: `${url}`,
      axios: axiosInstance,
      method: 'GET',
      params: {
        ...Object.fromEntries(
          Object.entries(query).filter(
            ([_key, value]) => value !== null && value !== '',
          ),
        ),
        ...pageSetting,
      },
    })
  const [{ loading: deleteLoading, error: deleteError }, handleDeleteData] =
    useAxios(
      {
        url: `${url}/${selectData.id}`,
        axios: axiosInstance,
        method: 'DELETE',
      },
      { manual: true },
    )

  const [
    { data: updateData, loading: updateLoading, error: updateError },
    handleUpdate,
  ] = useAxios(
    {
      url: `${url}/${selectData.id}`,
      axios: axiosInstance,
      method: 'PUT',
    },
    { manual: true },
  )

  const [confirmValue, setConfirmValue] = useState(false)
  const handleConfirmed = async (status, data) => {
    setSelectData(data)
    setConfirmValue(status)
    setDialogSettings({
      isOpen: true,
      title: `Confirm ${url.split('/')[1]}`,
      desc: `Do  you want to ${status} this ${url.split('/')[1]}?`,
      btnCss: 'bg-blue-600',
      btn: 'Confirm',
      action: 'confirm',
    })
  }

  const handleConfirmData = async () => {
    setCommonLoading(true)
    try {
      const response = await axios.put(
        `${API_URL}${url}/${selectData.id}`,
        { action: confirmValue },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        },
      )

      handleFindMany()
    } catch (error) {
      handleModal({
        loading: false,
        title: `${title} Notification`,
        desc: error.response.data.errors[0].message,
        isError: true,
        isOpen: true,
      })
    } finally {
      setCommonLoading(false)
    }
  }

  const handleAction = async (action) => {
    switch (action) {
      case 'delete':
        await handleDeleteData()
        break

      case 'update':
        setModalUpdate(true)
        break
      case 'confirm':
        handleConfirmData()
        break
    }

    handleResetDialog()
    handleFindMany()
  }

  const handleDelete = async (data) => {
    setSelectData({
      ...data,
    })
    setDialogSettings({
      isOpen: true,
      title: `Delete ${url.split('/')[1]}`,
      desc: 'When you click to delete user will be deleted in database',
      btn: 'Delete',
      btnCss: 'bg-red-600',
      action: 'delete',
    })
  }

  const handleClose = () => {
    setDialogSettings({
      ...dialogSettings,
      isOpen: false,
    })
  }

  const handleResetDialog = () => {
    setDialogSettings({
      ...dialogSettings,
      isOpen: false,
    })
  }

  const getValueByAccessor = (item, accessor) => {
    const keys = accessor.split('.')
    return keys.reduce((acc, key) => acc && acc[key], item)
  }

  const handleView = async (data) => {
    console.log('url', url, url == '/products' ? 'product' : 'offer')
    url == '/products' ? setModalProductDetail(true) : setModalOfferDetail(true)
    setSelectData(data)
  }

  const handleModalDataForm = async (data) => {
    const updateData = fieldUpdate.reduce((acc, field) => {
      console.log('field', field, data[field])
      acc[field] = data[field]
      return acc
    }, {})

    console.log('updateData', updateData)

    setInitialDataUpdate(updateData)
    setSelectData(data)
    setModalUpdate(true)
  }

  const handleUpdateData = async (data) => {
    setModalUpdate(false)
    setCommonLoading(true)
    try {
      const formData = new FormData()
      Object.keys(data).forEach((key) => {
        if (key === 'image') {
          let image
          if (data.image[0].originFileObj) {
            image = data.image[0].originFileObj
          } else {
            image = data.image[0]
          }
          formData.append('image', image)
        } else {
          formData.append(key, data[key])
        }
      })

      const response = await axios.put(
        `${API_URL}${url}/${selectData.id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        },
      )
      handleModal({
        loading: false,
        title: `${title} Notification`,
        desc: response.data.message,
        isError: false,
        isOpen: true,
      })

      handleFindMany()
    } catch (error) {
      console.log('error', error)
      handleModal({
        loading: false,
        title: `${title} Notification`,
        desc: error.response.data.errors[0].message,
        isError: true,
        isOpen: true,
      })
    } finally {
      setCommonLoading(false)
    }
  }

  const handleAddData = async (data) => {
    setFormOpen(false)
    setCommonLoading(true)
    try {
      const formData = new FormData()
      Object.keys(data).forEach((key) => {
        if (key === 'image') {
          let image
          if (data.image[0].originFileObj) {
            image = data.image[0].originFileObj
          } else {
            image = data.image[0]
          }
          formData.append('image', image)
        } else {
          formData.append(key, data[key])
        }
      })

      const response = await axios.post(`${API_URL}${url}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      handleModal({
        loading: false,
        title: `${title} Notification`,
        desc: response.data.message,
        isError: false,
        isOpen: true,
      })

      handleFindMany()
    } catch (error) {
      console.log('error', error)
      handleModal({
        loading: false,
        title: `${title} Notification`,
        desc: error.response.data.errors[0].message,
        isError: true,
        isOpen: true,
      })
    } finally {
      setCommonLoading(false)
    }
    handleClose(false)
  }

  return (
    <>
      {(updateLoading || deleteLoading || loading || commonLoading) && (
        <Loading />
      )}
      <div className="bg-white min-h-[70vh]">
        <div className="w-full py-6 sm:px-6  lg:px-8">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-base font-semibold leading-6 text-gray-900">
                  {title}
                </h1>
                <p className="mt-2 text-sm text-gray-700">{desc}</p>
              </div>
              {btnAdd && (
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                  <button
                    type="button"
                    onClick={() => setFormOpen(true)}
                    className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    {btnAdd}
                  </button>
                </div>
              )}
            </div>
            <div className="mt-8 flow-root p-3">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <table className="min-w-full divide-y divide-gray-300 p-3">
                    <thead>
                      <tr>
                        {columns.map((column) => (
                          <th
                            key={column.accessor}
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                          >
                            {column.header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {findMany &&
                        findMany.data.length > 0 &&
                        findMany.data.map((item, idx) => (
                          <>
                            {
                              <tr key={idx} className="even:bg-gray-50 p-3">
                                {columns.map((column) => (
                                  <td
                                    key={column.accessor}
                                    className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0"
                                  >
                                    {column.isImage ? (
                                      <div className="flex items-center">
                                        <div className="h-11 w-11 flex-shrink-0">
                                          <img
                                            alt=""
                                            src={
                                              typeof getValueByAccessor(
                                                item,
                                                column.accessor,
                                              ) != 'string'
                                                ? JSON.parse(
                                                    getValueByAccessor(
                                                      item,
                                                      column.accessor,
                                                    ),
                                                  ).length > 0
                                                  ? JSON.parse(
                                                      getValueByAccessor(
                                                        item,
                                                        column.accessor,
                                                      ),
                                                    )[0]
                                                  : ''
                                                : getValueByAccessor(
                                                    item,
                                                    column.accessor,
                                                  )
                                            }
                                            className="h-11 w-11 rounded-full"
                                          />
                                        </div>
                                      </div>
                                    ) : column.isTimestamp ? (
                                      convertDateFormat(
                                        getValueByAccessor(
                                          item,
                                          column.accessor,
                                        ),
                                      )
                                    ) : column.accessor === 'status' ? (
                                      <span
                                        className={`${
                                          status[
                                            getValueByAccessor(
                                              item,
                                              column.accessor,
                                            )
                                          ]
                                        } inline-flex items-center rounded-md px-2 py-1 text-xs font-medium  ring-1 ring-inset `}
                                      >
                                        {getValueByAccessor(
                                          item,
                                          column.accessor,
                                        )}
                                      </span>
                                    ) : !column.isDescription ? (
                                      getValueByAccessor(item, column.accessor)
                                    ) : (
                                      descConvert(
                                        getValueByAccessor(
                                          item,
                                          column.accessor,
                                        ),
                                      )
                                    )}
                                  </td>
                                ))}

                                <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                  <DropdownMenu
                                    handleView={handleView}
                                    handleUpdate={handleModalDataForm}
                                    handleDelete={handleDelete}
                                    data={item}
                                    isAction={
                                      getValueByAccessor(item, 'status') ==
                                        'ACCEPTED' ||
                                      getValueByAccessor(item, 'status') ==
                                        'REJECTED'
                                    }
                                    isConfirmed={isConfirmed}
                                    handleConfirmed={handleConfirmed}
                                  />
                                </td>
                              </tr>
                            }
                          </>
                        ))}
                    </tbody>
                    <>
                      {findMany && findMany.meta.lastPage > 1 && (
                        <tfoot>
                          <tr>
                            <td colSpan={columns.length + 1}>
                              <div className="mt-5 flex justify-center">
                                <div className="w-3/5">
                                  <Pagination
                                    url={`${url}`}
                                    setPageSetting={setPageSetting}
                                    pageSetting={pageSetting}
                                    totalPage={findMany.meta.lastPage}
                                  ></Pagination>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tfoot>
                      )}
                    </>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {dialogSettings.isOpen && (
        <DialogCustom
          isOpen={dialogSettings.isOpen}
          title={dialogSettings.title}
          desc={dialogSettings.desc}
          btn={dialogSettings.btn}
          action={dialogSettings.action}
          btnCss={dialogSettings.btnCss}
          handleClose={handleClose}
          handleAction={handleAction}
        />
      )}

      {findManyError ||
        deleteError ||
        (updateError && (
          <Modal
            title={`Notification ${title}`}
            desc={
              errorRender(findManyError) ||
              errorRender(deleteError) ||
              errorRender(updateError)
            }
          />
        ))}

      {url == '/products' && modalProductDetail && (
        <ModalProductDetail
          open={modalProductDetail}
          fields={fieldDetails}
          handleClose={() => setModalProductDetail(false)}
          product={selectData}
        />
      )}
      {url == '/offers' && modalOfferDetail && (
        <ModalOfferDetail
          open={modalOfferDetail}
          fields={fieldDetails}
          handleClose={() => setModalOfferDetail(false)}
          offer={selectData}
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

      {formOpen && (
        <DynamicForm
          formConfig={formConfig}
          schema={schema}
          defaultValues={defaultValues}
          btn={btnForm}
          btnCss={btnCssForm}
          title={titleForm}
          url={`${url}`}
          handleClose={setFormOpen}
          handleModal={handleModal}
          handleAddData={handleAddData}
        />
      )}

      {modalUpdate && (
        <DynamicFormUpdate
          title="Update Product"
          btn="Update"
          btnCss="bg-blue-500 "
          formConfig={formConfig}
          url={url}
          schema={schemaUpdate}
          initialData={initialDataUpdate}
          handleUpdateData={handleUpdateData}
          handleClose={() => {
            setModalUpdate(false)
          }}
          handleModal={handleModal}
        />
      )}
    </>
  )
}
const errorRender = (errors) => {
  if (!errors) return false
  return (
    <div>
      {errors.response.data.errors.forEach((error) => {
        return <p className="mt-2 text-sm text-red-600">{error.message}</p>
      })}
    </div>
  )
}
