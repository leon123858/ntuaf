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
	 * @returns
	 */
	transfer(blocks) {
		return blocks.map((block) =>
			this.block2element[block.type]({
				text: block.text,
				url: block.url,
				title: block.title,
				items: block.items.map((item) =>
					this.item2element[item.type]({ url: item.url, name: item.name })
				),
			})
		);
	}
}

export default BlockInterpreter;
