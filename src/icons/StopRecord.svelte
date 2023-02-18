<script>
	export let width = '5rem';
</script>

<svg {width} viewBox="0 0 1024 608" fill="none" xmlns="http://www.w3.org/2000/svg">
	<path
		d="M0 304C0 136.105 136.105 0 304 0H720C887.895 0 1024 136.105 1024 304C1024 471.895 887.895 608 720 608H304C136.105 608 0 471.895 0 304Z"
		fill="#F24A4A"
	/>
	<path
		d="M654 303.5C654 382.201 590.201 446 511.5 446C432.799 446 369 382.201 369 303.5C369 224.799 432.799 161 511.5 161C590.201 161 654 224.799 654 303.5Z"
		fill="#F2994A"
	/>
	<path
		d="M454 251C454 245.477 458.477 241 464 241H569C574.523 241 579 245.477 579 251V356C579 361.523 574.523 366 569 366H464C458.477 366 454 361.523 454 356V251Z"
		fill="black"
	/>
</svg>

<style>
	svg {
		cursor: pointer;
		border-radius: 24px;
		margin: 2rem;
		box-shadow: var(--shadow-level-3);
	}

	svg:hover {
		box-shadow: var(--shadow-level-4);
	}
</style>
