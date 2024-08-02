import { z } from 'zod'
import DynamicTable from './DynamicTable'
import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'

export function ProductDashboard() {
  const [query, setQuery] = useState({})
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      setQuery({ user_id: user.id })
    }
  }, [user])

  useEffect(() => {
    console.log('query', query)
  }, [query])

  const columns = [
    { header: 'Image', accessor: 'image', isImage: true },
    { header: 'Name', accessor: 'productName' },
    { header: 'Price', accessor: 'price' },
    { header: 'Description', accessor: 'description', isDescription: true },
    { header: 'Create At', accessor: 'createdAt', isTimestamp: true },
    { header: 'Status', accessor: 'status' },
  ]
  const formFormat = {
    productName: {
      disable: false,
      label: 'Product Name',
      type: 'text',
      placeholder: 'Enter Product Name',
      field: 'input',
    },

    description: {
      disable: false,
      label: 'Description',
      type: 'text',
      placeholder: 'Enter description about product',
      field: 'textarea',
    },

    price: {
      disable: false,
      label: 'Price',
      type: 'number',
      placeholder: 'Enter Price',
      field: 'input',
    },

    image: {
      disable: false,
      label: 'Image',
      type: 'image',
      field: 'image',
    },
  }

  const fieldUpdate = [
    'id',
    'productName',
    'description',
    'price',
    'quantity',
    'image',
  ]

  const schema = z.object({
    productName: z.string().min(1, 'Product Name is required'),
    description: z.string().min(1, 'Description is required'),
    price: z.number().min(1, 'Price is required'),
    image: z
      .array(z.instanceof(File))
      .min(0)
      .max(1, 'Please choose only one image.')
      .refine(
        (files) =>
          files.length === 0 ||
          ['image/jpeg', 'image/png', 'image/gif'].includes(files[0].type),
        'Only .jpg, .png, and .gif files are accepted.',
      )
      .refine(
        (files) => files.length === 0 || files[0].size <= 2 * 1024 * 1024,
        'Image size must be less than 2MB.',
      ),
  })

  const schemaUpdate = z.object({
    productName: z.string().min(1, 'Username is required').optional(),
    description: z.string().min(1, 'Description is required').optional(),
    price: z.number().min(1, 'Price is required').optional(),
    image: z.any().optional(),
  })

  const defaultValues = {
    productName: null,
    description: null,
    price: null,
    image: [],
  }

  return (
    <>
      <DynamicTable
        columns={columns}
        title={'Products'}
        btnAdd={'Add New Product'}
        query={query}
        desc={`Lorem ipsum dolor sit amet consectetur adipisicing elit.`}
        url="/products"
        formConfig={formFormat}
        schema={schema}
        defaultValues={defaultValues}
        btnForm={'Save'}
        btnCssForm={'bg-indigo-600 hover:bg-indigo-700'}
        titleForm={'Add Product'}
        schemaUpdate={schemaUpdate}
        fieldUpdate={fieldUpdate}
      />
    </>
  )
}
