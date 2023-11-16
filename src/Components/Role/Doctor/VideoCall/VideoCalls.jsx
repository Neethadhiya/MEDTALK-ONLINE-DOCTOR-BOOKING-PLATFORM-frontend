import * as React from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { appID, serverSecret } from "../../../../utils/constants";
import { useParams } from "react-router-dom";
import doctorAxiosInstance from "../../../../Axios/DoctorAxios";

function randomID(len) {
  let result = "";
  if (result) return result;
  var chars = "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP",
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export function getUrlParams(url = window.location.href) {
  let urlStr = url.split("?")[1];
  return new URLSearchParams(urlStr);
}
const roomID = localStorage.getItem("roomId");

export default function VideoCalls() {
  const { id } = useParams();
  // const roomID = randomID();
  const sendLinkToPatient = async (link) => {
    try {
      const response = await doctorAxiosInstance.post(
        `send_video_call_link_to_patient/${id}/`,
        {
          link: link,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };
  let myMeeting = async (element) => {
    const roomID = "neetha";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      randomID(5),
      randomID(5)
    );

    // Create instance object from Kit Token.
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    // start the call
    zp.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: "Copy link",
          url:
            window.location.protocol +
            "//" +
            window.location.host +
            window.location.pathname +
            "?roomID=" +
            roomID,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
      },
    });

    const meetingLink =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname +
      "?roomID=" +
      roomID;
    sendLinkToPatient(meetingLink);
  };

  return (
    <div ref={myMeeting} style={{ width: "100vw", height: "100vh" }}></div>
  );
}
