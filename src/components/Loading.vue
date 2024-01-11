<template>
    <div id="loading">
      <img
        class="img"
        src="../assets/images/loading-unscreen.gif"
        alt="loading..."
        width="100"
      />
    </div>
  </template>
  
  <script>
  export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Loading"
  };
  </script>
  <style>
  #loading {
    /* position: absolute;
    z-index: 1000;
    background-color: white;
    height: 100vh;
    width: 100vw; */
    text-align: center;
    /* line-height: 100vh; */
  }
  .img {
    display: block;
    margin-top: auto;
    margin-bottom: auto;
    margin-left: auto;
    margin-right: auto;
    width: 5%;
  }
  </style>