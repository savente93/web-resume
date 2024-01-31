<script lang="ts">
  import Icon from "../shared/Icon.svelte";
  import { theme } from "../utils/store";
  import { t } from "svelte-i18n";
  let socials = [
    {
      title: "Github",
      url: "https://github.com/savente93",
      iconName: "github",
    },
    {
      title: "LinkedIn",
      url: "https://www.linkedin.com/in/samvente/",
      iconName: "linkedin",
    },
    {
      title: "Ko-Fi",
      url: "https://ko-fi.com/ahuggingsam",
      iconName: "kofi",
    },
  ];
</script>

<section id="Home" class="landing">
  <div class="buisness-card">
    <figure>
      <img src="headshot.png" alt="it's an artistic rendition of me :)" />
      <figcaption>
        {@html $t("landing.artAttribution")}
      </figcaption>
    </figure>
    <div class="left">
      <div class="text">
        <h1>{@html $t("landing.title")}</h1>
        <div class="tagline">{@html $t("landing.subtitle")}</div>
      </div>
      <div class="socials">
        {#each socials as social}
          <div class="social">
            <a href={social.url}>
              <Icon
                name={social.iconName}
                description={social.title}
                fontColor={$theme.fontColor}
                backgroundColor={$theme.backgroundColor}
              />
            </a>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>

<style>
  .landing {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .buisness-card {
    height: fit-content;
  }
  a {
    color: var(--linkColor);
  }
  h1 {
    margin-bottom: 0.1rem;
    font-size: 3em;
  }
  .tagline {
    font-size: 1.5em;
    margin-bottom: 1em;
  }
  figure img {
    width: 15rem;
    height: 15rem;
    border-radius: 50%;
    margin: auto;
  }

  figure {
    /* height: 100%; */
    width: fit-content;
  }

  figcaption {
    font-size: small;
    text-align: center;
  }

  .landing {
    margin: auto;
    width: 80vw;
    margin-bottom: 5rem;
  }

  .text {
    text-align: center;
  }
  .left {
    display: flex;
    justify-content: space-around;
    flex-direction: column;
  }
  .socials {
    display: flex;
    justify-content: space-around;
    width: 100%;
    justify-self: flex-end;
  }

  .social {
    width: 2em;
    height: 2em;
  }
  @media (min-width: 810px) {
    .buisness-card {
      display: flex;
      justify-content: space-evenly;
      flex-direction: row-reverse;
      margin: 0;
    }
    figure {
      margin: 0;
    }
  }
</style>
