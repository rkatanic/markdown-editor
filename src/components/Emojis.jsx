import { useState } from "react";
import IconButton from "./IconButton";
import { ReactComponent as EmojiIcon } from "../assets/icons/smile.svg";
import { EMOJIS } from "../constants/EMOJIS";

import "./Emojis.css";

const Emojis = ({ insertEmoji }) => {
  const [showList, setShowList] = useState(false);

  return (
    <div
      className="emojis"
      onMouseEnter={() => setShowList(true)}
      onMouseLeave={() => setShowList(false)}
    >
      <IconButton icon={<EmojiIcon />} />

      {showList && (
        <div className="emoji-list">
          {EMOJIS.map((emoji, i) => (
            <span key={i} className="emoji" onClick={() => insertEmoji(emoji)}>
              {emoji}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default Emojis;
