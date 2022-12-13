<script lang="ts">
  import Palette from './lib/Palette.svelte'
  import colors from './lib/colors.json'
  import {onMount} from 'svelte'

  const limit = 100;
  let palettes: Palette[] = [];
  let categories = Object.keys(colors);
  for (let [key, value] of Object.entries(colors)) {
    for (let palette of value as Palette[]) {
      palettes.push({
        category: key,
        ...palette
      } as Palette)
      if (palettes.length > limit) break;
    }
  }

    interface Palette {
        category?: string;
        name: string;
        author: string;
        colors: string[];
    }

    let filter = "Any";
    $: filteredPalettes = palettes.filter((palette) => {return palette.category == filter || filter == "Any"})
</script>

<main>
  <section>
    <div>
      <label for="filter">filter: </label>
      <select id="filter" bind:value={filter}>
        <option value="Any">Any</option>
        {#each Array.from(categories) as category}
          <option value={category}>{category}</option>
        {/each}
      </select>
    </div>
    {#each filteredPalettes as palette (palette.name)}
      <Palette palette={palette}/>
    {/each}
  </section>
</main>

<style>
  main {
    max-width: 600px;
  }
</style>