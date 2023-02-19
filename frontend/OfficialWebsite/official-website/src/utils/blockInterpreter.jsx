/**
 * a class that can translate block list in event with json to html element list
 */

/**
 * 放入如何轉換 block 和 item 表格, 自動產生對用元件列表
 * @param {object} block2element {[key:BlOCK_TYPE]:({...parameters})=>JSX.element}
 */
class BlockInterpreter {
	constructor(block2element) {
		if (!block2element)
			throw new Error('should give it how to translate block');
		this.block2element = block2element;
	}
	/**
	 * 轉換成 JSX.element[]
	 * @param {Block[]} blocks
	 * @returns {JSX.element[]}
	 * @example
	 * const sampleBlocks = [
	 *	{
	 *		type: 0,
	 *		text: 'text_d95160cb-2160-49aa-a8a5-7c0ac92941e0',
	 *		url: 'https://10c5f80f-c12b-4668-bb8b-5b0ecb39f176',
	 *		title: 'title_8828b1fa-ada1-4429-89aa-fc97dd945259',
	 *		items: [
	 *			{
	 *				type: 0,
	 *				url: 'https://a456ae64-093e-4478-8b3c-db385b24217e',
	 *				name: 'name_1737c484-3409-4937-a124-f81d46796367',
	 *			},
	 *			{
	 *				type: 0,
	 *				url: 'https://3f4a2c1b-6dbb-4dbe-9a44-add7331aa911',
	 *				name: 'name_6e38147b-86b3-468c-8ad2-7252834b6fae',
	 *			},
	 *			{
	 *				type: 0,
	 *				url: 'https://bad1891c-a767-4cff-95f8-ca58d9a0b143',
	 *				name: 'name_20999340-fbc0-4eef-a60c-417d6adef871',
	 *			},
	 *		],
	 *	},
	 *	{
	 *		type: 1,
	 *		text: 'text_4ceffd42-8500-45f6-80a3-b789a044c9d1',
	 *		url: 'https://b14423d9-1bb1-424e-8a4a-9307b163dfc1',
	 *		title: 'title_d2ad97de-eb88-4c26-b565-b92960f8e861',
	 *		items: [
	 *			{
	 *				type: 1,
	 *				url: 'https://b3e268b9-1dbe-4eaa-86ab-d00a106feb1e',
	 *				name: 'name_ee2203d6-f3c1-40c0-9e7c-de17f2e1212d',
	 *			},
	 *		],
	 *	},
	 * ];
	 * const block2element = {
	 *	[BlOCK_TYPE.TEXT_A]: ({ text, url, title, items, key }) => {
	 *		return (
	 *			<div key={key}>
	 *				TEXT_A
	 *				<span>
	 *					{text},{url},{title}
	 *				</span>
	 *				<div>
	 *					{items.map((v) => (
	 *						<span>{v.name}</span>
	 *					))}
	 *				</div>
	 *			</div>
	 *		);
	 *	},
	 *	[BlOCK_TYPE.TEXT_B]: ({ text, url, title, items, key }) => {
	 *		return (
	 *			<div key={key}>
	 *				TEXT_B
	 *				<span>
	 *					{text},{url},{title}
	 *				</span>
	 *				<div>
	 *					{items.map((v) => (
	 *						<span>{v.name}</span>
	 *					))}
	 *				</div>
	 *			</div>
	 *		);
	 *	},
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
				items: block.items,
				key: i,
			})
		);
	}
}

export default BlockInterpreter;
