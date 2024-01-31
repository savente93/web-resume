<script>
  import { createEventDispatcher } from "svelte";
  import { wrapOnEnter } from "../utils/utils";
  const dispatch = createEventDispatcher();

  $: isLandscapeMode = window.matchMedia("min-aspect-ratio: 122/55");

  const handleKeydown = (e) => {
    switch (e.key) {
      case "Escape":
        dispatch("closeModal");
    }
  };
</script>

<svelte:window on:keydown={handleKeydown} />
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="modal" on:click={() => dispatch("closeModal")}>
  <div class="modal-box">
    <button
      tabindex="0"
      on:click={() => dispatch("closeModal")}
      on:keyup={wrapOnEnter(() => dispatch("closeModal"))}
    >
      <svg id="close" viewBox="0 0 12 12">
        <circle cx="6" cy="6" r="6" />
        <line x1="3" y1="3" x2="9" y2="9" />
        <line x1="9" y1="3" x2="3" y2="9" />
      </svg>
    </button>
    <div class="modal-content">
      <slot />
    </div>
  </div>
</div>

<style>
  /* The Modal (background) */
  .modal {
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%;
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0, 0, 0); /* Fallback color */
    background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /* Modal box/Box */
  .modal-box {
    position: fixed;
    background-color: var(--backgroundColor);
    color: var(--fontColor);
    padding: 2em;
    border: 1px solid var(--fontColor);
    margin-top: var(--menu-bar-height);
    width: 70%; /* Could be more or less, depending on screen size */
  }

  .modal-content {
    overflow: auto;
    max-height: 75vh;
  }

  .modal :global(img) {
    width: 100%;
    margin: auto;
    background-color: #fff;
  }

  button {
    position: absolute;
    top: -12px;
    right: -12px;
    width: 24px;
    height: 24px;
    cursor: pointer;
    fill: #f44;
    transition: transform 0.3s;
    background-color: transparent;
  }

  #close:hover {
    transform: scale(2);
  }

  #close line {
    stroke: #fff;
    stroke-width: 2;
  }

  @media (min-width: 810px) {
    .modal :global(img) {
      float: right;
      width: 25vw;
    }
  }

  @media (min-aspect-ratio: 122/55) {
    .modal-content {
      overflow: auto;
      max-height: 60vh;
    }
  }
</style>
