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
    $inspect("rises",rises);
    $inspect("falls",falls);

    onMount(async () => {
        const filterAndSort = (s: Stock[]) => {
            rises = s.filter(s => s.variation >= 0);
            falls = s.filter(s => s.variation < 0);
            rises = rises.sort((a, b) => b.variation - a.variation);
            falls = falls.sort((a, b) => a.variation - b.variation);
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
</style>

<div class="w-[100%]">
    <div style="" class="w-[600px] m-auto flex">
        <div style="flex:1">
            <div class="text-center">
                <p>RISES</p>
            </div>
            {#each rises as stock}
                {#if stock.variation >= 0}
                    <CardComponent {stock} variation={stock.variation} />
                {/if}
            {/each}
        </div>
        <div style="flex:1">
            <div class="text-center">
                <p>FALLS</p>
            </div>
            {#each falls as stock}
                {#if stock.variation < 0}
                    <CardComponent {stock} variation={stock.variation}/>
                {/if}
            {/each}
        </div>
    </div>    
</div>