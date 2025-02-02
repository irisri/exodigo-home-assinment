import "./style.css";

export const Loader = ({ isLoading }: { isLoading: boolean }) => {
  return isLoading ? (
    <div className="loader-container">
      <div className="loader"></div>
    </div>
  ) : null;
};
