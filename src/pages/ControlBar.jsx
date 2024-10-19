import React from "react";

const ControlBar = () => {
  return (
    <div class="main__controls">
      <div className="main__controls__block">
        <div className="main__controls__button main__mute_button">
          <i className="fas fa-microphone"></i>
          <span>Mute</span>
        </div>
        <div className="main__controls__button main__video_button">
          <i className="fas fa-video"></i>
          <span>Stop Video</span>
        </div>
        <div className="main__controls__button">
          <i className="fas fa-shield-alt"></i>
          <span>Security</span>
        </div>
        <div className="main__controls__button">
          <i className="fas fa-user-friends"></i>
          <span>Participants</span>
        </div>
        <div className="main__controls__button">
          <i className="fas fa-comment-alt"></i>
          <span>Chat</span>
        </div>
        <div className="main__controls__button main__video_button">
          <i className="fas fa-desktop"></i>
          <span>Share Screen</span>
        </div>
        <div className="main__controls__button">
          <i className="fas fa-record-vinyl"></i>
          <span>Record </span>
        </div>
        <div className="main__controls__button">
          <i className="fas fa-laugh"></i>
          <span>Reactions</span>
        </div>
        <div className="main__controls__button">
          <i className="fas fa-retweet"></i>
          <span>Apps</span>
        </div>
        <div className="main__controls__button">
          <i className="fas fa-clipboard"></i>
          <span>Whiteboard</span>
        </div>
      </div>
      <div className="main__controls__block">
        <div className="main__controls__button">
          <span className="leave_meeting">Leave Meeting</span>
        </div>
      </div>
    </div>
  );
};

export default ControlBar;
