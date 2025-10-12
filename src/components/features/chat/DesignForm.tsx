"use client";

import { Button } from "@/components/ui/button";
import {
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface DesignFormProps {
  handleGenerateVision: (preferences: DesignPreferences) => void;
  loading: boolean;
  setIsSaved: (value: boolean) => void;
}

interface DesignPreferences {
  colorPalette: string;
  artStyle: string;
  mood: string;
  complexity: string;
  textInclusion: string;
}

const formItems = [
  {
    key: "colorPalette" as keyof DesignPreferences,
    title: "Color Palette",
    items: ["warm", "cool", "vibrant", "muted", "pastel"],
  },
  {
    key: "artStyle" as keyof DesignPreferences,
    title: "Art Style",
    items: [
      "minimalist",
      "abstract",
      "realistic",
      "collage",
      "watercolor",
      "digital art",
    ],
  },
  {
    key: "mood" as keyof DesignPreferences,
    title: "Mood/Atmosphere",
    items: ["calm", "energetic", "dreamy", "professional", "playful"],
  },
  {
    key: "complexity" as keyof DesignPreferences,
    title: "Complexity",
    items: ["simple", "moderate", "detailed"],
  },
  {
    key: "textInclusion" as keyof DesignPreferences,
    title: "Text Inclusion",
    items: ["yes", "no"],
  },
];

export const DesignForm = ({
  handleGenerateVision,
  loading,
  setIsSaved,
}: DesignFormProps) => {
  const [designPreferences, setDesignPreferences] = useState<DesignPreferences>(
    {
      colorPalette: formItems[0].items[0],
      artStyle: formItems[1].items[0],
      mood: formItems[2].items[0],
      complexity: formItems[3].items[0],
      textInclusion: formItems[4].items[0],
    }
  );

  const handleRadioChange = (key: keyof DesignPreferences, value: string) => {
    setDesignPreferences((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleGenerateVision(designPreferences);
    setIsSaved(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <DialogHeader>
        <DialogTitle>Let's Decide Design</DialogTitle>
      </DialogHeader>

      <div className="space-y-6 my-4">
        {formItems.map((item) => (
          <div key={item.key} className="space-y-3">
            <h3 className="font-medium text-sm">{item.title}</h3>
            <RadioGroup
              value={designPreferences[item.key]}
              onValueChange={(value) => handleRadioChange(item.key, value)}
            >
              {item.items.map((option, index) => (
                <div
                  key={`${item.key}-${index}`}
                  className="flex items-center gap-3"
                >
                  <RadioGroupItem value={option} id={`${item.key}-${index}`} />
                  <Label htmlFor={`${item.key}-${index}`}>{option}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        ))}
      </div>

      <DialogFooter>
        <Button type="submit" disabled={loading}>
          {loading ? "Generating..." : "Generate"}
        </Button>
      </DialogFooter>
    </form>
  );
};
