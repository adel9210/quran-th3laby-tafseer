import './App.scss'
import {Quran} from "./components/Quran/Quran";
import {Header} from "./components/Header/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from "react-bootstrap";
import {ModalsContainer} from "./components/ModalsContainer/ModalsContainer";
import {BrowserRouter} from "react-router-dom";
import {MobileHeader} from "./components/MobileHeader/MobileHeader";
import {isMobile} from "./lib";
// import 'react-pdf/dist/Page/AnnotationLayer.css';

function App() {
    const isMobileDevice = isMobile()
    return (
        <BrowserRouter>
            <div className="App">
                <ModalsContainer/>
                <Container>
                    {isMobileDevice ? <MobileHeader/> : <Header showPlayer={true} showLogo={true}/>}
                    <Quran/>
                </Container>
            </div>
        </BrowserRouter>
    );
}

export default App;
