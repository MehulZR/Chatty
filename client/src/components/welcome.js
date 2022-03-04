import React from "react";
import styles from "./welcome.module.css";
const Welcome = () => {
  return (
    <div className="hero is-fullheight" style={{ minHeight: "90vh" }}>
      <div className={styles.app}>
        <div className={styles.appLeftPart}>
          <div className={styles.searchInputContainer}>
            <input
              className="input is-rounded"
              typeof="text"
              placeholder="Search or Start a new chat"
            ></input>
          </div>
          <ul className={styles.chatList}>
            <li>Test</li>
            <li>Test</li>
            <li>Test</li>
            <li>Test</li>
            <li>Test</li>
            <li>Test</li>
            <li>Test</li>
            <li>Test</li>
            <li>Test</li>
            <li>Test</li>
            <li>Test</li>
            <li>Test</li>
            <li>Test</li>
            <li>Test</li>
            <li>Test</li>
            <li>Test</li>
            <li>Test</li>
            <li>Test</li>
            <li>Test</li>
            <li>Test</li>
            <li>Test</li>
            <li>Test</li>
            <li>Test</li>
          </ul>
        </div>
        <div className={styles.appRightPart}>
          <ul className={styles.chatHistory}>
            <li>Test</li>
            <li>Test</li>
            <li>Test</li>
            <li>Test</li>
            <li>Test</li>
            <li>Test</li>
            <li>Test</li>
            <li>Test</li>
            <li>Test</li>
            <li>Test</li>
            <li>Test</li>
            <li>Test</li>
            <li>Test</li>
            <li>Test</li>
            <li>Test</li>
            <li>Test</li>
            <li>Test</li>
            <li>Test</li>
            <li>Test</li>
            <li>Test</li>
          </ul>
          <div className={styles.chatInputContainer}>
            <input
              className="input is-rounded"
              type="text"
              placeholder="Type a message"
            ></input>
            <div className={styles.sendIcon}>
              <i class="fa-solid fa-message fa-2x"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Welcome;
