import './App.css'
import { useFetchJson } from './hooks/Fetch'
import { StreamerListItem } from './components/StreamerListItem'

function App() {
  const [streamers] = useFetchJson("http://localhost:3000/streamers")

  return (
    <>
      <form action="http://localhost:3000/streamers" method="post">
        <div className="form-box">
          <div className="wrapper">
            <fieldset>
            <legend className="form-label">Add a Streamer</legend>
              <div className="input-wrapper">
                <label className="input-label">Streamer Name</label>
                <label className="input-description">Enter the Streamers name.</label>
                <input className="streamer-name input-class" type="text" name="streamer_name" required={true}/>
              </div>
              <div className="input-wrapper">
                <label className="input-label">Streamer Description</label>
                <label className="input-description">Write a short description about him/her.</label>
                <input className="streamer-description input-class" name="streamer_description" type="text" required={true}/>
              </div>
              <div className="input-wrapper">
                <label className="input-label">Streaming Platform</label>
                <label className="input-description">What platform does he/her stream on?</label>
                <select className="platform-selector">
                  <option>Twitch</option>
                  <option>YouTube</option>
                  <option>TikTok</option>
                  <option>Kick</option>
                  <option>Rumble</option>
                </select>
              </div>
              <div className="button-wrapper">
                <input className="button" type="submit" name="" value="Send"/>
              </div>
            </fieldset>
          </div>
        </div>
      </form>
      <div>
        {streamers?.map((streamer) => (
          <StreamerListItem key={streamer.id} {...streamer}/>
        ))}
      </div>
    </>
  )
}

export default App


