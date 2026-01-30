export default function Navigation() {
    return (
         <nav aria-label="main site navigation" className="flex flex-col lg:flex-row w-full justify-between items-center py-6 px-8 font-handjet text-2xl border-b-5">
            <div>
                <a href="/" aria-label="Home">Disconnect Madison</a>
            </div>
            <ul className="flex flex-col lg:flex-row space-x-10">
                <li className="my-3 lg:my-0">
                    <a href="/about" className="hover:text-gray-300">About</a>
                </li>
                <li className="my-3 lg:my-0">
                    <a href="/pledge" className="hover:bg-emerald-400 text-stone-800 bg-emerald-500 px-4 py-2 rounded-sm">Take the Pledge</a>
                </li>
            </ul>
          </nav>
    )
}