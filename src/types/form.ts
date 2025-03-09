import type {
  AspectValues,
  AudioChannelValues,
  AudioQualityValues,
  AudioSampleRateValues,
  CodeAudioValues,
  CodecSpeedValues,
  CodecVideoValues,
  ContainerValues,
  FilterDeinterlaceValues,
  FilterDenoiseValues,
  FormatValues,
  FrameRateValues,
  LevelValues,
  OptionsExtraValues,
  OptionsLogLevelValues,
  PassValues,
  PixelFormatValues,
  PresetValues,
  ProfileValues,
  ScalingValues,
  SizeValues,
  TuneValues,
} from './values'

export interface VideoBitrateItems {
  bitrate: number | null
  minrate: number | null
  maxrate: number | null
  bufsize: number | null
  gopsize: number | null
}

export interface VideoEditItems {
  pixel_format: PixelFormatValues
  frame_rate: FrameRateValues
  speed: CodecSpeedValues
  tune: TuneValues
  profile: ProfileValues
  level: LevelValues
}

export interface VideoScalingItems {
  faststart: boolean
  size: SizeValues
  format: FormatValues
  aspect: AspectValues
  scaling: ScalingValues
}

export interface VideoForm extends VideoEditItems, VideoBitrateItems, VideoScalingItems {
  codec: CodecVideoValues
  preset: PresetValues
  pass: PassValues
  crf: number
  width: string
  height: string
  codec_options: string
}

export interface AudioForm {
  codec: CodeAudioValues
  channel: AudioChannelValues
  quality: AudioQualityValues
  sampleRate: AudioSampleRateValues
  volume: number
  bitrate?: number
}

export interface Form {
  io: {
    input: string
    output: string
  }
  format: {
    container: ContainerValues
    clip: boolean
    startTime: string | null
    stopTime: string | null
  }
  video: VideoForm
  audio: AudioForm
  filters: {
    deband: boolean
    deshake: boolean
    deflicker: boolean
    dejudder: boolean
    denoise: FilterDenoiseValues
    deinterlace: FilterDeinterlaceValues
    brightness: number
    contrast: number
    saturation: number
    gamma: number
    acontrast: number
  }
  options: {
    extra: OptionsExtraValues[]
    loglevel: OptionsLogLevelValues
  }
}
