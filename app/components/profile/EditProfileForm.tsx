'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/lib/contexts/UserContext";
import { toast } from "sonner";

// List of countries
const countries = [
  { code: 'US', name: 'United States' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'CA', name: 'Canada' },
  { code: 'AU', name: 'Australia' },
  { code: 'IN', name: 'India' },
  { code: 'DE', name: 'Germany' },
  { code: 'FR', name: 'France' },
  { code: 'IT', name: 'Italy' },
  { code: 'ES', name: 'Spain' },
  { code: 'BR', name: 'Brazil' },
  { code: 'MX', name: 'Mexico' },
  { code: 'JP', name: 'Japan' },
  { code: 'CN', name: 'China' },
  { code: 'KR', name: 'South Korea' },
  { code: 'RU', name: 'Russia' },
  { code: 'ZA', name: 'South Africa' },
  { code: 'NG', name: 'Nigeria' },
  { code: 'EG', name: 'Egypt' },
  { code: 'SA', name: 'Saudi Arabia' },
  { code: 'AE', name: 'United Arab Emirates' },
].sort((a, b) => a.name.localeCompare(b.name));

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

interface UserProfile {
  firstname: string;
  lastname: string;
  profile_picture: string;
  bio: string;
  country: string;
  gender: string;
  date_of_birth: string;
  phone_number: string;
  daily_goal: number;
  email: string;
  joined_at: string;
  native_language: string;
  requirement: string;
}

