<script>
  import { t } from "svelte-i18n";
</script>

<section id="intro" class="intro">
  <h2>{@html $t("intro.title")}</h2>
  {@html $t("intro.listPreamble")}
  <ol>
    <li>
      {@html $t("intro.l1")}
    </li>
    <li>
      {@html $t("intro.l2")}
    </li>
    <li>
      {@html $t("intro.l3")}
    </li>
    <li>
      {@html $t("intro.l4")}
    </li>
  </ol>
</section>

<style>
  .intro {
    display: block;
  }
</style>
