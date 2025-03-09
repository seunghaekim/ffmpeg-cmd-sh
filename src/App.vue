<script setup lang="ts">
import { computed, ref } from 'vue'
import pkgInfo from '../package.json'
import useFFmpegStore from './stores/ffmpeg'
import WasmLoader from './components/WasmLoader.vue'

const ffmpegStore = useFFmpegStore()

const ffmpegStatus = computed(() => {
  return ffmpegStore.status
})

const name = pkgInfo.name
const version = pkgInfo.version
const tabIndex = ref(0)
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
          <router-view />
        </b-tab>
        <b-tab disabled>
          <template #title>
            <code v-if="ffmpegStatus === 'ready'"><span class="small">🟢</span> wasm online</code>
            <code v-if="ffmpegStatus === 'loading'"
              ><span class="small">🟡</span> wasm loading <b-spinner small></b-spinner
            ></code>
            <code v-if="['idle', 'error'].includes(ffmpegStatus)"
              ><span class="small">🔴</span> wasm offline</code
            >
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
    <Suspense>
      <WasmLoader />
    </Suspense>
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
