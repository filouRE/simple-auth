const PageNotFound = () => {
    return (
        <div className="flex flex-col gap-8 h-screen w-screen justify-center items-center">
            <p className="text-8xl">404 page not found</p>
            <a
                href="/home"
                className=" bg-[#D9D9D9] text-2xl rounded-full px-16 py-1 font-semibold"
            >
                Go to home page
            </a>
        </div>
    );
};

export default PageNotFound;
