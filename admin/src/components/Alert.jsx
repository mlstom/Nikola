import React from 'react'

const Alert = ({text,ugasi,potvrdi}) => {
    return (
        <div className='z-50 absolute bg-black/70 flex justify-center items-center w-dvw h-dvh  top-0 left-0'>
        <div role="alert" className="max-w-[450px] max-h-[150px] rounded-xl border border-gray-100 bg-white p-4">
            <div className="flex items-start gap-4">
                <span className="text-green-600"  >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6"
                        
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </span>

                <div className="flex-1">
                    <strong className="block font-medium text-gray-900"> {text}</strong>

                    <div className="mt-4 flex gap-2">
                        <div
                            onClick={()=>potvrdi()}
                            className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2 text-white hover:bg-orange-700"
                        >
                            <span className="text-sm"> Potvrdi </span>

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-4"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                                />
                            </svg>
                        </div>

                        <button onClick={()=>ugasi()}  className="block rounded-lg px-4 py-2 text-gray-700 transition hover:bg-gray-50 cursor-pointer">
                            <span className="text-sm">Otkazi</span>
                        </button>
                    </div>
                </div>

                <button onClick={()=>ugasi()} className="text-gray-500 transition hover:text-gray-600 cursor-pointer">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
        </div>
    )
}

export default Alert