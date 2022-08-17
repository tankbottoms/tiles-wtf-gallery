<script lang="ts">
  import { onMount } from "svelte";
  
  const query = new URLSearchParams(
    location.search?.replace(/^[?]/, "")?.replace(/[+]/g, "%2B")
  );

  const tileBase64 = decodeURIComponent(query.get("tile"));
  const resolution = decodeURIComponent(query.get("resolution"));

  function particles(node: HTMLElement) {
    const isMobile =
      navigator.userAgent &&
      navigator.userAgent.toLowerCase().indexOf("mobile") >= 0;
    const isSmall = window.innerWidth < 1000;

    new window["ParticleSlider"]({
      ptlGap: isMobile || isSmall ? 3 : resolution === "low" ? 1 : 0,
      ptlSize: isMobile || isSmall ? 3 : resolution === "low" ? 2 : 1,
      width: 1e9,
      height: 1e9,
    });
  }
</script>

<section id="particle-slider">
  <div class="slides">
    <div id="first-slide" class="slide" data-src={tileBase64} use:particles />
  </div>
  <canvas class="draw" />
</section>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
  }
  section {
    margin: 0;
    padding: 0;
    background: #000;
    width: 100vw;
    height: 100vh;
  }
</style>