import { useState } from 'react'
import { ThumbUp, ThumbDown } from 'tabler-icons-react'
import { Link } from "react-router-dom"
import io from "socket.io-client"

const socket = io.connect("http://localhost:3000")

export const StreamerListItem = (props) => {
    const streamerId = props.id
    const defaultUpvotes = Number(props.upvotes)
    const defaultDownvotes = Number(props.downvotes)
    const [votes, setVotes] = useState({upvotes: defaultUpvotes, downvotes: defaultDownvotes})

    socket.on("voteupdate", (streamer) => {
        if (streamer.id === streamerId) {
            setVotes({upvotes: streamer.upvotes, downvotes: streamer.downvotes})
        }
    })

    const vote = async (type) => {
        await fetch(`http://localhost:3000/streamer/${props.id}/vote`, {
            headers: {'Content-Type': 'application/json'},
            method: "put", 
            body: JSON.stringify({type: type})
        })
    }

    return (
        <article className="streamer-list">
            <div className="streamer-details">
                <Link to={`streamer/${props.id}`}>{props.name}</Link>
                <div className="votes">{votes.upvotes}
                <ThumbUp
                    onClick={() => vote("like")}
                    size={48}
                    strokeWidth={2}
                    color={'#4F46E5'}
                />
                </div>
                <div className="votes">{votes.downvotes}
                <ThumbDown
                    onClick={() => vote("dislike")}
                    size={48}
                    strokeWidth={2}
                    color={'#4F46E5'}
                />
                </div>
            </div>
        </article>
    )
}