import React from 'react'
import ProizvodCard from './ProizvodCard'

const Najnoviji = () => {
    const produts = [1, 2, 3, 4]
    return (
        <div>
            <span className="flex items-center mt-2 font-[700]">
                <span className="h-px flex-1 bg-black"></span>
                <span className="shrink-0 px-6 text-2xl text-orange-500">Najnoviji</span>
                <span className="h-px flex-1 bg-black"></span>
            </span>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 px-8 py-2">
                {produts.map((item) => (
                    <ProizvodCard />
                ))}
            </div>
        </div>
    )
}

export default Najnoviji