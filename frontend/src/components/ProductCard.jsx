export default function ProductCard({
  img,
  name,
  owner,
  currentBid,
  placeBid,
}) {
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="!z-5 relative flex flex-col rounded-[20px] max-w-[300px] bg-clip-border shadow-3xl  flex flex-col w-full !p-4 3xl:p-![18px] bg-gray-50 hover:bg-gray-200">
          <div className="h-full w-full">
            <div className="relative w-full">
              <img
                src={img}
                className="mb-3 w-full rounded-xl 3xl:w-full h-[184px] object-cover"
                alt=""
              />
              <button className="absolute top-3 right-3 flex items-center justify-center rounded-full bg-white p-2 text-brand-500 hover:cursor-pointer">
                <div className="flex h-full w-full items-center justify-center rounded-full text-xl hover:bg-gray-50">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 512 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="32"
                      d="M352.92 80C288 80 256 144 256 144s-32-64-96.92-64c-52.76 0-94.54 44.14-95.08 96.81-1.1 109.33 86.73 187.08 183 252.42a16 16 0 0018 0c96.26-65.34 184.09-143.09 183-252.42-.54-52.67-42.32-96.81-95.08-96.81z"
                    ></path>
                  </svg>
                </div>
              </button>
            </div>
            <div className="mb-3 flex items-center justify-between px-1 md:items-start">
              <div className="mb-2">
                <p className="text-lg font-bold text-navy-700">{name}</p>
                <p className="mt-1 text-sm font-medium text-gray-600 md:mt-2">
                  By {owner}
                </p>
              </div>
              <div className="flex flex-row-reverse md:mt-2 lg:mt-0">
                <span className="z-0 ml-px inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#E0E5F2] text-xs text-navy-700">
                  +5
                </span>
                <span className="z-10 -mr-3 h-8 w-8 rounded-full border-2 border-white">
                  <img
                    className="h-full w-full rounded-full object-cover"
                    src="https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/avatar1.eeef2af6dfcd3ff23cb8.png"
                    alt=""
                  />
                </span>
                <span className="z-10 -mr-3 h-8 w-8 rounded-full border-2 border-white">
                  <img
                    className="h-full w-full rounded-full object-cover"
                    src="https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/avatar2.5692c39db4f8c0ea999e.png"
                    alt=""
                  />
                </span>
                <span className="z-10 -mr-3 h-8 w-8 rounded-full border-2 border-white">
                  <img
                    className="h-full w-full rounded-full object-cover"
                    src="https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/avatar3.9f646ac5920fa40adf00.png"
                    alt=""
                  />
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between md:items-center lg:justify-between">
              <div className="flex">
                <p className="!mb-0 text-sm font-bold text-brand-500">
                  Price: {currentBid} <span>eth</span>
                </p>
              </div>
              <button className="bg-blue-500 inline-flex w-1/3 justify-center rounded-md py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2">
                Offer
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
