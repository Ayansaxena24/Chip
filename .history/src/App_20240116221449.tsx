import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ChipInput from './ChipInput'

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<ChipInput />} />
      </Routes>
    </Router>
  )
}

export default App