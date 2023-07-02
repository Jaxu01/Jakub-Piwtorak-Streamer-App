import { useParams } from "react-router-dom"
import { useFetchJson } from "../hooks/Fetch"
import './Streamer.css'

const Streamer = () => {
    const param = useParams()
    const [streamer] = useFetchJson(`http://localhost:3000/streamer/${param.streamerId}`)
    return (
        <div>{!!streamer && (
            <>
                <div className="streamer-box">
                    <div>{streamer.name}</div>
                    <div>{streamer.description}</div>
                    <div>{streamer.platform}</div>
                    <img src="/src/defaultimage.png"></img>
                </div>
            </>
        )}</div>
    )
}

export default Streamer