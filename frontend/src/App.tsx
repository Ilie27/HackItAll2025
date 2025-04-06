import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Profile from './pages/profile/Profile'
import BoardPage from './pages/board/Board'
import Navbar from './common/Navbar'
import Menu from './pages/menu/Menu'
import EmergencyPage from './pages/emergency/Emergency'

function App() {
	return <BrowserRouter>
		<Navbar />
		<Routes>
			<Route path="/" element={<Profile />} />
			<Route path="/profile" element={<Profile />} />
			<Route path="/menu" element={<Menu />} /> 
			<Route path="/board" element={<BoardPage />} />
            <Route path="/emergency" element={<EmergencyPage />} />
		</Routes>
	</BrowserRouter>
}

export default App
