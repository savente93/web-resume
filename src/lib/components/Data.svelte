<script lang="ts">
  // import { onMount } from "svelte";
  import { tweened } from "svelte/motion";
  import BarGraph from "../graphs/BarGraph.svelte";
  import RadialGraph from "../graphs/RadialGraph.svelte";
  import { t } from "svelte-i18n";

  $: caption =
    component === "barGraph" ? $t("data.cliffNotes") : $t("data.narrative");
  $: component = "barGraph";
  $: leftDisabled = true;
  $: rightDisabled = false;

  const animationOffset = tweened(1, {
    duration: 500,
  });

  const switchToCliffNotes = async () => {
    if (leftDisabled) {
      return;
    }
    await animationOffset.set(0);
    component = "barGraph";
    leftDisabled = true;
    rightDisabled = false;
    caption = $t("data.cliffNotes");
    await animationOffset.set(1);
  };

  const switchToNarrative = async () => {
    if (rightDisabled) {
      return;
    }
    await animationOffset.set(0);
    component = "radialGraph";
    leftDisabled = false;
    rightDisabled = true;
    caption = $t("data.narrative");
    await animationOffset.set(1);
  };

  const wrapOnEnter = (func) => {
    return (e) => {
      switch (e.key) {
        case "Enter":
          func();
      }
    };
  };

  const switchToNarrativeKeyboard = wrapOnEnter(switchToNarrative);
  const switchToCliffNotesKeyboard = wrapOnEnter(switchToCliffNotes);
</script>

<section id="data" class="dataContainer">
  <div class="data">
    <h2>{@html $t("data.title")}</h2>
    <p>
      {@html $t("data.subtitle")}
    </p>

    <div class="caption-container">
      <button
        class="arrow prev {leftDisabled ? 'disabled' : ''}"
        tabindex={leftDisabled ? -1 : 0}
        on:click={switchToCliffNotes}
        on:keyup={switchToCliffNotesKeyboard}>&#10094;</button
      >

      <p id="caption" style="opacity:{$animationOffset}">{@html caption}</p>

      <button
        class="arrow next {rightDisabled ? 'disabled' : ''}"
        tabindex={rightDisabled ? -1 : 0}
        on:click={switchToNarrative}
        on:keyup={switchToNarrativeKeyboard}>&#10095;</button
      >
    </div>
    <!-- a gripping narative in a figure with some impresisng lookgng graphs with things like
  "potential", "performance", "cost effectiveness" and other bullshit -->

    <div class="container">
      {#if component === "barGraph"}
        <figure style="opacity:{$animationOffset}">
          <BarGraph />
        </figure>
      {:else if component === "radialGraph"}
        <figure style="opacity:{$animationOffset}">
          <RadialGraph />
        </figure>
      {/if}
    </div>
    <div class="footnote">{@html $t("data.footnote")}</div>
  </div>
</section>

<style>
h2 {
  margin-bottom: 0;
}
figure {
    margin: 0;
    margin-top: 3rem;
  }
  .dataContainer {
    display: block;
  }

  .footnote {
    opacity: 0.8;
    font-size: small;
    margin-top: 1rem;
  }

  .data {
    width: 80vw;
    display: flex;
    flex-direction: column;
    margin: 10% auto;
  }

  .disabled {
    opacity: 0.3;
  }

  .container {
    position: relative;
  }

  .caption-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: center;
    background-color: var(--fadedBackgroundColor);
    font-size: 1.2rem;
    color: var(--fontColor);
    border-radius: 0.5rem;
  }

  button {
    height: 3rem;
    width: 3rem;
    transition: ease-in-out 0.2s;
    border-radius: 1rem;
    font-size: 2rem;
    color: var(--fontColor);
    background-color: transparent;
  }
</style>
