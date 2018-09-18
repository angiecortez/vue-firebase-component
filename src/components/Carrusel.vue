<template>
  <div class="slider">
    <ul>
      <li><img src="@/image/imagenRenovable.jpg" alt=""></li>
      <li><img src="@/image/recicla.jpg" alt=""></li>
      <li><img src="@/image/sequia.jpeg" alt=""></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Carrussel'
}
</script>
<style>
  .slider{
    width: 100%;
    margin: auto;
    overflow: hidden;
  }
  .slider ul{
    display: flex;
    padding: 0;
    width: 400%;
    animation: cambio 15s infinite alternate;
    animation-timing-function: ease-in-out;
  }
  .slider li{
    list-style: none;
    width: 100%;
  }
  .slider img{
    width: 100%;
  }
  @keyframes cambio{
    0% { margin-left: 0;}
    20% { margin-left: 0;}
    25% { margin-left: -100%;}
    45% { margin-left: -100%;}
    50% { margin-left: -200%;}
    70% { margin-left: -200%;}
    75% { margin-left: -300%;}
    100% { margin-left: -300%;}
  }

</style>
