import { Route, BrowserRouter as Router, Routes, } from "react-router-dom"
import { ProfileProvider } from "./context/profile.context"
import { ToastContainer } from "react-toastify"
import About from "./pages/About"
import Signin from "./pages/Signin"
import Home from "./pages/Home"
import PageNotFound from "./pages/PageNotFound"
import PrivateRoute from "./components/PrivateRoute"

const App = () => {
    return (
        <>
            <ProfileProvider>
                <ToastContainer />
                <Router>
                    <Routes>
                        <Route element={<PrivateRoute/>}>
                            <Route path='/' element={<Home />} exact />
                            <Route path='/about' element={<About />} />
                        </Route>
                            <Route path='/signin' element={<Signin />} />
                            <Route path='*' element={<PageNotFound/>} />
                    </Routes>
                </Router>
            </ProfileProvider>
        </>

    )
}

export default App