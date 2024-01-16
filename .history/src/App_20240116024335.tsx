import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ChipInput from './chipInput'

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