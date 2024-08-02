import { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import useAxios from 'axios-hooks'
import axiosInstance from '../config/axiosInstance'
import Pagination from './Pagination'
import Loading from './Loading'

export default function ProductList() {
  const [pageSetting, setPageSetting] = useState({
    page: 1,
    perPage: 12,
  })
  const [query, setQuery] = useState({})

  const [{ data: productList, loading, error }] = useAxios({
    url: '/products',
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

  useEffect(() => {
    console.log('productList', productList, loading, error)
  })

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only text-black">Products</h2>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {productList &&
            productList.data &&
            productList.data.map((product) => (
              <a href={`product/${product.id}`}>
                <ProductCard
                  img={JSON.parse(product.image)[0]}
                  name={product.productName}
                  currentBid={product.price}
                  owner={product.user.fullName}
                ></ProductCard>
              </a>
            ))}
        </div>

        {productList && productList.meta.lastPage > 1 && (
          <div className="mt-5 flex justify-center">
            <div className="w-3/5">
              <Pagination
                url={'/products'}
                setPageSetting={setPageSetting}
                pageSetting={pageSetting}
                totalPage={productList.meta.lastPage}
              ></Pagination>
            </div>
          </div>
        )}
      </div>

      {loading && <Loading />}
    </div>
  )
}
