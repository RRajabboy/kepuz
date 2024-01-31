import { useEffect, useState } from "react";
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

	const difficulty = ["#4d0", "#4d0", "#fb0", "#fb0", "#f00", "#f00", "#f00"]

	return <>
	{ loading && <div className="w-full h-full flex justify-center absolute">
		<Loader />
	</div>}
		<div className="container mx-auto flex flex-col">
		<nav className="py-4 flex justify-between items-center">
			<h1 className="text-2xl font-semibold">Kep.uz problems</h1>
			<div className="icons flex">
				<div onClick={changeTheme}>
					<box-icon name={theme ? "sun" : "moon"} animation={theme ? "spin" : ""}></box-icon>
				</div>
				<div>
					<box-icon name='filter-alt'></box-icon>
				</div>
			</div>
		</nav>
		{ !loading && <table className="w-full relative" cellPadding="5px">
			<thead>
				<tr>
					<th className="text-start py-3">ID</th>
					<th className="text-start">Title</th>
					<th className="text-start">Tags</th>
					<th>Difficulty</th>
					<th title="Likes"><box-icon name='like' type="solid" color={theme ? "#fff" : "#000"}></box-icon></th>
					<th title="Dislikes"><box-icon name='dislike' type="solid" color={theme ? "#fff" : "#000"}></box-icon></th>
					<th>Attempts</th>
				</tr>
			</thead>
			<tbody>
				{
					data.data?.map(item => {
						return <tr>
							<td>{item.id}</td>
							<td>{item.title}</td>
							<td className="flex gap-1">{
								item.tags.map(tag => {
									return <span className="bg-slate-600 text-white px-2 py-1 pt-0.5 rounded-md hover:bg-opacity-80 transition">{tag.name}</span>
								})	
							}</td>
							<td className={`text-center`}>
								<p className="rounded inline-block font-medium text-xs uppercase text-white px-2 py-1" style={{ backgroundColor: difficulty[item.difficulty - 1] }}>{item.difficultyTitle}</p>
							</td>
							
							<td className="text-center">{item.likesCount}</td>
							<td className="text-center">{item.dislikesCount}</td>
							<td className="text-center flex flex-col items-center gap-y-1">
								<p>{item.solved}/{item.attemptsCount}</p>
								<span className="w-full max-w-[100px] rounded-full border border-gray-500/50 bg-slate-400/20 h-2 overflow-hidden">
									<p className="bg-[#4d0] h-full" style={{ width: item.solved/item.attemptsCount * 100 + "%" }}></p>
								</span>
							</td>
						</tr>
					})
				}
			</tbody>
		</table>}
    </div>
	</>
}

export default App;
