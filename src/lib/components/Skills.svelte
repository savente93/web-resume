<script lang="ts">
  import { t } from "svelte-i18n";
  import { tweened } from "svelte/motion";
  import { range } from "../utils/utils";
  import { wrapOnEnter } from "../utils/utils";
  import { uid } from "../utils/utils";
  export let allSkills = [
    {
      title: $t("skills.ds"),
      id: uid(),
      skills: [
        {
          title: "Pandas",
          icon: "pandas.svg",
          id: uid(),
          link: "https://pandas.pydata.org/",
        },
        {
          title: "Polars",
          icon: "polars.svg",
          id: uid(),
          link: "https://www.pola.rs/",
        },
        {
          title: "SQLite",
          icon: "sqlite.svg",
          id: uid(),
          link: "https://www.sqlite.org/index.html",
        },
        {
          title: "Scikit-Learn",
          icon: "sklearn.svg",
          id: uid(),
          link: "https://scikit-learn.org/stable/index.html",
        },
        {
          title: "Scipy",
          icon: "scipy.svg",
          id: uid(),
          link: "https://scipy.org/",
        },
      ],
    },
    {
      title: $t("skills.web"),
      id: uid(),
      skills: [
        {
          title: "Svelte",
          icon: "svelte.svg",
          id: uid(),
          link: "https://svelte.dev/",
        },
        {
          title: "Plotly",
          icon: "plotly.svg",
          id: uid(),
          link: "https://plotly.com/",
        },
        // {
        //   title: "D3",
        //   icon: "d3.svg",
        //   id: uid(),
        //   link: "https://d3js.org/",
        // },
        {
          title: "React",
          icon: "react.svg",
          id: uid(),
          link: "https://reactjs.org/",
        },
        {
          title: "Matplotlib",
          icon: "matplotlib.svg",
          id: uid(),
          link: "https://matplotlib.org/",
        },
      ],
    },
    {
      title: $t("skills.prod"),
      id: uid(),
      skills: [
        {
          title: "Docker",
          icon: "docker.svg",
          id: uid(),
          link: "https://www.docker.com/",
        },
        {
          title: "Rust",
          icon: "rust.svg",
          id: uid(),
          link: "https://www.rust-lang.org/",
        },
        {
          title: "C++",
          icon: "c.svg",
          id: uid(),
          link: "https://isocpp.org/",
        },
        {
          title: "PostreSQL",
          icon: "postgresql.svg",
          id: uid(),
          link: "https://www.postgresql.org/",
        },
        {
          title: "Python",
          icon: "python.svg",
          id: uid(),
          link: "https://www.python.org/",
        },
        {
          title: "Git",
          icon: "git.svg",
          id: uid(),
          link: "https://git-scm.com/",
        },

        {
          title: "Bash",
          icon: "bash.svg",
          id: uid(),
          link: "https://www.gnu.org/software/bash/",
        },
        {
          title: "Java",
          icon: "java.svg",
          id: uid(),
          link: "https://www.java.com/en/",
        },
      ],
    },
    {
      title: $t("skills.platforms"),
      id: uid(),
      skills: [
        {
          title: "AWS",
          icon: "aws.svg",
          id: uid(),
          link: "https://aws.amazon.com/",
        },
        {
          title: "Github",
          icon: "github.svg",
          id: uid(),
          link: "https://github.com/",
        },
        {
          title: "Gitlab",
          icon: "gitlab.svg",
          id: uid(),
          link: "https://about.gitlab.com/",
        },
        {
          title: "Gitea",
          icon: "gitea.svg",
          id: uid(),
          link: "https://gitea.io/",
        },
        {
          title: "Raspberry pi",
          icon: "raspi.svg",
          id: uid(),
          link: "https://www.raspberrypi.org/",
        },
      ],
    },
  ];

  let boxCount = allSkills.length;
  let currentIndex = 0;
  $: animationTween = tweened(0);
  let prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const scrollToBox = (idx: number) => {
    const scrollBehavior = prefersReducedMotion ? "auto" : "smooth";
    document.getElementById(`box-${idx}`).scrollIntoView({
      behavior: scrollBehavior,
      block: "nearest",
      inline: "center",
    });
  };

  const nextBox = () => {
    currentIndex = Math.min(currentIndex + 1, boxCount - 1);
    scrollToBox(currentIndex);
  };

  const prevBox = () => {
    currentIndex = Math.max(currentIndex - 1, 0);
    scrollToBox(currentIndex);
  };

  const nextBoxKeyboard = wrapOnEnter(nextBox);
  const prevBoxKeyboard = wrapOnEnter(prevBox);
