<script lang="ts">
    import Color from "./Color.svelte"
    export let palette: Palette;
    interface Palette {
        category?: string;
        name: string;
        author: string;
        colors: string[];
    }
</script>

<div style:margin-bottom="2em">
    <strong>{palette.name}</strong> by <em>{palette.author}</em> <small>{palette.category}</small>
    <br>
    {#each palette.colors as color}
        <Color {color}/>
    {/each}
</div>

<style>
    small {
        color: grey;
    }
</style>