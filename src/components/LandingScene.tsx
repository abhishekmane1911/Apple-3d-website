import Spline from '@splinetool/react-spline';

export default function LandingScene() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      zIndex: 10
    }}>
      <Spline scene="https://prod.spline.design/06-X2ubuVlhEBmOw/scene.splinecode" />
    </div>
  );
}