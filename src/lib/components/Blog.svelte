<script>
  import { onMount } from "svelte";
  export let numBlogPosts = 4;
  import { t } from "svelte-i18n";
  import IntersectionObserver from "svelte-intersection-observer";

  let blogVisible = new Array(numBlogPosts).fill(false);
  let blogElements = new Array(numBlogPosts).fill(null);

  let items = [];
  onMount(async () => {
    const res = await fetch("https://slowcoder.org/atom.xml");
    const text = await res.text();
    const feedDocument = new DOMParser().parseFromString(text, "text/xml");
    items = [...feedDocument.querySelectorAll("entry")]
      .slice(0, numBlogPosts)
      .map((item) => {
        const title = item.querySelector("title").textContent;
        const published = new Date(
          item.querySelector("published").textContent
        ).toLocaleDateString("en-GB");
        const url = item.querySelector("link").attributes["href"].value;

        return { title, url, published };
      });
  });
</script>

<section id="Blog" class="blogContainer">
  <h2>{@html $t("blog.title")}</h2>
  <ul>
    {#each items as { title, url, published }, idx}
      <IntersectionObserver
        element={blogElements[idx]}
        bind:intersecting={blogVisible[idx]}
      >
        <li
          class="fade-in-section {blogVisible[idx] ? 'is-visible' : ''}"
          bind:this={blogElements[idx]}
        >
          <a href={url} target="_blank" rel="noreferrer noopener">
            <h3 class="blogTitle">{title}</h3>
          </a>
          <div class="blogPublishDate">Published: {published}</div>
        </li>
      </IntersectionObserver>
    {/each}
  </ul>
</section>

<style>
  .blogContainer {
    display: block;
  }

  ul {
    list-style: none;
    width: 80vw;
    padding: 0;
  }

  li {
    padding: 1em;
    border: var(--fontColor) 1px solid;
    margin: 3em;
    border-radius: 1rem;
  }

  .blogTitle {
    margin: 0;
    margin-top: 1em;
  }

  .blogPublishDate {
    margin-top: 0.5em;
    margin-bottom: 1em;
  }

  .fade-in-section {
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.6s ease-out, transform 1.2s ease-out;
    will-change: opacity, visibility;
  }
  .fade-in-section.is-visible {
    opacity: 1;
    transform: none;
    visibility: visible;
  }
</style>
