
import { Link } from "react-router-dom"
import { SplashElement } from "../assets/SplashElement"
import { SwirlElement } from "../assets/SwirlElement"
import meal1 from "../assets/images/meal-1.png"
import meal2 from "../assets/images/meal-2.png"
import meal3 from "../assets/images/meal-3.png"

export const HomePage = () => {
    return (
        <>
            <section className="w-full px-6 py-16 flex flex-col justify-around items-center bg-[url(/header-image.png)] bg-cover bg-center h-[500px]">
                <h1 className="font-denk-one text-white text-4xl/normal md:text-5xl/normal">Authentic Mexican flavors <br />
                    Bold & delicious tacos <SwirlElement className="w-12 fill-yellow inline-block ml-2 align-middle relative bottom-2.5" />
                </h1>

                <Link to={"/booking"}><button className="bg-pink rounded-xl w-[220px] px-2 py-2 font-rajdhani font-semibold text-white text-2xl cursor-pointer transition duration-200 ease-in-out hover:text-yellow hover:scale-102">Book Table</button></Link>
            </section>
            <section className="max-w-[850px] mx-auto px-6 py-16 flex flex-col justify-around items-center gap-y-6 group">
                <div className="flex gap-2 items-center">
                    <SplashElement className="w-5 fill-pink transition-all duration-300 group-hover:-translate-x-2" />
                    <h1 className="font-denk-one uppercase text-blue text-4xl/normal">About</h1>
                    <SplashElement className="w-5 scale-x-[-1] fill-pink transition-all duration-300   group-hover:translate-x-2" />
                </div>
                <p className="font-rajdhani font-medium text-center">Welcome to TacoLoco – where every bite is a taste of Mexico! We’re all about bold, authentic flavors, using fresh ingredients to create simple yet unforgettable dishes. From perfectly grilled tacos to rich, homemade salsas, we bring the heart of Mexican street food to your table. No fuss, just great food made with passion. So grab a seat and enjoy the flavors!</p>
            </section>
            <section className="w-full bg-orange py-16 flex flex-col justify-around items-center gap-y-12 group">
                <div className="px-6 flex gap-2 items-center">
                    <SwirlElement className="w-12 rotate-180 fill-yellow relative top-2.5 transition-all duration-300   group-hover:-scale-y-100 group-hover:-top-2.5" />
                    <h1 className="font-denk-one uppercase text-pink text-4xl/normal">Signature Bites</h1>
                    <SwirlElement className="w-12 fill-yellow relative bottom-2.5 transition-all duration-300   group-hover:-scale-y-100 group-hover:-bottom-2.5 z-0" />
                </div>
                <div className="grid grid-cols-4 mx-6">
                    <img src={meal1} alt="Signature dish" className="-ml-6 col-span-1 object-contain transition-all duration-250 hover:scale-102" />
                    <img src={meal2} alt="Signature dish" className="col-start-2 col-span-2 object-contain transition-all duration-250 hover:scale-102" />
                    <img src={meal3} alt="Signature dish" className="-mr-6 col-start-4 col-span-1 object-contain justify-self-end transition-all duration-250 hover:scale-102" />
                </div>

            </section>
        </>
    )
}

