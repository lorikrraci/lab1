const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return isAuthenticated ? element : <Navigate to="/login" />;
};
