import { FiLogOut } from "react-icons/fi";
import Loader from "./Loader";

const Popup = ({
  popup,
  imageUrl,
  name,
  username,
  bio,
  email,
  isLoadingLogout,
  onLogout,
}: {
  popup: boolean;
  imageUrl: string;
  name: string;
  username: string;
  bio: string;
  email: string;
  isLoadingLogout: boolean;
  onLogout: () => void;
}) => {
  return (
    <div className={`popup ${popup ? "opened" : ""}`}>
      <div className="header">
        <img src={imageUrl} alt={username} />
      </div>
      <div className="user-info">
        <p className="name">{name}</p>
        <p className="email">{email}</p>
        <span>{bio}</span>
      </div>
      <button onClick={onLogout} disabled={isLoadingLogout}>
        {isLoadingLogout ? (
          <>
            Logging out... <Loader height="20px" width="20px" />
          </>
        ) : (
          <>
            Logout
            <FiLogOut />
          </>
        )}
      </button>
    </div>
  );
};

export default Popup;
