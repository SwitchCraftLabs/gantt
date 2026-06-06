<script lang="ts">
  import { getMonths, getHeadings } from "./chartHeadings";
  import { projects, mapProjectColumns } from "./chartData";

  const initialMonths = 20;
  const maxMonths = 48;

  let numMonths = $state(initialMonths);
  let months = $state(getMonths(initialMonths));
  let headings = $state(getHeadings(getMonths(initialMonths)));
  let mappedProjects = $state(mapProjectColumns(projects, getMonths(initialMonths)));
</script>

<form
  onsubmit={(event) => {
    event.preventDefault();

    if (numMonths > maxMonths) {
      numMonths = maxMonths;
    }

    months = getMonths(numMonths);
    headings = getHeadings(months);
    mappedProjects = mapProjectColumns(projects, months);
  }}
>
  <label
    >Show <input id="num-months" type="text" bind:value={numMonths} /> months (max {maxMonths})
  </label>
</form>
<div class="gantt" style="grid-template-columns: repeat({months.length}, 1fr)">
  {#each headings as row}
    <div class="heading-row">
      {#each row as cell}
        <div class="heading-cell" style="grid-column:{cell.colStart}/{cell.colEnd}">
          {cell.label}
        </div>
      {/each}
    </div>
  {/each}
  {#each mappedProjects as p}
    <div class="row">
      <div
        class="item"
        style="background-color:{p.techLead.color};grid-column:{p.colStart}/{p.colEnd}"
      >
        {p.title}
      </div>
    </div>
  {/each}
</div>

<style>
  .gantt {
    display: grid;
    width: 100%;
    grid-template-rows: auto;

    border: 1px solid black;
    border-radius: var(--border-radius);

    margin-bottom: 2rem;
  }
  .gantt > * {
    display: grid;
    grid-template-columns: subgrid;
    grid-template-rows: subgrid;
    grid-column: 1/-1;
  }
  .gantt > *:first-child {
    border-top-left-radius: var(--border-radius-inner);
    border-top-right-radius: var(--border-radius-inner);
  }
  .gantt > *:last-child {
    border-bottom-left-radius: var(--border-radius-inner);
    border-bottom-right-radius: var(--border-radius-inner);
  }
  .gantt .heading-row {
    color: white;
  }
  .gantt .heading-row:nth-child(odd) {
    background-color: var(--color-blueblack);
  }
  .gantt .heading-row:nth-child(even) {
    background-color: var(--color-bluegray);
  }
  .gantt .heading-row > * {
    padding: 0.4rem 0;
    border-right: 1px solid #6a6f9f;

    text-align: center;
    font-size: 1.2rem;
  }
  .gantt .heading-row > *:last-child {
    border-right: none;
  }

  .row {
    padding: 0.4rem;
  }
  .row:nth-child(even) {
    background-color: #7b7a95;
  }
  .row:nth-child(odd) {
    background-color: #bbbacc;
  }
  .item {
    border-radius: var(--border-radius);
    padding: 0.4rem;
    grid-column: 1/-1;
    background-color: black;
    color: white;
  }

  form {
    display: flex;
    width: 100%;
    justify-content: flex-end;
    margin-bottom: 0.4rem;
  }
  #num-months {
    max-width: 36px;
    text-align: center;
  }
</style>
