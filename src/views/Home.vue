<template>
  <div class="home">
    <div id="nav" class="bg-dark">
      <router-link to="/" class="mr-4">首頁</router-link>
      <router-link to="/login">後台登入</router-link>
    </div>
    <router-view />
    <h1 class="mt-3">Week07 後台系統</h1>
  </div>
</template>
