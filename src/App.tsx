// import { useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
// import { useCallback, useEffect, useMemo, useRef } from 'react';

// function App() {
// 	const ref = useRef<HTMLCanvasElement>(null);

// 	const { scrollYProgress } = useScroll({
// 		target: ref,
// 		offset: ['center end', 'start start'],
// 	});

// 	const images = useMemo(() => {
// 		const loadedImages: HTMLImageElement[] = [];

// 		for (let i = 1; i <= 808; i++) {
// 			const img = new Image();
// 			// img.src = `/images/${i}.webp`;
// 			img.src = `/web-back/${i}.webp`;


// 			loadedImages.push(img);
// 		}

// 		return loadedImages;
// 	}, []);

// 	const render = useCallback(
// 		(index: number) => {
// 			if (images[index - 1]) {
// 				ref.current?.getContext('2d')?.drawImage(images[index - 1], 0, 0);
// 			}
// 		},
// 		[images]
// 	);

// 	const currentIndex = useTransform(scrollYProgress, [0, 1], [1, 808]);

// 	useMotionValueEvent(currentIndex, 'change', (latest) => {
// 		render(Number(latest.toFixed()));
// 	});

// 	useEffect(() => {
// 		render(1);
// 	}, [render]);

// 	return (
// 		<div
// 			style={{
// 				height: '6000px',
// 				backgroundColor: 'black',
// 				display: 'flex',
// 				justifyContent: 'center',
// 				alignItems: 'center',
// 			}}
// 		>
// 			<div style={{ height: '3000px' }} />
// 			<canvas width={1000} height={1000} ref={ref} />
// 		</div>
// 	);
// }

// export default App;



// import { useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
// import { useCallback, useEffect, useRef, useState } from 'react';

// function App() {
// 	const ref = useRef<HTMLCanvasElement>(null);
// 	const [images, setImages] = useState<HTMLImageElement[]>([]);

// 	const { scrollYProgress } = useScroll({
// 		target: ref,
// 		offset: ['center end', 'start start'],
// 	});

// 	useEffect(() => {
// 		const loadedImages: HTMLImageElement[] = [];
// 		const promises: Promise<void>[] = [];

// 		for (let i = 1; i <= 809; i++) {
// 			const img = new Image();
// 			img.src = `/webimages/${i.toString().padStart(3, '0')}.jpg`;

// 			loadedImages.push(img);

// 			promises.push(
// 				new Promise((resolve, reject) => {
// 					img.onload = () => {
// 						console.log(`Image loaded: ${img.src}`);
// 						resolve();
// 					};
// 					img.onerror = () => {
// 						console.error(`Failed to load image: ${img.src}`);
// 						reject(new Error(`Failed to load image: ${img.src}`));
// 					};
// 				})
// 			);
// 		}

// 		Promise.all(promises)
// 			.then(() => {
// 				setImages(loadedImages);
// 				console.log('All images loaded');
// 			})
// 			.catch((error) => console.error(error));
// 	}, []);

// 	const render = useCallback(
// 		(index: number) => {
// 			const imageIndex = Math.floor(index) - 1;
// 			const img = images[imageIndex];

// 			if (img && img.complete) {
// 				console.log(`Rendering image index: ${imageIndex}`);
// 				ref.current?.getContext('2d')?.drawImage(img, 0, 0);
// 			} else {
// 				console.warn(`Image not complete or not found for index: ${imageIndex}`);
// 			}
// 		},
// 		[images]
// 	);

// 	const currentIndex = useTransform(scrollYProgress, [0, 1], [1, 809], { clamp: true });

// 	useMotionValueEvent(currentIndex, 'change', (latest) => {
// 		requestAnimationFrame(() => render(latest));
// 	});

// 	useEffect(() => {
// 		if (images.length > 0) {
// 			render(1);
// 		}
// 	}, [images, render]);

// 	return (
// 		<div
// 			style={{
// 				height: '6000px',
// 				backgroundColor: 'black',
// 				display: 'flex',
// 				justifyContent: 'center',
// 				alignItems: 'center',
// 			}}
// 		>
// 			<div style={{ height: '3000px' }} />
// 			<canvas ref={ref} />
// 		</div>
// 	);
// }

// export default App;

// import { useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
// import { useCallback, useEffect, useRef, useState } from 'react';

// function App() {
//     const ref = useRef<HTMLCanvasElement>(null);
//     const [images, setImages] = useState<HTMLImageElement[]>([]);

//     const { scrollYProgress } = useScroll();

//     useEffect(() => {
//         const loadedImages: HTMLImageElement[] = [];
//         const promises: Promise<void>[] = [];

//         for (let i = 1; i <= 809; i++) {
//             const img = new Image();
//             img.src = `/webimages/${i.toString().padStart(3, '0')}.jpg`;

//             loadedImages.push(img);

//             promises.push(
//                 new Promise((resolve, reject) => {
//                     img.onload = () => {
//                         console.log(`Image loaded: ${img.src}`);
//                         resolve();
//                     };
//                     img.onerror = () => {
//                         console.error(`Failed to load image: ${img.src}`);
//                         reject(new Error(`Failed to load image: ${img.src}`));
//                     };
//                 })
//             );
//         }

//         Promise.all(promises)
//             .then(() => {
//                 setImages(loadedImages);
//                 console.log('All images loaded');
//             })
//             .catch((error) => console.error(error));
//     }, []);

//     const render = useCallback(
//         (index: number) => {
//             const imageIndex = Math.floor(index) - 1;
//             const img = images[imageIndex];

