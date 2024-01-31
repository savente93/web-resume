<script>
  import { t } from "svelte-i18n";
  import { wrapOnEnter } from "../utils/utils";

  $: modalOpen = false;
  $: currentShowcase = showcases[0];
  $: opacity = tweened(1);
  let sidePannelOpen = window.matchMedia("(min-width: 810px)").matches;
  $: showcases = [
    {
      id: "tb-counting",
      title: $t("showcase.tb.title"),
      problemStatement: $t("showcase.tb.problemStatement"),
      solutionDescription: $t("showcase.tb.solutionDescription"),
      outcomes: $t("showcase.tb.outcomes"),
    },
    {
      id: "fairness-audit",
      title: $t("showcase.fairness.title"),
      problemStatement: $t("showcase.fairness.problemStatement"),
      solutionDescription: $t("showcase.fairness.solutionDescription"),
      outcomes: $t("showcase.fairness.outcomes"),
    },
  ];

  import Modal from "../shared/Modal.svelte";
  import { tweened } from "svelte/motion";
</script>

<section id="showcase" class="showcase">
  <h2>{@html $t("showcase.title")}</h2>
  <div class="showcaseWrapper">
    <nav>
      <ul>
        {#each showcases as showcase (showcase.id)}
          <li>
            <button
              on:click={async () => {
                if (currentShowcase === showcase && sidePannelOpen) {
                  return;
                }
                if (sidePannelOpen) {
                  await opacity.set(0);
                }

                currentShowcase = showcase;

                if (sidePannelOpen) {
                  await opacity.set(1);
                }
                if (!sidePannelOpen) {
                  modalOpen = true;
                }
              }}
              on:keyup={wrapOnEnter(async () => {
                if (currentShowcase === showcase && sidePannelOpen) {
                  return;
                }
                if (sidePannelOpen) {
                  await opacity.set(0);
                }

                currentShowcase = showcase;

                if (sidePannelOpen) {
                  await opacity.set(1);
                }
                if (!sidePannelOpen) {
                  modalOpen = true;
                }
              })}
              style={currentShowcase === showcase && sidePannelOpen
                ? "background-color: var(--fadedBackgroundColor)"
                : ""}
            >
              <h3>{showcase.title}</h3>
            </button>
          </li>
        {/each}
      </ul>
    </nav>
    {#if modalOpen}
      <Modal on:closeModal={() => (modalOpen = false)}>
        <h3>{currentShowcase.title}</h3>
        <p><b>Problem:</b> {currentShowcase.problemStatement}</p>
        <p><b>Solution:</b> {currentShowcase.solutionDescription}</p>
        <p><b>Outcome:</b> {currentShowcase.outcomes}</p>
      </Modal>
    {/if}
    {#if sidePannelOpen}
      <div class="showcaseDetails" style="opacity:{$opacity}">
        <h3>{currentShowcase.title}</h3>
        <p><b>Problem:</b> {currentShowcase.problemStatement}</p>
        <p><b>Solution:</b> {currentShowcase.solutionDescription}</p>
        <p><b>Outcome:</b> {currentShowcase.outcomes}</p>
      </div>
    {/if}
  </div>
</section>

<style>
  .showcase ul {
    list-style: none;
    padding: 0;
    overflow-y: auto;
    height: 50vh;
  }

  li {
    margin-bottom: 1rem;
  }

  button {
    background-color: var(--backgroundColor);
    color: var(--fontColor);
    border: var(--fontColor) 1px solid;
    border-radius: 1rem;
    font-size: 1em;
    font-family: inherit;
    cursor: pointer;
    width: 100%;
    text-decoration: underline;
    padding: 0.5em 1em;
  }
  .showcaseDetails {
    padding: 2em;
  }
  .showcaseWrapper {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
  nav {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
  @media (min-width: 810px) {
    .showcaseWrapper {
      display: grid;
      grid-template-columns: 1fr 2fr;
    }
  }
</style>
