import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as webRTCHandler from "../utils/webRTCHandler";
import "./view.css"; // Import the CSS file
// Import the showLocalVideoPreview function

const Room = ({
  roomId,
  identity,
  isRoomHost,
  showOverlay,
  connectOnlyWithAudio,
}) => {
  useEffect(() => {
    if (!isRoomHost && !roomId) {
      const siteUrl = window.location.origin;
      window.location.href = siteUrl;
    } else {
      webRTCHandler.getLocalPreviewAndInitRoomConnection(
        isRoomHost,
        (identity = "sajith"),
        roomId,
        connectOnlyWithAudio
      );
    }
  }, []);
  console.log("roomId--->", roomId);
  return (
    <>
      <div className="mainclone">
        <div className="main_left">
          <div className="main_videos">
            <div id="video-grids"></div>
          </div>
          <div className="main_controls">
            <div className="main_controls_block">
              <div
                className="main_controls_button"
                id="mic"
                onclick="muteUnmute()"
              >
                <i className="fas fa-microphone-slash" />
                <span>Mute</span>
              </div>
              <div
                className="main_controls_button"
                id="video"
                onclick="VideomuteUnmute()"
              >
                <i className="fas fa-video-slash" />
                <span>Stop Video</span>
              </div>
            </div>
            <div className="main_controls_block">
              <div className="main_controls_button" onclick="invitebox()">
                <i className="fas fa-user-plus" />
                <span>Invite</span>
              </div>
              <div className="main_controls_button">
                <i className="fas fa-user-friends" />
                <span>Participants</span>
              </div>
          
            </div>
            <div className="main_controls_block">
              <div className="main_controls_button leave_red">
                <span className="leave_meeting">
                  <a href="/">Leave Meeting</a>
                </span>
              </div>
            </div>
          </div>
        </div>
       
      </div>
    </>
  );
};

const mapStoreStateToProps = (state) => {
  return {
    ...state,
  };
};

export default connect(mapStoreStateToProps)(Room);
