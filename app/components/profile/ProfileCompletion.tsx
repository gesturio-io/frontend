'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon, User } from 'lucide-react';
import { authService } from '@/lib/api';
import { toast } from 'sonner';
import Image from 'next/image';
import { images } from '@/app/Images/images';

interface ProfileFormData {
  firstname: string;
  lastname: string;
  bio: string;
  country: string;
  native_language: string;
  gender: string;
  date_of_birth: string | null;
  phone_number: string;
  daily_goal: number;
  profile_picture: string;
  requirement: string;
}

interface ProfileCompletionProps {
  onProfileComplete: () => void;
}

// Add languages list after the countries array
const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ru', name: 'Russian' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ar', name: 'Arabic' },
  { code: 'hi', name: 'Hindi' },
  { code: 'bn', name: 'Bengali' },
  { code: 'ur', name: 'Urdu' },
  { code: 'tr', name: 'Turkish' },
  { code: 'nl', name: 'Dutch' },
  { code: 'pl', name: 'Polish' },
  { code: 'vi', name: 'Vietnamese' },
  { code: 'th', name: 'Thai' },
  { code: 'sw', name: 'Swahili' },
].sort((a, b) => a.name.localeCompare(b.name));

export function ProfileCompletion({ onProfileComplete }: ProfileCompletionProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ProfileFormData>({
    firstname: '',
    lastname: '',
    bio: '',
    country: '',
    native_language: '',
    gender: '',
    date_of_birth: null,
    phone_number: '',
    daily_goal: 15,
    profile_picture: '',
    requirement: '',
  });

  const calculateProgress = () => {
    const totalFields = Object.keys(formData).length;
    const filledFields = Object.values(formData).filter(value => value !== '' && value !== null).length;
    return (filledFields / totalFields) * 100;
  };

  const handleInputChange = (field: keyof ProfileFormData, value: string | number | null) => {
    if (field === 'date_of_birth' && value) {
      // Format the date as YYYY-MM-DD
      const formattedDate = value.toString().split('T')[0];
      setFormData(prev => ({
        ...prev,
        [field]: formattedDate
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      await authService.updateProfile(formData);
      toast.success("Profile updated successfully");
      onProfileComplete();
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error("Failed to update profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 w-full min-h-screen bg-background">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-2xl space-y-8">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Image
                src={images.mainLogo}
                alt="Gesturio Logo"
                width={48}
                height={48}
                className="rounded-full"
              />
              <span className="text-2xl font-bold">Gesturio</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Complete Your Profile</h1>
          </div>

          <div className="bg-card rounded-lg shadow-lg p-6">
            {/* Progress bar */}
            <div className="mb-8">
              <Progress value={(currentStep / 3) * 100} className="h-2" />
            </div>

            {/* Step title */}
            <h2 className="text-2xl font-semibold mb-6">
              {currentStep === 1 ? 'Basic Information' : currentStep === 2 ? 'Language & Location' : 'Goals & Bio'}
            </h2>

            <form onSubmit={(e) => {
              e.preventDefault();
              if (currentStep === 3) {
                handleSubmit();
              } else {
                handleNextStep();
              }
            }} className="space-y-6">
              {currentStep === 1 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Basic Information</h3>
                  <div className="space-y-2">
                    <Label htmlFor="profile_photo">Profile Photo URL</Label>
                    <Input
                      id="profile_photo"
                      placeholder="Enter URL for your profile photo"
                      value={formData.profile_picture}
                      onChange={(e) => handleInputChange('profile_picture', e.target.value)}
                    />
                    {formData.profile_picture && (
                      <div className="mt-2">
                        <img 
                          src={formData.profile_picture} 
                          alt="Profile Preview" 
                          className="w-20 h-20 rounded-full object-cover border-2 border-primary"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/default-avatar.png';
                            toast.error('Failed to load image. Please check the URL.');
                          }}
                        />
                      </div>
                    )}
                  </div>
                  <Input
                    placeholder="First Name"
                    value={formData.firstname}
                    onChange={(e) => handleInputChange('firstname', e.target.value)}
                  />
                  <Input
                    placeholder="Last Name"
                    value={formData.lastname}
                    onChange={(e) => handleInputChange('lastname', e.target.value)}
                  />
                  <Input
                    placeholder="Phone Number"
                    value={formData.phone_number}
                    onChange={(e) => handleInputChange('phone_number', e.target.value)}
                  />
                  <Input
                    type="date"
                    placeholder="Date of Birth"
                    value={formData.date_of_birth || ''}
                    onChange={(e) => handleInputChange('date_of_birth', e.target.value)}
                  />
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Language & Location</h3>
                  <Select onValueChange={(value) => handleInputChange('country', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="au">Australia</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select onValueChange={(value) => handleInputChange('native_language', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Native Language" />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((language) => (
                        <SelectItem key={language.code} value={language.code}>
                          {language.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select onValueChange={(value) => handleInputChange('gender', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                      <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Goals & Bio</h3>
                  <Select 
                    onValueChange={(value) => handleInputChange('requirement', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Why are you learning sign language?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Other">Other</SelectItem>
                      <SelectItem value="Just for Fun">Just for Fun</SelectItem>
                      <SelectItem value="Friends">Friends</SelectItem>
                      <SelectItem value="Family">Family</SelectItem>
                      <SelectItem value="Work">Work</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select 
                    onValueChange={(value) => handleInputChange('daily_goal', parseInt(value))}
                    defaultValue="15"
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Daily Learning Goal (minutes)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="45">45 minutes</SelectItem>
                      <SelectItem value="60">60 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                  <textarea
                    className="w-full p-2 border rounded-md"
                    placeholder="Tell us about yourself..."
                    value={formData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    rows={4}
                  />
                </div>
              )}

              <div className="flex justify-end space-x-4 pt-4">
                {currentStep > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePrevStep}
                  >
                    Previous
                  </Button>
                )}
                <Button type="submit">
                  {currentStep === 3 ? 'Complete' : 'Next'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 