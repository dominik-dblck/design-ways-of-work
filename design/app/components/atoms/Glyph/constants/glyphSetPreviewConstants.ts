/**
 * - `PREVIEW_GLYPHS` · the preview's: a device, the phone's status bar, scheme
 */
import {
  BatteryFullIcon,
  CameraIcon,
  FingerprintPatternIcon,
  FlashlightIcon,
  MonitorIcon,
  MoonIcon,
  SignalIcon,
  SmartphoneIcon,
  SunIcon,
  SunMoonIcon,
  WifiIcon,
  type LucideIcon,
} from 'lucide-react';

/** The glyphs the preview's draws · `GLYPHS` joins them with the other two sets. */
export const PREVIEW_GLYPHS = {
  moon: MoonIcon,
  smartphone: SmartphoneIcon,
  monitor: MonitorIcon,
  sun: SunIcon,
  sunMoon: SunMoonIcon,
  batteryFull: BatteryFullIcon,
  camera: CameraIcon,
  fingerprint: FingerprintPatternIcon,
  flashlight: FlashlightIcon,
  signal: SignalIcon,
  wifi: WifiIcon,
} as const satisfies Record<string, LucideIcon>;
