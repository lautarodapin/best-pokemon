<script lang="ts">
	export let disabled = false;
	let className = '';
	export { className as class };
</script>

<button
	class="
    bg-slate-600 hover:bg-slate-800 ring-0 hover:ring-0 text-white px-4 py-2 rounded-lg focus:bg-slate-900 {className}
    {(disabled && 'hover:bg-gray-300') || ''}
    "
	on:click
	{disabled}
	class:bg-gray-300={disabled}
	class:text-gray-400={disabled}
	{...$$restProps}
>
	<slot />
</button>
