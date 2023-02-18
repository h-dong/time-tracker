<script lang="ts">
	import { liveQuery } from 'dexie';
	import { db } from './database';
	import { browser } from '$app/environment';
	import StartRecord from '../icons/StartRecord.svelte';
	import StopRecord from '../icons/StopRecord.svelte';
	import { isEditingMode } from '../store';

	let showControls: boolean;
	$: recordings = liveQuery(() => (browser ? db.trackedTime.toArray() : []));
	let isRecording = false;
	let recordingTime = 0;
	let timer: NodeJS.Timer;

	isEditingMode.subscribe((value) => {
		showControls = value;
	});

	function increaseTimer() {
		recordingTime += 1;
	}

	function startRecording() {
		isRecording = true;
		timer = setInterval(increaseTimer, 1000);
	}

	function stopRecording() {
		isRecording = false;
		db.trackedTime.add({
			seconds: recordingTime,
			date: new Date()
		});
		recordingTime = 0;
		clearInterval(timer);
	}

	function deleteRecording(id: number) {
		db.trackedTime.delete(id);
	}

	function parseTime(value: number) {
		const hours = Math.floor(value / 3600);
		const minutes = Math.floor((value % 3600) / 60);
		const seconds = value % 60;

		return formatTime(hours, minutes, seconds);
	}

	function formatTime(hours: number, minutes: number, seconds: number) {
		const hourString = hours < 10 ? `0${hours}` : hours;
		const minuteString = minutes < 10 ? `0${minutes}` : minutes;
		const secondString = seconds < 10 ? `0${seconds}` : seconds;

		return `${hourString}:${minuteString}:${secondString}`;
	}

	function formatDate(date: Date) {
		const day = date.getDate();
		const month = date.getMonth() + 1;
		const year = date.getFullYear();
		const hours = date.getHours();
		const minutes = date.getMinutes();
		const seconds = date.getSeconds();

		const dayString = day < 10 ? `0${day}` : day;
		const monthString = month < 10 ? `0${month}` : month;

		return `${year}/${monthString}/${dayString} ${formatTime(hours, minutes, seconds)}`;
	}
</script>

{#if isRecording}
	<div>Recording: {recordingTime}</div>
{/if}

{#if $recordings}
	<ul>
		{#each $recordings as recording (recording.id)}
			<li>
				<div class="card-content">
					<strong>{formatDate(recording.date)}</strong>
					<span>{parseTime(recording.seconds)}</span>
				</div>

				{#if showControls}
					<div class="card-controls">
						<!-- <button>Edit</button> -->
						<button on:click={() => deleteRecording(recording.id)}>Delete</button>
					</div>
				{/if}
			</li>
		{/each}
	</ul>
{/if}

{#if isRecording}
	<div class="control">
		<button on:click={stopRecording}><StopRecord /></button>
	</div>
{:else}
	<div class="control">
		<button on:click={startRecording}><StartRecord /></button>
	</div>
{/if}

<style>
	ul {
		list-style: none;
		padding: 0;
		margin: 0 auto;
		width: 400px;
	}

	ul > li {
		display: flex;
		justify-content: space-between;
		background-color: antiquewhite;
		margin: 1rem;
		padding: 1rem;
		border-radius: 4px;
		box-shadow: var(--shadow-level-1);
	}

	ul > li .card-content {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	ul > li .card-controls {
		display: flex;
		gap: 0.5rem;
	}

	.control {
		position: fixed;
		width: 64rem;
		bottom: 5rem;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.control button {
		background-color: unset;
		border: none;
	}
</style>
