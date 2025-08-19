"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RotateCw, Sparkles, Star } from "lucide-react"

const cleaningTips = [
  {
    id: 1,
    title: "Greasy Stove",
    tip: "Spray our citrus-powered cleaner, leave for 2 minutes, wipe away stubborn grease effortlessly.",
    hack: "Did you know? Lemon juice cuts through oil naturally.",
    color: "from-orange-400 to-orange-600",
    textColor: "text-white",
  },
  {
    id: 2,
    title: "Dusty Shelf",
    tip: "Microfiber cloth traps dust without spreading it — no sneezing!",
    hack: "Place a small bowl of baking soda on shelves to absorb odors.",
    color: "from-blue-400 to-blue-600",
    textColor: "text-white",
  },
  {
    id: 3,
    title: "Muddy Floor",
    tip: "Mop with warm soapy water + vinegar for a spotless, streak-free shine.",
    hack: "Add a few drops of essential oil for a fresh scent.",
    color: "from-green-400 to-green-600",
    textColor: "text-white",
  },
  {
    id: 4,
    title: "Foggy Mirror",
    tip: "Rub with a drop of dish soap and rinse for a fog-free bathroom.",
    hack: "Use newspaper instead of paper towels for streak-free results.",
    color: "from-purple-400 to-purple-600",
    textColor: "text-white",
  },
  {
    id: 5,
    title: "Stained Couch",
    tip: "Baking soda absorbs odors; a gentle fabric cleaner lifts stains.",
    hack: "Test cleaning solutions on a hidden area first.",
    color: "from-pink-400 to-pink-600",
    textColor: "text-white",
  },
  {
    id: 6,
    title: "Cluttered Desk",
    tip: "Sort items into labeled baskets — clean space, clear mind.",
    hack: "Follow the 'one touch rule' - handle each item only once.",
    color: "from-yellow-400 to-yellow-600",
    textColor: "text-gray-800",
  },
  {
    id: 7,
    title: "Messy Dining Table",
    tip: "Wipe wood with olive oil for shine + longevity.",
    hack: "Use coasters and placemats to prevent future damage.",
    color: "from-red-400 to-red-600",
    textColor: "text-white",
  },
  {
    id: 8,
    title: "Golden Star",
    tip: "Congrats! You win hack the mess card.",
    hack: "You're a cleaning champion! Keep up the great work!",
    color: "from-yellow-300 via-yellow-400 to-amber-500",
    textColor: "text-gray-800",
    isSpecial: true,
  },
]

