<script>
	import github from '$lib/images/github.svg';
	import Settings from '../icons/Settings.svelte';
	import { isEditingMode } from '../store';

	function toggleEditingMode() {
		isEditingMode.update((value) => !value);
	}
</script>

<header>
	<div class="corner">
		<a href="https://github.com/h-dong/time-tracker">
			<img src={github} alt="GitHub" />
		</a>
	</div>

	<div class="corner">
		<button on:click={toggleEditingMode}>
			<Settings width="30px" />
		</button>
	</div>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
	}

	.corner {
		width: 3rem;
		height: 3rem;
	}

	.corner a {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	.corner button {
		background-color: unset;
		border: none;
		height: 48px;
		display: flex;
		align-items: center;
	}
</style>
