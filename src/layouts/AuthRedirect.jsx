import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const AuthRedirect = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
  if (!isLoaded) return;
if (!user) return;

// wait until metadata exists
const role =
  user.publicMetadata?.role ||
  user.unsafeMetadata?.role;

if (!role && location.pathname !== "/onboarding") {
  navigate("/onboarding", { replace: true });
}

  }, [isLoaded, user, location.pathname, navigate]);

  return null;
};

export default AuthRedirect;
