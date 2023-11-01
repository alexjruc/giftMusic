const ContainerAuth = ({children}) => {
    return (
        <main className="bg-dark font-urbanist text-white h-screen grid items-center px-4 bg-[url('/images/bg-mobile.png')] bg-no-repeat bg-right-bottom md:bg-[url('/images/bg-desktop.png')] transition-all">
            <section className="grid md:grid-cols-[auto_400px] md:place-items-center md:place-content-center gap-10 ">
                {children}
            </section>
        </main>
    )
}
export default ContainerAuth