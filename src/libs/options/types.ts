import type {
  AspectValues,
  CodecSpeedValues,
  CodecValues,
  ContainerAudioValues,
  ContainerVideoValues,
  FormatValues,
  FrameRateValues,
  LevelValues,
  PassValues,
  PixelFormatValues,
  PresetValues,
  ProfileValues,
  ScalingValues,
  SizeValues,
  TuneValues,
} from '@/types/values'

export interface NameValueItem<T> {
  name: string
  value: T
}

export interface CodecItem extends NameValueItem<CodecValues> {
  supported: string[] | null
}

export interface Codec {
  [key: string]: CodecItem[]
}

export interface PresetsItem extends NameValueItem<PresetValues> {
  supported?: string[]
}

export interface Options {
  protocols: NameValueItem<string>[]
  containers: Containers
  clip: NameValueItem<boolean>[]
  codecs: Codec
  presets: PresetsItem[]
  passOptions: NameValueItem<PassValues>[]
  pixelFormats: NameValueItem<PixelFormatValues>[]
  frameRates: NameValueItem<FrameRateValues>[]
  speeds: NameValueItem<CodecSpeedValues>[]
  tunes: NameValueItem<TuneValues>[]
  profiles: NameValueItem<ProfileValues>[]
  levels: NameValueItem<LevelValues>[]
  fastStart: NameValueItem<boolean>[]
  sizes: NameValueItem<SizeValues>[]
  formats: NameValueItem<FormatValues>[]
  aspects: NameValueItem<AspectValues>[]
  scalings: NameValueItem<ScalingValues>[]
  audioStreams: NameValueItem<string>[]
  audioChannels: NameValueItem<string>[]
  audioQualities: NameValueItem<string>[]
  sampleRates: NameValueItem<string>[]
  deband: NameValueItem<boolean>[]
  deshake: NameValueItem<boolean>[]
  deflicker: NameValueItem<boolean>[]
  dejudder: NameValueItem<boolean>[]
  denoise: NameValueItem<string>[]
  deinterlace: NameValueItem<string>[]
  extraOptions: { text: string; value: string }[]
  logLevels: NameValueItem<string>[]
}

export interface Containers {
  video: NameValueItem<ContainerVideoValues>[]
  audio: NameValueItem<ContainerAudioValues>[]
}
