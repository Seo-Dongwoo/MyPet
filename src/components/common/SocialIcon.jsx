import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SocialIcon({ icon, size, style, herf }) {
  return (
    <div>
      <p className="social-container">
        <a href={herf}>
          <FontAwesomeIcon icon={icon} size={size} style={style} />
        </a>
      </p>
    </div>
  );
}

export default SocialIcon;
