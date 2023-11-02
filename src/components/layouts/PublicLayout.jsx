import { Link } from "react-router-dom"

const PublicLayout = ({children}) => {
    return (
        <section className="bg-dark font-urbanist text-white min-h-screen grid grid-rows-[auto,_1fr] bg-[url('/images/bg-mobile.png')] bg-no-repeat bg-right-bottom md:bg-[url('/images/bg-desktop.png')] transition-all">
            <header className="bg-primary-dark flex justify-center items-center p-4 uppercase">
                <Link to={"/"} className="font font-semibold sm:text-lg">Gift Music</Link>

            </header>

            <section className="py-14 px-2">
                <main className="w-[min(480px,_100%)] sm:w-[562px] mx-auto bg-primary-dark py-8 px-4 sm:py-12 sm:px-14 rounded-3xl">
                    {children}
                </main>
            </section>
        </section>
    )
}
export default PublicLayout