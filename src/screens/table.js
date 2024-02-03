import { useNavigate } from 'react-router-dom'

const difficulty = ["#7c2", "#7c2", "#fb0", "#fb0", "#c52", "#f00", "#f00"]

export default function Table({ fetch }) {

    const { data, params, changeParams } = fetch
    const navigate = useNavigate()

	const tabBar = async (to) => {
		navigate("/" + to)
		changeParams({ ...params, page: to })
	}
    
    return <div className="container flex-1 flex flex-col">
        <div className="flex-1">
            <table className="w-full mt-3 flex-1" cellPadding="5px">
                <thead>
                    <tr>
                        <th className="text-start py-3">ID</th>
                        <th className="text-start">Title</th>
                        <th className="text-start">Tags</th>
                        <th>Difficulty</th>
                        <th title="Likes"><box-icon name='like' type="solid"></box-icon></th>
                        <th title="Dislikes"><box-icon name='dislike' type="solid"></box-icon></th>
                        <th>Attempts</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.data?.map((item) => {
                            return <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.title}</td>
                                <td className="flex gap-1">{
                                    item.tags.map(tag => {
                                        return <span className="bg-slate-600 text-white px-2 py-1 pt-0.5 rounded-md hover:bg-opacity-80 transition" key={tag.id}>{tag.name}</span>
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
            </table>
        </div>
        <div className="tabBar flex justify-center items-center py-8 gap-x-2">
            <div className="prev mr-2" onClick={() => data.page > 1 && tabBar((data.page - 1))}>
                <box-icon name='chevron-left' size="md"></box-icon>
            </div>
            { data.page > 2 && <span onClick={() => tabBar(data.page - 2)}>..</span>}
            { data.page !== 1 && <span onClick={() => tabBar(data.page - 1)}>{String(data.page - 1)}</span>}
            <span>{data.page}</span>
            { data.page < data.pagesCount && <span onClick={() => tabBar(data.page + 1)}>{data.page + 1}</span>}
            { data.page + 1 < data.pagesCount && <span onClick={() => tabBar(data.page + 2)}>..</span>}
            <div className="next ml-2" onClick={() => data.page < data.pagesCount && tabBar((data.page + 1))}>
                <box-icon name='chevron-right' size="md"></box-icon>
            </div>
        </div>
    </div>
}
