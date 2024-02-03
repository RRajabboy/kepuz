import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const difficulty = ["#7c2", "#7c2", "#fb0", "#fb0", "#c52", "#f00", "#f00"]


const tableHeads = [
    {
        title: "ID",
        objectName: "id",
    },
    {
        title: "Title",
        objectName: "title",
    },
    {
        title: "Tags",
        objectName: "tags",
    },
    {
        title: "Difficulty",
        objectName: "difficulty",
        titleCenter: true
    },
    {
        title: <box-icon name='like' type="solid"></box-icon>,
        objectName: "likesCount",
        titleCenter: true
    },
    {
        title: <box-icon name='dislike' type="solid"></box-icon>,
        objectName: "dislikesCount",
        titleCenter: true
    },
    {
        title: "Attempts",
        objectName: "attemptsCount",
        titleCenter: true
    },
    
]

export default function Table({ fetch }) {

    const { params, changeParams } = fetch

    const [ data, setData ] = useState(fetch.data)
    
    const [ sortName, setSortName ] = useState({
        objectName: "id",
        up: true
    })

    const navigate = useNavigate()

	const tabBar = async (to) => {
		navigate("/" + to)
		changeParams({ ...params, page: to })
	}

    const sorter = (objectName, up) => {
        console.log(objectName, up);
        setData(prev => {
            prev.data.sort((a, b) => {
                const first = a[objectName]
                const second = b[objectName]
                if( typeof first === 'object' ) {
                    return (up ? first.length < second.length : first.length > second.length) ? 1 : -1
                } else if( typeof first === 'string' ) {
                    return (up ? first.toLocaleLowerCase() < second.toLocaleLowerCase() : first.toLocaleLowerCase() > second.toLocaleLowerCase()) ? 1 : -1
                } else {
                    return (up ? first < second : first > second) ? 1 : -1
                }
            })

            return prev
        })
    }


    const sortHandler = (objectName) => {
        setSortName(prev => {
            const isUp = prev.objectName === objectName ? !prev.up : true
            sorter(objectName, isUp)
            return {
                objectName,
                up: isUp
            }
        })
    }

    useEffect(() => {
        sortHandler(sortName.objectName)
    }, [])

    return <div className="container flex flex-col pt-3">
        <div className="flex-1">
            <table className="w-full flex-1" cellPadding="5px">
                <thead className='sticky t-0'>
                    <tr>
                        {
                            tableHeads.map(item => {
                                return <th key={item.objectName} onClick={() => sortHandler(item.objectName)} className={"text-start py-3 rounded" + (sortName.objectName === item.objectName ? ' active' : "")}>
                                    <div className={'flex' + (item.titleCenter ? " justify-center" : "")}>
                                        {item.title}
                                        <div className="sort">
                                            { sortName.up && sortName.objectName === item.objectName && <box-icon name='sort-down'></box-icon>}
                                            { !sortName.up && sortName.objectName === item.objectName && <box-icon name='sort-up'></box-icon>}
                                        </div>
                                    </div>
                                </th>
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        data.data?.map((item) => {
                            return <tr key={item.id + item.title}>
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