export default function CleaningDiskApp() {
  const [currentTip, setCurrentTip] = useState(0)
  const [isSpinning, setIsSpinning] = useState(false)
  const [rotationDegrees, setRotationDegrees] = useState(0)

  const rotateDisk = () => {
    setIsSpinning(true)

    const randomSpins = Math.floor(Math.random() * 4) + 3
    const randomFinalPosition = Math.floor(Math.random() * cleaningTips.length)
    const degreesPerSegment = 360 / cleaningTips.length
    const totalRotation = randomSpins * 360 + randomFinalPosition * degreesPerSegment

    setRotationDegrees((prev) => prev + totalRotation)

    setTimeout(() => {
      setCurrentTip(randomFinalPosition)
      setIsSpinning(false)
    }, 2000)
  }

  const currentItem = cleaningTips[currentTip]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-slate-800 dark:text-white mb-3 flex items-center justify-center gap-3">
            <Sparkles className="text-yellow-500 w-10 h-10" />
            Spin the Mess
            <Sparkles className="text-yellow-500 w-10 h-10" />
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            Spin the wheel to discover amazing cleaning hacks!
          </p>
        </div>

        <div className="flex flex-col xl:flex-row items-center justify-center gap-12">
          <div className="relative">
            {/* Outer shadow ring */}
            <div className="absolute inset-0 w-[420px] h-[420px] rounded-full bg-gradient-to-br from-slate-300 to-slate-500 shadow-2xl -m-5 opacity-30"></div>

            {/* Main pie chart container */}
            <div
              className={`relative w-[400px] h-[400px] rounded-full shadow-2xl transition-transform duration-2000 ease-out overflow-hidden border-4 border-white`}
              style={{
                transform: `rotate(${rotationDegrees}deg)`,
                transitionDuration: isSpinning ? "2000ms" : "300ms",
              }}
            >
              {/* Pie segments */}
              {cleaningTips.map((tip, index) => {
                const angle = (360 / cleaningTips.length) * index
                const nextAngle = (360 / cleaningTips.length) * (index + 1)

                return (
                  <div
                    key={tip.id}
                    className={`absolute inset-0 bg-gradient-to-br ${tip.color}`}
                    style={{
                      clipPath: `polygon(50% 50%, 
                        ${50 + 50 * Math.cos((angle * Math.PI) / 180)}% ${50 + 50 * Math.sin((angle * Math.PI) / 180)}%, 
                        ${50 + 50 * Math.cos((nextAngle * Math.PI) / 180)}% ${50 + 50 * Math.sin((nextAngle * Math.PI) / 180)}%)`,
                    }}
                  >
                    {/* Segment border */}
                    <div className="absolute inset-0 border-2 border-white/20"></div>

                    {/* Segment text */}
                    <div
                      className="absolute top-16 left-1/2 transform -translate-x-1/2"
                      style={{
                        transform: `translateX(-50%) rotate(${angle + 22.5}deg)`,
                        transformOrigin: "50% 150px",
                      }}
                    >
                      <div className={`text-center ${tip.textColor}`}>
                        <div className="text-sm font-bold mb-1 drop-shadow-sm">{tip.title}</div>
                        {tip.isSpecial && <Star className="w-5 h-5 mx-auto text-yellow-200 drop-shadow-sm" />}
                      </div>
                    </div>
                  </div>
                )
              })}

              {/* Center circle with large, clear text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className={`w-40 h-40 rounded-full bg-white shadow-xl flex items-center justify-center transition-all duration-500 border-4 border-slate-200 ${
                    isSpinning ? "opacity-80 scale-95" : "opacity-100 scale-100"
                  }`}
                >
                  <div className="text-center p-2">
                    {currentItem.isSpecial && <Star className="w-8 h-8 mx-auto mb-2 text-yellow-500" />}
                    <div className="text-2xl font-bold text-slate-800 leading-tight">{currentItem.title}</div>
                    <div className="text-sm text-slate-500 mt-1">Tip #{currentItem.id}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pointer indicator */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-3 z-20">
              <div className="w-0 h-0 border-l-6 border-r-6 border-b-12 border-l-transparent border-r-transparent border-b-red-500 shadow-lg drop-shadow-md"></div>
            </div>
          </div>

          {/* Tip display card */}
          <Card className="w-full max-w-lg shadow-xl border-2">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Badge variant="secondary" className="text-base px-3 py-1">
                  {currentItem.isSpecial ? "🏆 Special Reward!" : "💡 Quick Tip"}
                </Badge>
                {currentItem.isSpecial && <Star className="w-5 h-5 text-yellow-500" />}
              </div>

              <h3 className="text-2xl font-bold mb-6 text-slate-800 dark:text-white">{currentItem.title}</h3>

              <div className="space-y-6">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border-l-4 border-blue-400">
                  <p className="text-base font-semibold text-blue-800 dark:text-blue-200 mb-2">💡 Quick Tip:</p>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{currentItem.tip}</p>
                </div>

                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border-l-4 border-green-400">
                  <p className="text-base font-semibold text-green-800 dark:text-green-200 mb-2">🔥 Fun Hack:</p>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{currentItem.hack}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Spin button */}
        <div className="text-center mt-12">
          <Button
            onClick={rotateDisk}
            disabled={isSpinning}
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-10 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            <RotateCw className={`w-6 h-6 mr-3 ${isSpinning ? "animate-spin" : ""}`} />
            {isSpinning ? "Spinning..." : "Spin the Wheel!"}
          </Button>

          <div className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            Click to spin randomly and discover new cleaning tips
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <div className="flex gap-2">
            {cleaningTips.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTip(index)}
                disabled={isSpinning}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentTip ? "bg-blue-500 scale-125" : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400"
                } ${isSpinning ? "opacity-50 cursor-not-allowed" : ""}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