interface EditProfileFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EditProfileForm({ isOpen, onClose }: EditProfileFormProps) {
  const { userProfile, refreshUserProfile } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    bio: '',
    country: '',
    profile_picture: '',
    gender: '',
    daily_goal: 15,
    phone_number: '',
    native_language: '',
    date_of_birth: '',
    requirement: '',
  });
  const [previewUrl, setPreviewUrl] = useState('');

  // Update form data when userProfile changes or form opens
  useEffect(() => {
    if (userProfile && isOpen) {
      setFormData({
        firstname: userProfile.firstname || '',
        lastname: userProfile.lastname || '',
        bio: userProfile.bio || '',
        country: userProfile.country || '',
        profile_picture: userProfile.profile_picture || '',
        gender: userProfile.gender || '',
        daily_goal: userProfile.daily_goal || 15,
        phone_number: userProfile.phone_number || '',
        native_language: userProfile.native_language || '',
        date_of_birth: userProfile.date_of_birth || '',
        requirement: userProfile.requirement || '',
      });
      setPreviewUrl(userProfile.profile_picture || '');
      setErrors({}); // Clear errors when form opens
    }
  }, [userProfile, isOpen]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Required fields validation
    if (!formData.firstname.trim()) {
      newErrors.firstname = 'First name is required';
    }
    if (!formData.lastname.trim()) {
      newErrors.lastname = 'Last name is required';
    }
    if (!formData.country) {
      newErrors.country = 'Country is required';
    }
    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }
    if (!formData.date_of_birth) {
      newErrors.date_of_birth = 'Date of birth is required';
    }
    if (!formData.native_language) {
      newErrors.native_language = 'Native language is required';
    }
    if (!formData.requirement) {
      newErrors.requirement = 'Please select why you are learning sign language';
    }

    // Profile picture URL validation
    if (formData.profile_picture) {
      try {
        new URL(formData.profile_picture);
      } catch {
        newErrors.profile_picture = 'Please enter a valid URL';
      }
    }

    // Date of birth validation
    if (formData.date_of_birth) {
      const dob = new Date(formData.date_of_birth);
      const today = new Date();
      if (dob > today) {
        newErrors.date_of_birth = 'Date of birth cannot be in the future';
      }
    }

    // Daily goal validation
    if (formData.daily_goal < 5 || formData.daily_goal > 120) {
      newErrors.daily_goal = 'Daily goal must be between 5 and 120 minutes';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleImageUrlChange = (url: string) => {
    handleInputChange('profile_picture', url);
    setPreviewUrl(url);
    // Clear error when user starts typing
    if (errors.profile_picture) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.profile_picture;
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'}/accounts/update/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          ...formData,
          email: userProfile?.email,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update profile');
      }

      await refreshUserProfile();
      toast.success('Profile updated successfully');
      onClose();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update profile';
      toast.error(errorMessage);
      console.error('Error updating profile:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Update your profile information. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              <div className="flex flex-col items-center gap-4">
                <Avatar className="h-32 w-32 border-4 border-primary/10">
                  <AvatarImage src={previewUrl} />
                  <AvatarFallback>
                    {formData.firstname[0]}{formData.lastname[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="w-full">
                  <Label htmlFor="profile_picture">Profile Picture URL</Label>
                  <Input
                    id="profile_picture"
                    placeholder="Enter image URL"
                    value={formData.profile_picture}
                    onChange={(e) => handleImageUrlChange(e.target.value)}
                    className={errors.profile_picture ? "border-red-500" : ""}
                  />
                  {errors.profile_picture && (
                    <p className="text-sm text-red-500 mt-1">{errors.profile_picture}</p>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="firstname">First Name</Label>
                  <Input
                    id="firstname"
                    value={formData.firstname}
                    onChange={(e) => handleInputChange('firstname', e.target.value)}
                    required
                    className={errors.firstname ? "border-red-500" : ""}
                  />
                  {errors.firstname && (
                    <p className="text-sm text-red-500 mt-1">{errors.firstname}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastname">Last Name</Label>
                  <Input
                    id="lastname"
                    value={formData.lastname}
                    onChange={(e) => handleInputChange('lastname', e.target.value)}
                    required
                    className={errors.lastname ? "border-red-500" : ""}
                  />
                  {errors.lastname && (
                    <p className="text-sm text-red-500 mt-1">{errors.lastname}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone_number">Phone Number</Label>
                  <Input
                    id="phone_number"
                    value={formData.phone_number}
                    readOnly
                    disabled
                    className="bg-muted"
                  />
                  <p className="text-sm text-muted-foreground">Phone number cannot be changed</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date_of_birth">Date of Birth</Label>
                  <Input
                    id="date_of_birth"
                    type="date"
                    value={formData.date_of_birth}
                    onChange={(e) => handleInputChange('date_of_birth', e.target.value)}
                    required
                    className={errors.date_of_birth ? "border-red-500" : ""}
                  />
                  {errors.date_of_birth && (
                    <p className="text-sm text-red-500 mt-1">{errors.date_of_birth}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Select
                    value={formData.country}
                    onValueChange={(value) => handleInputChange('country', value)}
                  >
                    <SelectTrigger id="country" className={`w-full ${errors.country ? "border-red-500" : ""}`}>
                      <SelectValue placeholder="Select your country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country.code} value={country.code}>
                          {country.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.country && (
                    <p className="text-sm text-red-500 mt-1">{errors.country}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="native_language">Native Language</Label>
                  <Select
                    value={formData.native_language}
                    onValueChange={(value) => handleInputChange('native_language', value)}
                  >
                    <SelectTrigger id="native_language" className={`w-full ${errors.native_language ? "border-red-500" : ""}`}>
                      <SelectValue placeholder="Select your native language" />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((language) => (
                        <SelectItem key={language.code} value={language.code}>
                          {language.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.native_language && (
                    <p className="text-sm text-red-500 mt-1">{errors.native_language}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) => handleInputChange('gender', value)}
                  >
                    <SelectTrigger id="gender" className={`w-full ${errors.gender ? "border-red-500" : ""}`}>
                      <SelectValue placeholder="Select your gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                      <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.gender && (
                    <p className="text-sm text-red-500 mt-1">{errors.gender}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requirement">Why are you learning sign language?</Label>
                  <Select
                    value={formData.requirement}
                    onValueChange={(value) => handleInputChange('requirement', value)}
                  >
                    <SelectTrigger id="requirement" className={`w-full ${errors.requirement ? "border-red-500" : ""}`}>
                      <SelectValue placeholder="Select your reason" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Other">Other</SelectItem>
                      <SelectItem value="Just for Fun">Just for Fun</SelectItem>
                      <SelectItem value="Friends">Friends</SelectItem>
                      <SelectItem value="Family">Family</SelectItem>
                      <SelectItem value="Work">Work</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.requirement && (
                    <p className="text-sm text-red-500 mt-1">{errors.requirement}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="daily_goal">Daily Goal (minutes)</Label>
                  <Input
                    id="daily_goal"
                    type="number"
                    min={5}
                    max={120}
                    value={formData.daily_goal}
                    onChange={(e) => handleInputChange('daily_goal', parseInt(e.target.value, 10) || 15)}
                    className={`w-full ${errors.daily_goal ? "border-red-500" : ""}`}
                  />
                  <p className="text-sm text-muted-foreground">Set your daily learning goal (5-120 minutes)</p>
                  {errors.daily_goal && (
                    <p className="text-sm text-red-500 mt-1">{errors.daily_goal}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  placeholder="Tell us about yourself"
                  className="resize-none"
                  rows={4}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 