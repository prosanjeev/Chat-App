import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { database } from "../../../misc/firebase";
import { transformToArrWithId } from "../../../misc/helpers";

const Messages = () => {
  const { chatId } = useParams();
  const [messages, setMessages] = useState(null);
  // const [limit, setLimit] = useState(PAGE_SIZE);
  // const selfRef = useRef();
  const isChatEmpty = messages && messages.length === 0;
  const canShowMessages = messages && messages.length > 0;

  useEffect(()=>{
    const messagesRef = database.ref('/messages');
    messagesRef.orderByChild('roomId')
    .equalTo(chatId).on('value', snap=>{
      const data = transformToArrWithId(snap.val());
      setMessages(data);
    })

  })

  return (
    <ul className="msg-list custom-scroll">
     
      {isChatEmpty && <li>No messages yet</li>}
      {canShowMessages }
    </ul>
  )
}

export default Messages