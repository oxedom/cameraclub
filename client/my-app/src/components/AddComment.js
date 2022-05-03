import React, {useState} from 'react'

function AddComment() {

    const [commentState, setCommentState] = useState({
        text : "",
    })

    return (
    <div>
        <form onSubmit={(e)=>{e.preventDefault()}}> 
            <div><input value={commentState.text} onChange={(e)=>setCommentState({...commentState,text : e.target.value})} type="text"
            placeholder="Comment this Post"/></div>
            <button type="submit">Submit</button>
        </form>
    </div>
  )
}

export default AddComment