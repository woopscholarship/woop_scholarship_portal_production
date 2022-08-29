<script lang="ts">
	export let id: string | null = null;
	export let name: string | null = null;
	export let type = 'text';

	export let placeholder: string | null = null;
	export let label: string;
	export let value: string | null = null;
	export let checked: boolean | null = null;
	export let options: {
		value: string;
		label: string;
	}[] = [];

	export let style: string | null = null;
</script>

{#if type === 'checkbox'}
	<div class="input-group login-preference">
		<label for={name}><input {type} {id} {name} {value} {checked} /><span>{label}</span></label>

		<div class="checkbox-slot">
			<slot />
		</div>
	</div>
{:else if type === 'textarea'}
	<div class="input-group">
		<label for={name}>Reason to Apply for Scholarships on WoopScholarship *</label>
		<textarea {name} {id} {placeholder} {style} />
	</div>
{:else if type === 'select'}
	<div class="input-group">
		<label for={name}>{label}</label>
		<select {name} {id} {style}>
			{#each options as option}
				<option value={option.value}>{option.label}</option>
			{/each}
		</select>
	</div>
{:else}
	<div class="input-group">
		<label for={name}>{label}</label>
		<input {type} {name} {id} {placeholder} {style} />
		<div class="slot">
			<slot />
		</div>
	</div>
{/if}

<style lang="scss">
	@use '../../styles/mixin';
	@use '../../styles/typography';

	input,
	textarea {
		border: 1px solid #e6e6e6;
	}

	textarea {
		margin-top: 15px;
		min-height: 154px;
		padding: 10px;
	}

	.input-group {
		@include mixin.flex-col;
		margin: 10px 0;
		width: 100%;

		label {
			@include typography.small-text-semibold;
			margin-bottom: 8px;
		}
	}

	.login-preference {
		@include mixin.flex-row-center;

		label {
			@include mixin.flex-row-center;
			@include typography.small-text-light;

			margin-top: 15px;
			width: 50%;
			gap: 0.5em;

			span {
				margin-left: 5px;
				margin-top: -5px;
			}
		}
		.checkbox-slot {
			width: 50%;
			text-align: right;
		}
	}

	input,
	select,
	textarea {
		width: 100%;
		padding: 10px;
		border: none;
		font-weight: 400;

		border-radius: 5px;
		font-family: 'Inter';
		font-style: normal;
		font-size: 15px;
		line-height: 18px;

		background-color: var(--input-background-color);
	}

	::placeholder {
		color: #ddd;
		font-weight: 600;
	}

	option {
		width: 100%;
		font-weight: 400;
		line-height: 18px;
		padding: 20px;
	}

	textarea {
		resize: none;
	}

	label {
		font-weight: 600;
	}

	button {
		font-weight: 700;
	}

	/* Checkbox CSS */

	input:focus,
	select:focus,
	option:focus,
	textarea:focus {
		outline: var(--primarycolor-dark) 1.5px solid;
		background-color: white;
	}

	/* GLOBAL SIDEBAR LIST HOVER */

	a:hover {
		color: var(--primarycolor-dark);
	}
</style>
