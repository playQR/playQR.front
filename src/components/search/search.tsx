import React,{useEffect, useState} from 'react'
import SearchBox from './searchbox';
import SearchResult from './searchresult';
type Props = {}

type Result = {
    img : string | undefined,
    band_name : string,
    title : string,
    location : string,
    date : string, 
    price : string,
    like : boolean,
    like_num : number
  }

const exampleDataList :Result[] = [
    {
      img: undefined,
      band_name: "밴드 이름 1",
      title: "공연 Title 1",
      location: "위치 1",
      date: "2024.06.01 토",
      price: "40,000₩",
      like: true,
      like_num: 32
    },
    {
      img: undefined,
      band_name: "밴드 이름 2",
      title: "공연 Title 2",
      location: "위치 2",
      date: "2024.06.15 토",
      price: "50,000₩",
      like: false,
      like_num: 29
    },
    {
      img: undefined,
      band_name: "밴드 이름 3",
      title: "공연 Title 3",
      location: "위치 3",
      date: "2024.07.01 일",
      price: "30,000₩",
      like: false,
      like_num: 16
    },
    {
      img: undefined,
      band_name: "밴드 이름 4",
      title: "공연 Title 4",
      location: "위치 4",
      date: "2024.07.20 일",
      price: "45,000₩",
      like: false,
      like_num: 50
    },
    {
      img: undefined,
      band_name: "밴드 이름 5",
      title: "공연 Title 5",
      location: "위치 5",
      date: "2024.08.05 월",
      price: "35,000₩",
      like: false,
      like_num: 16
    }
  ];

const Search = (props: Props) => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState(exampleDataList);

    useEffect(() => {
            const filteredResults = exampleDataList.filter((result) => {
                return result.title.toLowerCase().includes(query.toLowerCase())})
            
            setResults(filteredResults)
            console.log(filteredResults)
    },[query])

    
  return (
    <div className='flex flex-col h-full w-full mt-5'>
        <SearchBox value={query} onChange={(e:React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}/>
        <SearchResult results={results}/>
    </div>
    
  )
}

export default Search