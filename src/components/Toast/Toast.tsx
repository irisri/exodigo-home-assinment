import { ToastContainer, ToastPosition } from "react-toastify";

export const Toast = () => {
  const toastProps = {
    position: "bottom-right" as ToastPosition,
    autoClose: 1500,
    hideProgressBar: true,
    newestOnTop: false,
    closeOnClick: false,
    rtl: false,
    pauseOnFocusLoss: true,
    draggable: false,
    pauseOnHover: true,
    theme: "light",
    closeButton: false,
  };
  return <ToastContainer className="toast" {...toastProps} />;
};
