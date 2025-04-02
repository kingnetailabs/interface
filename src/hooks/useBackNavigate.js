import { useNavigate } from "react-router-dom";

const useBackNavigate = () => {
  const navigate = useNavigate();
  function back() {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("");
    }
  }

  return {
    back,
  };
};

export default useBackNavigate;
