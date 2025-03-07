import codecMap from '@/libs/codecs'
import transform from './libs/transform'
import type { IFFMpegOptionsForm } from '../../types'

function transformToJSON(formData: IFFMpegOptionsForm) {
  const { format, video, audio, filters } = formData

  const json = {
    format: {
      container: format.container,
      clip: format.clip,
      startTime: format.startTime,
      stopTime: format.stopTime,
    },
    video: {
      codec: Object(codecMap)[video.codec],
      preset: video.preset,
      pass: video.pass,
      crf: video.crf,
      bitrate: video.bitrate,
      minrate: video.minrate,
      maxrate: video.maxrate,
      bufsize: video.bufsize,
      gopsize: video.gopsize,
      pixel_format: video.pixel_format,
      frame_rate: video.frame_rate,
      speed: video.speed,
      tune: video.tune,
      profile: video.profile,
      level: video.level,
      faststart: video.faststart,
      size: video.size,
      width: video.width,
      height: video.height,
      format: video.format,
      aspect: video.aspect,
      scaling: video.scaling,
      codec_options: video.codec_options,
    },
    audio: {
      codec: Object(codecMap)[audio.codec],
      channel: audio.channel,
      quality: audio.quality,
      bitrate: audio.bitrate,
      sampleRate: audio.sampleRate,
      volume: audio.volume.toString(),
    },
    filter: {
      deband: filters.deband,
      deshake: filters.deshake,
      deflicker: filters.deflicker,
      dejudder: filters.dejudder,
      denoise: filters.denoise,
      deinterlace: filters.deinterlace,
      brightness: (parseInt(filters.brightness, 10) / 100).toString(),
      contrast: (parseInt(filters.contrast, 10) / 100 + 1).toString(),
      saturation: filters.saturation.toString(),
      gamma: (parseInt(filters.gamma, 10) / 10).toString(),
      acontrast: filters.acontrast.toString(),
    },
  }
  return json
}

function transformFromQueryParams(form: IFFMpegOptionsForm, query: { [key: string]: string }) {
  form.format.container = query['format.container'] || form.format.container
  form.format.clip = query['format.clip'] === 'true' || form.format.clip
  form.format.startTime = query['format.startTime'] || form.format.startTime
  form.format.stopTime = query['format.stopTime'] || form.format.stopTime

  form.video.codec = query['video.codec'] || form.video.codec
  form.video.preset = query['video.preset'] || form.video.preset
  form.video.pass = query['video.pass'] || form.video.pass
  form.video.crf = query['video.crf'] || form.video.crf
  form.video.bitrate = query['video.bitrate'] || form.video.bitrate
  form.video.minrate = query['video.bitrate'] || form.video.minrate
  form.video.maxrate = query['video.maxrate'] || form.video.maxrate
  form.video.bufsize = query['video.bufsize'] || form.video.bufsize
  form.video.gopsize = query['video.gopsize'] || form.video.gopsize
  form.video.pixel_format = query['video.pixel_format'] || form.video.pixel_format
  form.video.frame_rate = query['video.frame_rate'] || form.video.frame_rate
  form.video.speed = query['video.speed'] || form.video.speed
  form.video.tune = query['video.tune'] || form.video.tune
  form.video.profile = query['video.profile'] || form.video.profile
  form.video.level = query['video.level'] || form.video.level
  form.video.faststart = query['video.faststart'] === 'true' || form.video.faststart
  form.video.size = query['video.size'] || form.video.size
  form.video.width = query['video.width'] || form.video.width
  form.video.height = query['video.height'] || form.video.height
  form.video.format = query['video.format'] || form.video.format
  form.video.aspect = query['video.aspect'] || form.video.aspect
  form.video.scaling = query['video.scaling'] || form.video.scaling
  form.video.codec_options = query['video.codec_options']
    ? atob(query['video.codec_options'])
    : form.video.codec_options

  form.audio.codec = query['audio.codec'] || form.audio.codec
  form.audio.channel = query['audio.channel'] || form.audio.channel
  form.audio.quality = query['audio.quality'] || form.audio.quality
  form.audio.sampleRate = query['audio.sample_rate'] || form.audio.sampleRate
  form.audio.volume = query['audio.volume'] || form.audio.volume

  form.filters.deband = query['filters.deband'] === 'true' || form.filters.deband
  form.filters.deflicker = query['filters.deflicker'] === 'true' || form.filters.deflicker
  form.filters.deshake = query['filters.deshake'] === 'true' || form.filters.deshake
  form.filters.dejudder = query['filters.dejudder'] === 'true' || form.filters.dejudder
  form.filters.denoise = query['filters.denoise'] || form.filters.denoise
  form.filters.deinterlace = query['filters.deinterlace'] || form.filters.deinterlace
  form.filters.contrast = query['filters.contrast'] || form.filters.contrast
  form.filters.brightness = query['filters.brightness'] || form.filters.brightness
  form.filters.saturation = query['filters.saturation'] || form.filters.saturation
  form.filters.gamma = query['filters.gamma'] || form.filters.gamma
  form.filters.acontrast = query['filters.acontrast'] || form.filters.acontrast

  return form
}

