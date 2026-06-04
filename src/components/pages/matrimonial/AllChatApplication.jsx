// import { useEffect, useRef, useState } from "react"
// import { useLocation } from "react-router-dom"
// import { io } from "socket.io-client"
// import API_URL from "../../../../config"
// import profileimg from "../../../assets/profile.png"
// import chatback from "../../../assets/chatback.jpg"

// const AllChatApplication = () => {
//     const location = useLocation()
//     const msgBoxRef = useRef()

//     const [data, setData] = useState(JSON.parse(localStorage.getItem('user')))
//     const [msg, setMsg] = useState("")
//     const [loading, setLoading] = useState(false)
//     const [allMessages, setMessages] = useState([])
//     const [socket, setSocket] = useState(null)
//     const [roomid, setRoomID] = useState('')
//     const [users, setUsers] = useState([])
//     const [userid, setUserID] = useState('')
//     const [reciever, setReciever] = useState('')
//     const [isConnected, setIsConnected] = useState(false)
//     const [unreadCounts, setUnreadCounts] = useState({})

//     const username = data?.first_name

//     useEffect(() => {
//         if (localStorage.getItem('token')) {
//             getConversationuser()
//         }
//     }, [])

//     useEffect(() => {
//         if (userid) {
//             getroomid(userid)
//         }
//     }, [userid])

//     useEffect(() => {
//         if (roomid) {
//             getallmessages()
//         }
//     }, [roomid])

//     useEffect(() => {
//         const socket = io(API_URL)
//         setSocket(socket)

//         socket.on("connect", () => {
//             setIsConnected(true)
//             console.log("Connected")
//         })

//         socket.on("getLatestMessage", (newMessage) => {

//             const test = prevMessages => [...prevMessages, ...newMessage]
//             console.log("getLatestMessage" )

//             setMessages([...allMessages, ...newMessage])
//             setMsg("")
//             setLoading(false)

//             // if (newMessage[0].sender !== data?._id) {
//             //     setUnreadCounts(prev => ({
//             //         ...prev,
//             //         [newMessage[0].sender]: (prev[newMessage[0].sender] || 0) + 1
//             //     }))
//             // }
          
//         })

//         socket.on("newnotification", (data) => {
//             console.log("newnotification", data)
//             getConversationuser()
//         })


//         return () => {
//             socket.disconnect()

//         }
//     }, [])


   

//     useEffect(() => {
//         if (isConnected && roomid && socket) {
//             socket.emit("joinRoom", roomid)
//             getConversationuser()
//         }
//     }, [isConnected, roomid, socket])

//     useEffect(() => {
//         if (msgBoxRef.current) {
//             msgBoxRef.current.scrollTop = msgBoxRef.current.scrollHeight
//         }
//     }, [allMessages])

//     const handleChange = e => setMsg(e.target.value)
//     const handleEnter = e => e.keyCode === 13 ? onSubmit() : ""

//     const onSubmit = async () => {
//         try {
//             const newMessage = [{ msg, name: username, sender: data?._id, reciever: reciever }]
//             await socket.emit('message', { message: newMessage, room: roomid })
//             setMsg('')
//             await getConversationuser()
//             await getallmessages()
//         } catch (error) {
//             console.log(error)
//         }
//     }

//     const getConversationuser = async () => {
//         const requestOptions = {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${localStorage.getItem('token')}`
//             },
//         }

//         const response = await fetch(`${API_URL}/api/getallmembersbyid`, requestOptions)
//         const data = await response.json()
//         setUsers(data.data)
//     }

//     const getroomid = async (userid) => {
//         setReciever(userid)
//         const requestOptions = {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${localStorage.getItem('token')}`
//             },
//             body: JSON.stringify({ members: [data?._id, userid] })
//         }

//         try {
//             const response = await fetch(`${API_URL}/api/getroomid`, requestOptions)
//             const data = await response.json()
//             setRoomID(data?.room?.roomid)
//         } catch (error) {
//             console.log(error)
//         }
//     }

//     const getallmessages = async () => {
//         const requestOptions = {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${localStorage.getItem('token')}`
//             },
//             body: JSON.stringify({ roomid })
//         }

//         try {
//             const response = await fetch(`${API_URL}/api/getallmessages`, requestOptions)
//             const data = await response.json()
//             if (data.status === 200) {
//                 setMessages(data.messages)
//                 resetUnreadCount(reciever)
//             }
//         } catch (error) {
//             console.log(error)
//         }
//     }

//     const resetUnreadCount = (userId) => {
//         setUnreadCounts(prev => ({ ...prev, [userId]: 0 }))
//     }

//     const selectUser = (userId) => {
//         setUserID(userId)
//         setMessages([])
//         resetUnreadCount(userId)

//         if (socket && isConnected) {
//             socket.emit("leaveRoom", roomid) // Leave the current room
//             getroomid(userId).then(newRoomId => {
//                 socket.emit("joinRoom", newRoomId) // Join the new room
//             })
//         }
//     }


//     console.log("userid", userid)
    



