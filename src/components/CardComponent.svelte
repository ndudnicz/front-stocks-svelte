<script lang="ts">
    import type { Stock } from "../entities/stock";
    import { } from 'svelte';

    let props = $props();

    let redirect = () => {
        console.log('clicked');
    }
</script>

<div class="bg-[#ddd] p-[0.8rem 0.6rem] text-sm m-1 p-2 rounded-sm cursor-pointer">
    <a href="https://live.euronext.com/fr/product/equities/{props.stock.isin}-XPAR" target="blank">
        <div class="element-card-header">
            {props.stock.name}
            {#if props.stock.variation >= 0}
                <span class="text-green-600">+{props.stock.variation}%</span>
            {:else}
                <span class="text-red-600">{props.stock.variation}%</span>
            {/if}
        </div>
        <div class="metadata">
            <div>Last price : { props.stock.lastPrice }€</div>
            <div>Exchange : { props.stock.exchange }</div>
            <div>{ props.stock.isin }</div>
        </div>
    </a>
</div>