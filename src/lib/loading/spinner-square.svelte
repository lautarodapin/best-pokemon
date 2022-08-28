<script lang="ts">
	let className = 'w-[24px] h-[30px]';
	export { className as class };
	export let fillClass = 'fill-slate-200';
</script>

<svg
	version="1.1"
	id="Layer_1"
	xmlns="http://www.w3.org/2000/svg"
	xmlns:xlink="http://www.w3.org/1999/xlink"
	x="0px"
	y="0px"
	viewBox="0 0 24 30"
	style="enable-background:new 0 0 50 50;"
	xml:space="preserve"
	class={className}
>
	<rect x="0" y="0" width="4" height="20" class={fillClass}>
		<animate
			attributeName="opacity"
			attributeType="XML"
			values="1; .2; 1"
			begin="0s"
			dur="0.6s"
			repeatCount="indefinite"
		/>
	</rect>
	<rect x="7" y="0" width="4" height="20" class={fillClass}>
		<animate
			attributeName="opacity"
			attributeType="XML"
			values="1; .2; 1"
			begin="0.2s"
			dur="0.6s"
			repeatCount="indefinite"
		/>
	</rect>
	<rect x="14" y="0" width="4" height="20" class={fillClass}>
		<animate
			attributeName="opacity"
			attributeType="XML"
			values="1; .2; 1"
			begin="0.4s"
			dur="0.6s"
			repeatCount="indefinite"
		/>
	</rect>
</svg>
