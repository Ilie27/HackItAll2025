import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Profile from './pages/profile/Profile'
import BoardPage from './pages/board/Board'
import Navbar from './common/Navbar'

function App() {
	return <BrowserRouter>
		<Navbar />
		<Routes>
			<Route path="/profile" element={<Profile />} />
			<Route path="/" element={<BoardPage />} />
		</Routes>
	</BrowserRouter>
}

export default App
