import React ,{useState} from 'react'
import { useParams } from 'react-router-dom'
import ProizvodCard from '../components/ProizvodCard';

const Proizvod = () => {
    const { id } = useParams();
    const [activeImage, setActiveImage] = useState(0);
    const images = [
        "https://cdn.pixabay.com/photo/2020/05/22/17/53/mockup-5206355_960_720.jpg",
        "https://images.unsplash.com/photo-1739741432363-8f5fa6ef4e7d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw5fHx8ZW58MHx8fHx8",
        "https://images.unsplash.com/photo-1739312025707-bbf6765973b3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3fHx8ZW58MHx8fHx8",
        "https://images.unsplash.com/photo-1739531944447-2c68bc64d728?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw4fHx8ZW58MHx8fHx8",
    ];
    const items = [1,2,3,4,5]
    return (
        <div className="bg-gray-100 dark:bg-black py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row -mx-4">
                    {/* Slika proizvoda */}
                    <div className="md:flex-1 px-4">
                        <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                            <img
                                className="w-full h-full object-cover"
                                src={images[activeImage]}
                                alt="Product Image"
                            />
                        </div>
                        <div className="flex space-x-2 justify-center">
                            {images.map((img, index) => (
                                <button key={index} onClick={() => setActiveImage(index)}>
                                    <img
                                        src={img}
                                        alt={`Thumbnail ${index + 1}`}
                                        className={`w-16 h-16 object-cover rounded-lg border-2 transition ${
                                            activeImage === index ? "border-orange-500 scale-105" : "border-transparent"
                                        } hover:border-gray-500`}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                    {/* Informacije o proizvodu */}
                    <div className="md:flex-1 px-4">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Product Name</h2>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                            Neki mutav opis kontam da ce biti iz data baze
                        </p>
                        <div className="flex mb-4">
                            <div className="mr-4">
                                <span className="font-bold text-gray-700 dark:text-gray-300">Cena:</span>
                                <span className="text-gray-600 dark:text-gray-300"> 2000RSD </span>
                            </div>
                            <div>
                                <span className="font-bold text-gray-700 dark:text-gray-300">Kategorija:</span>
                                <span className="text-gray-600 dark:text-gray-300"> Traktor</span>
                            </div>
                            <div>
                                <span className="font-bold text-gray-700 dark:text-gray-300">Dostupnosti:</span>
                                <span className="text-gray-600 dark:text-gray-300"> Koliko komada ima na stanju</span>
                            </div>
                        </div>

                        {/* Odabir boje */}
                        <div className="mb-4">
                            <span className="font-bold text-gray-700 dark:text-gray-300">Kolicina:</span>
                            <div className="flex items-center mt-2">
                                <div>
                                    <label htmlFor="Quantity" className="sr-only"> Quantity </label>

                                    <div className="flex items-center gap-1">
                                        <button
                                            type="button"
                                            className="size-10 leading-10 text-gray-600 transition hover:opacity-75 dark:text-gray-300"
                                        >
                                            -
                                        </button>

                                        <input
                                            type="number"
                                            id="Quantity"
                                            value="1"
                                            className="h-10 w-16 rounded-sm border-gray-200 text-center [-moz-appearance:_textfield] sm:text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                                        />

                                        <button
                                            type="button"
                                            className="size-10 leading-10 text-gray-600 transition hover:opacity-75 dark:text-gray-300"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>



                        {/* Opis proizvoda */}
                        <div>
                            <span className="font-bold text-gray-700 dark:text-gray-300">Product Description:</span>
                            <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                                sed ante justo. Integer euismod libero id mauris malesuada tincidunt. Vivamus commodo nulla ut
                                lorem rhoncus aliquet. Duis dapibus augue vel ipsum pretium, et venenatis sem blandit. Quisque
                                ut erat vitae nisi ultrices placerat non eget velit. Integer ornare mi sed ipsum lacinia, non
                                sagittis mauris blandit. Morbi fermentum libero vel nisl suscipit, nec tincidunt mi consectetur.
                            </p>
                        </div>
                        <div className="flex mx-2 mt-4">
                            <div className="w-1/2 px-2">
                                <button className="w-full bg-gray-900 dark:bg-orange-500 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-orange-700">
                                    Dodaj u korpu
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <span className="flex items-center mt-4">
                <span className="h-px flex-1 bg-white"></span>
                <span className="shrink-0 px-6 text-white font-bold ">Izdvajamo</span>
                <span className="h-px flex-1 bg-white"></span>
            </span>
            <div className="mt-8 grid sm:grid-cols-4 lg:grid-cols-5">
                {items.map((item)=>(
                    <ProizvodCard />
                ))}
            </div>
        </div>
    )
}

export default Proizvod