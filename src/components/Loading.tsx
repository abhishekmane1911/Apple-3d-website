import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import './Loading.css';

const Loading = () => {
    return (
        <div className="loading-container">
            <DotLottieReact
                src="https://lottie.host/19de4497-8484-42f8-9639-01d0ac8cd9b1/CrdfWtMryD.lottie"
                loop
                autoplay
            />
           
        </div>
    );
};

export default Loading;

