import type { UtilOptions } from '@/types'
import codecMap from '@/libs/codecs'
import type { IFFmpegOptions } from '@/libs/ffmpeg'

interface TransformResult extends IFFmpegOptions {
  input: string
  output: string
  container: string
  clip: string
  startTime: string
  stopTime: string
  vcodec: string
  preset: string
  pass: string
  crf: string
  bitrate: string
  minrate: string
  maxrate: string
  bufsize: string
  gopsize: string
  pixelFormat: string
  frameRate: string
  speed: string
  tune: string
  profile: string
  level: string
  faststart: string
  size: string
  width: string
  height: string
  format: string
  aspect: string
  scaling: string
  codecOptions: string
  acodec: string
  channel: string
  quality: string
  audioBitrate: string
  sampleRate: string
  volume: string
  deband: string
  deshake: string
  deflicker: string
  dejudder: string
  denoise: string
  deinterlace: string
  brightness: string
  contrast: string
  saturation: string
  gamma: string
  acontrast: string
  extra: string
  loglevel: string
}

// Transforms the form options to ffmpeg build options.
export default function transform(formData: UtilOptions): TransformResult {
  const { io, format, video, audio, filters, options } = formData

  return {
    input: io.input,
    output: io.output,

    // Format.
    container: format.container ?? '',
    clip: format.clip ? 'true' : '',
    startTime: format.startTime,
    stopTime: format.stopTime,

    // Video.
    vcodec: Object(codecMap)[video.codec],
    preset: video.preset,
    pass: video.pass,
    crf: video.crf,
    bitrate: video.bitrate,
    minrate: video.minrate,
    maxrate: video.maxrate,
    bufsize: video.bufsize,
    gopsize: video.gopsize,
    pixelFormat: video.pixel_format,
    frameRate: video.frame_rate,
    speed: video.speed,
    tune: video.tune,
    profile: video.profile,
    level: video.level,
    faststart: video.faststart ? 'true' : '',
    size: video.size,
    width: video.width,
    height: video.height,
    format: video.format,
    aspect: video.aspect,
    scaling: video.scaling,
    codecOptions: video.codec_options,

    // Audio.
    acodec: Object(codecMap)[audio.codec],
    channel: audio.channel,
    quality: audio.quality,
    audioBitrate: audio.bitrate,
    sampleRate: audio.sampleRate,
    volume: audio.volume,

    // Filters.
    deband: filters.deband ? 'true' : '',
    deshake: filters.deshake ? 'true' : '',
    deflicker: filters.deflicker ? 'true' : '',
    dejudder: filters.dejudder ? 'true' : '',
    denoise: filters.denoise,
    deinterlace: filters.deinterlace,
    brightness: filters.brightness,
    contrast: filters.contrast,
    saturation: filters.saturation,
    gamma: filters.gamma,
    acontrast: filters.acontrast,

    // Options.
    extra: options.extra,
    loglevel: options.loglevel,
  }
}
