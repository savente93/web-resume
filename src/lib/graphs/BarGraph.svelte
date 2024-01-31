<script lang="ts">
  import type { Trace } from "../utils/types";
  import { iterKeys, iterValues, range } from "../utils/utils";
  import { theme } from "../utils/store";
  export let viewBoxHeight = 100;
  export let viewBoxWidth = 160;

  export let xAxisPadding = 10;
  export let yAxisPadding = 6.5;
  export let axisStrokeWidth = 0.5;

  export let numYTicks = 10;
  export let yMax = 10;

  export let barWidth = 10;

  export let fontSize = 5;

  export let trace: Trace = {
    label: "Projected",
    color: "purple",
    values: {
      profit: 1,
      revenue: 8,
      cost: 7,
      "team size": 4,
    },
  };

  $: svgHeight = window.innerHeight * 0.5;

  $: xOrig = yAxisPadding;
  $: yOrig = viewBoxHeight - xAxisPadding;
  $: xEnd = viewBoxWidth - yAxisPadding;
  $: yEnd = xAxisPadding;

  $: barPadding = Math.max(
    0,
    (xEnd - xOrig - Object.keys(trace.values).length * barWidth) /
      Object.keys(trace.values).length
  );

  // Origin counts as a tick
  $: yTicks = range(numYTicks + 1).map((i) => {
    return {
      loc: yOrig - i * (hRange / numYTicks),
      label: (i * yMax) / numYTicks,
    };
  });

  $: hRange = viewBoxHeight - 2 * xAxisPadding;
  $: xLabelHeight = viewBoxHeight - yAxisPadding / 2;
</script>

<div class="barGraph">
  <svg
    viewBox="0 0 {viewBoxWidth} {viewBoxHeight}"
    xmlns="http://www.w3.org/2000/svg"
    style="--highlightColor:{$theme.highlightColor}"
    preserveAspectRatio="xMidYMid meet"
    height={svgHeight}
  >
    {#each yTicks as yTick}
      <line
        x1={xOrig}
        y1={yTick.loc}
        x2={xEnd}
        y2={yTick.loc}
        stroke="var(--fontColor)"
        stroke-dasharray=".5"
        stroke-width={axisStrokeWidth / 4}
        opacity={0.5}
      />
      <text
        x={xAxisPadding / 2}
        y={yTick.loc}
        fill="var(--fontColor)"
        font-size={fontSize}
        text-anchor="end"
        alignment-baseline="central">{yTick.label}</text
      >
    {/each}

    {#each Object.entries(trace.values) as [label, dataPoint], idx}
      <rect
        width={barWidth}
        height={(dataPoint / yMax) * hRange}
        x={idx * (barWidth + barPadding) + xAxisPadding + barPadding / 2}
        y={yOrig - (dataPoint / yMax) * hRange}
        fill="var(--highlightColor)"
        ><title>{label}: {dataPoint}</title>
      </rect>
      <text
        x={idx * (barWidth + barPadding) +
          xAxisPadding +
          (barPadding + barWidth) / 2}
        y={xLabelHeight}
        fill="var(--fontColor)"
        font-size={fontSize}
        text-anchor="middle"
      >
        {label}
      </text>
    {/each}

    <line
      x1={xOrig}
      y1={yOrig + axisStrokeWidth / 2}
      x2={xOrig}
      y2={yEnd}
      stroke="var(--fontColor)"
      stroke-width={axisStrokeWidth}
    >
      <title>y-axis</title>
    </line>
    <line
      x1={xOrig}
      y1={yOrig}
      x2={xEnd}
      y2={yOrig}
      stroke="var(--fontColor)"
      stroke-width={axisStrokeWidth}
    >
      <title>x-axis</title>
    </line>
  </svg>
</div>

<style>
  .barGraph {
    display: block;
    margin-left: 0;
  }
  svg {
    display: block;
    margin: 0 auto;
    max-width: 80vw;
  }
</style>
