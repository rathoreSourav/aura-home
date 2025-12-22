export const quickScenes = [
  { id: "away", label: "Away", active: false },
  { id: "home", label: "Home", active: true },
  { id: "morning", label: "Morning", active: false },
  { id: "night", label: "Night", active: false },
];

export const rooms = [
  { id: "living", name: "Living Room", active: 3, total: 8, icon: "sofa", gradient: ["#FFA647", "#FF7A00"] },
  { id: "bedroom", name: "Bedroom", active: 1, total: 5, icon: "bed", gradient: ["#8A7CFF", "#638BFF"] },
  { id: "kitchen", name: "Kitchen", active: 2, total: 6, icon: "utensils", gradient: ["#2FC7A3", "#0FB8B2"] },
  { id: "bath", name: "Bathroom", active: 0, total: 3, icon: "bathtub", gradient: ["#52C0FF", "#2696FF"] },
];

export const devices = [
  {
    id: "light-1",
    name: "Living Room Light",
    room: "Living Room",
    status: "80%",
    type: "light",
    active: true,
    tint: ["#FFE3D2", "#FFD7BF"],
  },
  {
    id: "thermostat-1",
    name: "Thermostat",
    room: "Living Room",
    status: "72°F",
    type: "thermostat",
    active: true,
    tint: ["#FFE3D2", "#FFD7BF"],
  },
  {
    id: "camera-1",
    name: "Front Door Camera",
    room: "Entrance",
    status: "Recording",
    type: "camera",
    active: true,
    tint: ["#FFE3D2", "#FFD7BF"],
  },
  {
    id: "lock-1",
    name: "Smart Lock",
    room: "Entrance",
    status: "Locked",
    type: "lock",
    active: true,
    tint: ["#FFE3D2", "#FFD7BF"],
  },
  {
    id: "light-2",
    name: "Bedroom Light",
    room: "Bedroom",
    status: "Off",
    type: "light",
    active: false,
    tint: ["#FFFFFF", "#F5F5F5"],
  },
  {
    id: "speaker-1",
    name: "HomePod",
    room: "Living Room",
    status: "Playing",
    type: "speaker",
    active: true,
    tint: ["#FFE3D2", "#FFD7BF"],
  },
];

export const automations = [
  {
    id: "movie-night",
    name: "Movie Night",
    mode: "Manual",
    actions: 3,
    gradient: ["#FF4D79", "#FF2A6A"],
  },
  {
    id: "focus-time",
    name: "Focus Time",
    mode: "Manual",
    actions: 3,
    gradient: ["#F0F0F0", "#E8E8E8"],
  },
  {
    id: "morning-start",
    name: "Morning Start",
    mode: "Scheduled",
    actions: 4,
    gradient: ["#FFB547", "#FF912F"],
  },
];
