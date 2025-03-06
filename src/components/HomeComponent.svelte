<script module>
    let count = $state([0,0,0]);
    let der = $derived(() => {
        return count[0] + count[1] + count[2];
    });
</script>

<script lang="ts">
    let props = $props();
</script>

<style>
    h1 {
        color: blue;
    }
</style>

<h1>{props.title}</h1>
<button onclick={() => {
    count[0]++;
    count[1] += 2;
    count[2] += 3;
}}>
	click here
</button>

<ul>
{#each count as c}
    {#if c % 2 == 0}
        <li class="text-green-600">{c}</li>
    {:else}
        <li class="text-red-600">{c}</li>
    {/if}
{/each}

derived : {der()}
</ul>
