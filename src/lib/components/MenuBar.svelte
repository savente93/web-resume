<script lang="ts">
  import Icon from "../shared/Icon.svelte";
  import { theme } from "../utils/store";
  import { supportedThemes } from "../themes/themes";
  import { locale } from "svelte-i18n";

  export let menuBarHeight = "2em";

  const handleToggleThemeClick = () => {
    theme.set(supportedThemes[$theme.next]);
  };

  const nextLocale = (locale: string) => {
    if (locale === "en") {
      return "nl";
    } else {
      return "en";
    }
  };

  const handleToggleLocaleClick = () => {
    // unlikely that I'll add other locales and don't feel like dealing with arrays and vite warnings
    locale.set(nextLocale($locale));
  };

  $: currentTheme = supportedThemes[$theme.name];
  $: nextTheme = supportedThemes[$theme.next];
</script>

<nav
  class="menubar"
  style="--menu-bar-height:{menuBarHeight}; --fadedBackgroundColor:{$theme.fadedBackgroundColor}"
>
  <button class="localeToggleButton" on:click={handleToggleLocaleClick}
    >{#if $locale}
      <Icon
        name={nextLocale($locale)}
        description="Set locale to {$locale}"
        fontColor="none"
      />
    {/if}
  </button>
  <button class="themeToggleButton" on:click={handleToggleThemeClick}
    ><Icon
      name={nextTheme.icon}
      description="Set visual theme to {nextTheme.name}"
      fontColor={currentTheme.fontColor}
    /></button
  >
</nav>

<style>
  .menubar {
    width: 100%;
    height: var(--menu-bar-height);
    display: flex;
    padding-bottom: 0.5rem;
    padding-top: 0.5rem;
    justify-content: flex-end;
    color: var(--fontColor);
    background-color: var(--backgroundColor);
    position: fixed;
    z-index: 999;
  }
  button {
    margin: 0;
    display: block;
    margin-right: 0.5em;
    background-color: transparent;
    height: 100%;
    width: 4em;
  }
</style>
