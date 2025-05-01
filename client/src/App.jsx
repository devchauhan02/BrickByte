import Website from "./pages/Website";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, useState } from "react";
import Layout from "./component/Layout";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "react-toastify/dist/ReactToastify.css";
import Properties from "./pages/Properties";
import Property from "./pages/Property";
import UserDetailContext from "./context/UserDetailContext";
import Favourites from "./pages/Favourites";

const App = () => {
  const queryClient = new QueryClient();
  const [userDetail, setUserDetail] = useState({
    favourites: [],
    Bookings: [],
    token: null
  });

  return (
    <UserDetailContext.Provider value={{userDetail, setUserDetail}}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Website />}></Route>
                <Route path="/properties" >
                  <Route index element={<Properties />} />
                  <Route path=":propertyID" element={<Property />} />
                </Route>
                <Route path="/favourites" element={<Favourites />} />
                {/* <Route path="/bookings" element={<Bookings />} /> */}
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