</script>

<section id="skills" class="skillsCompontent">
  <h2>{@html $t("skills.title")}</h2>
  <div class="scrollingWrapper">
    <ul class="outerList">
      {#each allSkills as catagory, catIdx (catagory.id)}
        <li class="outerBox" id="box-{catIdx}">
          <div class="boxTitle">{@html catagory.title}</div>
          <ul class="innerList">
            {#each catagory.skills as skill (skill.id)}
              <li class="skillIcon">
                <a
                  href={skill.link}
                  tabindex={catIdx === currentIndex ? 0 : -1}
                >
                  <img src={skill.icon} alt={skill.title} />
                </a>
              </li>
            {/each}
          </ul>
        </li>
      {/each}
    </ul>
  </div>
  <div class="buttonContainer">
    <button
      class={currentIndex === 0 ? "disabled" : ""}
      tabindex={currentIndex === 0 ? -1 : 0}
      on:click={prevBox}
      on:keyup={prevBoxKeyboard}>&#10094;</button
    >

    <p class="dotContainer" style="width: {2 * boxCount}em">
      {#each range(boxCount) as i}
        <div class="dot">
          <svg viewBox="-1 -1 2 2"
            ><circle cx="0" cy="0" r="1" fill="var(--fontColor)" />
            {#if i === currentIndex}
              <circle cx="0" cy="0" r=".5" fill="var(--backgroundColor)" />
            {/if}</svg
          >
        </div>
      {/each}
    </p>

    <button
      class={currentIndex === boxCount - 1 ? "disabled" : ""}
      tabindex={currentIndex === boxCount - 1 ? -1 : 0}
      on:click={nextBox}
      on:keyup={nextBoxKeyboard}>&#10095;</button
    >
  </div>
</section>

<style>
  .skillsCompontent {
    margin-bottom: 1vh;
  }
  .disabled {
    opacity: 0.1;
  }
  .dot {
    height: 100%;
    width: 1em;
  }
  .dotContainer {
    display: flex;
    justify-content: space-between;
  }
  .buttonContainer {
    width: 100%;
    height: 4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--fadedBackgroundColor);
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
  button:hover {
    cursor: pointer;
  }
  a {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
  }
  .boxTitle {
    text-align: center;
    font-size: 1.5em;
  }
  .scrollingWrapper {
    display: block;
    width: 80vw;
    overflow: hidden;
    margin-bottom: 1em;
  }
  .outerList {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    list-style-type: none;
    width: 350vw;
    overflow: auto;
  }
  .outerBox {
    border: solid 0.5rem var(--fontColor);
    border-radius: 0.5rem;
    padding: 1rem;
    height: fit-content;
    width: 50vw;
  }

  .skillIcon {
    width: 100%;
    height: 100%;
    margin-bottom: 1em;
  }

  .innerList {
    margin-top: 1em;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    row-gap: 0.5em;
    padding: 0;
    list-style-type: none;
  }

  img {
    max-height: 2em;
    background-color: #fff;
    border-radius: 0.5em;
    padding: 0.5rem;
  }

  @media (min-width: 810px) {
    .innerList {
      grid-template-columns: repeat(3, 1fr);
    }
  }
</style>