function transformToQueryParams(form: IFFMpegOptionsForm) {
  const { format, video, audio, filters } = form
  const params = {
    ...(format.container !== 'mp4' && { 'format.container': format.container }),
    ...(format.clip && { 'format.clip': format.clip.toString() }),
    ...(format.startTime && { 'format.startTime': format.startTime }),
    ...(format.stopTime && { 'format.stopTime': format.stopTime }),

    ...(video.codec !== 'x264' && { 'video.codec': video.codec }),
    ...(video.preset !== 'none' && { 'video.preset': video.preset }),
    ...(video.pass !== '1' && { 'video.pass': video.pass }),
    ...(video.crf !== '0' && video.pass === 'crf' && { 'video.crf': video.crf }),
    ...(video.bitrate && { 'video.bitrate': video.bitrate }),
    ...(video.minrate && { 'video.minrate': video.minrate }),
    ...(video.maxrate && { 'video.maxrate': video.maxrate }),
    ...(video.bufsize && { 'video.bufsize': video.bufsize }),
    ...(video.gopsize && { 'video.gopsize': video.gopsize }),
    ...(video.pixel_format !== 'auto' && { 'video.pixel_format': video.pixel_format }),
    ...(video.frame_rate !== 'auto' && { 'video.frame_rate': video.frame_rate }),
    ...(video.speed !== 'auto' && { 'video.speed': video.speed }),
    ...(video.tune !== 'none' && { 'video.tune': video.tune }),
    ...(video.profile !== 'none' && { 'video.profile': video.profile }),
    ...(video.level !== 'none' && { 'video.level': video.level }),
    ...(video.faststart && { 'video.faststart': video.faststart.toString() }),
    ...(video.size !== 'source' && { 'video.size': video.size }),
    ...(video.width !== '0' && video.size === 'custom' && { 'video.width': video.width }),
    ...(video.height !== '0' && video.size === 'custom' && { 'video.height': video.height }),
    ...(video.format !== 'widescreen' && { 'video.format': video.format }),
    ...(video.aspect !== 'auto' && { 'video.aspect': video.aspect }),
    ...(video.scaling !== 'auto' && { 'video.scaling': video.scaling }),
    ...(video.codec_options && { 'video.codec_options': btoa(video.codec_options) }),

    ...(audio.codec !== 'copy' && { 'audio.codec': audio.codec }),
    ...(audio.channel !== 'source' && { 'audio.channel': audio.channel }),
    ...(audio.quality !== 'auto' && { 'audio.quality': audio.quality }),
    ...(audio.sampleRate !== 'auto' && { 'audio.sample_rate': audio.sampleRate }),
    ...(parseInt(audio.volume, 10) !== 100 && { 'audio.volume': audio.volume }),

    ...(filters.deband && { 'filters.deband': filters.deband.toString() }),
    ...(filters.deflicker && { 'filters.deflicker': filters.deflicker.toString() }),
    ...(filters.deshake && { 'filters.deshake': filters.deshake.toString() }),
    ...(filters.dejudder && { 'filters.dejudder': filters.dejudder.toString() }),
    ...(filters.denoise !== 'none' && { 'filters.denoise': filters.denoise }),
    ...(filters.deinterlace !== 'none' && { 'filters.deinterlace': filters.deinterlace }),
    ...(parseInt(filters.contrast, 10) !== 0 && { 'filters.contrast': filters.contrast }),
    ...(parseInt(filters.brightness, 10) !== 0 && { 'filters.brightness': filters.brightness }),
    ...(parseInt(filters.saturation, 10) !== 0 && { 'filters.saturation': filters.saturation }),
    ...(parseInt(filters.gamma, 10) !== 0 && { 'filters.gamma': filters.gamma }),
    ...(parseInt(filters.acontrast, 10) !== 33 && { 'filters.acontrast': filters.acontrast }),
  }
  return params
}

function extname(filename: string) {
  const i = filename.lastIndexOf('.')
  return i < 0 ? '' : filename.substr(i)
}

export default {
  transform,
  transformToJSON,
  transformFromQueryParams,
  transformToQueryParams,
  extname,
}
