import { z } from 'zod'
import DynamicTable from './DynamicTable'

export function UserDashboard() {
  const columns = [
    { header: 'Image', accessor: 'image', isImage: true },
    { header: 'Name', accessor: 'productName' },
    { header: 'Title', accessor: 'title' },
    { header: 'Description', accessor: 'description' },
    { header: 'Email', accessor: 'email' },
    { header: 'Role', accessor: 'role' },
  ]

  const formFormat = {
    username: {
      disable: false,
      label: 'Username',
      type: 'text',
      placeholder: 'Enter username',
      field: 'input',
    },
    email: {
      disable: false,
      label: 'Email',
      type: 'email',
      placeholder: 'Enter email',
      field: 'input',
    },
    password: {
      disable: false,
      label: 'Password',
      type: 'password',
      placeholder: 'Enter password',
      field: 'input',
    },
    role: {
      disable: false,
      label: 'Role',
      type: 'select',
      field: 'select',
      options: [
        { value: 'admin', label: 'Admin' },
        { value: 'user', label: 'User' },
      ],
    },

    image: {
      disable: false,
      label: 'Image',
      type: 'image',
      field: 'image',
    },
  }

  const schema = z.object({
    username: z.string().min(1, 'Username is required'),
    email: z.string().email('Invalid email'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    role: z.string(),
    image: z
      .array(z.instanceof(File))
      .min(1, 'Please choose only one image.')
      .max(1, 'Please choose only one image.')
      .refine(
        (files) =>
          ['image/jpeg', 'image/png', 'image/gif'].includes(files[0].type),
        'Only .jpg, .png, and .gif files are accepted.',
      )
      .refine(
        (files) => files[0].size <= 2 * 1024 * 1024,
        'Image size must be less than 2MB.',
      ),
  })

  const defaultValues = {
    username: 'bean',
    email: 'userooo1@gmail.com',
    password: 'ben1111',
    role: 'user',
  }

  return (
    <DynamicTable
      columns={columns}
      title={'Products'}
      btnAdd={'Add New Product'}
      desc={`Lorem ipsum dolor sit amet consectetur adipisicing elit.`}
      url="/products"
      formConfig={formFormat}
      schema={schema}
      defaultValues={defaultValues}
      btnForm={'Save'}
      btnCssForm={'bg-indigo-600 hover:bg-indigo-700'}
      titleForm={'Add Product'}
    />
  )
}
