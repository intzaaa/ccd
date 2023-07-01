<script>
	import './Quote.scss';
	import quotes from 'quotesy';
	let quote = quotes.random();
</script>

<div id="quote" class="quote">
	<div>
		<div class="quote-text">
			<p>{quote.text}</p>
		</div>
		<div class="quote-author">{quote.author}</div>
	</div>
</div>
