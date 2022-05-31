import RegisterForm from '../layout/register-form';
import MainLeftSide from './main-left-side';
import LoginForm from '../layout/login-form';

function Home() {
    return (
        <div className="main-wrapper d-flex row flex-grow-1">
            <MainLeftSide />
            <RegisterForm />
        </div>
    )

}
export default Home;    