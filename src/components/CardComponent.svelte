<script lang="ts">
    import type { Stock } from "../entities/stock";
    import { } from 'svelte';

    let props = $props();
    let stock: Stock = $state(props.stock as Stock);
    props.onChange = (stock: Stock) => {
        stock = stock;
    }
    $inspect("stock", stock);
    let lastPriceStr = stock.lastPrice.toString();
    let variationStr = `${stock.variation >= 0 ? '+' : ''}${stock.variation.toString()}%`;
</script>

<div class="bg-[#ddd] p-[0.8rem 0.6rem] text-sm m-1 p-2 rounded-sm">
    <div class="element-card-header">
        {stock.name}
        {#if stock.variation >= 0}
            <span class="text-green-600">{variationStr}</span>
        {:else}
            <span class="text-red-600">{variationStr}</span>
        {/if}
    </div>
    <div class="metadata">
        <div>Last price : { stock.lastPrice }€</div>
        <div>Exchange : { stock.exchange }</div>
        <div>{ stock.isin }</div>
    </div>
</div>