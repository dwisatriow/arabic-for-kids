import './Loading.scss'

function Loading({ loading, downloading }) {
  return (
    <div id="loading">
      <p>
        {/* {loading === true ? "Loading" : "Not loading"} */}
        {String(loading)}
        , {downloading.map(download => <span>{String(download)}, </span>)}
      </p>
      </div>
  )
}

export default Loading;