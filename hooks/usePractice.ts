import { useState } from "react"

interface Sign {
  name: string;
  description: string;
  difficulty: string;
  image: string;
}

export function usePractice() {
  const [feedback, setFeedback] = useState<null | { success: boolean; score: number }>(null)
  const [currentSign, setCurrentSign] = useState<Sign>({
    name: "Hello",
    description: "Wave your hand with palm facing outward",
    difficulty: "Beginner",
    image: "/placeholder.svg?height=300&width=300",
  })

  const signs: Sign[] = [
    {
      name: "Thank You",
      description: "Touch your chin with your fingertips and move your hand outward",
      difficulty: "Beginner",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Please",
      description: "Rub your chest in a circular motion with your open hand",
      difficulty: "Beginner",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Sorry",
      description: "Make a fist and rub it in a circular motion on your chest",
      difficulty: "Beginner",
      image: "/placeholder.svg?height=300&width=300",
    },
  ];

  const submitPractice = () => {
    const success = Math.random() > 0.3;
    const score = success ? Math.floor(Math.random() * 20) + 80 : Math.floor(Math.random() * 30) + 50;
    setFeedback({ success, score });
  };

  const nextSign = () => {
    setFeedback(null);
    setCurrentSign(signs[Math.floor(Math.random() * signs.length)]);
  };

  return {
    feedback,
    currentSign,
    submitPractice,
    nextSign
  };
}