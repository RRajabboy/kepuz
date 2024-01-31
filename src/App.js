import { useEffect, useRef, useState } from "react";
import useFetch from "./hook/useFetch";
import Loader from "./components/loader";

function App() {

	const [ theme, setTheme ] = useState(JSON.parse(localStorage.getItem("dark")))
    const { data, loading } = useFetch("")

	useEffect(() => {
		document.body.className = (theme ? "dark-active" : "")
	}, [])

	const changeTheme = () => {
		setTheme(prev => {
			localStorage.setItem("dark", JSON.stringify(!prev))
			return !prev
		})
		document.body.classList.toggle("dark-active")
	}

	const navRef = useRef(null)
	const [ navHeight, setNavHeight ] = useState(0)

	useEffect(() => {
		setNavHeight(navRef.current.offsetHeight)
	}, [navRef])

	const difficulty = ["#4f0", "#4f0", "#fb0", "#fb0", "#f00", "#f00", "#f00"]

	return <div className="container mx-auto flex flex-col">
		<nav className="py-4 flex justify-between items-center" ref={navRef}>
			<h1 className="text-2xl font-semibold">Kep.uz problems</h1>
			<div className="icons flex">
				<div onClick={changeTheme}>
					<box-icon name={theme ? "sun" : "moon"}></box-icon>
				</div>
				<div>
					<box-icon name='filter-alt'></box-icon>
				</div>
			</div>
		</nav>
		{ loading ?
		<div className="flex justify-center" style={{ height: navHeight }}>
			<Loader />
		</div>
		:
		<table className="w-full" cellPadding="5px">
			<thead>
				<tr>
					<th className="text-start py-3">ID</th>
					<th className="text-start">Title</th>
					<th className="text-start">Tags</th>
					<th>Difficulty</th>
					<th>Attempts</th>
					<th>Likes</th>
				</tr>
			</thead>
			<tbody>
				{
					data.data?.map(item => {
						return <tr>
							<td>{item.id}</td>
							<td>{item.title}</td>
							<td>{item.id}</td>
							<td className={`text-center`}>
								<p className="rounded inline-block font-medium text-xs uppercase text-white px-2 py-1" style={{ backgroundColor: difficulty[item.difficulty - 1] }}>{item.difficultyTitle}</p>
							</td>
							<td className="text-center">{item.solved}/{item.attemptsCount}</td>
							<td className="text-center">{item.likesCount}</td>
						</tr>
					})
				}
			</tbody>
		</table>}
    </div>
}

export default App;