//     console.log("allMessages",allMessages)
//     console.log("unreadCounts", unreadCounts)

//     return (
//         <div className="d-flex">
//             {/* Sidebar */}
//             <div className="py-4 m-5 w-25 shadow bg-white text-dark border rounded">
//                 <div className="text-center px-3 mb-4 text-capitalize">
//                     <h2 className="text-danger mb-4">Profile</h2>
//                 </div>
//                 <div className="bg-light border rounded p-3" style={{ height: "600px", overflowY: "scroll" }}>
//                     {
//                         users?.map((user) => (
//                             console.log("select user", user?.members),
//                             <div key={user?.members?._id} className={`d-flex m-2 p-2 shadow bg-white border rounded w-auto ${user?.members?._id == userid ? 'chat-active-user' : ''}`} onClick={() => {
//                                 if (user?.members?._id !== userid) {
//                                     selectUser(user?.members?._id);
//                                 }
//                             }}
//                                 style={{ cursor : 'pointer' }}>
//                                 <img src={!user?.members?.profile_pic ? profileimg : `${API_URL}/uploads/user_profile/${user?.members?.profile_pic}`} className="rounded-circle" alt="Profile" style={{ width: "50px", height: "50px", cursor: 'pointer' }} />
//                                 <div className="d-flex flex-column">
//                                     <strong className="m-1">{`${user?.members?.first_name} ${user?.members?.last_name}`}</strong>
//                                     {/* {unreadCounts[user?.members?._id] > 0 && (
//                                         <span className="badge bg-danger">{unreadCounts[user?.members?._id]}</span>
//                                     )} */}
//                                         {user?.conversation?.unreadCount > 0 && (
//                                             <span className="badge bg-danger">{user?.conversation?.unreadCount}</span>
//                                         )}
//                                 </div>
//                             </div>
//                         ))
//                     }
//                 </div>
//             </div>

//             {/* Chat Room */}
//             <div className="py-4 m-5 w-50 shadow bg-white text-dark border rounded container ">
//                 <div className="text-center px-3 mb-4 text-capitalize">
//                     <h1 className="text-danger mb-4">Chats</h1>
//                 </div>


//                 { !roomid ?
//                     <div className="bg-light border rounded p-3 mb-4" style={{ height: "450px", overflowY: "scroll" }} ref={msgBoxRef}>
//                         <h1 style={{color:'grey',marginLeft:'30%',marginTop:'14%',fontStyle:'italic'}}>Select Profile To Chat</h1>
//                         </div>
//                         :
//                 <>
//                 <div className="bg-light border rounded p-3 mb-4 chat-background" style={{ height: "450px", overflowY: "scroll" }} ref={msgBoxRef}>
//                             {allMessages.length > 0 && allMessages.map(val => val?.messages?.roomid == roomid) &&
//                         allMessages?.map((msg, i) => {
//                             const messageroomid = msg?.messages?.roomid
//                             const isSender = data?._id === msg?.messages?.sender 
//                             const senderName = msg?.senderDetails?._id == msg?.messages?.sender ? msg?.senderDetails?.first_name : msg?.recieverDetails?.first_name
//                             const receiverName = msg?.recieverDetails?._id == msg?.messages?.sender ? msg?.recieverDetails?.first_name : msg?.senderDetails?.first_name

//                             return isSender 
//                                 ? (
//                                     <div className="row justify-content-end pl-5" key={i}>
//                                         <div className="d-flex flex-column  m-2 shadow p-2 bg-textcolor border rounded w-auto text-wrap">
//                                             <div>
//                                                 <strong className="m-1" style={{ color: 'black' }}><i className="fa fa-user pe-2" aria-hidden="true"></i>{senderName}</strong>
//                                             </div>
//                                             <h4 className="m-1">{msg?.messages?.message}</h4>
//                                         </div>
//                                     </div>
//                                 ) : (
//                                     <div className="row justify-content-start" key={i}>
//                                         <div className="d-flex flex-column m-2 p-2 shadow bg-white border bg-textcolor2 rounded w-auto text-wrap">
//                                             <div>
//                                                 <strong className="m-1" style={{color:'black'}}><i className="fa fa-user pe-2" aria-hidden="true"></i>{receiverName}</strong>
//                                             </div>
//                                             <h4 className="m-1">{msg?.messages?.message}</h4>
//                                         </div>
//                                     </div>
//                                 )
//                         })
//                     }
//                 </div>

               
                
//                 <div className="form-group d-flex">
//                     <input type="text" className="form-control bg-light" name="message" onKeyDown={handleEnter} placeholder="Type your message" value={msg} onChange={handleChange} />
//                     <button type="submit" className="btn btn-warning mx-2 send-msg" disabled={loading} onClick={onSubmit}>
//                         {
//                             loading
//                                 ? <div className="spinner-border spinner-border-sm text-primary"></div>
//                                 : (
//                                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
//                                         <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"></path>
//                                     </svg>
//                                 )
//                         }
//                     </button>
//                 </div>
//                     </>
//                 }
//             </div>
//         </div>
//     )
// }

// export default AllChatApplication
