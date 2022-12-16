import { Routes, Route } from 'react-router-dom';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';

const RoutesComp = () => {
    return(
        <Routes>
            <Route path='/' element={<SignIn />} />
            <Route PATH='/signup' element={<Signup />}/>
        </Routes>
    )
}
export default RoutesComp;