/**
 * a class that can translate block list in event with json to html element list
 */

/**
 * 放入如何轉換 block 和 item 表格, 自動產生對用元件列表
 * @param {object} block2element {[key:BlOCK_TYPE]:({...parameters})=>JSX.element}
 * @param {object} item2element {[key:ITEM_TYPE]:({...parameters})=>JSX.element}
 */
class BlockInterpreter {
	constructor(block2element, item2element) {
		if (!(block2element && item2element))
			throw new Error('should give it how to translate block and item');
		this.block2element = block2element;
		this.item2element = item2element;
	}
	/**
	 * 轉換成 JSX.element[]
	 * @param {Block[]} blocks
	 * @returns {JSX.element[]}
	 * @example
	 * const block2element = {
	 * 	[BlOCK_TYPE.TEXT_A]: ({ text, url, title, items, key }) => {
	 * 		return (
	 * 			<div key={key}>
	 * 				TEXT_A
	 * 				<span>
	 * 					{text},{url},{title}
	 * 				</span>
	 * 				<div>{items}</div>
	 * 			</div>
	 * 		);
	 * 	},
	 * 	[BlOCK_TYPE.TEXT_B]: ({ text, url, title, items, key }) => {
	 * 		return (
	 * 			<div key={key}>
	 * 				TEXT_B
	 * 				<span>
	 * 					{text},{url},{title}
	 * 				</span>
	 * 				<div>{items}</div>
	 * 			</div>
	 * 		);
	 * 	},
	 * };
	 * const item2element = {
	 * 	[ITEM_TYPE.作者]: ({ url, name, key }) => {
	 * 		return (
	 * 			<div key={key}>
	 * 				<h1>作者{name}</h1>;<h2>{url}</h2>;
	 * 			</div>
	 * 		);
	 * 	},
	 * 	[ITEM_TYPE.社團]: ({ url, name, key }) => {
	 * 		return (
	 * 			<div key={key}>
	 * 				<h1>社團{name}</h1>;<h2>{url}</h2>;
	 * 			</div>
	 * 		);
	 * 	},
	 * };
	 * let interpreter = new BlockInterpreter(block2element, item2element);
	 * // 可以直接渲染
	 * // render(interpreter.transfer(sampleBlocks));
	 */
	transfer(blocks) {
		return blocks.map((block, i) =>
			this.block2element[block.type]({
				text: block.text,
				url: block.url,
				title: block.title,
				items: block.items.map((item, j) =>
					this.item2element[item.type]({
						url: item.url,
						name: item.name,
						key: j,
					})
				),
				key: i,
			})
		);
	}
}

export default BlockInterpreter;
