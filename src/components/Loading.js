import './Loading.scss'

function Loading({ loading }) {
  return (
    loading && (
      <div id="loading" className="noselect">
        <p>Loading Sounds</p>
      </div>
    )
  )
}

export default Loading;