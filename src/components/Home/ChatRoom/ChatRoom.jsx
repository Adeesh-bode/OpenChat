
import { useContext, useEffect, useState } from 'react';
import { context } from '../../../utils/context';
import ChatRoomNavbar from './ChatRoomNavbar';
import MessageBar from './MessageBar';
import Chats from './Chats';

import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../utils/firebaseconfig';

const ChatRoom = () => {
  const [otherUser, setOtherUser] = useState({});
  const { chatWith, userData } = useContext(context);
  const userId = userData?.uid;


  useEffect(() => {
    const fetchOtherUserData = async () => {
      try {
        const docRef = doc(db, "users", chatWith);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setOtherUser(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (chatWith) {
      fetchOtherUserData();
    }
  }, [chatWith]);

  return (
    <div className='h-screen w-full bg-white flex flex-col justify-between'>
      {userId ? (
        <>
          <ChatRoomNavbar userId={userId} data={otherUser} />
          <Chats userId={userId} chatWithId={chatWith} />
          <MessageBar userId={userId} chatWithId={chatWith} />
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default ChatRoom;
