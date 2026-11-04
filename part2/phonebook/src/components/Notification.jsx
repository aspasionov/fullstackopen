import "../index.css";

const Notification = ({ message, type = "error" }) => {
  return <div className={`${type}Notification`}>{message}</div>;
};

export default Notification;
