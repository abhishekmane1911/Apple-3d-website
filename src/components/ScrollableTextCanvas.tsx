import { useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import './ScrollableTextCanvas.css';
import TextOverlay from './TextOverlay'; // Import the TextOverlay component
import Loading from './Loading'; // Import the Loading component

function ScrollableTextCanvas() {
    const ref = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [currentFrame, setCurrentFrame] = useState(1); // State to keep track of current frame
    const [isLoading, setIsLoading] = useState(true); // State to track loading

    const { scrollYProgress } = useScroll();

    useEffect(() => {
        const loadedImages: HTMLImageElement[] = [];
        const promises: Promise<void>[] = [];

        for (let i = 1; i <= 809; i++) {
            const img = new Image();
            img.src = `/webimages/${i.toString().padStart(3, '0')}.jpg`;

            loadedImages.push(img);

            promises.push(
                new Promise((resolve, reject) => {
                    img.onload = () => resolve();
                    img.onerror = () => reject(new Error(`Failed to load image: ${img.src}`));
                })
            );
        }

        Promise.all(promises)
            .then(() => {
                setImages(loadedImages);
                setIsLoading(false); // Set loading to false once all images are loaded
                console.log('All images loaded');
            })
            .catch((error) => console.error(error));
    }, []);

    const render = useCallback(
        (index: number) => {
            const loopedIndex = index % images.length;
            const imageIndex = Math.floor(loopedIndex);
            const img = images[imageIndex];

            if (img && img.complete) {
                const ctx = ref.current?.getContext('2d');
                if (ctx) {
                    const canvas = ref.current;

                    // Scale canvas to match high DPI
                    const dpr = window.devicePixelRatio || 1;
                    const width = window.innerWidth;
                    const height = window.innerHeight;
                    canvas.width = width * dpr;
                    canvas.height = height * dpr;
                    ctx.scale(dpr, dpr);

                    // Clear the canvas
                    ctx.clearRect(0, 0, width, height);

                    // For mobile devices: center the image and crop the sides
                    const aspectRatio = img.width / img.height;
                    const canvasAspectRatio = width / height;

                    if (canvasAspectRatio > aspectRatio) {
                        // Canvas is wider than the image, so crop the sides
                        const cropWidth = height * aspectRatio;
                        const cropX = (width - cropWidth) / 2;
                        ctx.drawImage(img, cropX, 0, cropWidth, height);
                    } else {
                        // Canvas is taller than the image, so stretch the image
                        const cropHeight = width / aspectRatio;
                        const cropY = (height - cropHeight) / 2;
                        ctx.drawImage(img, 0, cropY, width, cropHeight);
                    }
                }
                setCurrentFrame(imageIndex + 1); // Update current frame state
            }
        },
        [images]
    );

    const currentIndex = useTransform(scrollYProgress, [0, 1], [1, 6000], { clamp: false });

    useMotionValueEvent(currentIndex, 'change', (latest) => {
        requestAnimationFrame(() => render(latest));
    });

    useEffect(() => {
        const handleResize = () => {
            const canvas = ref.current;
            if (canvas) {
                const dpr = window.devicePixelRatio || 1;
                canvas.width = window.innerWidth * dpr;
                canvas.height = window.innerHeight * dpr;
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    ctx.scale(dpr, dpr);
                }
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (images.length > 0) {
            render(1);
        }
    }, [images, render]);

    return (
        <div className="scroll-container">
            {isLoading ? (
                <Loading /> // Show the Loading component while images are loading
            ) : (
                <>
                    <div className="canvas-container">
                        <canvas ref={ref} />
                    </div>
                    <div className="scroll-content"></div>
                    <TextOverlay currentFrame={currentFrame} /> {/* Pass current frame as prop */}
                </>
            )}
        </div>
    );
}

export default ScrollableTextCanvas;