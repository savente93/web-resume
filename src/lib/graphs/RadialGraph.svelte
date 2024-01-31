<script lang="ts">
  import { onMount } from "svelte";
  import { radialPointX, radialPointY } from "../utils/math";
  import { iterKeys, iterEntries } from "../utils/utils";

  let viewBoxHeight = 80;
  let viewBoxWidth = 120;
  let radialOffset = Math.PI / 3;

  let maxValues = {
    profit: {
      max: 50,
      min: 0,
    },
    "lead time": {
      max: 40,
      min: 10,
    },
    revenue: {
      max: 100,
      min: 0,
    },
    cost: {
      max: 100,
      min: 0,
    },
    "team size": {
      max: 10,
      min: 4,
    },
    "testing time": {
      max: 10,
      min: 2,
    },
  };

  let axisStrokeWidth = 0.5;
  let fontSize = window.matchMedia("min-width: 810px").matches ? 0.5 : 0.3;
  let labelOffset = 1.1;

  $: currentTrace = {
    label: "Current",
    color: "#636efa",
    values: {
      cost: 12,
      "lead time": 6,
      profit: 5,
      revenue: 15,
      "team size": 6,
      "testing time": 3,
    },
  };
  $: projectedTrace = {
    label: "Projected",
    color: "purple",
    values: {
      cost: 12,
      "lead time": 6,
      profit: 5,
      revenue: 15,
      "team size": 6,
      "testing time": 3,
    },
  };

  const radialTextAnchor = (phi: number, offset: number) => {
    const x = Math.cos(phi - offset);
    if (Math.abs(x) < 0.2) {
      return "middle";
    } else if (x < 0) {
      return "end";
    } else {
      return "begin";
    }
  };

  const radialTextBaseline = (phi: number, offset: number) => {
    const y = Math.sin(phi - offset);
    if (Math.abs(y) < 0.2) {
      return "center";
    } else if (y < 0) {
      return "text-after-edge";
    } else {
      return "text-before-edge";
    }
  };

  const polygonPointsFromSurface = (surface, radialOffset) => {
    return iterEntries(surface.values)
      .map(([key, value], idx) => {
        return `${radialPointX(
          xCentre,
          idx * radialAxesDistance,
          axisLength,
          radialOffset,
          value / maxValues[key].max
        )},${radialPointY(
          yCentre,
          idx * radialAxesDistance,
          axisLength,
          radialOffset,
          value / maxValues[key].max
        )} `;
      })
      .join(" ");
  };

  const updateTrace = (trace) => {
    let updatedTraceValues = { ...trace.values };
    updatedTraceValues.profit = Math.max(
      updatedTraceValues.revenue - updatedTraceValues.cost,
      0
    );
    updatedTraceValues.cost = Math.min(
      updatedTraceValues["team size"] + updatedTraceValues["lead time"],
      maxValues["cost"].max
    );
    updatedTraceValues.revenue = Math.min(
      updatedTraceValues["testing time"] * 5,
      maxValues["revenue"].max
    );
    updatedTraceValues["lead time"] = Math.min(
      updatedTraceValues["testing time"] * 2,
      maxValues["lead time"].max
    );
    let ret = { ...trace };
    ret.values = updatedTraceValues;
    return ret;
  };

  $: axes = iterKeys(currentTrace.values).map((axisName, idx) => {
    return {
      orgX: xCentre,
      orgY: yCentre,
      endY:
        yCentre +
        Math.sin(idx * radialAxesDistance - radialOffset) * axisLength,
      endX:
        xCentre +
        Math.cos(idx * radialAxesDistance - radialOffset) * axisLength,
      labelOrgX:
        xCentre +
        Math.cos(idx * radialAxesDistance - radialOffset) *
          axisLength *
          labelOffset,
      labelOrgY:
        yCentre +
        Math.sin(idx * radialAxesDistance - radialOffset) *
          axisLength *
          labelOffset,
      textAnchor: radialTextAnchor(idx * radialAxesDistance, radialOffset),
      radialTextBaseline: radialTextBaseline(
        idx * radialAxesDistance,
        radialOffset
      ),
      label: axisName,
    };
  });

  $: projectedTrace.values.profit = Math.max(
    projectedTrace.values.revenue - projectedTrace.values.cost,
    0
  );
  $: projectedTrace.values.cost = Math.min(
    projectedTrace.values["team size"] + projectedTrace.values["lead time"],
    maxValues["cost"].max
  );
  $: projectedTrace.values.revenue = Math.min(
    projectedTrace.values["testing time"] * 5,
    maxValues["revenue"].max
  );
  $: projectedTrace.values["lead time"] = Math.min(
    projectedTrace.values["testing time"] * 2,
    maxValues["lead time"].max
  );

  $: xCentre = viewBoxWidth / 2;
  $: yCentre = (2 * viewBoxHeight) / 5;
  $: numAxes = iterKeys(currentTrace.values).length;
  $: radialAxesDistance = (2 * Math.PI) / numAxes;
  $: axisLength = (4 * yCentre) / 5; // 4/5 is arbirtratily chosen cos it looks ok
  $: svgHeight = window.innerHeight * 0.5;
