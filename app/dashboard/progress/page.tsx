import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

export default function ProgressPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Your Learning Progress</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Overall Progress Card */}
        <Card>
          <CardHeader>
            <CardTitle>Overall Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Course Completion</span>
                  <span className="text-sm font-medium">75%</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Learning Streak</span>
                  <span className="text-sm font-medium">7 days</span>
                </div>
                <Progress value={70} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Milestones Card */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Milestones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">First Course Completed</p>
                  <p className="text-sm text-gray-500">2 days ago</p>
                </div>
                <Badge variant="default">Achieved</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">5-Day Streak</p>
                  <p className="text-sm text-gray-500">In progress</p>
                </div>
                <Badge variant="secondary">Pending</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Metrics Card */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Quiz Scores</span>
                  <span className="text-sm font-medium">85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Practice Exercises</span>
                  <span className="text-sm font-medium">92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Achievements Section */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Your Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="w-16 h-16 mx-auto bg-yellow-100 rounded-full flex items-center justify-center mb-2">
                <span className="text-2xl">🏆</span>
              </div>
              <p className="font-medium">Fast Learner</p>
              <p className="text-sm text-gray-500">Complete 5 lessons in a day</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-2">
                <span className="text-2xl">⭐</span>
              </div>
              <p className="font-medium">Perfect Score</p>
              <p className="text-sm text-gray-500">Score 100% on a quiz</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-2">
                <span className="text-2xl">🔥</span>
              </div>
              <p className="font-medium">Streak Master</p>
              <p className="text-sm text-gray-500">7-day learning streak</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-2">
                <span className="text-2xl">🎯</span>
              </div>
              <p className="font-medium">Course Expert</p>
              <p className="text-sm text-gray-500">Complete all courses</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 