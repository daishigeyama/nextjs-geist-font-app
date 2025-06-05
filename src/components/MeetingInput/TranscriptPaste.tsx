"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Upload } from "lucide-react"
import { toast } from "sonner"

export default function TranscriptPaste() {
  const [transcript, setTranscript] = useState("")
  const [error, setError] = useState<string | null>(null)

  const handleTranscriptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value
    setTranscript(text)

    // Clear error if text is valid
    if (text.length >= 50) {
      setError(null)
    }
  }

  const handleSubmit = async () => {
    // Validate minimum length
    if (transcript.length < 50) {
      setError("Please enter at least 50 characters for a meaningful summary.")
      return
    }

    try {
      // Here you would typically send the transcript to your server
      // for AI processing and summarization
      toast.success("Transcript submitted successfully!")
    } catch (err) {
      toast.error("Failed to process transcript. Please try again.")
      console.error("Error processing transcript:", err)
    }
  }

  return (
    <div className="grid gap-6">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card className="p-6">
        <div className="grid gap-4">
          <Textarea
            placeholder="Paste your meeting transcript here..."
            className="min-h-[300px] resize-none"
            value={transcript}
            onChange={handleTranscriptChange}
          />
          
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {transcript.length} characters
              {transcript.length < 50 && " (minimum 50)"}
            </p>
            
            <Button 
              onClick={handleSubmit}
              disabled={transcript.length < 50}
            >
              <Upload className="mr-2 h-4 w-4" />
              Process Transcript
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
