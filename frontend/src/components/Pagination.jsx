import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from "@heroicons/react/20/solid";

export default function Pagination({
  url,
  setPageSetting,
  pageSetting,
  totalPage,
}) {
  return (
    <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0 w-100">
      <div className="-mt-px flex w-0 flex-1">
        {pageSetting.page > 1 && (
          <span
            onClick={() =>
              setPageSetting({ ...pageSetting, page: pageSetting.page - 1 })
            }
            className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
          >
            <ArrowLongLeftIcon
              aria-hidden="true"
              className="mr-3 h-5 w-5 text-gray-400"
            />
            Previous
          </span>
        )}
      </div>
      <div className="hidden md:-mt-px md:flex">
        {Array.from({ length: totalPage }, (_, i) => (
          <span
          key={i}
            onClick={() => setPageSetting({ ...pageSetting, page: i + 1 })}
            href={`/${url}?page=${i + 1}`}
            className={`${
              (i+1) === pageSetting.page ? "border-red-500 text-indigo-600" : ""
            }inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700`}
          >
            {i + 1} 
          </span>
        ))}
      </div>
      <div className="-mt-px flex w-0 flex-1 justify-end">
        {pageSetting.page < totalPage && (
          <span
            onClick={() =>
              setPageSetting({ ...pageSetting, page: pageSetting.page + 1 })
            }
            className="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
          >
            Next
            <ArrowLongRightIcon
              aria-hidden="true"
              className="ml-3 h-5 w-5 text-gray-400"
            />
          </span>
        )}
      </div>
    </nav>
  );
}