</script>

<div class="radialGraph">
  <svg
    viewBox="0 0 {viewBoxWidth} {viewBoxHeight}"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
    height={svgHeight}
  >
    <circle
      cx={xCentre}
      cy={yCentre}
      r={axisStrokeWidth}
      stroke="var(--fontColor)"
      fill="var(--fontColor)"
    />

    {#each [1, 2, 3] as count}
      <circle
        cx={xCentre}
        cy={yCentre}
        r={(axisLength * count) / 3}
        opacity="0.2"
        stroke="var(--fontColor)"
        stroke-width={axisStrokeWidth}
        fill="none"
      />
    {/each}

    {#each axes as ax}
      <line
        x1={ax.orgX}
        y1={ax.orgY}
        y2={ax.endY}
        x2={ax.endX}
        stroke="var(--fontColor)"
        stroke-width={axisStrokeWidth}
      />
      <text
        x={ax.labelOrgX}
        y={ax.labelOrgY}
        fill="var(--fontColor)"
        font-size="{fontSize}rem"
        text-anchor={ax.textAnchor}
        dominant-baseline={ax.radialTextBaseline}>{ax.label}</text
      >
    {/each}

    {#each [currentTrace, projectedTrace] as surface, surfaceIdx}
      {#each Object.keys(surface.values) as dim, dimIdx}
        <circle
          cx={radialPointX(
            xCentre,
            dimIdx * radialAxesDistance,
            axisLength,
            radialOffset,
            surface.values[dim] / maxValues[dim].max
          )}
          cy={radialPointY(
            yCentre,
            dimIdx * radialAxesDistance,
            axisLength,
            radialOffset,
            surface.values[dim] / maxValues[dim].max
          )}
          r={axisStrokeWidth / 2}
          fill={surface.color}
          stroke={surface.color}
          ><title>{dim}: {surface.values[dim]}</title>
        </circle>
      {/each}
      <polygon
        points={polygonPointsFromSurface(surface, radialOffset)}
        fill={surface.color}
        stroke={surface.color}
        fill-opacity=".5"
        stroke-width={axisStrokeWidth}
      />
      <rect
        x={xCentre - surfaceIdx * 30 + 1}
        y={viewBoxHeight - 7.5}
        width="4"
        height="4"
        fill={surface.color}
        stroke={surface.color}
        fill-opacity=".5"
        stroke-width={axisStrokeWidth}
      />
      <text
        id={surface.label}
        fill="var(--fontColor)"
        alignment-baseline="central"
        text-anchor="begin"
        font-size="{fontSize}rem"
        x={xCentre + fontSize + 2 - surfaceIdx * 30 + 5}
        y={viewBoxHeight - 4 + fontSize}>{surface.label}</text
      >
    {/each}
  </svg>
  <div class="inputContainer">
    <div class="input">
      <input
        type="range"
        name="testing"
        bind:value={projectedTrace.values["testing time"]}
        min={maxValues["testing time"].min}
        max={maxValues["testing time"].max}
      />
      <label for="testing">Testing time</label>
    </div>
    <div class="input">
      <input
        type="range"
        name="teamSize"
        bind:value={projectedTrace.values["team size"]}
        min={maxValues["team size"].min}
        max={maxValues["team size"].max}
      />
      <label for="teamSize">Team size</label>
    </div>
  </div>
</div>

<style>
  .radialGraph {
    margin: auto;
    color: var(--theme-color);
  }
  .inputContainer {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
  .input {
    justify-content: center;
    flex-direction: column;
    align-items: center;
    display: flex;
    margin-top: 2em;
  }
  svg {
    fill: var(--fontColor);
    max-width: 80vw;
  }
  @media (min-width: 810px) {
    .radialGraph {
      flex-direction: row;
      display: flex;
      justify-content: center;
    }
  }
</style>
