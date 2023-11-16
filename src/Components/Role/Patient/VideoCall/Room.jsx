import React from 'react'
import { useParams } from 'react-router-dom'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

function Room() {
    const {roomId} = useParams()

    function randomID(len) {
        let result = '';
        if (result) return result;
        var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
          maxPos = chars.length,
          i;
        len = len || 5;
        for (i = 0; i < len; i++) {
          result += chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return result;
      }

    console.log(roomId,'aaaaaaaaaaaaaa')
    let myMeeting = async (element) => {
        // generate Kit Token
         const appID = 158265611;
         const serverSecret = "25eadf03737ef843e33a2fc5f620f52c";
         const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID,
             serverSecret, roomId, randomID(5),  randomID(5));
        const zp = ZegoUIKitPrebuilt.create(kitToken);
        zp.joinRoom({
            container: element,
            scenario: {
                mode: ZegoUIKitPrebuilt.LiveStreaming, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
              },
            sharedLinks: [
              {
                name: 'Copy link',
                url:`http://localhost:5173/room/${roomId}`
                 
              },
            ],
           
          });
    
    
      
    }
  return (
    <div
      ref={myMeeting}
    ></div>
  )
}

export default Room
