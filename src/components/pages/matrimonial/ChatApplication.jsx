// import { useEffect, useMemo, useRef, useState } from "react"
// import { useLocation } from "react-router-dom"
// // import Moment from 'react-moment';
// import { io } from "socket.io-client"
// import API_URL from "../../../../config"

// const ChatApplication = () => {

//     const location = useLocation()
//     const msgBoxRef = useRef()
//     const reciever = location?.pathname?.split("=")[1]

//     const [data, setData] = useState(JSON.parse(localStorage.getItem('user')))
//     const [msg, setMsg] = useState("")
//     const [loading, setLoading] = useState(false)
//     const [allMessages, setMessages] = useState([])
//     const [socketID, setSocketID] = useState('')
//     const [socket, setSocket] = useState('')
//     const [roomid, setRoomID] = useState('')



//     console.log(JSON.parse(localStorage.getItem('user')))
//     const username = JSON.parse(localStorage.getItem('user')).first_name
//     console.log(location.pathname.split("=")[1])


//     useEffect(() => {
//         console.log("state", location.state)
//         setRoomID(location?.state)
//     }, [location])
    
//     // const socket = useMemo(() => io('http://localhost:3435'), [])
//     useEffect(() => {
//         // const socket = io("http://localhost:3435")
//         const socket = io(API_URL)


//         socket.on("connect", () => {
//             console.log("socket Connected", socket.id)
//             console.log(socket)
//             setSocket(socket)
//             setSocketID(socket.id)
//             socket.emit("joinRoom", roomid)
//         })

//         return () => {
//             socket.disconnect()
//         }
//     }, [])

    
    
//     useEffect(() => {
//         if (socket) {
//         socket.on("getLatestMessage", (newMessage) => {
//                 console.log(allMessages)
//                 console.log(newMessage)
//                 setMessages([...allMessages, newMessage])
//                 msgBoxRef.current.scrollIntoView({ behavior: "smooth" })
//                 setMsg("")
//                 setLoading(false)
//             })
//         }
//     }, [socket, allMessages])  

     


//     const handleChange = e => setMsg(e.target.value)
//     const handleEnter = e => e.keyCode === 13 ? onSubmit() : ""

    
//     const onSubmit = (e) => {
//         e.preventDefault()
//         const newMessage = { msg, name: username, sender: data?._id, reciever: reciever }
//         socket.emit('message', { message: newMessage, room: roomid })
//         setMsg('')
//     }

//     const getConversationuser = () => {
//         try {
//             const requestOptions = {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${localStorage.getItem('token')}`
//                 },
//             };

//             fetch(`${API_URL}/api/getConversation`, requestOptions)
//                 .then(response => response.json())
//                 .then(data => {
//                     console.log(data);
//                 });
//         }
//         catch (error) {
//             console.log(error);
//         }
//     }

// console.log(allMessages)
// console.log(allMessages.map((msg) => msg))
// console.log(socketID)

//     return (
//         <div className="py-4 m-5 w-50 shadow bg-white text-dark border rounded container" >
//             <div className="text-center px-3 mb-4 text-capitalize">
//                 <h1 className="text-warning mb-4"> Chat Room</h1>
//             </div>
           

//             <div className="bg-light border rounded p-3 mb-4" style={{ height: "450px", overflowY: "scroll" }}>
//                 {
//                     allMessages.map(msg => {
//                         return data.first_name == msg.message.name
//                             ?
//                             <div className="row justify-content-end pl-5 ">
//                                 <div className="d-flex flex-column align-items-end m-2 shadow p-2 bg-info border rounded w-auto">
//                                     <div>
//                                         <strong className="m-1">{msg.message.name}</strong>
//                                         {/* <small className="text-muted m-1"><Moment fromNow>{msg.time}</Moment></small> */}
//                                     </div>
//                                     <h4 className="m-1">{msg.message.msg}</h4>
//                                 </div>
//                             </div>
//                             :
//                             <div className="row justify-content-start">
//                                 <div className="d-flex flex-column m-2 p-2 shadow bg-white border rounded w-auto">
//                                     <div>
//                                         <strong className="m-1">{msg.message.name}</strong>
//                                         {/* <small className="text-mmuted m-1"><Moment fromNow>{msg.time}</Moment></small> */}
//                                     </div>
//                                     <h4 className="m-1">{msg.message.msg}</h4>
//                                 </div>
//                             </div>
//                     })
//                 }
//                 <div ref={msgBoxRef} ></div>
//             </div>
//             <div className="form-group d-flex">
//                 {/* <input type="text" className="form-control bg-light" name="text" value={room} onChange={(e) => setRoom(e.target.value)} /> */}
//                 <input type="text" className="form-control bg-light" name="message" onKeyDown={handleEnter} placeholder="Type your message" value={msg} onChange={handleChange} />
//                 <button type="button" className="btn btn-warning mx-2" disabled={loading} onClick={onSubmit}>
//                     {
//                         loading
//                             ?
//                             <div className="spinner-border spinner-border-sm text-primary"></div>
//                             :
//                             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
//                                 <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"></path>
//                             </svg>
//                     }
//                 </button>
//             </div>
//         </div>
//     )
// }

// export default ChatApplication