import type React from "react"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface CarouselProps {
    children: React.ReactNode[]
    autoPlay?: boolean
    interval?: number
}

export default function Carousel({ children, autoPlay = true, interval = 4000 }: CarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        if (!autoPlay) return
        
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % children.length)
        }, interval)

        return () => clearInterval(timer)
    }, [autoPlay, interval, children.length])

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + children.length) % children.length)
    }

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % children.length)
    }

    return (
        <div className="relative shadow-2xl rounded-2xl w-full h-full overflow-hidden">
            <div
                className="flex h-full transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {children.map((child, index) => (
                    <div key={index} className="flex-shrink-0 w-full h-full">
                        {child}
                    </div>
                ))}
            </div>

            {/* Navigation buttons */}
            <button className="top-1/2 left-4 absolute bg-white/20 hover:bg-white/30 backdrop-blur-sm border-0 text-white -translate-y-1/2 transform" onClick={goToPrevious}>
                <ChevronLeft className="w-6 h-6" />
            </button>
            <button className="top-1/2 right-4 absolute bg-white/20 hover:bg-white/30 backdrop-blur-sm border-0 text-white -translate-y-1/2 transform" onClick={goToNext}>
                <ChevronRight className="w-6 h-6" />
            </button>
            {/* Dots indicator */}
            <div className="bottom-4 left-1/2 absolute flex space-x-2 -translate-x-1/2 transform">
                {children.map((_, index) => (
                    <button
                        key={index}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex ? "bg-white scale-110" : "bg-white/50 hover:bg-white/70"
                            }`}
                        onClick={() => setCurrentIndex(index)}
                    />
                ))}
            </div>
        </div>
    )
}
