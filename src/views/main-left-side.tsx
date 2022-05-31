import logo from '../assets/images/logo_chatter_white.png';

function MainLeftSide() {
    return (
        <div className="bg-chatter-blue left-side w-50">
            <div className="content d-flex justify-content-center align-items-center h-100">
                <div className="bg-effect" />
                <img src={logo} className="mw-100" data-aos="zoom-in" />
            </div>
        </div>
    )
}

export default MainLeftSide;

