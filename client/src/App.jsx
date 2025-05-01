import { useEffect, useState, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./component/Layout";
import Website from "./pages/Website";
import Properties from "./pages/Properties";
import Property from "./pages/Property";
import Favourites from "./pages/Favourites";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import UserDetailContext from "./context/UserDetailContext";
import "react-toastify/dist/ReactToastify.css";
import Bookings from "./pages/Bookings";


const App = () => {
  const queryClient = new QueryClient();
  const [userDetail, setUserDetail] = useState(() => {
    const local = localStorage.getItem("userDetail");
    return local
      ? JSON.parse(local)
      : { favourites: [], bookings: [], token: null };
  });

  useEffect(() => {
    localStorage.setItem("userDetail", JSON.stringify(userDetail));
  }, [userDetail]);

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Website />} />
                <Route path="/properties">
                  <Route index element={<Properties />} />
                  <Route path=":propertyID" element={<Property />} />
                </Route>
                <Route path="/favourites" element={<Favourites />} />
                <Route path="/bookings" element={<Bookings />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
        <ToastContainer />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </UserDetailContext.Provider>
  );
};

export default App;
