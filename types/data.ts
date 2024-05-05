interface Step {
  date: string;
  steps_count: number;
}

interface Minute {
  date: string;
  min_count: number;
}

interface CalBurned {
  date: string;
  cal_count: number;
}

interface SleepTime {
  date: string;
  sleep_count: number;
}

interface StressLevel {
  date: string;
  stress_count: number;
}

interface WaterIntake {
  date: string;
  water_count: number;
}

interface Period {
  date: string;
  perioid_count: number;
}

interface WeightTrack {
  date: string;
  weight_count: number;
}

interface Medication {
  date: string;
  medication_count: number;
}

interface Reminder {
  date: string;
  reminder_count: number;
}

// export interface Achievement {
//   step_champ?: boolean;
//   progress_champ?: boolean;
//   streak_star?: boolean;
//   health_foodie?: boolean;
//   calorie_crusher?: boolean;
//   sleep_sensei?: boolean;
//   workout_warrior?: boolean;
// }

export interface Achievement {
  [key: string]: boolean | undefined;
}

export type MealType = "Breakfast" | "Lunch" | "Dinner";

export interface Meal {
  meal_image_url?: string;
  meal_name?: string;
  meal_notes?: string;
  date?: string;
  meal_type?: MealType;
}

export interface SequenceType {
  image_url: string;
  name: string;
  duration: number;
  targets: string[];
}

export interface Exercise {
  name: string;
  duration: number;
  difficulty: string;
  equipment: string;
  category: string;
  image_url: string;
  sequence: SequenceType[];
}

export interface User {
  username?: string;
  age?: string;
  email?: string;
  gender?: string;
  dob?: string;
  location?: string;
  weight?: string;
  height?: string;
  goals?: string[];
  daily_walk?: string;
  fitness_level?: string;
  challenges?: string[];
  target_zones?: string[];
  stick?: string[];
  steps?: Step[];
  minutes?: Minute[];
  cal_burned?: CalBurned[];
  sleep_time?: SleepTime[];
  stress_level?: StressLevel[];
  water_intake?: WaterIntake[];
  period?: number;
  weight_track?: WeightTrack[];
  medication?: string;
  reminder?: string;
  fitness_streak?: Array<string>;
  points?: number;
  achievements?: Achievement;
  file_expo_image?: string;
  progress?: number;
  done_workouts?: Array<string>;
  meal?: Meal[];
  kettle_points?: number;
  light_purple_count?: number;
  purple_count?: number;
  dark_purple_count?: number;
}

export interface Globals {
  isLoggedIn?: boolean;
  dark_mode?: boolean;
  notification?: boolean;
  show_percentage?: boolean;
  show_steps?: boolean;
  show_minutes?: boolean;
  show_calories?: boolean;
  show_sleep?: boolean;
  show_stress?: boolean;
  show_water?: boolean;
  show_period?: boolean;
  show_weight?: boolean;
  show_medication?: boolean;
  show_reminder?: boolean;
  show_fitness_streak?: boolean;
}

interface Data {
  user: User;
  exercises: Exercise[];
  globals: Globals;
}
