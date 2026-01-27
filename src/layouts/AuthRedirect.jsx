import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const AuthRedirect = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoaded || !user) return;

    const role =
      user.publicMetadata?.role ||
      user.unsafeMetadata?.role;

    // wait for metadata
    if (!role) return;

    navigate("/jobs", { replace: true });
  }, [isLoaded, user, navigate]);

  return null;
};

export default AuthRedirect;
