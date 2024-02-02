import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useFetch from "./hook/useFetch";
import Loader from "./components/Loader";
import Table from "./screens/table";

function App() {
	
	const { pathname } = useLocation()
	const defultParams = pathname !== "/" && { page: pathname.replace("/", "")}

    const fetch = useFetch("",  defultParams)
	const { loading, error, refresh } = fetch

	const [ theme, setTheme ] = useState(JSON.parse(localStorage.getItem("dark")))
	const [ activeFilter, setActiveFilter ] = useState(true)
	

	useEffect(() => {
		if(theme) document.body.className = "dark-active"
	}, [])

	const changeTheme = () => {
		setTheme(prev => {
			localStorage.setItem("dark", JSON.stringify(!prev))
			return !prev
		})
		document.body.classList.toggle("dark-active")
	}


	return <>
		{ loading 
			&& 
		<div className="w-full h-full flex justify-center absolute">
			<Loader />
		</div>}

		{ error && !loading 
			&& 
		<div className="w-full h-full flex flex-col justify-center items-center absolute">
			<box-icon name='bug-alt' size="lg"></box-icon>
			<h1 className="text-2xl">Something went wrong!</h1>
		</div>}

		<div className="container flex flex-col">
			<nav className="py-4 flex justify-between items-center">
				<h1 className="text-2xl font-semibold">Kep.uz problems</h1>
				<div className="icons flex">
					<div onClick={() => refresh()}>
						<box-icon name='revision'></box-icon>
					</div>
					<div onClick={changeTheme}>
						<box-icon name={theme ? "sun" : "moon"} animation={theme ? "spin" : ""}></box-icon>
					</div>
					<div onClick={() => setActiveFilter(prev => !prev)}>
						<box-icon name='filter-alt'></box-icon>
					</div>
				</div>
			</nav>
		</div>

		{ !loading && !error && <Table fetch={fetch} theme={theme} activeFilter={activeFilter} /> }
	</>
	}

export default App;
