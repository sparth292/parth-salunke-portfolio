"use client";

import Image from "next/image";
import { getSkillLogoUrl, type Skill } from "@/data/skills";

interface SkillLogoProps {
  skill: Skill;
  size?: number;
  className?: string;
  priority?: boolean;
}

export default function SkillLogo({
  skill,
  size = 32,
  className = "",
  priority = false,
}: SkillLogoProps) {
  return (
    <Image
      src={getSkillLogoUrl(skill)}
      alt={`${skill.name} logo`}
      width={size}
      height={size}
      className={`object-contain ${className}`}
      unoptimized
      priority={priority}
    />
  );
}
