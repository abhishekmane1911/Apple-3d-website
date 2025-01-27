import { useEffect, useState } from 'react';
import { Howl } from 'howler'; // Import Howler for audio
import './TextOverlay.css';

interface TextOverlayProps {
    currentFrame: number;
}

function TextOverlay({ currentFrame }: TextOverlayProps) {
    const [textDataLeft, setTextDataLeft] = useState("Welcome! Scroll to see more...");
    const [textDataRight, setTextDataRight] = useState("Here's some more information...");
    const [heading, setHeading] = useState("Welcome to the page!");
    const [visibleWordsLeft, setVisibleWordsLeft] = useState<string[]>([]);
    const [visibleWordsRight, setVisibleWordsRight] = useState<string[]>([]);
    const [currentRange, setCurrentRange] = useState<number | null>(null);

    const frameRanges = [
        {
            start: 1, end: 123, heading: "MACBOOK",
            textLeft: "Sleek, lightweight, and ultra-portable.\nRetina Display: Vivid and true-to-life visuals.\nM3 Chip: Blazing-fast performance.",
            textRight: "20-hour battery life for all-day work.\nMagic Keyboard for seamless typing.\nmacOS: Intuitive and powerful."
        },
        {
            start: 124, end: 217, heading: "IPHONE",
            textLeft: "Super Retina XDR: Stunning OLED display.\nA15 Bionic: Unmatched speed and power.\n5G Capable: Experience ultra-fast internet.",
            textRight: "Pro-grade cameras for incredible shots.\nFace ID: Fast, secure authentication.\nCeramic Shield: Exceptionally durable."
        },
        {
            start: 218, end: 307, heading: "WATCH",
            textLeft: "Always-On Retina Display: Clear and vibrant.\nFitness Tracking: Track workouts and health.\nECG App: Advanced heart monitoring.",
            textRight: "Water-resistant: Swim-ready design.\nCustomizable faces to match your style.\nFall detection for your safety."
        },
        {
            start: 308, end: 405, heading: "VISION PRO",
            textLeft: "AR technology: Merging digital and real worlds.\nHigh-res displays for unmatched immersion.\nSpatial Audio: Sound that surrounds you.",
            textRight: "Ergonomic, lightweight design.\nNatural gesture controls.\nSeamless, futuristic experience."
        },
        {
            start: 406, end: 505, heading: "AIRPODS MAX",
            textLeft: "Active Noise Cancellation: Immersive audio.\nSpatial Audio for 3D sound.\nPremium materials for durability.",
            textRight: "Transparency Mode: Stay aware of your surroundings.\nCushioned ear cups for comfort.\nDigital Crown for precise control."
        },
        {
            start: 506, end: 600, heading: "AIRPODS PRO",
            textLeft: "Noise Cancellation for immersive listening.\nAdaptive EQ for personalized sound.\nH1 Chip: Reliable and fast connectivity.",
            textRight: "Water-resistant for active lifestyles.\nTransparency Mode for situational awareness.\nCustom ear tips for a perfect fit."
        },
        {
            start: 601, end: 700, heading: "MAC PRO",
            textLeft: "Modular: Tailored to industrial needs.\nExceptional power for super heavy tasks.\nAdvanced cooling for peak efficiency.",
            textRight: "Expand your professional setup easily.\nIconic, professional design.\nmacOS: Optimized for productivity."
        },
        {
            start: 701, end: 809, heading: "MAC STUDIO",
            textLeft: "Compact yet powerful.\nEngineered for creators and professionals.\nHigh-performance cooling system.",
            textRight: "Better than Windows.\nspace-saving design.\nmacOS: A seamless creative platform."
        },
    ];
    // Preload the sound effect
    const wordSFX = new Howl({
        src: ['public/s2.mp3'], // Replace with your sound file
        volume: 0.2,
    });

    useEffect(() => {
        const findCurrentRange = frameRanges.findIndex(
            range => currentFrame >= range.start && currentFrame <= range.end
        );

        if (findCurrentRange !== -1 && findCurrentRange !== currentRange) {
            const range = frameRanges[findCurrentRange];

            setHeading(range.heading);
            setTextDataLeft(range.textLeft);
            setTextDataRight(range.textRight);
            setCurrentRange(findCurrentRange);

            // Reset visible words
            setVisibleWordsLeft([]);
            setVisibleWordsRight([]);
        }

        // Reveal words based on frame progress within the current range
        if (currentRange !== null) {
            const currentRangeObj = frameRanges[currentRange];
            const leftWords = currentRangeObj.textLeft.split(/\s+/);
            const rightWords = currentRangeObj.textRight.split(/\s+/);

            const framesInRange = currentRangeObj.end - currentRangeObj.start + 1;
            const currentFrameInRange = currentFrame - currentRangeObj.start;

            const leftWordsToShow = Math.floor((currentFrameInRange / framesInRange) * leftWords.length);
            const rightWordsToShow = Math.floor((currentFrameInRange / framesInRange) * rightWords.length);

            const newLeftWords = leftWords.slice(0, leftWordsToShow);
            const newRightWords = rightWords.slice(0, rightWordsToShow);

            // Play SFX for new words
            if (newLeftWords.length > visibleWordsLeft.length) {
                wordSFX.play();
            }
            if (newRightWords.length > visibleWordsRight.length) {
                wordSFX.play();
            }

            setVisibleWordsLeft(newLeftWords);
            setVisibleWordsRight(newRightWords);
        }
    }, [currentFrame]);

    return (
        <div className="text-overlay-container">
            <div className="main-heading">{heading}</div>
            <div className='container'>
                <div className="text-overlay-left">
                    {visibleWordsLeft.map((word, index) => (
                        <span key={index} className="neon-word">{word} </span>
                    ))}
                </div>
                <div className="text-overlay-right">
                    {visibleWordsRight.map((word, index) => (
                        <span key={index} className="neon-word">{word} </span>
                    ))}
                </div>
            </div>
        </div >
    );
}

export default TextOverlay;