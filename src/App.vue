<script setup lang="ts">
import { computed, ref } from 'vue'
import pkgInfo from '../package.json'
import useControlStore from './stores/control'
import QueueComponent from './components/QueueComponent.vue'

const commonStore = useControlStore()

const name = pkgInfo.name
const version = pkgInfo.version
const tabIndex = ref(0)

const wsReady = computed(() => {
  return commonStore.wsConnected
})

const isEncoding = computed(() => {
  return commonStore.isEncoding
})

const ffmpegdEnabled = computed(() => {
  return commonStore.ffmpegEnabled
})

const onEncode = () => {
  tabIndex.value++
}
</script>

<template>
  <div>
    <b-navbar type="dark" variant="dark">
      <div class="container">
        <b-navbar-nav>
          <b-nav-item href="#">
            <img src="/ffmpeg.svg" height="25" width="25" alt="FFmpeg Commander" />
            FFmpeg Commander
          </b-nav-item>
        </b-navbar-nav>
      </div>
    </b-navbar>

    <div id="app" class="container">
      <b-tabs align="right" content-class="mt-4" v-model="tabIndex">
        <b-tab title="Builder">
          <router-view @onEncode="onEncode" />
        </b-tab>
        <b-tab title="Queue" v-if="ffmpegdEnabled">
          <template #title> <b-spinner small v-if="isEncoding"></b-spinner> Queue </template>
          <QueueComponent />
        </b-tab>
        <b-tab v-if="ffmpegdEnabled" disabled>
          <template #title>
            <code v-if="wsReady"><span class="small">🟢</span> ffmpegd online</code>
            <code v-else><span class="small">🔴</span> ffmpegd offline</code>
          </template>
        </b-tab>
      </b-tabs>
    </div>

    <footer class="container mt-4 text-center">
      <hr />
      <div class="text-muted">
        <ul class="d-flex">
          <li>{{ name }}-{{ version }}</li>
          <li><a href="https://github.com/seunghaekim/ffmpeg-cmd-sh/issues">Report a Bug</a></li>
          <li><a href="https://ffmpeg.org/ffmpeg.html">FFmpeg Documentation</a></li>
          <li :style="{ 'margin-left': 'auto' }">
            Built from <a href="https://github.com/alfg/ffmpeg-commander">FFmpeg Commander</a> by
            <a href="https://github.com/alfg">alfg</a>
          </li>
        </ul>
      </div>
    </footer>
  </div>
</template>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 30px;
}

#app a.router-link-exact-active {
  color: #495057;
  background-color: #fff;
  border-color: #dee2e6 #dee2e6 #fff;
}

.label {
  text-transform: capitalize;
}

footer ul {
  display: inline-block;
  padding-left: 0;
  text-align: left;
  width: 100%;
}

footer ul li {
  display: inline;
  margin: 0 6px;
  list-style: none;
}
</style>
