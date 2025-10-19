import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Feed from "./pages/Feed/Feed";
import AddPostForm from "./pages/AddPostForm/AddPostForm";
import "./styles/global.css";
import RootLayout from "./pages/RootLayout/RootLayout";
import NotFound from "./pages/NotFound/NotFound";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { TeachingUnitProvider } from "./context/TeachingUnitContext";
import About from "./pages/About/About";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Feed /> },
      { path: "contribute", element: <AddPostForm /> },
      { path: "about", element: <About /> },
    ],
  },
  {
    path: "*",
    element: <>
      <Header />
      <div className="page">
        <NotFound />
      </div>
      <Footer />
    </>,
  },
]);

function App() {
  return <TeachingUnitProvider>
    <RouterProvider router={router} />
  </TeachingUnitProvider>;
}

export default App;
