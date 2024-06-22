import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainHomen from './Component/Routes/MainHome'
import MenuBrowserRouter from './Component/Routes/MenuBrowserRouter'
import InformacioFundacion from './Component/Routes/InformacionFundacion'
import ZonadePublicacion from './Component/Routes/ZonaDePublicacion'
import Galeria from './Component/Routes/Galeria'
import Chat from './Component/Routes/Chat'
import Curriculum from './Component/Routes/Curriculum'
import RevisionUsuario from './Component/Routes/RevisionUsuario';
import DonacionFormu from './Component/Routes/DonacionFormu';
import AnuncioBiblicos from './Component/Routes/AnuncioBiblicos';
import AnalyticsTracker from './AnalyticsTracker';


function App() {


  return (
    <div className='mainContent'>
      <BrowserRouter>
        <MenuBrowserRouter />
        <AnalyticsTracker />
        <Routes>
          <Route path='/' element={<RevisionUsuario /> } />
          <Route path='/mainHomen' element={<MainHomen />} />
          <Route path='/anuncioBiblicos' element={<AnuncioBiblicos />} />
          <Route path='/informacioFundacion' element={<InformacioFundacion />} />
          <Route path='/zonadePublicacion' element={<ZonadePublicacion />} />
          <Route path='/galeria' element={<Galeria />} />
          <Route path='/chat' element={<Chat />} />   
          <Route path='/curriculum' element={<Curriculum />} />
          <Route path='/Donacion' element={ <DonacionFormu /> } />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
