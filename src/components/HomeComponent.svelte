<script module>
    let count = $state([0,0,0]);
    let der = $derived(() => {
        return count[0] + count[1] + count[2];
    });
</script>

<script lang="ts">
    import { StockService } from "../services/stocks.service";
    import { onDestroy, onMount } from "svelte";
    import type {Stock} from "../entities/stock";
    import { SignalRService } from "../services/signalr.service";
    import CardComponent from "./CardComponent.svelte";
    let props = $props();
    let stocks = $state([] as Stock[]);
    let rises = $state([] as Stock[]);
    let falls = $state([] as Stock[]);
    $inspect("home stocks",stocks);
    // $inspect("rises",rises);
    // $inspect("falls",falls);

    onMount(async () => {
        const filterAndSort = (s: Stock[]) => {
            rises = s.filter(s => s.variation >= 0);
            falls = s.filter(s => s.variation < 0);
            rises.sort((a, b) => b.variation - a.variation);
            falls.sort((a, b) => a.variation - b.variation);
        }
        SignalRService.init();
        SignalRService.on("messageReceived", (newStocks: Stock[]) => {
            console.log('new values', newStocks);
            stocks = newStocks;
            filterAndSort(stocks);
        });
        let stockService = new StockService();
        stocks = await stockService.getAll();
        filterAndSort(stocks);
        
    });

    onDestroy(() => {
        SignalRService.off("messageReceived", () => {});
    });
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

<div class="w-[100%]">
    <div style="" class="w-[800px] m-auto flex">
        <div style="flex:1">
            <p>RISES</p>
            {#each stocks as s}
                {#if s.variation >= 0}
                    <CardComponent stock={s} />
                {/if}
            {/each}
        </div>
        <div style="flex:1">
            <p>FALLS</p>
            {#each stocks as s}
                {#if s.variation < 0}
                    <CardComponent stock={s} />
                {/if}
            {/each}
        </div>
    </div>    
</div>