//             if (img && img.complete) {
//                 console.log(`Rendering image index: ${imageIndex}`);
//                 const ctx = ref.current?.getContext('2d');
//                 if (ctx) {
//                     const canvas = ref.current;
//                     const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
//                     const x = (canvas.width - img.width * scale) / 2;
//                     const y = (canvas.height - img.height * scale) / 2;

//                     ctx.clearRect(0, 0, canvas.width, canvas.height);
//                     ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
//                 }
//             } else {
//                 console.warn(`Image not complete or not found for index: ${imageIndex}`);
//             }
//         },
//         [images]
//     );

//     // Adjust the useTransform range to significantly slow down the transition
//     const currentIndex = useTransform(scrollYProgress, [0, 1], [1, 12000], { clamp: true });

//     useMotionValueEvent(currentIndex, 'change', (latest) => {
//         requestAnimationFrame(() => render(latest));
//     });

//     useEffect(() => {
//         if (images.length > 0) {
//             render(1);
//         }
//     }, [images, render]);

//     return (
//         <div
//             style={{
//                 position: 'relative',
//                 minHeight: '8000vh', // Increase the height for slower scrolling
//                 backgroundColor: 'white',
//             }}
//         >
//             <div
//                 style={{
//                     position: 'fixed',
//                     top: 0,
//                     left: 0,
//                     width: '100%',
//                     height: '100%',
//                     display: 'flex',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                 }}
//             >
//                 <canvas width={1920} height={1080} ref={ref} />
//             </div>
//             <div style={{ height: '8000vh' }}></div> {/* Add content for scrolling */}
//         </div>
//     );
// }

// export default App;


// import { useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
// import { useCallback, useEffect, useRef, useState } from 'react';
// import './App.css'; // Add this line to import the CSS file

// function App() {
//     const ref = useRef<HTMLCanvasElement>(null);
//     const [images, setImages] = useState<HTMLImageElement[]>([]);

//     const { scrollYProgress } = useScroll();

//     useEffect(() => {
//         const loadedImages: HTMLImageElement[] = [];
//         const promises: Promise<void>[] = [];

//         for (let i = 1; i <= 809; i++) {
//             const img = new Image();
//             img.src = `/webimages/${i.toString().padStart(3, '0')}.jpg`;

//             loadedImages.push(img);

//             promises.push(
//                 new Promise((resolve, reject) => {
//                     img.onload = () => {
//                         console.log(`Image loaded: ${img.src}`);
//                         resolve();
//                     };
//                     img.onerror = () => {
//                         console.error(`Failed to load image: ${img.src}`);
//                         reject(new Error(`Failed to load image: ${img.src}`));
//                     };
//                 })
//             );
//         }

//         Promise.all(promises)
//             .then(() => {
//                 setImages(loadedImages);
//                 console.log('All images loaded');
//             })
//             .catch((error) => console.error(error));
//     }, []);

//     const render = useCallback(
//         (index: number) => {
//             const loopedIndex = index % images.length;
//             const imageIndex = Math.floor(loopedIndex);
//             const img = images[imageIndex];

//             if (img && img.complete) {
//                 console.log(`Rendering image index: ${imageIndex}`);
//                 const ctx = ref.current?.getContext('2d');
//                 if (ctx) {
//                     const canvas = ref.current;
//                     ctx.clearRect(0, 0, canvas.width, canvas.height);
//                     ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
//                 }
//             } else {
//                 console.warn(`Image not complete or not found for index: ${imageIndex}`);
//             }
//         },
//         [images]
//     );

//     // Adjust the useTransform range for a slower transition
//     const currentIndex = useTransform(scrollYProgress, [0, 1], [1, 6000], { clamp: false });

//     useMotionValueEvent(currentIndex, 'change', (latest) => {
//         requestAnimationFrame(() => render(latest));
//     });

//     useEffect(() => {
//         const handleResize = () => {
//             const canvas = ref.current;
//             if (canvas) {
//                 canvas.width = window.innerWidth;
//                 canvas.height = window.innerHeight;
//             }
//         };

//         handleResize();
//         window.addEventListener('resize', handleResize);
//         return () => {
//             window.removeEventListener('resize', handleResize);
//         };
//     }, []);

//     useEffect(() => {
//         if (images.length > 0) {
//             render(1);
//         }
//     }, [images, render]);

//     return (
//         <div className="scroll-container">
//             <div className="canvas-container">
//                 <canvas ref={ref} />
//             </div>
//             <div className="scroll-content"></div>
//         </div>
//     );
// }

// export default App;



// import React from 'react';
// import ScrollableTextCanvas from './components/ScrollableTextCanvas.tsx';
// import LandingScene from './components/LandingScene.tsx';
// import './App.css';

// function App() {
//     return (
//         <div className="App">
//             <ScrollableTextCanvas />
//         </div>
//     );
// }

// export default App;


import React, { useState } from 'react';
import ScrollableTextCanvas from './components/ScrollableTextCanvas';
import LandingScene from './components/LandingScene';
import './App.css';

function App() {
    const [isStarted, setIsStarted] = useState(false);

    const handleStart = () => {
        setIsStarted(true); // Transition to ScrollableTextCanvas
    };

    return (
        <div className="App">
            {!isStarted ? (
                <div>
                    <LandingScene />
                    <button className="get-started-button" onClick={handleStart}>
                        Get Started
                    </button>
                </div>
            ) : (
                <ScrollableTextCanvas />
            )}
        </div>
    );
}

export default App;